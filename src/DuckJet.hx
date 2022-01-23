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

	static var client:duck_jet.Client;

	@:await public static function main() {
    try {

      @:await run(Sys.args()[0]);
    } catch(e) {
      trace(e.details());
      throw Error.withData('Unable to start service', e);
    }
	}

	@:async public static function run(port)
		return try {
			final container = new NodeContainer(port,
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
			handler = req ->
				router.route(Context.authed(req,
					cast Session.new))
				.recover(OutgoingResponse.reportError);
			#else
			final router = new Router<duck_jet.Api.Impl>(controller);
			handler = req ->
				router.route(Context.ofRequest(req))
				.recover(OutgoingResponse.reportError);
			#end
			Ws.server.clientConnected.handle(controller.dropoffSession);
			var result = @:await container.run(handler);
			Sys.println('${AppSettings.config.duckJet.svc.name} running on port $port');
			result;
			// final nodeHandler = #if (tink_http >= "0.10.0") handler.toNodeHandler.bind({}) #else NodeContainer.toNodeHandler.bind(handler, {}) #end;
		} catch(e) throw Error.withData('Unable to run on port $port', e);
}

// #if !macro
// #end

@:config
class JetConfig extends fire_duck.Config {
	public var duckJet:{
		var svc:{
      var https:Bool;
			var name:String;
			var url:String;
			var port:Int;
		};
		var dropoff:{
			protocol:String
		};
		@:optional
		var messageRetention:Int;
		var internalDomain:String;
		var duck:{
			var lmtp:boisly.Secret;
		};
		var jet:{
			var api:boisly.Secret;
		};
		public var htmlToText:{
			var options:Dynamic;
		};
	};
}
