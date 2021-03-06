package duck_jet.mailers;

using tink.io.Source;

import haxe.io.Bytes;
import haxe.crypto.Base64;
import why.email.Attachment;
import node_mailjet.email.Attachment as ImplAttachment;
import why.Email.EmailConfig;
import node_mailjet.email.SendParamsRecipient;
import tink.CoreApi;
import node_mailjet.ConnectOptions;
import why.email.*;
import node_mailjet.email.Client as Impl;
import NodeMailjet;

typedef JetTransportOptions = {
	apiKey:String,
	apiSecret:String,
	?options:ConnectOptions
}

@:await class JetMailer extends EmailBase {
	var impl:Impl;

	public function new(cfg:JetTransportOptions)
		this.impl = NodeMailjet.connect(cfg.apiKey,
			cfg.apiSecret, cfg.options);

	@:async function doSend(config:EmailConfig):Noise
		return @:await Promise.lift(impl.post("send",
			{version: 'v3.1'})
			.request({
				Messages: [
					{
						From: {
							Name: config.from.name,
							Email: config.from.address
						},
						To: config.to.map(mkAddressList),
						Cc: if (config.cc != null)
							config.cc.map(mkAddressList) else
							null,
						Bcc: if (config.bcc != null)
							config.bcc.map(mkAddressList) else
							null,
						HtmlPart: config.content.html,
						Subject: config.subject,
						Attachments: @:await (if (config.attachments == null)
							[] else
							(Promise.inParallel(config.attachments.map(mkAttachment))))
					}
				]
			}));

	function mkAddressList(?whyAddress:why.email.Address):SendParamsRecipient
		return if (whyAddress == null) null else ({
			Name: whyAddress.name,
			Email: whyAddress.address
		});

	@:async function mkAttachment(whyAttachment:Attachment):ImplAttachment {
		return {
			Filename: whyAttachment.filename,
			ContentType: mime.Mime.lookup(whyAttachment.filename),
			Base64Content: haxe.crypto.Base64.encode(@:await
				(switch whyAttachment.source {
					case Local(path): asys.io.File.readStream(path);
					case Stream(source): source;
				}).all())
		}
	}
}
