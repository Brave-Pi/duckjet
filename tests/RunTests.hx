package;

import tink.http.clients.*;
import tink.CoreApi;
import tink.http.Container;
import tink.unit.*;
import tink.testrunner.*;
import tink.unit.*;
import tink.unit.Assert.*;
import tink.testrunner.*;
import boisly.AppSettings;

class RunTests {
	static var test:DuckJet;

	static function main() {
		Runner.run(TestBatch.make([new Test(),]))
			.handle(Runner.exit);
	}
}

@:await
@:asserts
class Test {
	public function new() {}

	var containerCtl:tink.http.Container.RunningState;
	var mailer:why.Email;

	/**
	 * Service setup
	 */
	@:setup
	@:async public function setup() {
		containerCtl = @:await runServer();
		mailer = @:await getMailer();
		return Noise;
	}

	@:async function runServer()
		return
			switch @:await DuckJet.run(AppSettings.config.duckJet.svc.port) {
			case Running(state):
				trace('Starting ${AppSettings.config.duckJet.svc.name}...');
				state;
			case Failed(e): throw Error.withData('Unable to start ${AppSettings.config.duckJet.svc.name}',
					e);
			case Shutdown: throw Error.withData("Server already shut down",
						'assert');
		}

	@:async function getMailer()
		return {
			trace('Instantiating DuckJet mailer');
			var client = new NodeClient();
			var api = tink.Web.connect(('localhost:${AppSettings.config.duckJet.svc.port}' : duck_jet.Api),
				{
					client: client
				});
			var mailer = new duck_jet.Client(api);
			trace('DuckJet mailer created');
			mailer;
		}

	@:teardown
	@:async public function stopServer() {
		try {
			trace('Shutting down ${AppSettings.config.duckJet.svc.name}');
			@:await containerCtl.shutdown(false);
			trace('Shutdown successful');
		} catch (e) {
			throw Error.withData('There was an error shutting down the service',
				e);
		}
		return Noise;
	}

	/**
	 * Tests
	 */
	public function test() {
		asserts.assert(1 == 1);
		return asserts.done();
	}
}

@:config
class Config extends DuckJet.JetConfig {
	
}
