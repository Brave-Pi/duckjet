# DuckJet

A WildDuck+MailJet Mail Transport Service for `tink_web`

# Service

The service interface pretty much looks like this:
```haxe
interface Api {
	@:post('/send')
	@:params(configData = header['data'])
	function send(configData:String, body:IdealSource):{result:String};

  @:ws('/dropoff') // pseudo meta
  function dropoff():OutgoingResponse;
}
```

`dropoff` is a websocket endpoint. Once you've sent an email, you send the attachments separately through binary on the websocket (encoded with [`tink_serialize`](https://github.com/haxetink/tink_serialize))

To simplify this, a [`why_email`](https://github.com/why-haxe/why-email) client is included. ([`duck_jet.Client`](https://github.com/brave-pi/duckjet/blob/master/src/duck_jet/Client.hx)).