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
  directory:String,
	currentFile:String,
	tmp:String,
	channel:SignalTrigger<Yield<Chunk, Error>>,
	attachments:Array<String>
};

typedef SessionInitiation = {uuid:String};

typedef SessionContinuation = {
	chunk:haxe.io.Bytes,
	currentFile:String
};

typedef AddressBase = {
	?name:String,
	address:String
}

//TODO: Actually use this
enum SessionMessage {
  Initiation(i:SessionInitiation);
  Continuation(s:SessionContinuation);
  Conclusion;
}

typedef MailerConfig = {
	from:AddressBase,
	to:Array<AddressBase>,
	?cc:Array<AddressBase>,
	?bcc:Array<AddressBase>,
	subject:String,
	?hasAttachments:Bool,
	?body:tink.Chunk
}

enum abstract Response(String) {
  var Done;
}