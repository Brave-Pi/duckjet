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
		final mailerConfig:MailerConfig = {
			to: config.to,
			from: config.from,
			cc: config.cc,
			bcc: config.bcc,
			subject: config.subject,
			hasAttachments: config.attachments != null
			&& config.attachments.length != 0,
		};
		final body:IdealSource = config.content.html;
		final result = (@:await api.send(haxe.crypto.Base64.encode(tink.Serialize.encode(mailerConfig)),
			body)).result;
		return if (result == 'OK') Success(Noise) else {
			final uuid = result;
			final appConfig = boisly.AppSettings.config.duckJet;
			@:await sendFiles(uuid,
				appConfig.dropoff.protocol + "://" +
				appConfig.svc.url,
				appConfig.svc.url,
				appConfig.svc.port,
				config.attachments);
		}
	}

	@:async inline function sendFiles(uuid:String, url,
			host, port,
			files:Array<Attachment>):Outcome<Noise, Error> {
		var sender = Signal.trigger();
		var outgoing = new SignalStream(sender);
		var handler:ClientHandler = function(stream) {
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
		emit(tink.Serialize.encode({
      filename: duck_jet.Api.Impl.EOF,
      chunk: tink.Chunk.EMPTY
    }));
		sender.trigger(End);
		return Success(Noise);
	}
}
