package duck_jet;

import tink.Chunk;
import tink.tcp.nodejs.NodejsConnector;
import why.Email;
import why.email.*;
import why.email.Address;
import tink.streams.Stream;
import tink.websocket.Client;

using tink.websocket.ClientHandler;
using tink.io.Source;

import tink.websocket.*;
import duck_jet.Types;

@:require(tink_tcp)
@:await class Client extends EmailBase {
	var api:tink.web.proxy.Remote<duck_jet.Api>;

	public function new(api)
		this.api = api;

	function doSend(config:EmailConfig):Promise<Noise>
		return _doSend(config);

	@:async inline function _doSend(config:EmailConfig):Noise {
		return try {
			final mailerConfig:MailerConfig = {
				body: '',
				from: cast config.from,
				to: config.to.map(a -> {
					name: a.name,
					address: a.address
				}),
				cc: config.cc.map(a -> {
					name: a.name,
					address: a.address
				}),
				bcc: config.bcc.map(a -> {
					name: a.name,
					address: a.address
				}),
				subject: config.subject,
				hasAttachments: config.attachments != null
				&& config.attachments.length != 0,
			};
			final body:IdealSource = config.content.html;
			final result = (@:await api.send(haxe.crypto.Base64.encode(tink.Serialize.encode(mailerConfig)),
				body)).result;
			if (result == 'OK')
				Success(Noise)
			else {
				final uuid = result;
				final appConfig = boisly.AppSettings.config.duckJet;
				@:await sendFiles(uuid,
					appConfig.dropoff.protocol + "://" +
					appConfig.svc.url + '/dropoff',
					appConfig.svc.url, appConfig.svc.port,
					config.attachments);
			}
		} catch (e) {
			Failure(Error.withData('Failure sending email',
				e));
		}
	}

	@:async inline function sendFiles(uuid:String, url,
			host, port, files:Array<Attachment>) {
		var sender = Signal.trigger();
		var trigger = Promise.trigger();
		var conclude = trigger.resolve.bind(Noise);
		var outgoing = new SignalStream(sender);
		var handler:ClientHandler = function(stream) {
			stream.forEach(m -> {
        
				switch m {
					case Binary(bin):
            
					case Text(_): throw 'assert';
          case ConnectionClose: 
            return Finish;
          default:
				}
				Resume;
			}).handle(_ -> {
				conclude();
			});
			return RawMessageStream.lift(outgoing);
		}

		NodejsConnector.connect({host: host, port: port},
			handler.toTcpHandler(url))
			.eager();

		inline function emit(d:haxe.io.Bytes)
			return {
				sender.trigger(Data(RawMessage.Binary(d)));
				Resume;
			}

		emit(tink.Serialize.encode({uuid: uuid}));

		@:async function transmit(attachment:Attachment)
			return switch attachment.source {
				case Stream(stream):
					@:await stream.chunked()
						.forEach(chunk ->
							emit(tink.Serialize.encode({
							filename: attachment.filename,
							chunk: chunk
						})));

				case Local(path):
					@:await asys.io.File.readStream(path)
						.chunked()
						.forEach(chunk ->
							emit(tink.Serialize.encode({
							filename: attachment.filename,
							chunk: chunk
						})));
			}

		@:await Promise.inSequence(files.map(transmit));

    // TODO: use enum for message types
		emit(tink.Serialize.encode({
			filename: duck_jet.Api.Impl.EOF,
			chunk: tink.Chunk.EMPTY
		}));
    final ret = Success(@:await trigger);
		sender.trigger(End);
		return ret;
	}
}
