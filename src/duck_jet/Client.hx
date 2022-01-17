package duck_jet;
import why.Email;
import why.email.*;
import why.email.Address;
class Client {
  var api:tink.web.proxy.Remote<duck_jet.Api>;
  public function new(api) this.api = api;
  public function send(config:EmailConfig) {
    
  }
}