package duck_jet;

import duck_jet.Types;

// using fire_duck.Logger;
// using fire_duck.Utils;
using tink.io.Source;

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

interface Api {
	@:post('/send')
	@:params(configData = header['data'])
	function send(configData:String,
		body:IdealSource):{result:String};
}

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
			final email:MailerConfig = tink.Serialize.decode(haxe.crypto.Base64.decode(configData));
			#if duckfireEnabled
			final addressesResult = @:await user.duck.api.addresses()
				.list();
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
				return
					Error.withData("Something went wrong",
					addressesResult);
			} else {
				return new Error(Unauthorized,
					"Unauthorized");
			}
			}
			else {
				return new Error(Unauthorized,
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
			client.messageReceived.handle(m -> {
				var thisSession = dropoffSessions.find(s ->
					s.client == client);
				if (thisSession == null)
					initiateSession(client, m);
				else
					continueSession(client, m, thisSession);
			});
		}

		inline function initiateSession(client:ConnectedClient,
			m:Message) {
			sess(({
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
					tmp: haxe.io.Path.join([directory, tmp])
				};
				client.closed.handle(s -> {
					teardown(sess);
				});
				dropoffSessions.push(sess);
			} : SessionInitiation));
		}

		static macro function sess(e);

		inline function continueSession(client:ConnectedClient,
			m:Message,
				session:DropoffSession) {
			sess(({
				if (binData.currentFile != session.currentFile)
					saveAndCreateNew(session,
						binData.currentFile);
				// TODO: use enum for message types
				if (binData.currentFile == EOF)
					teardown(session);
				var chunk = tink.Chunk.ofBytes(binData.chunk);
				session.channel.trigger(Data(chunk));
			} : SessionContinuation));
		}

		@:await inline function teardown(session:DropoffSession) {
      if(dropoffSessions.indexOf(session) == -1) return;

      dropoffSessions.remove(session);
			@:await fire(session);

			session.client.send(Binary(tink.Serialize.encode({
				done: true
			})));

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
				session.channel.trigger(End);
				final src = haxe.io.Path.join([session.directory, session.tmp]);
				final dest = haxe.io.Path.join([session.directory, session.currentFile]);
				sys.FileSystem.rename(src, dest);
				session.attachments.push(dest);
			}
			session.currentFile = newFile;
			// TODO: use enum for message types
			if (session.currentFile != EOF) {
				session.tmp = '${js.npm.Uuid.v4()}.tmp';
				var writeStream = asys.io.File.writeStream(haxe.io.Path.join([session.directory, session.tmp]));
				var inStream:RealSource = new SignalStream(session.channel);
				final filename = newFile;
				inStream.pipeTo(writeStream, {end: true})
					.next(_ -> {
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
				config.attachments = session.attachments.map(a ->
				{
					final fp = new haxe.io.Path(a);
					({
						filename: '${fp.file}.${fp.ext}',
						source: Local(a)
					});
				});
			}
      final plainTextify = plainTextifier.get();
			config.content = {
				html: mail.body,
				text: plainTextify(mail.body)
			};
			final mailer = this.getMailer(config);
			final sendReq = try mailer.send(config)
			catch (e) {
				Promise.lift(null);
			}
			return sendReq.next(_ -> {
				if (session != null) {
					session.attachments.iter(sys.FileSystem.deleteFile);
					sys.FileSystem.deleteDirectory(session.directory);
				}

				Noise;
			}).recover(e -> {
				Noise;
			});
		}

		function getMailer(config:EmailConfig)
			return {
				var recipients = config.to;
        if(config.cc != null) recipients = recipients.concat(config.cc);
        if(config.bcc != null) recipients = recipients.concat(config.bcc);
        final needsJet = recipients.exists(r -> r.address.toLowerCase() == boisly.AppSettings.config.duckJet.internalDomain.toLowerCase());
        
				if (!needsJet) {
          trace('duckmail');
          duckMailer;
        }
				else
					jetMailer;
			}
}
