package duck_jet;

import tink.CoreApi;
import tink.core.Signal;
import tink.streams.Stream;
import tink.Chunk;
import why.Email;
import why.email.*;
import why.email.Address;
import tink.websocket.Server;

typedef DropoffSession = {
	uuid:String,
	client:ConnectedClient,
	currentFile:String,
	tmp:String,
	channel:SignalTrigger<Yield<Chunk, Error>>,
	attachments:Array<String>
};

typedef SessionInitiation = {uuid:String};
typedef SessionContinuation = {chunk:haxe.io.Bytes,
	currentFile:String};

typedef MailerConfig = {
	from:Address,
	to:AddressList,
	?cc:AddressList,
	?bcc:AddressList,
	subject:String,
	?hasAttachments:Bool,
	?body:tink.Chunk
}
