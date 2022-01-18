package duck_jet;

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
	var appConfig:Dynamic;

	public function new(api, appConfig)
		this.api = api;

	function doSend(config:EmailConfig):Promise<Noise>
		return _doSend(config);

	@:async inline function _doSend(config:EmailConfig):Noise {
		final mailerConfig:MailerConfig = {
			to: config.to,
			from: config.from,
			cc: config.cc,
			bcc: config.bcc,
			subject: config.subject,
			hasAttachments: config.attachments != null
			&& config.attachments.length != 0,
		};
		final body:IdealSource = 'test';
		final result = (@:await api.send(haxe.crypto.Base64.encode(tink.Serialize.encode(mailerConfig)),
			body)).result;
		return if (result == 'OK') Success(Noise) else {
			final uuid = result;

			@:await sendFiles(uuid,
				appConfig.dropoff.protocol + "://" +
				appConfig.dropoff.url,
				appConfig.dropoff.url, appConfig.dropoff.port,
				config.attachments);
		}
	}

	@:async function sendFiles(uuid:String, url, host, port,
			files:Array<Attachment>):Outcome<Noise, Error> {
		var sender = Signal.trigger();
		var outgoing = new SignalStream(sender);
		var handler:ClientHandler = function(stream) {
			//   // do nothing with responses
			// stream.forEach(function(message:RawMessage) {
			// 	// switch message {
			// 	// 	case Text(v):
			// 	// 	case Binary(v):
			// 	// }
			// 	return Resume;
			// });

			return RawMessageStream.lift(outgoing);
		}

		NodejsConnector.connect({host: host, port: port},
			handler.toTcpHandler(url))
			.eager();

		function emit(d:haxe.io.Bytes)
			return {
				sender.trigger(Data(RawMessage.Binary(d)));
				Resume;
			}
		emit(tink.Serialize.encode({uuid: uuid}));
		@:async function transmit(attachment:Attachment)
			return switch attachment.source {
      // @formatter:off
				case Stream(stream):
					@:await stream
                    .chunked()
                    .forEach(chunk -> emit(tink.Serialize.encode({filename: attachment.filename, chunk: chunk})));
					
				case Local(path):
					@:await asys.io.File.readStream(path)
                    .chunked()
                    .forEach(chunk -> emit(tink.Serialize.encode({filename: attachment.filename, chunk: chunk})));
					
			}
      // @formatter:on
		@:await Promise.iterate(files.map(transmit),
			p -> None, _ -> Some(Noise));
		sender.trigger(End);
		return Success(Noise);
	}
}
