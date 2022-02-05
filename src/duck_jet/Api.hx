package duck_jet;

import duck_jet.Types;

// using fire_duck.Logger;
// using fire_duck.Utils;
using tink.io.Source;

#if !client
import tink.websocket.*;
import tink.websocket.ServerHandler;
import tink.websocket.Server;
import why.email.Nodemailer;
import duck_jet.mailers.JetMailer;
import tink.http.middleware.*;
import why.Email;
import why.email.*;
import duck_jet.Ws;
import why.email.Address;
import why.email.Attachment;
import tink.CoreApi;

using tink.io.Source;
using Lambda;
#end

interface Api {
	@:post('/send')
	@:params(configData = header['data'])
	@:params()
	function send(configData:String, ?accessToken:String,
		body:IdealSource):{
		result:String
	};
}

#if !client
@:await class Impl {
	var plainTextifier:Lazy<html_to_text.CompiledFunction> = HtmlToText.compile.bind(boisly.AppSettings.config.duckJet.htmlToText.options);
	var duckMailer:Email;
	var jetMailer:Email;
	var pending:Map<String, MailerConfig> = [];
	var dropoffSessions:Array<DropoffSession> = [];

	// TODO: use enum for message types
	public static final EOF = "$_$_$EOF$_$_$";

	public function new(duckCfg:TransporterConfig,
			jetCfg:JetTransportOptions) {
		this.duckMailer = new Nodemailer(duckCfg);
		this.jetMailer = new JetMailer(jetCfg);
	}

	@:post('/send')
	@:params(configData = header["data"])
	@:async public function send(#if duckfireEnabled user:fire_duck.Session.User,
	#end
			configData:String,
			body:RealSource):{result:String} {
		#if duckfireEnabled
		if (!user.duck.disabled) {
		#end
			final email:MailerConfig = tink.Json.parse(haxe.crypto.Base64.decode(configData).toString());
			fire_duck.Logger.log(user);
			#if duckfireEnabled
			final addressesResult = @:await user.duck.api.addresses()
				.list();
			fire_duck.Logger.log(addressesResult);
			fire_duck.Logger.log(email);
			if (addressesResult.success
				&& addressesResult.results.findIndex(r ->
					r.address == email.from.address) != -1) {
			#end
				final uuid = '${js.npm.Uuid.v4()}';

				email.body = @:await body.all();

				return if (email.hasAttachments) {
					pending.set(uuid, email);
					haxe.Timer.delay(() -> {
						pending.remove(uuid);
					},
						1000 * 60 * (if (boisly.AppSettings.config.duckJet.messageRetention != null)
							boisly.AppSettings.config.duckJet.messageRetention else
							10)); // expire pending email after 10 mins
					{result: uuid};
				} else {
					@:await fire(email);
					{result: "OK"};
				}
			#if duckfireEnabled
			}
			else if (!addressesResult.success) {
				throw Error.withData("Something went wrong",
					addressesResult);
			} else {
				fire_duck.Logger.log('w0t');
				throw new Error(Unauthorized,
					"Unauthorized!!!");
			}
			}
			else {
				throw new Error(Unauthorized,
					"Unauthorized");
			}
			#end
		}

		@:all('/dropoff')
		public function dropoff(ctx:tink.web.routing.Context) @:privateAccess {
			var wsHandler = DuckJet.handler.applyMiddleware(new WebSocket(Ws.server.handle));
			return try wsHandler.process(ctx.request)
			catch (e) {
				throw Error.withData("dropoff error", e);
			};
		}

		public function dropoffSession(client:ConnectedClient) {
			var initiated = false;
			client.messageReceived.handle(m -> {
				fire_duck.Logger.log('got message... $m');
				initiated = true;
				var thisSession = dropoffSessions.find(s ->
					s.client == client);
				if (thisSession == null)
					initiateSession(client, m);
				else {
					fire_duck.Logger.log('continuing session');
					continueSession(client, m, thisSession);
				}
			});
			haxe.Timer.delay(function() if (!initiated) {
				fire_duck.Logger.log('killing zombie client');
				client.close();
			},
				boisly.AppSettings.config.duckJet.sessionTimeout);
		}

		inline function initiateSession(client:ConnectedClient,
			m:Message) {
			sess(({
				fire_duck.Logger.log(binData);
				var trigger:SignalTrigger<Yield<Chunk,
					Error>> = Signal.trigger();
				final tmp = '${js.npm.Uuid.v4()}.tmp';
				final directory = ensureDirectory('dropoff/${binData.uuid}/');
				final sess = {
					client: client,
					uuid: binData.uuid,
					currentFile: null,
					channel: trigger,
					attachments: [],
					directory: directory,
					attachmentsWritten: 0,
					tmp: haxe.io.Path.join([directory, tmp]),
					closed: false
				};
				fire_duck.Logger.log('session started');
				client.closed.handle(s -> {
					fire_duck.Logger.log('client closed connection');
					haxe.Timer.delay(teardown.bind(sess),
						boisly.AppSettings.config.duckJet.sessionTimeout);
				});
				dropoffSessions.push(sess);
			} : SessionInitiation));
		}

		static macro function sess(e);

		inline function continueSession(client:ConnectedClient,
			m:Message,
				session:DropoffSession) {
			fire_duck.Logger.log('continuation..');
			sess(({
				fire_duck.Logger.log(binData);
				if (binData.currentFile != session.currentFile)
					saveAndCreateNew(session,
						binData.currentFile);
				// TODO: use enum for message types
				if (binData.currentFile == EOF)
					haxe.Timer.delay(teardown.bind(session),
						boisly.AppSettings.config.duckJet.sessionTimeout);
				var chunk = tink.Chunk.ofBytes(binData.chunk);
				session.channel.trigger(Data(chunk));
			} : SessionContinuation));
		}

		@:await inline function teardown(session:DropoffSession,
			?pos:haxe.PosInfos) {
			if (session.closed
				|| dropoffSessions.indexOf(session) == -1)
				return;
			fire_duck.Logger.log('closing file@$pos');
			session.channel.trigger(End);
			session.closed = true;
			@:await Future.delay(0, () -> {
				dropoffSessions.remove(session);
			});
			try @:await fire(session)
			catch (e)
				throw Error.withData('Unable to send email: ${e.details()}',
					e);

			session.client.send(Text(tink.Json.stringify({
				done: true
			})));
			fire_duck.Logger.log('sent email, closing client cnx');
			session.client.close();
		}

		function ensureDirectory(dir:String)
			return dir.split('/').fold((part, cwd) -> {
				cwd += '$part/';
				if (!sys.FileSystem.exists(cwd))
					sys.FileSystem.createDirectory(cwd);
				cwd;
			}, '');

		function saveAndCreateNew(session:DropoffSession,
				newFile:String) {
			if (session.currentFile != null) {
				fire_duck.Logger.log('closing file');
				session.channel.trigger(End);
				// var tmp = session.tmp,
				// 	directory = session.directory,
				// 	currentFile = session.currentFile,
				// 	attachments = session.attachments;
				// haxe.Timer.delay(() -> {
				// 	final src = haxe.io.Path.join([directory, tmp]);
				// 	final dest = haxe.io.Path.join([directory, currentFile]);
				// 	sys.FileSystem.rename(src, dest);
				// 	attachments.push(dest);
				// }, 0);
			}
			session.currentFile = newFile;
			// TODO: use enum for message types
			if (session.currentFile != EOF) {
				session.tmp = '${js.npm.Uuid.v4()}.tmp';
				final wp = haxe.io.Path.join([session.directory, session.currentFile]);
				fire_duck.Logger.log('opening $wp');
				session.attachments.push(wp);
				var writeStream = asys.io.File.writeStream(wp);
				var inStream:RealSource = new SignalStream(session.channel);
				final filename = newFile;
				inStream.pipeTo(writeStream, {end: true})
					.next(_ -> {
						fire_duck.Logger.log('closing $wp');
						session.attachmentsWritten++;
						if (session.attachmentsWritten == session.attachments.length)
							teardown(session);
						Noise;
					})
					.eager();
			}
		}

		function fire(?mail:MailerConfig,
				?session:DropoffSession) {
			if (mail == null)
				if (session != null)
					mail = pending.get(session.uuid)
				else
					throw 'mail config or dropoff session required';

			final config:EmailConfig = cast mail;
			if (session != null) {
				fire_duck.Logger.log('setting attachments');
				config.attachments = session.attachments.map(a ->
				{
					final fp = new haxe.io.Path(a);
					({
						filename: '${fp.file}.${fp.ext}',
						source: Local(a)
					});
				});
			} else config.attachments = [];
			final plainTextify = plainTextifier.get();
			config.content = {
				html: mail.body,
				text: plainTextify(mail.body)
			};
			final mailer = this.getMailer(config);
			final sendReq = try mailer.send(config)
			catch (e) {
				fire_duck.Logger.log('Error: ${e}');
				Promise.lift(null);
			}
			return sendReq.next(_ -> {
				if (session != null) {
					var messageRetention = 1;
					if (boisly.AppSettings.config.duckJet.messageRetention != null)
						messageRetention = boisly.AppSettings.config.duckJet.messageRetention;
					Future.delay(messageRetention * 1000,
						() -> {
							fire_duck.Logger.log('deleting files');
							session.attachments.iter(sys.FileSystem.deleteFile);
							sys.FileSystem.deleteDirectory(session.directory);
							Noise;
						});
				} else
					Noise;
			})
      .recover(e -> {
          fire_duck.Logger.log(e.details());
          Noise;
      });
		}

		function getMailer(config:EmailConfig)
			return {
				var recipients = config.to;
				if (config.cc != null)
					recipients = recipients.concat(config.cc);
				if (config.bcc != null)
					recipients = recipients.concat(config.bcc);
				final needsJet = recipients.exists(r ->
					r.address.substring(r.address.indexOf('@')
					+ 1)
					.toLowerCase() != boisly.AppSettings.config.duckJet.internalDomain.toLowerCase());
				if (!needsJet) {
					duckMailer;
				} else
					jetMailer;
			}
	}
#end
