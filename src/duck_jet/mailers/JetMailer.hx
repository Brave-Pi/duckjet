package duck_jet.mailers;


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
typedef JetTransportOptions = {apiKey:String, apiSecret:String, ?options:ConnectOptions}
class JetMailer extends EmailBase {
	var impl:Impl;

	public function new(cfg:JetTransportOptions)
		this.impl = NodeMailjet.connect(cfg.apiKey, cfg.apiSecret, cfg.options);

	function doSend(config:EmailConfig):Promise<Noise>
		return Promise.lift(impl.post("send", {version: 'v3.1'}).request({
			Messages: [
				{
					From: {
						Name: config.from.name,
						Email: config.from.address
					},
					To: config.to.map(mkAddressList),
					Cc: config.cc.map(mkAddressList),
					Bcc: config.bcc.map(mkAddressList),
					HtmlPart: config.content.html,
					Subject: config.subject,
					Attachments: config.attachments.map(mkAttachments)
				}
			]
		})).next(_ -> Noise);

	function mkAddressList(?whyAddress:why.email.Address):SendParamsRecipient
		return if (whyAddress == null) null else ({
			Name: whyAddress.name,
			Email: whyAddress.address
		});

	function mkAttachments(whyAttachment:Attachment):ImplAttachment {
		throw new haxe.exceptions.NotImplementedException();
	}
}