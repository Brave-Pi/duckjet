package duck_jet.mailers;

// import bp.duck.WildDuckProxy;
import why.email.*;
// import bp
import haxe.io.Bytes;
import haxe.crypto.Base64;
import why.email.Attachment;
import bp.duck.proxy.models.Common;
import bp.duck.proxy.models.Results;
import bp.duck.proxy.models.Requests;
import tink.CoreApi;
import why.Email.EmailConfig;
import bp.duck.proxy.WildDuckProxy;

class DuckMailer extends EmailBase {
	var api:tink.web.proxy.Remote<MessagesProxy>;

	public function new(api) {
		this.api = api;
	}

	function doSend(config:EmailConfig):Promise<Noise>
		return api.create({
			to: config.to.map(mkAddressList),
			from: {
				name: config.from.name,
				address: config.from.address
			},
			cc: config.cc.map(mkAddressList),
			bcc: config.bcc.map(mkAddressList),
			attachments: config.attachments.map(mkAttachments),
			subject: config.subject,
			html: config.content.html.split(mkDuckBoundary(config.from.address))
		}).next(_ -> Noise);

	function mkAddressList(?whyAddress:why.email.Address):Party
		return if (whyAddress == null) null else ({
			name: whyAddress.name,
			address: whyAddress.address
		});

	function mkDuckBoundary(address:String):String {
		return
			'_duckkit_boundary_${Base64.encode(Bytes.ofString(address))}__';
	}

	function mkAttachments(whyAttachment:Attachment):AttachmentCreate
		throw new haxe.exceptions.NotImplementedException();
}
