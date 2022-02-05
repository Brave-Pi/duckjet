package duck_jet;

import tink.Chunk;
import why.Email;
import why.email.*;
import why.email.Address;
import why.email.Attachment;
import tink.streams.Stream;
import tink.websocket.Client;

using tink.websocket.ClientHandler;
using tink.io.Source;

import tink.websocket.*;
import duck_jet.Types;

@:expose
@:await class Client extends EmailBase {
	static final EOF = "$_$_$EOF$_$_$";

	// fr
	var api:tink.web.proxy.Remote<duck_jet.Api>;
	var client:tink.http.Client;
	var config:DuckJet.JetConfig;

	public function new(client, config) {
		this.config = config;
		this.client = client;
		this.api = tink.Web.connect(('${config.duckJet.svc.https ? 'https' : 'http'}://${config.duckJet.svc.url}:'
			+ config.duckJet.svc.port : duck_jet.Api),
			{
				client: client
			});
	}

	public static function get()
		return {
			var client = #if nodejs new tink.http.clients.NodeClient() #elseif js new tink.http.clients.JsClient() #else new tink.http.clients.StdClient() #end;
			new duck_jet.Client(client,
				boisly.AppSettings.config);
		}

	public static function fromAccessToken(tkn, cfg)
		return {
			var client:tink.http.Client = #if nodejs new tink.http.clients.NodeClient() #elseif js new tink.http.clients.JsClient() #else new tink.http.clients.StdClient() #end;
			new duck_jet.Client(client.augment({
				before: [
					req -> {
						@:privateAccess req.header.fields.push(new tink.http.Header.HeaderField("x-access-token",
							tkn));
						req;
					}
				]
			}), cfg);
		}

	#if (!nodejs && js)
	public static function mkAttachment(filename:String,
			buffer:js.lib.ArrayBuffer):Attachment {
		return {
			filename: filename,
			source: AttachmentSource.Stream((new js.lib.DataView(buffer) : tink.Chunk))
		};
	}

	public static function promisify<T>(promise:tink.core.Promise<T>):js.lib.Promise<T>
		return promise;
	#end

	function doSend(config:EmailConfig):Promise<Noise>
		return _doSend(config);

	@:async inline function _doSend(config:EmailConfig)
		/* :Outcome<Noise,Error> */ {
		final mailerConfig:MailerConfig = try ({
			body: '',
			from: cast config.from,
			to: config.to.map(a -> {
				name: a.name,
				address: a.address
			}),
			cc: if (config.cc != null) config.cc.map(a -> {
				name: a.name,
				address: a.address
			}) else null,
			bcc: if (config.bcc != null)
				config.bcc.map(a -> {
				name: a.name,
				address: a.address
			}) else null,
			subject: config.subject,
			hasAttachments: config.attachments != null
			&& config.attachments.length != 0,
		}) catch (e) {
			throw Error.withData('Unable to build email',
				e);
		};
		final body:IdealSource = config.content.html;
		final result = (@:await api.send(haxe.crypto.Base64.encode(haxe.io.Bytes.ofString(tink.Json.stringify(mailerConfig))),
			body)).result;

		return if (result == 'OK') Noise else {
			final uuid = result;
			final appConfig = this.config.duckJet;
			final result = try @:await sendFiles(uuid,
				appConfig.dropoff.protocol + "://" +
				appConfig.svc.url +
				':${appConfig.svc.port}' + '/dropoff',
				appConfig.svc.url, appConfig.svc.port,
				config.attachments) catch (e)
				throw Error.withData('Unable to send attachments: ${e.details()}',
				e);
			result;
		}
	}

	@:async inline function sendFiles(uuid:String, url,
			host, port:Int, files:Array<Attachment>) {
		var sender = Signal.trigger();
		var trigger = Promise.trigger();
		var conclude = trigger.resolve.bind(Noise);
		var outgoing = new SignalStream(sender);

		var connectorFactory = #if nodejs tink.websocket.clients.TcpConnector.new #elseif js tink.websocket.clients.JsConnector.new #else tink.websocket.clients.HttpConnector.new #end;
		// final url = '$url';

		connectorFactory(url)
			.connect(RawMessageStream.lift(outgoing))
			.forEach(m -> {
				switch m {
					case Binary(bin):

					case Text(_): throw 'assert';
					case ConnectionClose:
						return Finish;
					default:
				}

				Resume;
			})
			.handle(_ -> {
				conclude();
			});

		inline function emit(d:String)
			return {
				sender.trigger(Data(RawMessage.Text(d)));
				Resume;
			}

		emit(tink.Json.stringify({uuid: uuid}));

		@:async function transmit(attachment:Attachment)
			return switch attachment.source {
				case Stream(stream):
					@:await stream.chunked()
						.forEach(chunk ->
							emit(tink.Json.stringify({
							currentFile: attachment.filename,
							chunk: chunk
						})));

				case Local(path):
					#if sys
					@:await asys.io.File.readStream(path)
						.chunked()
						.forEach(chunk ->
							emit(tink.Json.stringify({
							currentFile: attachment.filename,
							chunk: chunk
						})));
					#else
					throw 'not implemented';
					#end
			}

		@:await Promise.inSequence(files.map(transmit));

		// TODO: use enum for message types
		emit(tink.Json.stringify({
			currentFile: EOF,
			chunk: tink.Chunk.EMPTY
		}));
		final ret = @:await trigger;
		sender.trigger(End);
		return ret;
	}
}
