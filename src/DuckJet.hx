package;

import tink.http.containers.*;
import tink.http.Response;
import tink.web.routing.*;
import fire_duck.Session;
import duck_jet.Ws;

using Lambda;

import boisly.AppSettings;

@:await class DuckJet {
	public static var handler:tink.http.Handler;

	// static var config:boisly.AppSettings;
	static var client:duck_jet.Client;

	@:await public static function main() {
		// 'testing'._(trace('test'));

		final container = new NodeContainer(5390,
			{upgradable: true});
		var lmtpData = (@:await AppSettings.config.duckJet.duck.lmtp)
			.toString();
		var apiData = (@:await AppSettings.config.duckJet.jet.api)
			.toString();
		var lmtpOpts:tink.json.Serialized<why.email.Nodemailer.TransporterConfig> = cast lmtpData;
		var apiOpts:tink.json.Serialized<duck_jet.mailers.JetMailer.JetTransportOptions> = cast apiData;
		var controller = new duck_jet.Api.Impl(lmtpOpts.parse(),
			apiOpts.parse());
		#if duckfireEnabled
		final router = new Router<fire_duck.Session,
			duck_jet.Api.Impl>(controller);
		handler = req -> router.route(Context.authed(req,
			cast Session.new))
			.recover(OutgoingResponse.reportError);
		#else
		final router = new Router<duck_jet.Api.Impl>(controller);
		handler = req -> router.route(Context.ofRequest(req))
			.recover(OutgoingResponse.reportError);
		#end
		Ws.server.clientConnected.handle(controller.dropoffSession);
		container.run(handler);
		// final nodeHandler = #if (tink_http >= "0.10.0") handler.toNodeHandler.bind({}) #else NodeContainer.toNodeHandler.bind(handler, {}) #end;
	}
}

// #if !macro
// #end

@:config
class Config extends fire_duck.Config {
	public var duckJet:{
		var dropoff:{
			protocol:String,
			url:String,
			port:Int
		};
		@:optional
		var messageRetention:Int;
		var internalDomain:String;
		var duck:{
			var lmtp:boisly.Secret;
		};
		var jet:{
			var api:boisly.Secret;
		}
	};
}
