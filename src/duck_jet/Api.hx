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
	var duckMailer:Email;
	var jetMailer:Email;
	var pending:Map<String, MailerConfig> = [];
	var dropoffSessions:Array<DropoffSession> = [];

	public function new(duckCfg:TransporterConfig,
			jetCfg:JetTransportOptions) {
		this.duckMailer = new Nodemailer(duckCfg);
		this.jetMailer = new JetMailer(jetCfg);
	}

	@:post('/send')
	@:params(configData = header["data"])
	@:async public function send(#if duckfireEnabled user:fire_duck.Session.User,
	#end
			configData:String, body:RealSource) {
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
				if (email.hasAttachments) {
					pending.set(uuid, email);
					haxe.Timer.delay(() -> {
						pending.remove(uuid);
					},
						1000 * 60 * (if (boisly.AppSettings.config.duckJet.messageRetention != null)
							boisly.AppSettings.config.duckJet.messageRetention else
							10)); // expire pending email after 10 mins
					return {result: uuid};
				} else {
					@:await fire(email);
					return {result: "OK"};
				}
			#if duckfireEnabled
			}
			else if (!addressesResult.success) {
				throw Error.withData("Something went wrong",
					addressesResult);
			} else {
				throw new Error(Unauthorized,
					"Unauthorized");
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
			trace('droppin off');
			var wsHandler = DuckJet.handler.applyMiddleware(new WebSocket(Ws.server.handle));
			trace('processing..');
			return try wsHandler.process(ctx.request)
			catch (e) {
				trace(e);
				throw Error.withData("dropoff error", e);
			};
		}

		public function dropoffSession(client:ConnectedClient) {
			trace('welcome to the dropoff');
			client.messageReceived.handle(m -> {
				var thisSession = dropoffSessions.find(s ->
					s.client == client);
				if (thisSession == null)
					initiateSession(client, m);
				else
					continueSession(client, m,
						thisSession);
			});
		}

		inline function initiateSession(client:ConnectedClient,
				m:Message) {
			sess(({
				var trigger:SignalTrigger<Yield<Chunk,
					Error>> = Signal.trigger();
				final tmp = '${js.npm.Uuid.v4()}.tmp';
				dropoffSessions.push({
					client: client,
					uuid: binData.uuid,
					currentFile: null,
					channel: trigger,
					attachments: [],
					tmp: ensureDirectory('./dropoff/${binData.uuid}/') +
					tmp
				});
			} : SessionInitiation));
		}

		static macro function sess(e);

		inline function continueSession(client:ConnectedClient,
				m:Message, session:DropoffSession) {
			sess(({
				if (binData.currentFile != session.currentFile)
					saveAndCreateNew(session,
						binData.currentFile);
				if (binData.chunk.length == 0) 
					teardown(session);
				 else {
					var chunk = tink.Chunk.ofBytes(binData.chunk);
					session.channel.trigger(Data(chunk));
				}
			} : SessionContinuation));
		}

		inline function teardown(session:DropoffSession) {
			session.client.close();
			dropoffSessions.remove(session);
			fire(session);
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
				final dest = ensureDirectory('./dropoff/${session.uuid}/')
					+ session.currentFile;
				sys.FileSystem.rename(session.tmp, dest);
				session.attachments.push(dest);
			}

			session.tmp = '${js.npm.Uuid.v4()}.tmp';
			session.currentFile = newFile;
			var writeStream = asys.io.File.writeStream(ensureDirectory('./dropoff/${session.uuid}/')
				+ session.tmp);
			var inStream:RealSource = new SignalStream(session.channel);
			inStream.pipeTo(writeStream).eager();
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
					({
					filename: a,
					source: Local(a)
				}));
			}
			config.content = {
				html: mail.body,
				text: 'DuckJet Express Mail'
			};
			return this.getMailer(config)
				.send(config)
				.next(_ -> {
					haxe.Timer.delay(session.attachments.iter.bind(sys.FileSystem.deleteFile),
						1000 * 60 * 5);
					Noise;
				});
		}

		function getMailer(config:EmailConfig)
			return
				if (config.from.address.split('@')[1].toLowerCase() == boisly.AppSettings.config.duckJet.internalDomain.toLowerCase())
					duckMailer else jetMailer;
}
