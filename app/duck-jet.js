(function ($global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var DuckJet = function() { };
$hxClasses["DuckJet"] = DuckJet;
DuckJet.__name__ = true;
DuckJet.main = function() {
	var __t65 = function(e) {
		try {
			var e1 = e;
			throw haxe_Exception.thrown(e1.code == 0 ? e1.data : e1);
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g);
			console.log("src/DuckJet.hx:23:",_g1.details());
			var e = tink_core_TypedError.withData(null,"Unable to start service",_g1,{ fileName : "src/DuckJet.hx", lineNumber : 24, className : "DuckJet", methodName : "main"});
			throw haxe_Exception.thrown(e.code == 0 ? e.data : e);
		}
	};
	try {
		DuckJet.run(process.argv.slice(2)[0]).handle(function(__t66) {
			try {
				var _g = tink_await_OutcomeTools.getOutcome(__t66);
				switch(_g._hx_index) {
				case 0:
					break;
				case 1:
					throw haxe_Exception.thrown(_g.failure);
				}
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				__t65(_g1);
			}
		});
	} catch( _g ) {
		var _g1 = haxe_Exception.caught(_g).unwrap();
		__t65(_g1);
	}
};
DuckJet.run = function(port) {
	return tink_core_Future.irreversible(function(__return) {
		try {
			var __t67 = function(__t68) {
				__return(tink_core_Outcome.Success(__t68));
			};
			var __t69 = function(e) {
				try {
					var e1 = e;
					throw haxe_Exception.thrown(e1.code == 0 ? e1.data : e1);
				} catch( _g ) {
					var _g1 = haxe_Exception.caught(_g);
					__return(tink_core_Outcome.Failure(tink_await_Error.fromAny(tink_core_TypedError.withData(null,"Unable to run on port " + port,_g1,{ fileName : "src/DuckJet.hx", lineNumber : 58, className : "DuckJet", methodName : "run"}))));
					return;
				}
			};
			try {
				var container = new tink_http_containers_NodeContainer(tink_http_containers__$NodeContainer_ServerKindBase.Path(port),{ upgradable : true});
				boisly_Secret.reveal(boisly_AppSettings.get_config().duckJet.duck.lmtp).handle(function(__t70) {
					try {
						var __t70_result;
						var _g = tink_await_OutcomeTools.getOutcome(__t70);
						switch(_g._hx_index) {
						case 0:
							__t70_result = _g.data;
							break;
						case 1:
							__t69(_g.failure);
							return;
						}
						var lmtpData = __t70_result.toString();
						boisly_Secret.reveal(boisly_AppSettings.get_config().duckJet.jet.api).handle(function(__t71) {
							try {
								var __t71_result;
								var _g = tink_await_OutcomeTools.getOutcome(__t71);
								switch(_g._hx_index) {
								case 0:
									__t71_result = _g.data;
									break;
								case 1:
									__t69(_g.failure);
									return;
								}
								var apiData = __t71_result.toString();
								var controller = new duck_$jet_Impl(new tink_json_Parser2().parse(lmtpData),new tink_json_Parser3().parse(apiData));
								var router = new tink_web_routing_Router0(controller);
								DuckJet.handler = new tink_http_SimpleHandler(function(req) {
									var this1 = router.route(tink_web_routing_Context.ofRequest(req));
									var f = tink_core_Recover.ofSync(tink_http_OutgoingResponse.reportError);
									return tink_core_Future.flatMap(this1,function(o) {
										switch(o._hx_index) {
										case 0:
											return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(o.data));
										case 1:
											return f(o.failure);
										}
									});
								});
								duck_$jet_Ws.server.clientConnected.listen($bind(controller,controller.dropoffSession));
								tink_core_Future.map(container.run(DuckJet.handler),tink_core_Outcome.Success).handle(function(__t72) {
									try {
										var __t72_result;
										var _g = tink_await_OutcomeTools.getOutcome(__t72);
										switch(_g._hx_index) {
										case 0:
											__t72_result = _g.data;
											break;
										case 1:
											__t69(_g.failure);
											return;
										}
										var v = "" + boisly_AppSettings.get_config().duckJet.svc.name + " running on port " + port;
										process.stdout.write(Std.string(v));
										process.stdout.write("\n");
										__t67(__t72_result);
									} catch( _g ) {
										var _g1 = haxe_Exception.caught(_g).unwrap();
										__t69(_g1);
									}
								});
							} catch( _g ) {
								var _g1 = haxe_Exception.caught(_g).unwrap();
								__t69(_g1);
							}
						});
					} catch( _g ) {
						var _g1 = haxe_Exception.caught(_g).unwrap();
						__t69(_g1);
					}
				});
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				__t69(_g1);
			}
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g1)));
		}
	});
};
var boisly_gatekeeper_AppConfig = function() { };
$hxClasses["boisly.gatekeeper.AppConfig"] = boisly_gatekeeper_AppConfig;
boisly_gatekeeper_AppConfig.__name__ = true;
var fire_$duck_Config = function() { };
$hxClasses["fire_duck.Config"] = fire_$duck_Config;
fire_$duck_Config.__name__ = true;
fire_$duck_Config.__super__ = boisly_gatekeeper_AppConfig;
fire_$duck_Config.prototype = $extend(boisly_gatekeeper_AppConfig.prototype,{
});
var JetConfig = function() { };
$hxClasses["JetConfig"] = JetConfig;
JetConfig.__name__ = true;
JetConfig.__super__ = fire_$duck_Config;
JetConfig.prototype = $extend(fire_$duck_Config.prototype,{
});
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
};
var HtmlToText = require("html-to-text");
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) if(f(x.next())) {
		return true;
	}
	return false;
};
Lambda.iter = function(it,f) {
	var x = $getIterator(it);
	while(x.hasNext()) f(x.next());
};
Lambda.fold = function(it,f,first) {
	var x = $getIterator(it);
	while(x.hasNext()) first = f(x.next(),first);
	return first;
};
Lambda.find = function(it,f) {
	var v = $getIterator(it);
	while(v.hasNext()) {
		var v1 = v.next();
		if(f(v1)) {
			return v1;
		}
	}
	return null;
};
Math.__name__ = true;
var NodeMailjet = require("node-mailjet");
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = true;
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = true;
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	while(true) {
		s = "0123456789ABCDEF".charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = true;
haxe_io_Input.prototype = {
	readByte: function() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) {
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
		}
	}
};
var asys_io_File = function() { };
$hxClasses["asys.io.File"] = asys_io_File;
asys_io_File.__name__ = true;
asys_io_File.readStream = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	var r = js_node_Fs.createReadStream(path);
	var options = null;
	options = { };
	return tink_io_nodejs_NodejsSource.wrap("asys read stream",r,options.chunkSize,options.onEnd);
};
asys_io_File.writeStream = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return tink_io_nodejs_NodejsSink.wrap("asys write stream",js_node_Fs.createWriteStream(path));
};
var tink_json_BasicParser = function() {
	this.afterParsing = [];
	this.plugins = new tink_core_Annex(this);
};
$hxClasses["tink.json.BasicParser"] = tink_json_BasicParser;
tink_json_BasicParser.__name__ = true;
tink_json_BasicParser.prototype = {
	init: function(source) {
		this.pos = 0;
		this.max = source.length;
		this.source = source;
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
	}
	,parseDynamic: function() {
		var start = this.pos;
		this.skipValue();
		return JSON.parse(this.source.substring(start,this.pos));
	}
	,parseString: function() {
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var e;
		if(this.source.charCodeAt(this.pos) == 34) {
			this.pos += 1;
			e = true;
		} else {
			e = false;
		}
		if(!e) {
			this.die("Expected " + "string");
		}
		return this.parseRestOfString();
	}
	,parseRestOfString: function() {
		return this.slice(this.skipString(),this.pos - 1);
	}
	,skipString: function() {
		var start = this.pos;
		while(true) {
			var _g = this.source.indexOf(tink_json_BasicParser.DBQT,this.pos);
			if(_g == -1) {
				this.die("unterminated string",start);
			} else {
				this.pos = _g + 1;
				var p = this.pos - 2;
				while(this.source.charCodeAt(p) == 92) --p;
				if((p - this.pos & 1) == 0) {
					break;
				}
			}
		}
		return start;
	}
	,parseNumber: function() {
		var char = this.source.charCodeAt(this.pos);
		if(char == 46 || char == 45 || char < 58 && char > 47) {
			return this.doParseNumber();
		} else {
			return this.die("number expected");
		}
	}
	,doParseNumber: function() {
		return this.slice(this.skipNumber(this.source.charCodeAt(this.pos++)),this.pos);
	}
	,invalidNumber: function(start) {
		return this.die("Invalid number " + this.source.substring(start,this.pos),start);
	}
	,skipNumber: function(c) {
		var start = this.pos - 1;
		var minus = c == 45;
		var digit = !minus;
		var zero = c == 48;
		var point = false;
		var e = false;
		var pm = false;
		var end = false;
		while(this.pos < this.max) {
			c = this.source.charCodeAt(this.pos++);
			switch(c) {
			case 43:case 45:
				if(!e || pm) {
					this.invalidNumber(start);
				}
				digit = false;
				pm = true;
				break;
			case 46:
				if(minus || point) {
					this.invalidNumber(start);
				}
				digit = false;
				point = true;
				break;
			case 48:
				if(zero && !point) {
					this.invalidNumber(start);
				}
				if(minus) {
					minus = false;
					zero = true;
				}
				digit = true;
				break;
			case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				if(zero && !point) {
					this.invalidNumber(start);
				}
				if(minus) {
					minus = false;
				}
				digit = true;
				zero = false;
				break;
			case 69:case 101:
				if(minus || zero || e) {
					this.invalidNumber(start);
				}
				digit = false;
				e = true;
				break;
			default:
				if(!digit) {
					this.invalidNumber(start);
				}
				this.pos--;
				end = true;
			}
			if(end) {
				break;
			}
		}
		return start;
	}
	,slice: function(from,to) {
		return this.source.substring(from,to);
	}
	,skipArray: function() {
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 93) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(tmp) {
			return;
		}
		while(true) {
			this.skipValue();
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 44) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				break;
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 93) {
			this.pos += 1;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			this.die("Expected " + "]");
		}
	}
	,skipValue: function() {
		var _g = this.source.charCodeAt(this.pos++);
		switch(_g) {
		case 34:
			this.skipString();
			break;
		case 91:
			this.skipArray();
			break;
		case 102:
			var tmp;
			if(this.source.charCodeAt(this.pos) == 97 && this.source.charCodeAt(this.pos + 1) == 108 && this.source.charCodeAt(this.pos + 2) == 115 && this.source.charCodeAt(this.pos + 3) == 101) {
				this.pos += 4;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "alse");
			}
			break;
		case 110:
			var tmp;
			if(this.source.charCodeAt(this.pos) == 117 && this.source.charCodeAt(this.pos + 1) == 108 && this.source.charCodeAt(this.pos + 2) == 108) {
				this.pos += 3;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "ull");
			}
			break;
		case 116:
			var tmp;
			if(this.source.charCodeAt(this.pos) == 114 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 101) {
				this.pos += 3;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "rue");
			}
			break;
		case 123:
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(tmp) {
				return;
			}
			while(true) {
				if(this.source.charCodeAt(this.pos++) != 34) {
					this.die("expected string",this.pos - 1);
				}
				this.skipString();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp;
				if(this.source.charCodeAt(this.pos) == 58) {
					this.pos += 1;
					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
					tmp = true;
				} else {
					tmp = false;
				}
				if(!tmp) {
					this.die("Expected " + ":");
				}
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp1;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
					tmp1 = true;
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
			break;
		default:
			if(_g == 46 || _g == 45 || _g < 58 && _g > 47) {
				this.skipNumber(_g);
			} else {
				this.invalidChar(_g);
			}
		}
	}
	,invalidChar: function(c) {
		return this.die("invalid char " + StringTools.hex(c,2),this.pos - 1);
	}
	,die: function(s,pos,end) {
		if(end == null) {
			end = -1;
		}
		if(pos == null) {
			pos = -1;
		}
		if(pos == -1) {
			pos = this.pos;
			end = pos;
		} else if(end == -1) {
			end = this.pos;
		}
		if(end <= pos) {
			end = pos + 1;
		}
		var clip = function(s,maxLength,left) {
			if(s.length > maxLength) {
				if(left) {
					return "... " + HxOverrides.substr(s,s.length - maxLength,null);
				} else {
					return HxOverrides.substr(s,0,maxLength) + " ...";
				}
			} else {
				return s;
			}
		};
		var center = pos + end >> 1;
		return tink_core_TypedError.withData(422,s + (" at " + (end > pos + 1 ? "characters " + pos + " - " + end : "character " + pos) + " in " + (clip(this.source.substring(0,pos),20,true) + "  ---->  " + clip(this.source.substring(pos,center),20,false) + clip(this.source.substring(center,end),20,true) + "  <----  " + clip(this.source.substring(end,this.max),20,false))),{ source : this.source, start : pos, end : end},{ fileName : "tink/json/Parser.hx", lineNumber : 472, className : "tink.json.BasicParser", methodName : "die"}).throwSelf();
	}
	,parseBool: function() {
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 116 && this.source.charCodeAt(this.pos + 1) == 114 && this.source.charCodeAt(this.pos + 2) == 117 && this.source.charCodeAt(this.pos + 3) == 101) {
			this.pos += 4;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(tmp) {
			return true;
		} else {
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 102 && this.source.charCodeAt(this.pos + 1) == 97 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 115 && this.source.charCodeAt(this.pos + 4) == 101) {
				this.pos += 5;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(tmp) {
				return false;
			} else {
				return this.die("expected boolean value");
			}
		}
	}
};
var tink_json_Parser0 = function() {
	tink_json_BasicParser.call(this);
};
$hxClasses["tink.json.Parser0"] = tink_json_Parser0;
tink_json_Parser0.__name__ = true;
tink_json_Parser0.__super__ = tink_json_BasicParser;
tink_json_Parser0.prototype = $extend(tink_json_BasicParser.prototype,{
	process0: function() {
		var _gthis = this;
		var cur = 0;
		var v_duckApiUrl = null;
		var hasv_duckApiUrl = false;
		var v_duckJet = null;
		var hasv_duckJet = false;
		var v_fireDuck = null;
		var hasv_fireDuck = false;
		var v_firebase = null;
		var hasv_firebase = false;
		var v_secrets = null;
		var hasv_secrets = false;
		var v_wildDuck = null;
		var hasv_wildDuck = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 100:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 117) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 99) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 107) {
								cur = this.source.charCodeAt(this.pos++);
								switch(cur) {
								case 65:
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 112) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 105) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 85) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 114) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 108) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 34) {
															while(true) {
																var _g1 = this.source.charCodeAt(this.pos++);
																var _hx_tmp1;
																if(_g1 == 58 == true) {
																	break;
																} else {
																	_hx_tmp1 = _g1 < 33;
																	if(_hx_tmp1 != true) {
																		this.die("expected " + ":");
																	}
																}
															}
															while(this.source.charCodeAt(this.pos) < 33) this.pos++;
															var this1 = this.parseString();
															v_duckApiUrl = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
															hasv_duckApiUrl = true;
															while(this.source.charCodeAt(this.pos) < 33) this.pos++;
															var tmp;
															if(this.source.charCodeAt(this.pos) == 44) {
																this.pos += 1;
																tmp = true;
															} else {
																tmp = false;
															}
															if(!tmp) {
																break _hx_loop4;
															} else {
																continue;
															}
														}
													}
												}
											}
										}
									}
									break;
								case 74:
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 101) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 116) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 34) {
												while(true) {
													var _g2 = this.source.charCodeAt(this.pos++);
													var _hx_tmp2;
													if(_g2 == 58 == true) {
														break;
													} else {
														_hx_tmp2 = _g2 < 33;
														if(_hx_tmp2 != true) {
															this.die("expected " + ":");
														}
													}
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												v_duckJet = this.process1();
												hasv_duckJet = true;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var tmp1;
												if(this.source.charCodeAt(this.pos) == 44) {
													this.pos += 1;
													tmp1 = true;
												} else {
													tmp1 = false;
												}
												if(!tmp1) {
													break _hx_loop4;
												} else {
													continue;
												}
											}
										}
									}
									break;
								}
							}
						}
					}
					break;
				case 102:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 105) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 114) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 101) {
								cur = this.source.charCodeAt(this.pos++);
								switch(cur) {
								case 68:
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 117) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 99) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 107) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 34) {
													while(true) {
														var _g3 = this.source.charCodeAt(this.pos++);
														var _hx_tmp3;
														if(_g3 == 58 == true) {
															break;
														} else {
															_hx_tmp3 = _g3 < 33;
															if(_hx_tmp3 != true) {
																this.die("expected " + ":");
															}
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_fireDuck = this.process7();
													hasv_fireDuck = true;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var tmp2;
													if(this.source.charCodeAt(this.pos) == 44) {
														this.pos += 1;
														tmp2 = true;
													} else {
														tmp2 = false;
													}
													if(!tmp2) {
														break _hx_loop4;
													} else {
														continue;
													}
												}
											}
										}
									}
									break;
								case 98:
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 97) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 115) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 101) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 34) {
													while(true) {
														var _g4 = this.source.charCodeAt(this.pos++);
														var _hx_tmp4;
														if(_g4 == 58 == true) {
															break;
														} else {
															_hx_tmp4 = _g4 < 33;
															if(_hx_tmp4 != true) {
																this.die("expected " + ":");
															}
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_firebase = this.process8();
													hasv_firebase = true;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var tmp3;
													if(this.source.charCodeAt(this.pos) == 44) {
														this.pos += 1;
														tmp3 = true;
													} else {
														tmp3 = false;
													}
													if(!tmp3) {
														break _hx_loop4;
													} else {
														continue;
													}
												}
											}
										}
									}
									break;
								}
							}
						}
					}
					break;
				case 115:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 101) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 99) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 114) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 101) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 116) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 115) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 34) {
												while(true) {
													var _g5 = this.source.charCodeAt(this.pos++);
													var _hx_tmp5;
													if(_g5 == 58 == true) {
														break;
													} else {
														_hx_tmp5 = _g5 < 33;
														if(_hx_tmp5 != true) {
															this.die("expected " + ":");
														}
													}
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												v_secrets = this.process9();
												hasv_secrets = true;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var tmp4;
												if(this.source.charCodeAt(this.pos) == 44) {
													this.pos += 1;
													tmp4 = true;
												} else {
													tmp4 = false;
												}
												if(!tmp4) {
													break _hx_loop4;
												} else {
													continue;
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 119:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 105) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 108) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 100) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 68) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 117) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 99) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 107) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 34) {
													while(true) {
														var _g6 = this.source.charCodeAt(this.pos++);
														var _hx_tmp6;
														if(_g6 == 58 == true) {
															break;
														} else {
															_hx_tmp6 = _g6 < 33;
															if(_hx_tmp6 != true) {
																this.die("expected " + ":");
															}
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_wildDuck = this.process11();
													hasv_wildDuck = true;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var tmp5;
													if(this.source.charCodeAt(this.pos) == 44) {
														this.pos += 1;
														tmp5 = true;
													} else {
														tmp5 = false;
													}
													if(!tmp5) {
														break _hx_loop4;
													} else {
														continue;
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g7 = this.source.charCodeAt(this.pos++);
					var _hx_tmp7;
					if(_g7 == 58 == true) {
						break;
					} else {
						_hx_tmp7 = _g7 < 33;
						if(_hx_tmp7 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp6;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp6 = true;
				} else {
					tmp6 = false;
				}
				if(!tmp6) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { duckApiUrl : hasv_duckApiUrl ? v_duckApiUrl : __missing__("duckApiUrl"), duckJet : hasv_duckJet ? v_duckJet : __missing__("duckJet"), fireDuck : hasv_fireDuck ? v_fireDuck : __missing__("fireDuck"), firebase : hasv_firebase ? v_firebase : __missing__("firebase"), secrets : hasv_secrets ? v_secrets : __missing__("secrets"), wildDuck : hasv_wildDuck ? v_wildDuck : __missing__("wildDuck")};
	}
	,process1: function() {
		var _gthis = this;
		var cur = 0;
		var v_dropoff = null;
		var hasv_dropoff = false;
		var v_duck = null;
		var hasv_duck = false;
		var v_htmlToText = null;
		var hasv_htmlToText = false;
		var v_internalDomain = null;
		var hasv_internalDomain = false;
		var v_jet = null;
		var hasv_jet = false;
		var v_messageRetention = null;
		var v_svc = null;
		var hasv_svc = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 100:
					cur = this.source.charCodeAt(this.pos++);
					switch(cur) {
					case 114:
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 111) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 112) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 111) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 102) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 102) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 34) {
												while(true) {
													var _g1 = this.source.charCodeAt(this.pos++);
													var _hx_tmp1;
													if(_g1 == 58 == true) {
														break;
													} else {
														_hx_tmp1 = _g1 < 33;
														if(_hx_tmp1 != true) {
															this.die("expected " + ":");
														}
													}
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												v_dropoff = this.process2();
												hasv_dropoff = true;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var tmp;
												if(this.source.charCodeAt(this.pos) == 44) {
													this.pos += 1;
													tmp = true;
												} else {
													tmp = false;
												}
												if(!tmp) {
													break _hx_loop4;
												} else {
													continue;
												}
											}
										}
									}
								}
							}
						}
						break;
					case 117:
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 99) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 107) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										var _g2 = this.source.charCodeAt(this.pos++);
										var _hx_tmp2;
										if(_g2 == 58 == true) {
											break;
										} else {
											_hx_tmp2 = _g2 < 33;
											if(_hx_tmp2 != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									v_duck = this.process3();
									hasv_duck = true;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var tmp1;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp1 = true;
									} else {
										tmp1 = false;
									}
									if(!tmp1) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
						break;
					}
					break;
				case 104:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 116) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 109) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 108) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 84) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 111) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 84) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 101) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 120) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 116) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 34) {
															while(true) {
																var _g3 = this.source.charCodeAt(this.pos++);
																var _hx_tmp3;
																if(_g3 == 58 == true) {
																	break;
																} else {
																	_hx_tmp3 = _g3 < 33;
																	if(_hx_tmp3 != true) {
																		this.die("expected " + ":");
																	}
																}
															}
															while(this.source.charCodeAt(this.pos) < 33) this.pos++;
															v_htmlToText = this.process4();
															hasv_htmlToText = true;
															while(this.source.charCodeAt(this.pos) < 33) this.pos++;
															var tmp2;
															if(this.source.charCodeAt(this.pos) == 44) {
																this.pos += 1;
																tmp2 = true;
															} else {
																tmp2 = false;
															}
															if(!tmp2) {
																break _hx_loop4;
															} else {
																continue;
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 105:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 110) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 116) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 101) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 114) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 110) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 97) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 108) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 68) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 111) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 109) {
															cur = this.source.charCodeAt(this.pos++);
															if(cur == 97) {
																cur = this.source.charCodeAt(this.pos++);
																if(cur == 105) {
																	cur = this.source.charCodeAt(this.pos++);
																	if(cur == 110) {
																		cur = this.source.charCodeAt(this.pos++);
																		if(cur == 34) {
																			while(true) {
																				var _g4 = this.source.charCodeAt(this.pos++);
																				var _hx_tmp4;
																				if(_g4 == 58 == true) {
																					break;
																				} else {
																					_hx_tmp4 = _g4 < 33;
																					if(_hx_tmp4 != true) {
																						this.die("expected " + ":");
																					}
																				}
																			}
																			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																			var this1 = this.parseString();
																			v_internalDomain = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
																			hasv_internalDomain = true;
																			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																			var tmp3;
																			if(this.source.charCodeAt(this.pos) == 44) {
																				this.pos += 1;
																				tmp3 = true;
																			} else {
																				tmp3 = false;
																			}
																			if(!tmp3) {
																				break _hx_loop4;
																			} else {
																				continue;
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 106:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 101) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 116) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 34) {
								while(true) {
									var _g5 = this.source.charCodeAt(this.pos++);
									var _hx_tmp5;
									if(_g5 == 58 == true) {
										break;
									} else {
										_hx_tmp5 = _g5 < 33;
										if(_hx_tmp5 != true) {
											this.die("expected " + ":");
										}
									}
								}
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								v_jet = this.process5();
								hasv_jet = true;
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								var tmp4;
								if(this.source.charCodeAt(this.pos) == 44) {
									this.pos += 1;
									tmp4 = true;
								} else {
									tmp4 = false;
								}
								if(!tmp4) {
									break _hx_loop4;
								} else {
									continue;
								}
							}
						}
					}
					break;
				case 109:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 101) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 115) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 115) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 97) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 103) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 101) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 82) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 101) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 116) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 101) {
															cur = this.source.charCodeAt(this.pos++);
															if(cur == 110) {
																cur = this.source.charCodeAt(this.pos++);
																if(cur == 116) {
																	cur = this.source.charCodeAt(this.pos++);
																	if(cur == 105) {
																		cur = this.source.charCodeAt(this.pos++);
																		if(cur == 111) {
																			cur = this.source.charCodeAt(this.pos++);
																			if(cur == 110) {
																				cur = this.source.charCodeAt(this.pos++);
																				if(cur == 34) {
																					while(true) {
																						var _g6 = this.source.charCodeAt(this.pos++);
																						var _hx_tmp6;
																						if(_g6 == 58 == true) {
																							break;
																						} else {
																							_hx_tmp6 = _g6 < 33;
																							if(_hx_tmp6 != true) {
																								this.die("expected " + ":");
																							}
																						}
																					}
																					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																					var v_messageRetention1;
																					if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
																						this.pos += 4;
																						while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																						v_messageRetention1 = true;
																					} else {
																						v_messageRetention1 = false;
																					}
																					v_messageRetention = v_messageRetention1 ? null : parseInt(this.parseNumber());
																					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																					var tmp5;
																					if(this.source.charCodeAt(this.pos) == 44) {
																						this.pos += 1;
																						tmp5 = true;
																					} else {
																						tmp5 = false;
																					}
																					if(!tmp5) {
																						break _hx_loop4;
																					} else {
																						continue;
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 115:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 118) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 99) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 34) {
								while(true) {
									var _g7 = this.source.charCodeAt(this.pos++);
									var _hx_tmp7;
									if(_g7 == 58 == true) {
										break;
									} else {
										_hx_tmp7 = _g7 < 33;
										if(_hx_tmp7 != true) {
											this.die("expected " + ":");
										}
									}
								}
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								v_svc = this.process6();
								hasv_svc = true;
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								var tmp6;
								if(this.source.charCodeAt(this.pos) == 44) {
									this.pos += 1;
									tmp6 = true;
								} else {
									tmp6 = false;
								}
								if(!tmp6) {
									break _hx_loop4;
								} else {
									continue;
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g8 = this.source.charCodeAt(this.pos++);
					var _hx_tmp8;
					if(_g8 == 58 == true) {
						break;
					} else {
						_hx_tmp8 = _g8 < 33;
						if(_hx_tmp8 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp7;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp7 = true;
				} else {
					tmp7 = false;
				}
				if(!tmp7) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { dropoff : hasv_dropoff ? v_dropoff : __missing__("dropoff"), duck : hasv_duck ? v_duck : __missing__("duck"), htmlToText : hasv_htmlToText ? v_htmlToText : __missing__("htmlToText"), internalDomain : hasv_internalDomain ? v_internalDomain : __missing__("internalDomain"), jet : hasv_jet ? v_jet : __missing__("jet"), messageRetention : v_messageRetention, svc : hasv_svc ? v_svc : __missing__("svc")};
	}
	,process2: function() {
		var _gthis = this;
		var cur = 0;
		var v_protocol = null;
		var hasv_protocol = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				if(cur == 112) {
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 114) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 111) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 116) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 111) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 99) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 111) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 108) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 34) {
													while(true) {
														var _g1 = this.source.charCodeAt(this.pos++);
														var _hx_tmp1;
														if(_g1 == 58 == true) {
															break;
														} else {
															_hx_tmp1 = _g1 < 33;
															if(_hx_tmp1 != true) {
																this.die("expected " + ":");
															}
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var this1 = this.parseString();
													v_protocol = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
													hasv_protocol = true;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var tmp;
													if(this.source.charCodeAt(this.pos) == 44) {
														this.pos += 1;
														tmp = true;
													} else {
														tmp = false;
													}
													if(!tmp) {
														break;
													} else {
														continue;
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g2 = this.source.charCodeAt(this.pos++);
					var _hx_tmp2;
					if(_g2 == 58 == true) {
						break;
					} else {
						_hx_tmp2 = _g2 < 33;
						if(_hx_tmp2 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp1;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp1 = true;
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { protocol : hasv_protocol ? v_protocol : __missing__("protocol")};
	}
	,process3: function() {
		var _gthis = this;
		var cur = 0;
		var v_lmtp = null;
		var hasv_lmtp = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				if(cur == 108) {
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 109) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 116) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 112) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										var _g1 = this.source.charCodeAt(this.pos++);
										var _hx_tmp1;
										if(_g1 == 58 == true) {
											break;
										} else {
											_hx_tmp1 = _g1 < 33;
											if(_hx_tmp1 != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var this1 = this.parseString();
									v_lmtp = boisly_Secret.ofString(this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\""));
									hasv_lmtp = true;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var tmp;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp = true;
									} else {
										tmp = false;
									}
									if(!tmp) {
										break;
									} else {
										continue;
									}
								}
							}
						}
					}
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g2 = this.source.charCodeAt(this.pos++);
					var _hx_tmp2;
					if(_g2 == 58 == true) {
						break;
					} else {
						_hx_tmp2 = _g2 < 33;
						if(_hx_tmp2 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp1;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp1 = true;
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { lmtp : hasv_lmtp ? v_lmtp : __missing__("lmtp")};
	}
	,process4: function() {
		var _gthis = this;
		var cur = 0;
		var v_options = null;
		var hasv_options = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				if(cur == 111) {
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 112) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 116) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 105) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 111) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 110) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 115) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 34) {
												while(true) {
													var _g1 = this.source.charCodeAt(this.pos++);
													var _hx_tmp1;
													if(_g1 == 58 == true) {
														break;
													} else {
														_hx_tmp1 = _g1 < 33;
														if(_hx_tmp1 != true) {
															this.die("expected " + ":");
														}
													}
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												v_options = this.parseDynamic();
												hasv_options = true;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var tmp;
												if(this.source.charCodeAt(this.pos) == 44) {
													this.pos += 1;
													tmp = true;
												} else {
													tmp = false;
												}
												if(!tmp) {
													break;
												} else {
													continue;
												}
											}
										}
									}
								}
							}
						}
					}
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g2 = this.source.charCodeAt(this.pos++);
					var _hx_tmp2;
					if(_g2 == 58 == true) {
						break;
					} else {
						_hx_tmp2 = _g2 < 33;
						if(_hx_tmp2 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp1;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp1 = true;
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { options : hasv_options ? v_options : __missing__("options")};
	}
	,process5: function() {
		var _gthis = this;
		var cur = 0;
		var v_api = null;
		var hasv_api = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				if(cur == 97) {
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 112) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 105) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 34) {
								while(true) {
									var _g1 = this.source.charCodeAt(this.pos++);
									var _hx_tmp1;
									if(_g1 == 58 == true) {
										break;
									} else {
										_hx_tmp1 = _g1 < 33;
										if(_hx_tmp1 != true) {
											this.die("expected " + ":");
										}
									}
								}
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								var this1 = this.parseString();
								v_api = boisly_Secret.ofString(this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\""));
								hasv_api = true;
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								var tmp;
								if(this.source.charCodeAt(this.pos) == 44) {
									this.pos += 1;
									tmp = true;
								} else {
									tmp = false;
								}
								if(!tmp) {
									break;
								} else {
									continue;
								}
							}
						}
					}
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g2 = this.source.charCodeAt(this.pos++);
					var _hx_tmp2;
					if(_g2 == 58 == true) {
						break;
					} else {
						_hx_tmp2 = _g2 < 33;
						if(_hx_tmp2 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp1;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp1 = true;
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { api : hasv_api ? v_api : __missing__("api")};
	}
	,process6: function() {
		var _gthis = this;
		var cur = 0;
		var v_https = false;
		var hasv_https = false;
		var v_name = null;
		var hasv_name = false;
		var v_port = 0;
		var hasv_port = false;
		var v_url = null;
		var hasv_url = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 104:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 116) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 116) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 112) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 115) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 34) {
										while(true) {
											var _g1 = this.source.charCodeAt(this.pos++);
											var _hx_tmp1;
											if(_g1 == 58 == true) {
												break;
											} else {
												_hx_tmp1 = _g1 < 33;
												if(_hx_tmp1 != true) {
													this.die("expected " + ":");
												}
											}
										}
										while(this.source.charCodeAt(this.pos) < 33) this.pos++;
										v_https = this.parseBool();
										hasv_https = true;
										while(this.source.charCodeAt(this.pos) < 33) this.pos++;
										var tmp;
										if(this.source.charCodeAt(this.pos) == 44) {
											this.pos += 1;
											tmp = true;
										} else {
											tmp = false;
										}
										if(!tmp) {
											break _hx_loop4;
										} else {
											continue;
										}
									}
								}
							}
						}
					}
					break;
				case 110:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 97) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 109) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 101) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										var _g2 = this.source.charCodeAt(this.pos++);
										var _hx_tmp2;
										if(_g2 == 58 == true) {
											break;
										} else {
											_hx_tmp2 = _g2 < 33;
											if(_hx_tmp2 != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var this1 = this.parseString();
									v_name = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
									hasv_name = true;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var tmp1;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp1 = true;
									} else {
										tmp1 = false;
									}
									if(!tmp1) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
					}
					break;
				case 112:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 111) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 114) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 116) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										var _g3 = this.source.charCodeAt(this.pos++);
										var _hx_tmp3;
										if(_g3 == 58 == true) {
											break;
										} else {
											_hx_tmp3 = _g3 < 33;
											if(_hx_tmp3 != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									v_port = parseInt(this.parseNumber());
									hasv_port = true;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var tmp2;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp2 = true;
									} else {
										tmp2 = false;
									}
									if(!tmp2) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
					}
					break;
				case 117:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 114) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 108) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 34) {
								while(true) {
									var _g4 = this.source.charCodeAt(this.pos++);
									var _hx_tmp4;
									if(_g4 == 58 == true) {
										break;
									} else {
										_hx_tmp4 = _g4 < 33;
										if(_hx_tmp4 != true) {
											this.die("expected " + ":");
										}
									}
								}
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								var this2 = this.parseString();
								v_url = this2.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this2 : JSON.parse("\"" + this2 + "\"");
								hasv_url = true;
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								var tmp3;
								if(this.source.charCodeAt(this.pos) == 44) {
									this.pos += 1;
									tmp3 = true;
								} else {
									tmp3 = false;
								}
								if(!tmp3) {
									break _hx_loop4;
								} else {
									continue;
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g5 = this.source.charCodeAt(this.pos++);
					var _hx_tmp5;
					if(_g5 == 58 == true) {
						break;
					} else {
						_hx_tmp5 = _g5 < 33;
						if(_hx_tmp5 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp4;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp4 = true;
				} else {
					tmp4 = false;
				}
				if(!tmp4) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { https : hasv_https ? v_https : __missing__("https"), name : hasv_name ? v_name : __missing__("name"), port : hasv_port ? v_port : __missing__("port"), url : hasv_url ? v_url : __missing__("url")};
	}
	,process7: function() {
		var _gthis = this;
		var cur = 0;
		var v_enableLogging = false;
		var hasv_enableLogging = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				if(cur == 101) {
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 110) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 97) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 98) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 108) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 101) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 76) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 111) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 103) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 103) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 105) {
															cur = this.source.charCodeAt(this.pos++);
															if(cur == 110) {
																cur = this.source.charCodeAt(this.pos++);
																if(cur == 103) {
																	cur = this.source.charCodeAt(this.pos++);
																	if(cur == 34) {
																		while(true) {
																			var _g1 = this.source.charCodeAt(this.pos++);
																			var _hx_tmp1;
																			if(_g1 == 58 == true) {
																				break;
																			} else {
																				_hx_tmp1 = _g1 < 33;
																				if(_hx_tmp1 != true) {
																					this.die("expected " + ":");
																				}
																			}
																		}
																		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																		v_enableLogging = this.parseBool();
																		hasv_enableLogging = true;
																		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																		var tmp;
																		if(this.source.charCodeAt(this.pos) == 44) {
																			this.pos += 1;
																			tmp = true;
																		} else {
																			tmp = false;
																		}
																		if(!tmp) {
																			break;
																		} else {
																			continue;
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g2 = this.source.charCodeAt(this.pos++);
					var _hx_tmp2;
					if(_g2 == 58 == true) {
						break;
					} else {
						_hx_tmp2 = _g2 < 33;
						if(_hx_tmp2 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp1;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp1 = true;
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { enableLogging : hasv_enableLogging ? v_enableLogging : __missing__("enableLogging")};
	}
	,process8: function() {
		var _gthis = this;
		var cur = 0;
		var v_audience = null;
		var hasv_audience = false;
		var v_privateKeyFile = null;
		var hasv_privateKeyFile = false;
		var v_svcAccountEmail = null;
		var hasv_svcAccountEmail = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 97:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 117) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 100) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 105) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 101) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 110) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 99) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 101) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 34) {
													while(true) {
														var _g1 = this.source.charCodeAt(this.pos++);
														var _hx_tmp1;
														if(_g1 == 58 == true) {
															break;
														} else {
															_hx_tmp1 = _g1 < 33;
															if(_hx_tmp1 != true) {
																this.die("expected " + ":");
															}
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var this1 = this.parseString();
													v_audience = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
													hasv_audience = true;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var tmp;
													if(this.source.charCodeAt(this.pos) == 44) {
														this.pos += 1;
														tmp = true;
													} else {
														tmp = false;
													}
													if(!tmp) {
														break _hx_loop4;
													} else {
														continue;
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 112:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 114) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 105) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 118) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 97) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 116) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 101) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 75) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 101) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 121) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 70) {
															cur = this.source.charCodeAt(this.pos++);
															if(cur == 105) {
																cur = this.source.charCodeAt(this.pos++);
																if(cur == 108) {
																	cur = this.source.charCodeAt(this.pos++);
																	if(cur == 101) {
																		cur = this.source.charCodeAt(this.pos++);
																		if(cur == 34) {
																			while(true) {
																				var _g2 = this.source.charCodeAt(this.pos++);
																				var _hx_tmp2;
																				if(_g2 == 58 == true) {
																					break;
																				} else {
																					_hx_tmp2 = _g2 < 33;
																					if(_hx_tmp2 != true) {
																						this.die("expected " + ":");
																					}
																				}
																			}
																			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																			var this2 = this.parseString();
																			v_privateKeyFile = this2.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this2 : JSON.parse("\"" + this2 + "\"");
																			hasv_privateKeyFile = true;
																			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																			var tmp1;
																			if(this.source.charCodeAt(this.pos) == 44) {
																				this.pos += 1;
																				tmp1 = true;
																			} else {
																				tmp1 = false;
																			}
																			if(!tmp1) {
																				break _hx_loop4;
																			} else {
																				continue;
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 115:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 118) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 99) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 65) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 99) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 99) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 111) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 117) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 110) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 116) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 69) {
															cur = this.source.charCodeAt(this.pos++);
															if(cur == 109) {
																cur = this.source.charCodeAt(this.pos++);
																if(cur == 97) {
																	cur = this.source.charCodeAt(this.pos++);
																	if(cur == 105) {
																		cur = this.source.charCodeAt(this.pos++);
																		if(cur == 108) {
																			cur = this.source.charCodeAt(this.pos++);
																			if(cur == 34) {
																				while(true) {
																					var _g3 = this.source.charCodeAt(this.pos++);
																					var _hx_tmp3;
																					if(_g3 == 58 == true) {
																						break;
																					} else {
																						_hx_tmp3 = _g3 < 33;
																						if(_hx_tmp3 != true) {
																							this.die("expected " + ":");
																						}
																					}
																				}
																				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																				var this3 = this.parseString();
																				v_svcAccountEmail = this3.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this3 : JSON.parse("\"" + this3 + "\"");
																				hasv_svcAccountEmail = true;
																				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																				var tmp2;
																				if(this.source.charCodeAt(this.pos) == 44) {
																					this.pos += 1;
																					tmp2 = true;
																				} else {
																					tmp2 = false;
																				}
																				if(!tmp2) {
																					break _hx_loop4;
																				} else {
																					continue;
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g4 = this.source.charCodeAt(this.pos++);
					var _hx_tmp4;
					if(_g4 == 58 == true) {
						break;
					} else {
						_hx_tmp4 = _g4 < 33;
						if(_hx_tmp4 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp3;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp3 = true;
				} else {
					tmp3 = false;
				}
				if(!tmp3) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { audience : hasv_audience ? v_audience : __missing__("audience"), privateKeyFile : hasv_privateKeyFile ? v_privateKeyFile : __missing__("privateKeyFile"), svcAccountEmail : hasv_svcAccountEmail ? v_svcAccountEmail : __missing__("svcAccountEmail")};
	}
	,process9: function() {
		var _gthis = this;
		var cur = 0;
		var v_svc = null;
		var hasv_svc = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				if(cur == 115) {
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 118) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 99) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 34) {
								while(true) {
									var _g1 = this.source.charCodeAt(this.pos++);
									var _hx_tmp1;
									if(_g1 == 58 == true) {
										break;
									} else {
										_hx_tmp1 = _g1 < 33;
										if(_hx_tmp1 != true) {
											this.die("expected " + ":");
										}
									}
								}
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								v_svc = this.process10();
								hasv_svc = true;
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								var tmp;
								if(this.source.charCodeAt(this.pos) == 44) {
									this.pos += 1;
									tmp = true;
								} else {
									tmp = false;
								}
								if(!tmp) {
									break;
								} else {
									continue;
								}
							}
						}
					}
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g2 = this.source.charCodeAt(this.pos++);
					var _hx_tmp2;
					if(_g2 == 58 == true) {
						break;
					} else {
						_hx_tmp2 = _g2 < 33;
						if(_hx_tmp2 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp1;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp1 = true;
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { svc : hasv_svc ? v_svc : __missing__("svc")};
	}
	,process10: function() {
		var _gthis = this;
		var cur = 0;
		var v_clientEmail = null;
		var hasv_clientEmail = false;
		var v_privateKeyFile = null;
		var hasv_privateKeyFile = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 99:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 108) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 105) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 101) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 110) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 116) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 69) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 109) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 97) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 105) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 108) {
															cur = this.source.charCodeAt(this.pos++);
															if(cur == 34) {
																while(true) {
																	var _g1 = this.source.charCodeAt(this.pos++);
																	var _hx_tmp1;
																	if(_g1 == 58 == true) {
																		break;
																	} else {
																		_hx_tmp1 = _g1 < 33;
																		if(_hx_tmp1 != true) {
																			this.die("expected " + ":");
																		}
																	}
																}
																while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																var this1 = this.parseString();
																v_clientEmail = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
																hasv_clientEmail = true;
																while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																var tmp;
																if(this.source.charCodeAt(this.pos) == 44) {
																	this.pos += 1;
																	tmp = true;
																} else {
																	tmp = false;
																}
																if(!tmp) {
																	break _hx_loop4;
																} else {
																	continue;
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 112:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 114) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 105) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 118) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 97) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 116) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 101) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 75) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 101) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 121) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 70) {
															cur = this.source.charCodeAt(this.pos++);
															if(cur == 105) {
																cur = this.source.charCodeAt(this.pos++);
																if(cur == 108) {
																	cur = this.source.charCodeAt(this.pos++);
																	if(cur == 101) {
																		cur = this.source.charCodeAt(this.pos++);
																		if(cur == 34) {
																			while(true) {
																				var _g2 = this.source.charCodeAt(this.pos++);
																				var _hx_tmp2;
																				if(_g2 == 58 == true) {
																					break;
																				} else {
																					_hx_tmp2 = _g2 < 33;
																					if(_hx_tmp2 != true) {
																						this.die("expected " + ":");
																					}
																				}
																			}
																			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																			var this2 = this.parseString();
																			v_privateKeyFile = this2.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this2 : JSON.parse("\"" + this2 + "\"");
																			hasv_privateKeyFile = true;
																			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																			var tmp1;
																			if(this.source.charCodeAt(this.pos) == 44) {
																				this.pos += 1;
																				tmp1 = true;
																			} else {
																				tmp1 = false;
																			}
																			if(!tmp1) {
																				break _hx_loop4;
																			} else {
																				continue;
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g3 = this.source.charCodeAt(this.pos++);
					var _hx_tmp3;
					if(_g3 == 58 == true) {
						break;
					} else {
						_hx_tmp3 = _g3 < 33;
						if(_hx_tmp3 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp2;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp2 = true;
				} else {
					tmp2 = false;
				}
				if(!tmp2) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { clientEmail : hasv_clientEmail ? v_clientEmail : __missing__("clientEmail"), privateKeyFile : hasv_privateKeyFile ? v_privateKeyFile : __missing__("privateKeyFile")};
	}
	,process11: function() {
		var _gthis = this;
		var cur = 0;
		var v_apiKey = null;
		var hasv_apiKey = false;
		var v_domain = null;
		var hasv_domain = false;
		var v_idPrefix = null;
		var hasv_idPrefix = false;
		var v_newUser = null;
		var hasv_newUser = false;
		var v_registrationEnabled = false;
		var hasv_registrationEnabled = false;
		var v_reservedUsernames = null;
		var hasv_reservedUsernames = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 97:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 112) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 105) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 75) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 101) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 121) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 34) {
											while(true) {
												var _g1 = this.source.charCodeAt(this.pos++);
												var _hx_tmp1;
												if(_g1 == 58 == true) {
													break;
												} else {
													_hx_tmp1 = _g1 < 33;
													if(_hx_tmp1 != true) {
														this.die("expected " + ":");
													}
												}
											}
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											var this1 = this.parseString();
											v_apiKey = boisly_Secret.ofString(this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\""));
											hasv_apiKey = true;
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											var tmp;
											if(this.source.charCodeAt(this.pos) == 44) {
												this.pos += 1;
												tmp = true;
											} else {
												tmp = false;
											}
											if(!tmp) {
												break _hx_loop4;
											} else {
												continue;
											}
										}
									}
								}
							}
						}
					}
					break;
				case 100:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 111) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 109) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 97) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 105) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 110) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 34) {
											while(true) {
												var _g2 = this.source.charCodeAt(this.pos++);
												var _hx_tmp2;
												if(_g2 == 58 == true) {
													break;
												} else {
													_hx_tmp2 = _g2 < 33;
													if(_hx_tmp2 != true) {
														this.die("expected " + ":");
													}
												}
											}
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											var this2 = this.parseString();
											v_domain = this2.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this2 : JSON.parse("\"" + this2 + "\"");
											hasv_domain = true;
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											var tmp1;
											if(this.source.charCodeAt(this.pos) == 44) {
												this.pos += 1;
												tmp1 = true;
											} else {
												tmp1 = false;
											}
											if(!tmp1) {
												break _hx_loop4;
											} else {
												continue;
											}
										}
									}
								}
							}
						}
					}
					break;
				case 105:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 100) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 80) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 114) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 101) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 102) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 105) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 120) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 34) {
													while(true) {
														var _g3 = this.source.charCodeAt(this.pos++);
														var _hx_tmp3;
														if(_g3 == 58 == true) {
															break;
														} else {
															_hx_tmp3 = _g3 < 33;
															if(_hx_tmp3 != true) {
																this.die("expected " + ":");
															}
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var this3 = this.parseString();
													v_idPrefix = this3.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this3 : JSON.parse("\"" + this3 + "\"");
													hasv_idPrefix = true;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var tmp2;
													if(this.source.charCodeAt(this.pos) == 44) {
														this.pos += 1;
														tmp2 = true;
													} else {
														tmp2 = false;
													}
													if(!tmp2) {
														break _hx_loop4;
													} else {
														continue;
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 110:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 101) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 119) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 85) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 115) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 101) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 114) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 34) {
												while(true) {
													var _g4 = this.source.charCodeAt(this.pos++);
													var _hx_tmp4;
													if(_g4 == 58 == true) {
														break;
													} else {
														_hx_tmp4 = _g4 < 33;
														if(_hx_tmp4 != true) {
															this.die("expected " + ":");
														}
													}
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												v_newUser = this.process12();
												hasv_newUser = true;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var tmp3;
												if(this.source.charCodeAt(this.pos) == 44) {
													this.pos += 1;
													tmp3 = true;
												} else {
													tmp3 = false;
												}
												if(!tmp3) {
													break _hx_loop4;
												} else {
													continue;
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 114:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 101) {
						cur = this.source.charCodeAt(this.pos++);
						switch(cur) {
						case 103:
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 105) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 115) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 116) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 114) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 97) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 116) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 105) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 111) {
															cur = this.source.charCodeAt(this.pos++);
															if(cur == 110) {
																cur = this.source.charCodeAt(this.pos++);
																if(cur == 69) {
																	cur = this.source.charCodeAt(this.pos++);
																	if(cur == 110) {
																		cur = this.source.charCodeAt(this.pos++);
																		if(cur == 97) {
																			cur = this.source.charCodeAt(this.pos++);
																			if(cur == 98) {
																				cur = this.source.charCodeAt(this.pos++);
																				if(cur == 108) {
																					cur = this.source.charCodeAt(this.pos++);
																					if(cur == 101) {
																						cur = this.source.charCodeAt(this.pos++);
																						if(cur == 100) {
																							cur = this.source.charCodeAt(this.pos++);
																							if(cur == 34) {
																								while(true) {
																									var _g5 = this.source.charCodeAt(this.pos++);
																									var _hx_tmp5;
																									if(_g5 == 58 == true) {
																										break;
																									} else {
																										_hx_tmp5 = _g5 < 33;
																										if(_hx_tmp5 != true) {
																											this.die("expected " + ":");
																										}
																									}
																								}
																								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																								v_registrationEnabled = this.parseBool();
																								hasv_registrationEnabled = true;
																								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																								var tmp4;
																								if(this.source.charCodeAt(this.pos) == 44) {
																									this.pos += 1;
																									tmp4 = true;
																								} else {
																									tmp4 = false;
																								}
																								if(!tmp4) {
																									break _hx_loop4;
																								} else {
																									continue;
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
							break;
						case 115:
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 101) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 114) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 118) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 101) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 100) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 85) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 115) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 101) {
															cur = this.source.charCodeAt(this.pos++);
															if(cur == 114) {
																cur = this.source.charCodeAt(this.pos++);
																if(cur == 110) {
																	cur = this.source.charCodeAt(this.pos++);
																	if(cur == 97) {
																		cur = this.source.charCodeAt(this.pos++);
																		if(cur == 109) {
																			cur = this.source.charCodeAt(this.pos++);
																			if(cur == 101) {
																				cur = this.source.charCodeAt(this.pos++);
																				if(cur == 115) {
																					cur = this.source.charCodeAt(this.pos++);
																					if(cur == 34) {
																						while(true) {
																							var _g6 = this.source.charCodeAt(this.pos++);
																							var _hx_tmp6;
																							if(_g6 == 58 == true) {
																								break;
																							} else {
																								_hx_tmp6 = _g6 < 33;
																								if(_hx_tmp6 != true) {
																									this.die("expected " + ":");
																								}
																							}
																						}
																						while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																						while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																						var v_reservedUsernames1;
																						if(this.source.charCodeAt(this.pos) == 91) {
																							this.pos += 1;
																							while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																							v_reservedUsernames1 = true;
																						} else {
																							v_reservedUsernames1 = false;
																						}
																						if(!v_reservedUsernames1) {
																							this.die("Expected " + "[");
																						}
																						var __ret = [];
																						while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																						var v_reservedUsernames2;
																						if(this.source.charCodeAt(this.pos) == 93) {
																							this.pos += 1;
																							while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																							v_reservedUsernames2 = true;
																						} else {
																							v_reservedUsernames2 = false;
																						}
																						if(!v_reservedUsernames2) {
																							while(true) {
																								var this4 = this.parseString();
																								__ret.push(this4.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this4 : JSON.parse("\"" + this4 + "\""));
																								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																								var v_reservedUsernames3;
																								if(this.source.charCodeAt(this.pos) == 44) {
																									this.pos += 1;
																									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																									v_reservedUsernames3 = true;
																								} else {
																									v_reservedUsernames3 = false;
																								}
																								if(!v_reservedUsernames3) {
																									break;
																								}
																							}
																							while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																							var v_reservedUsernames4;
																							if(this.source.charCodeAt(this.pos) == 93) {
																								this.pos += 1;
																								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																								v_reservedUsernames4 = true;
																							} else {
																								v_reservedUsernames4 = false;
																							}
																							if(!v_reservedUsernames4) {
																								this.die("Expected " + "]");
																							}
																						}
																						v_reservedUsernames = __ret;
																						hasv_reservedUsernames = true;
																						while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																						var tmp5;
																						if(this.source.charCodeAt(this.pos) == 44) {
																							this.pos += 1;
																							tmp5 = true;
																						} else {
																							tmp5 = false;
																						}
																						if(!tmp5) {
																							break _hx_loop4;
																						} else {
																							continue;
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
							break;
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g7 = this.source.charCodeAt(this.pos++);
					var _hx_tmp7;
					if(_g7 == 58 == true) {
						break;
					} else {
						_hx_tmp7 = _g7 < 33;
						if(_hx_tmp7 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp6;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp6 = true;
				} else {
					tmp6 = false;
				}
				if(!tmp6) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { apiKey : hasv_apiKey ? v_apiKey : __missing__("apiKey"), domain : hasv_domain ? v_domain : __missing__("domain"), idPrefix : hasv_idPrefix ? v_idPrefix : __missing__("idPrefix"), newUser : hasv_newUser ? v_newUser : __missing__("newUser"), registrationEnabled : hasv_registrationEnabled ? v_registrationEnabled : __missing__("registrationEnabled"), reservedUsernames : hasv_reservedUsernames ? v_reservedUsernames : __missing__("reservedUsernames")};
	}
	,process12: function() {
		var _gthis = this;
		var cur = 0;
		var v_forwards = 0;
		var hasv_forwards = false;
		var v_quota = 0;
		var hasv_quota = false;
		var v_recipients = 0;
		var hasv_recipients = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 102:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 111) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 114) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 119) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 97) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 114) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 100) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 115) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 34) {
													while(true) {
														var _g1 = this.source.charCodeAt(this.pos++);
														var _hx_tmp1;
														if(_g1 == 58 == true) {
															break;
														} else {
															_hx_tmp1 = _g1 < 33;
															if(_hx_tmp1 != true) {
																this.die("expected " + ":");
															}
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_forwards = parseInt(this.parseNumber());
													hasv_forwards = true;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var tmp;
													if(this.source.charCodeAt(this.pos) == 44) {
														this.pos += 1;
														tmp = true;
													} else {
														tmp = false;
													}
													if(!tmp) {
														break _hx_loop4;
													} else {
														continue;
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 113:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 117) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 111) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 116) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 97) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 34) {
										while(true) {
											var _g2 = this.source.charCodeAt(this.pos++);
											var _hx_tmp2;
											if(_g2 == 58 == true) {
												break;
											} else {
												_hx_tmp2 = _g2 < 33;
												if(_hx_tmp2 != true) {
													this.die("expected " + ":");
												}
											}
										}
										while(this.source.charCodeAt(this.pos) < 33) this.pos++;
										v_quota = parseInt(this.parseNumber());
										hasv_quota = true;
										while(this.source.charCodeAt(this.pos) < 33) this.pos++;
										var tmp1;
										if(this.source.charCodeAt(this.pos) == 44) {
											this.pos += 1;
											tmp1 = true;
										} else {
											tmp1 = false;
										}
										if(!tmp1) {
											break _hx_loop4;
										} else {
											continue;
										}
									}
								}
							}
						}
					}
					break;
				case 114:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 101) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 99) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 105) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 112) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 105) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 101) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 110) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 116) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 115) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 34) {
															while(true) {
																var _g3 = this.source.charCodeAt(this.pos++);
																var _hx_tmp3;
																if(_g3 == 58 == true) {
																	break;
																} else {
																	_hx_tmp3 = _g3 < 33;
																	if(_hx_tmp3 != true) {
																		this.die("expected " + ":");
																	}
																}
															}
															while(this.source.charCodeAt(this.pos) < 33) this.pos++;
															v_recipients = parseInt(this.parseNumber());
															hasv_recipients = true;
															while(this.source.charCodeAt(this.pos) < 33) this.pos++;
															var tmp2;
															if(this.source.charCodeAt(this.pos) == 44) {
																this.pos += 1;
																tmp2 = true;
															} else {
																tmp2 = false;
															}
															if(!tmp2) {
																break _hx_loop4;
															} else {
																continue;
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g4 = this.source.charCodeAt(this.pos++);
					var _hx_tmp4;
					if(_g4 == 58 == true) {
						break;
					} else {
						_hx_tmp4 = _g4 < 33;
						if(_hx_tmp4 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp3;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp3 = true;
				} else {
					tmp3 = false;
				}
				if(!tmp3) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { forwards : hasv_forwards ? v_forwards : __missing__("forwards"), quota : hasv_quota ? v_quota : __missing__("quota"), recipients : hasv_recipients ? v_recipients : __missing__("recipients")};
	}
	,parse: function(source) {
		var _gthis = this;
		if(_gthis.afterParsing.length > 0) {
			_gthis.afterParsing = [];
		}
		this.init(source);
		var obj = this.process0();
		var ret = Object.create($hxClasses["JetConfig"].prototype);
		ret.duckJet = obj.duckJet;
		ret.fireDuck = obj.fireDuck;
		ret.duckApiUrl = obj.duckApiUrl;
		ret.wildDuck = obj.wildDuck;
		ret.firebase = obj.firebase;
		ret.secrets = obj.secrets;
		var ret1 = ret;
		var _g = 0;
		var _g1 = this.afterParsing;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			f();
		}
		if(_gthis.afterParsing.length > 0) {
			_gthis.afterParsing = [];
		}
		return ret1;
	}
});
var tink_core_Annex = function(target) {
	this.target = target;
	this.registry = new haxe_ds_ObjectMap();
};
$hxClasses["tink.core.Annex"] = tink_core_Annex;
tink_core_Annex.__name__ = true;
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = true;
var haxe_ds_ObjectMap = function() {
	this.h = { __keys__ : { }};
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = true;
var js_node_Fs = require("fs");
var tink_core__$Lazy_Computable = function() { };
$hxClasses["tink.core._Lazy.Computable"] = tink_core__$Lazy_Computable;
tink_core__$Lazy_Computable.__name__ = true;
var tink_core__$Lazy_LazyObject = function() { };
$hxClasses["tink.core._Lazy.LazyObject"] = tink_core__$Lazy_LazyObject;
tink_core__$Lazy_LazyObject.__name__ = true;
var tink_core__$Lazy_LazyFunc = function(f,from) {
	this.f = f;
	this.from = from;
};
$hxClasses["tink.core._Lazy.LazyFunc"] = tink_core__$Lazy_LazyFunc;
tink_core__$Lazy_LazyFunc.__name__ = true;
tink_core__$Lazy_LazyFunc.prototype = {
	underlying: function() {
		return this.from;
	}
	,isComputed: function() {
		return this.f == null;
	}
	,get: function() {
		return this.result;
	}
	,compute: function() {
		var _g = this.f;
		if(_g != null) {
			this.f = null;
			var _g1 = this.from;
			if(_g1 != null) {
				var cur = _g1;
				this.from = null;
				var stack = [];
				while(cur != null && !cur.isComputed()) {
					stack.push(cur);
					cur = cur.underlying();
				}
				stack.reverse();
				var _g1 = 0;
				while(_g1 < stack.length) stack[_g1++].compute();
			}
			this.result = _g();
		}
	}
};
var boisly_AppSettings = function() { };
$hxClasses["boisly.AppSettings"] = boisly_AppSettings;
boisly_AppSettings.__name__ = true;
boisly_AppSettings.get_config = function() {
	return tink_core_Lazy.get(boisly_AppSettings._config);
};
boisly_AppSettings.fromFile = function(file) {
	var ret = new tink_json_Parser0().parse(js_node_Fs.readFileSync(file,{ encoding : "utf8"}));
	return ret;
};
var boisly_Gatekeeper = function() { };
$hxClasses["boisly.Gatekeeper"] = boisly_Gatekeeper;
boisly_Gatekeeper.__name__ = true;
boisly_Gatekeeper.get_client = function() {
	if(boisly_Gatekeeper._client == null) {
		boisly_Gatekeeper._client = new google_$cloud_secret_$manager_build_src_v1_index_SecretManagerServiceClient({ credentials : { client_email : boisly_AppSettings.get_config().secrets.svc.clientEmail, private_key : js_node_Fs.readFileSync(boisly_AppSettings.get_config().secrets.svc.privateKeyFile,{ encoding : "utf8"})}});
	}
	return boisly_Gatekeeper._client;
};
var boisly_Secret = {};
boisly_Secret.ofString = function(v) {
	return v;
};
boisly_Secret.reveal = function(this1) {
	return tink_core_Future.ofJsPromise(boisly_Gatekeeper.get_client().accessSecretVersion({ name : this1}).then(function(d) {
		return d[0].payload.data;
	}).then(function(buf) {
		return new tink_chunk_nodejs_BufferChunk(buf);
	}));
};
var duck_$jet_Impl = function(duckCfg,jetCfg) {
	this.dropoffSessions = [];
	this.pending = new haxe_ds_StringMap();
	var options = boisly_AppSettings.get_config().duckJet.htmlToText.options;
	this.plainTextifier = new tink_core__$Lazy_LazyFunc(function() {
		return HtmlToText.compile(options);
	});
	this.duckMailer = new why_email_Nodemailer(duckCfg);
	this.jetMailer = new duck_$jet_mailers_JetMailer(jetCfg);
};
$hxClasses["duck_jet.Impl"] = duck_$jet_Impl;
duck_$jet_Impl.__name__ = true;
duck_$jet_Impl.prototype = {
	send: function(configData,body) {
		var _gthis = this;
		return tink_core_Future.irreversible(function(__return) {
			try {
				var email = new tink_serialize_Decoder0().decode(haxe_crypto_Base64.decode(configData));
				var uuid = "" + js_npm_Uuid.v4();
				tink_io_RealSourceTools.all(body).handle(function(__t89) {
					try {
						var __t89_result;
						var _g = tink_await_OutcomeTools.getOutcome(__t89);
						switch(_g._hx_index) {
						case 0:
							__t89_result = _g.data;
							break;
						case 1:
							__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g.failure)));
							return;
						}
						email.body = __t89_result;
						var __t90 = function(__t91) {
							__return(tink_core_Outcome.Success(__t91));
						};
						if(email.hasAttachments) {
							var __t901 = __t90;
							_gthis.pending.h[uuid] = email;
							haxe_Timer.delay(function() {
								var _this = _gthis.pending;
								if(Object.prototype.hasOwnProperty.call(_this.h,uuid)) {
									delete(_this.h[uuid]);
								}
							},60000 * (boisly_AppSettings.get_config().duckJet.messageRetention != null ? boisly_AppSettings.get_config().duckJet.messageRetention : 10));
							__t901({ result : uuid});
						} else {
							tink_core_Future.map(_gthis.fire(email),tink_core_Outcome.Success).handle(function(__t92) {
								try {
									var _g = tink_await_OutcomeTools.getOutcome(__t92);
									switch(_g._hx_index) {
									case 0:
										break;
									case 1:
										__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g.failure)));
										return;
									}
									__t90({ result : "OK"});
								} catch( _g ) {
									var _g1 = haxe_Exception.caught(_g).unwrap();
									__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g1)));
								}
							});
						}
					} catch( _g ) {
						var _g1 = haxe_Exception.caught(_g).unwrap();
						__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g1)));
					}
				});
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g1)));
			}
		});
	}
	,dropoff: function(ctx) {
		var wsHandler = new tink_http_middleware_WebSocket(($_=duck_$jet_Ws.server,$bind($_,$_.handle))).apply(DuckJet.handler);
		try {
			return wsHandler.process(ctx.request);
		} catch( _g ) {
			throw haxe_Exception.thrown(tink_core_TypedError.withData(null,"dropoff error",haxe_Exception.caught(_g),{ fileName : "src/duck_jet/Api.hx", lineNumber : 107, className : "duck_jet.Impl", methodName : "dropoff"}));
		}
	}
	,dropoffSession: function(client) {
		var _gthis = this;
		client.messageReceived.listen(function(m) {
			var thisSession = Lambda.find(_gthis.dropoffSessions,function(s) {
				return s.client == client;
			});
			if(thisSession == null) {
				var _gthis1 = _gthis;
				if(m._hx_index == 1) {
					var _g = m.b;
					try {
						var binData = new tink_serialize_Decoder1().decode(_g.toBytes());
						var trigger = tink_core_Signal.trigger();
						var tmp = "" + js_npm_Uuid.v4() + ".tmp";
						var directory = _gthis.ensureDirectory("dropoff/" + binData.uuid + "/");
						var sess = { client : client, uuid : binData.uuid, currentFile : null, channel : trigger, attachments : [], directory : directory, tmp : haxe_io_Path.join([directory,tmp])};
						client.closed.handle(function(s) {
							var session = sess;
							if(_gthis1.dropoffSessions.indexOf(session) != -1) {
								HxOverrides.remove(_gthis1.dropoffSessions,session);
								tink_core_Future.map(_gthis1.fire(null,session),tink_core_Outcome.Success).handle(function(__t93) {
									var _g = tink_await_OutcomeTools.getOutcome(__t93);
									switch(_g._hx_index) {
									case 0:
										break;
									case 1:
										throw haxe_Exception.thrown(_g.failure);
									}
									session.client.send(tink_websocket_Message.Binary(tink_chunk_ByteChunk.of(new tink_serialize_Encoder0().encode({ done : true}))));
									session.client.close();
								});
							}
						});
						_gthis.dropoffSessions.push(sess);
					} catch( _g ) {
						var _g1 = haxe_Exception.caught(_g);
						client.close();
						console.log("src/duck_jet/Api.macro.hx:29:",tink_core_TypedError.withData(null,"Invalid transmission data: " + _g1.details(),_g1,{ fileName : "src/duck_jet/Api.macro.hx", lineNumber : 29, className : "duck_jet.Impl", methodName : "initiateSession"}));
					}
				} else {
					throw haxe_Exception.thrown("I know not what you speak of");
				}
			} else if(m._hx_index == 1) {
				var _g = m.b;
				try {
					var binData = new tink_serialize_Decoder2().decode(_g.toBytes());
					if(binData.currentFile != thisSession.currentFile) {
						_gthis.saveAndCreateNew(thisSession,binData.currentFile);
					}
					if(binData.currentFile == duck_$jet_Impl.EOF) {
						var session = thisSession;
						if(_gthis.dropoffSessions.indexOf(session) != -1) {
							HxOverrides.remove(_gthis.dropoffSessions,session);
							tink_core_Future.map(_gthis.fire(null,session),tink_core_Outcome.Success).handle(function(__t93) {
								var _g = tink_await_OutcomeTools.getOutcome(__t93);
								switch(_g._hx_index) {
								case 0:
									break;
								case 1:
									throw haxe_Exception.thrown(_g.failure);
								}
								session.client.send(tink_websocket_Message.Binary(tink_chunk_ByteChunk.of(new tink_serialize_Encoder0().encode({ done : true}))));
								session.client.close();
							});
						}
					}
					var chunk = tink_chunk_ByteChunk.of(binData.chunk);
					thisSession.channel.handlers.invoke(tink_streams_Yield.Data(chunk));
				} catch( _g ) {
					var _g1 = haxe_Exception.caught(_g);
					client.close();
					console.log("src/duck_jet/Api.macro.hx:29:",tink_core_TypedError.withData(null,"Invalid transmission data: " + _g1.details(),_g1,{ fileName : "src/duck_jet/Api.macro.hx", lineNumber : 29, className : "duck_jet.Impl", methodName : "continueSession"}));
				}
			} else {
				throw haxe_Exception.thrown("I know not what you speak of");
			}
		});
	}
	,ensureDirectory: function(dir) {
		return Lambda.fold(dir.split("/"),function(part,cwd) {
			cwd += "" + part + "/";
			if(!sys_FileSystem.exists(cwd)) {
				sys_FileSystem.createDirectory(cwd);
			}
			return cwd;
		},"");
	}
	,saveAndCreateNew: function(session,newFile) {
		if(session.currentFile != null) {
			session.channel.handlers.invoke(tink_streams_Yield.End);
			var src = haxe_io_Path.join([session.directory,session.tmp]);
			var dest = haxe_io_Path.join([session.directory,session.currentFile]);
			js_node_Fs.renameSync(src,dest);
			session.attachments.push(dest);
		}
		session.currentFile = newFile;
		if(session.currentFile != duck_$jet_Impl.EOF) {
			session.tmp = "" + js_npm_Uuid.v4() + ".tmp";
			var writeStream = asys_io_File.writeStream(haxe_io_Path.join([session.directory,session.tmp]));
			tink_core_Future.flatMap(tink_io_Source.pipeTo(new tink_streams_SignalStream(session.channel),writeStream,{ end : true}),function(_) {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
			}).eager();
		}
	}
	,fire: function(mail,session) {
		if(mail == null) {
			if(session != null) {
				mail = this.pending.h[session.uuid];
			} else {
				throw haxe_Exception.thrown("mail config or dropoff session required");
			}
		}
		var config = mail;
		if(session != null) {
			var _this = session.attachments;
			var result = new Array(_this.length);
			var _g = 0;
			var _g1 = _this.length;
			while(_g < _g1) {
				var i = _g++;
				var a = _this[i];
				var fp = new haxe_io_Path(a);
				result[i] = { filename : "" + fp.file + "." + fp.ext, source : why_email_AttachmentSource.Local(a)};
			}
			config.attachments = result;
		}
		var plainTextify = tink_core_Lazy.get(this.plainTextifier);
		config.content = { html : mail.body.toString(), text : plainTextify(mail.body.toString())};
		var mailer = this.getMailer(config);
		var sendReq;
		try {
			sendReq = mailer.send(config);
		} catch( _g ) {
			sendReq = null;
		}
		var f = function(e) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(null));
		};
		return tink_core_Future.flatMap(tink_core_Promise.next(sendReq,function(_) {
			if(session != null) {
				Lambda.iter(session.attachments,sys_FileSystem.deleteFile);
				var path = session.directory;
				if(sys_FileSystem.exists(path)) {
					var _g = 0;
					var _g1 = js_node_Fs.readdirSync(path);
					while(_g < _g1.length) {
						var curPath = path + "/" + _g1[_g++];
						if(sys_FileSystem.isDirectory(curPath)) {
							if(sys_FileSystem.exists(curPath)) {
								var _g2 = 0;
								var _g3 = js_node_Fs.readdirSync(curPath);
								while(_g2 < _g3.length) {
									var curPath1 = curPath + "/" + _g3[_g2++];
									if(sys_FileSystem.isDirectory(curPath1)) {
										if(sys_FileSystem.exists(curPath1)) {
											var _g4 = 0;
											var _g5 = js_node_Fs.readdirSync(curPath1);
											while(_g4 < _g5.length) {
												var curPath2 = curPath1 + "/" + _g5[_g4++];
												if(sys_FileSystem.isDirectory(curPath2)) {
													if(sys_FileSystem.exists(curPath2)) {
														var _g6 = 0;
														var _g7 = js_node_Fs.readdirSync(curPath2);
														while(_g6 < _g7.length) {
															var curPath3 = curPath2 + "/" + _g7[_g6++];
															if(sys_FileSystem.isDirectory(curPath3)) {
																sys_FileSystem.deleteDirectory(curPath3);
															} else {
																js_node_Fs.unlinkSync(curPath3);
															}
														}
														js_node_Fs.rmdirSync(curPath2);
													}
												} else {
													js_node_Fs.unlinkSync(curPath2);
												}
											}
											js_node_Fs.rmdirSync(curPath1);
										}
									} else {
										js_node_Fs.unlinkSync(curPath1);
									}
								}
								js_node_Fs.rmdirSync(curPath);
							}
						} else {
							js_node_Fs.unlinkSync(curPath);
						}
					}
					js_node_Fs.rmdirSync(path);
				}
			}
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
		}),function(o) {
			switch(o._hx_index) {
			case 0:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(o.data));
			case 1:
				return f(o.failure);
			}
		});
	}
	,getMailer: function(config) {
		var recipients = config.to;
		if(config.cc != null) {
			recipients = recipients.concat(config.cc);
		}
		if(config.bcc != null) {
			recipients = recipients.concat(config.bcc);
		}
		if(!Lambda.exists(recipients,function(r) {
			return r.address.toLowerCase() != boisly_AppSettings.get_config().duckJet.internalDomain.toLowerCase();
		})) {
			console.log("src/duck_jet/Api.hx:259:","duckmail");
			return this.duckMailer;
		} else {
			return this.jetMailer;
		}
	}
};
var why_Email = function() { };
$hxClasses["why.Email"] = why_Email;
why_Email.__name__ = true;
var why_email_EmailBase = function() { };
$hxClasses["why.email.EmailBase"] = why_email_EmailBase;
why_email_EmailBase.__name__ = true;
why_email_EmailBase.prototype = {
	send: function(config) {
		var tmp;
		var tmp1;
		var this1 = config.to;
		if(this1 == null || this1.length == 0) {
			var this1 = config.bcc;
			tmp1 = this1 == null || this1.length == 0;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			var this1 = config.cc;
			tmp = this1 == null || this1.length == 0;
		} else {
			tmp = false;
		}
		if(tmp) {
			return tink_core_Promise.NOISE;
		} else {
			return this.doSend(config);
		}
	}
};
var tink_websocket_Server = function() { };
$hxClasses["tink.websocket.Server"] = tink_websocket_Server;
tink_websocket_Server.__name__ = true;
var tink_websocket_servers_TinkServer = function() {
	this.clients = [];
	this.clientConnected = this.connectedTrigger = tink_core_Signal.trigger();
	this.errors = this.errorsTrigger = tink_core_Signal.trigger();
};
$hxClasses["tink.websocket.servers.TinkServer"] = tink_websocket_servers_TinkServer;
tink_websocket_servers_TinkServer.__name__ = true;
tink_websocket_servers_TinkServer.prototype = {
	handle: function(i) {
		var _gthis = this;
		var client = new tink_websocket_servers_TinkConnectedClient(i.clientIp,i.header,i.stream);
		this.clients.push(client);
		client.closed.handle(function() {
			HxOverrides.remove(_gthis.clients,client);
		});
		this.connectedTrigger.handlers.invoke(client);
		client.listen();
		return client.outgoing;
	}
};
var tink_core_Signal = {};
tink_core_Signal.nextTime = function(this1,condition) {
	return tink_core_Signal.pickNext(this1,function(v) {
		if(condition == null || condition(v)) {
			return haxe_ds_Option.Some(v);
		} else {
			return haxe_ds_Option.None;
		}
	});
};
tink_core_Signal.pickNext = function(this1,selector) {
	var ret = new tink_core_FutureTrigger();
	var link = null;
	link = this1.listen(function(v) {
		var _g = selector(v);
		switch(_g._hx_index) {
		case 0:
			ret.trigger(_g.v);
			break;
		case 1:
			break;
		}
	});
	ret.handle(link == null ? tink_core_CallbackLink.noop : ($_=link,$bind($_,$_.cancel)));
	return ret;
};
tink_core_Signal.trigger = function() {
	return new tink_core_SignalTrigger();
};
var tink_core_Disposable = function() { };
$hxClasses["tink.core.Disposable"] = tink_core_Disposable;
tink_core_Disposable.__name__ = true;
var tink_core_OwnedDisposable = function() { };
$hxClasses["tink.core.OwnedDisposable"] = tink_core_OwnedDisposable;
tink_core_OwnedDisposable.__name__ = true;
var tink_core__$Signal_SignalObject = function() { };
$hxClasses["tink.core._Signal.SignalObject"] = tink_core__$Signal_SignalObject;
tink_core__$Signal_SignalObject.__name__ = true;
var tink_core_SignalTrigger = function() {
	this.handlers = new tink_core_CallbackList();
};
$hxClasses["tink.core.SignalTrigger"] = tink_core_SignalTrigger;
tink_core_SignalTrigger.__name__ = true;
tink_core_SignalTrigger.prototype = {
	listen: function(cb) {
		var _this = this.handlers;
		if(_this.disposeHandlers == null) {
			return null;
		} else {
			var node = new tink_core__$Callback_ListCell(cb,_this);
			_this.cells.push(node);
			if(_this.used++ == 0) {
				var fn = _this.onfill;
				if(tink_core_Callback.depth < 500) {
					tink_core_Callback.depth++;
					fn();
					tink_core_Callback.depth--;
				} else {
					tink_core_Callback.defer(fn);
				}
			}
			return node;
		}
	}
};
var duck_$jet_Ws = function() { };
$hxClasses["duck_jet.Ws"] = duck_$jet_Ws;
duck_$jet_Ws.__name__ = true;
var duck_$jet_mailers_JetMailer = function(cfg) {
	this.impl = NodeMailjet.connect(cfg.apiKey,cfg.apiSecret,cfg.options);
};
$hxClasses["duck_jet.mailers.JetMailer"] = duck_$jet_mailers_JetMailer;
duck_$jet_mailers_JetMailer.__name__ = true;
duck_$jet_mailers_JetMailer.__super__ = why_email_EmailBase;
duck_$jet_mailers_JetMailer.prototype = $extend(why_email_EmailBase.prototype,{
	doSend: function(config) {
		var _gthis = this;
		return tink_core_Promise.noise(tink_core_Future.irreversible(function(__return) {
			try {
				var p;
				if(config.attachments == null) {
					p = null;
				} else {
					var _this = config.attachments;
					var f = $bind(_gthis,_gthis.mkAttachment);
					var result = new Array(_this.length);
					var _g = 0;
					var _g1 = _this.length;
					while(_g < _g1) {
						var i = _g++;
						result[i] = f(_this[i]);
					}
					p = tink_core_Promise.inParallel(result);
				}
				p.handle(function(__t87) {
					try {
						var __t87_result;
						var _g = tink_await_OutcomeTools.getOutcome(__t87);
						switch(_g._hx_index) {
						case 0:
							__t87_result = _g.data;
							break;
						case 1:
							__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g.failure)));
							return;
						}
						var promise = _gthis.impl.post("send",{ version : "v3.1"});
						var promise1 = { Name : config.from.name, Email : config.from.address};
						var _this = config.to;
						var f = $bind(_gthis,_gthis.mkAddressList);
						var result = new Array(_this.length);
						var _g = 0;
						var _g1 = _this.length;
						while(_g < _g1) {
							var i = _g++;
							result[i] = f(_this[i]);
						}
						var promise2;
						if(config.cc != null) {
							var _this = config.cc;
							var f = $bind(_gthis,_gthis.mkAddressList);
							var result1 = new Array(_this.length);
							var _g = 0;
							var _g1 = _this.length;
							while(_g < _g1) {
								var i = _g++;
								result1[i] = f(_this[i]);
							}
							promise2 = result1;
						} else {
							promise2 = null;
						}
						var promise3;
						if(config.bcc != null) {
							var _this = config.bcc;
							var f = $bind(_gthis,_gthis.mkAddressList);
							var result1 = new Array(_this.length);
							var _g = 0;
							var _g1 = _this.length;
							while(_g < _g1) {
								var i = _g++;
								result1[i] = f(_this[i]);
							}
							promise3 = result1;
						} else {
							promise3 = null;
						}
						tink_core_Future.ofJsPromise(promise.request({ Messages : [{ From : promise1, To : result, Cc : promise2, Bcc : promise3, HtmlPart : config.content.html, Subject : config.subject, Attachments : __t87_result}]})).handle(function(__t86) {
							try {
								var __t86_result;
								var _g = tink_await_OutcomeTools.getOutcome(__t86);
								switch(_g._hx_index) {
								case 0:
									__t86_result = _g.data;
									break;
								case 1:
									__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g.failure)));
									return;
								}
								__return(tink_core_Outcome.Success(__t86_result));
								return;
							} catch( _g ) {
								var _g1 = haxe_Exception.caught(_g).unwrap();
								__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g1)));
							}
						});
					} catch( _g ) {
						var _g1 = haxe_Exception.caught(_g).unwrap();
						__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g1)));
					}
				});
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g1)));
			}
		}));
	}
	,mkAddressList: function(whyAddress) {
		if(whyAddress == null) {
			return null;
		} else {
			return { Name : whyAddress.name, Email : whyAddress.address};
		}
	}
	,mkAttachment: function(whyAttachment) {
		return tink_core_Future.irreversible(function(__return) {
			try {
				var _g = whyAttachment.source;
				var p;
				switch(_g._hx_index) {
				case 0:
					p = asys_io_File.readStream(_g.path);
					break;
				case 1:
					p = _g.source;
					break;
				}
				tink_io_RealSourceTools.all(p).handle(function(__t88) {
					try {
						var __t88_result;
						var _g = tink_await_OutcomeTools.getOutcome(__t88);
						switch(_g._hx_index) {
						case 0:
							__t88_result = _g.data;
							break;
						case 1:
							__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g.failure)));
							return;
						}
						__return(tink_core_Outcome.Success({ Filename : whyAttachment.filename, ContentType : mime_Mime.lookup(whyAttachment.filename), Base64Content : haxe_crypto_Base64.encode(__t88_result.toBytes())}));
						return;
					} catch( _g ) {
						var _g1 = haxe_Exception.caught(_g).unwrap();
						__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g1)));
					}
				});
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				__return(tink_core_Outcome.Failure(tink_core_TypedError.asError(_g1)));
			}
		});
	}
});
var tink_core__$Future_FutureObject = function() { };
$hxClasses["tink.core._Future.FutureObject"] = tink_core__$Future_FutureObject;
tink_core__$Future_FutureObject.__name__ = true;
var tink_core__$Future_NeverFuture = function() {
};
$hxClasses["tink.core._Future.NeverFuture"] = tink_core__$Future_NeverFuture;
tink_core__$Future_NeverFuture.__name__ = true;
tink_core__$Future_NeverFuture.prototype = {
	getStatus: function() {
		return tink_core_FutureStatus.NeverEver;
	}
	,handle: function(callback) {
		return null;
	}
	,eager: function() {
	}
};
var tink_core__$Lazy_LazyConst = function(value) {
	this.value = value;
};
$hxClasses["tink.core._Lazy.LazyConst"] = tink_core__$Lazy_LazyConst;
tink_core__$Lazy_LazyConst.__name__ = true;
tink_core__$Lazy_LazyConst.prototype = {
	isComputed: function() {
		return true;
	}
	,get: function() {
		return this.value;
	}
	,compute: function() {
	}
	,underlying: function() {
		return null;
	}
};
var tink_core__$Future_SyncFuture = function(value) {
	this.value = value;
};
$hxClasses["tink.core._Future.SyncFuture"] = tink_core__$Future_SyncFuture;
tink_core__$Future_SyncFuture.__name__ = true;
tink_core__$Future_SyncFuture.prototype = {
	getStatus: function() {
		return tink_core_FutureStatus.Ready(this.value);
	}
	,handle: function(cb) {
		tink_core_Callback.invoke(cb,tink_core_Lazy.get(this.value));
		return null;
	}
	,eager: function() {
		if(!this.value.isComputed()) {
			tink_core_Lazy.get(this.value);
		}
	}
};
var tink_core_Future = {};
tink_core_Future.first = function(this1,that) {
	var _g = this1;
	switch(_g.getStatus()._hx_index) {
	case 3:
		switch(that.getStatus()._hx_index) {
		case 3:
			return _g;
		case 4:
			return _g;
		default:
			return _g;
		}
		break;
	case 4:
		return that;
	default:
		switch(that.getStatus()._hx_index) {
		case 3:
			return that;
		case 4:
			return _g;
		default:
			return new tink_core__$Future_SuspendableFuture(function(fire) {
				return new tink_core__$Callback_LinkPair(this1.handle(fire),that.handle(fire));
			});
		}
	}
};
tink_core_Future.map = function(this1,f,gather) {
	var _g = this1.getStatus();
	switch(_g._hx_index) {
	case 3:
		var this2 = _g.result;
		var f1 = f;
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyFunc(function() {
			return f1(this2.get());
		},this2));
	case 4:
		return tink_core_Future.NEVER;
	default:
		return new tink_core__$Future_SuspendableFuture(function(fire) {
			return this1.handle(function(v) {
				fire(f(v));
			});
		});
	}
};
tink_core_Future.flatMap = function(this1,next,gather) {
	var _g = this1.getStatus();
	switch(_g._hx_index) {
	case 3:
		var l = _g.result;
		return new tink_core__$Future_SuspendableFuture(function(fire) {
			return next(tink_core_Lazy.get(l)).handle(function(v) {
				fire(v);
			});
		});
	case 4:
		return tink_core_Future.NEVER;
	default:
		return new tink_core__$Future_SuspendableFuture(function($yield) {
			var inner = new tink_core_CallbackLinkRef();
			return new tink_core__$Callback_LinkPair(this1.handle(function(v) {
				var outer = next(v).handle($yield);
				inner.link = outer;
			}),inner);
		});
	}
};
tink_core_Future.ofJsPromise = function(promise) {
	return tink_core_Future.irreversible(function(cb) {
		promise.then(function(a) {
			var _g = cb;
			var a1 = tink_core_Outcome.Success(a);
			tink_core_Callback.defer(function() {
				_g(a1);
			});
		},function(e) {
			cb(tink_core_Outcome.Failure(tink_core_TypedError.withData(null,e.message,e,{ fileName : "tink/core/Future.hx", lineNumber : 158, className : "tink.core._Future.Future_Impl_", methodName : "ofJsPromise"})));
		});
	});
};
tink_core_Future.processMany = function(a,concurrency,fn,lift) {
	if(a.length == 0) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(lift(tink_core_Outcome.Success([]))));
	} else {
		return new tink_core__$Future_SuspendableFuture(function($yield) {
			var links = [];
			var _g = [];
			var _g1 = 0;
			while(_g1 < a.length) {
				++_g1;
				_g.push(null);
			}
			var ret = _g;
			var index = 0;
			var pending = 0;
			var done = false;
			var concurrency1;
			if(concurrency == null) {
				concurrency1 = a.length;
			} else {
				var v = concurrency;
				concurrency1 = v < 1 ? 1 : v > a.length ? a.length : v;
			}
			var fireWhenReady = function() {
				if(index == ret.length) {
					if(pending == 0) {
						var v = lift(tink_core_Outcome.Success(ret));
						done = true;
						$yield(v);
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			};
			var step = null;
			step = function() {
				if(!done && !fireWhenReady()) {
					while(index < ret.length) {
						index += 1;
						var index1 = [index - 1];
						var p = a[index1[0]];
						var check = [(function(index) {
							return function(o) {
								var _g = fn(o);
								switch(_g._hx_index) {
								case 0:
									ret[index[0]] = _g.data;
									fireWhenReady();
									break;
								case 1:
									var _g1 = _g.failure;
									var _g = 0;
									while(_g < links.length) {
										var l = links[_g];
										++_g;
										if(l != null) {
											l.cancel();
										}
									}
									var v = lift(tink_core_Outcome.Failure(_g1));
									done = true;
									$yield(v);
									break;
								}
							};
						})(index1)];
						var _g = p.getStatus();
						if(_g._hx_index == 3) {
							var _hx_tmp;
							_hx_tmp = tink_core_Lazy.get(_g.result);
							check[0](_hx_tmp);
							if(!done) {
								continue;
							}
						} else {
							pending += 1;
							links.push(p.handle((function(check) {
								return function(o) {
									pending -= 1;
									check[0](o);
									if(!done) {
										step();
									}
								};
							})(check)));
						}
						break;
					}
				}
			};
			var _g = 0;
			var _g1 = concurrency1;
			while(_g < _g1) {
				++_g;
				step();
			}
			return tink_core_CallbackLink.fromMany(links);
		});
	}
};
tink_core_Future.async = function(init,lazy) {
	if(lazy == null) {
		lazy = false;
	}
	var ret = tink_core_Future.irreversible(init);
	if(lazy) {
		return ret;
	} else {
		ret.eager();
		return ret;
	}
};
tink_core_Future.irreversible = function(init) {
	return new tink_core__$Future_SuspendableFuture(function($yield) {
		init($yield);
		return null;
	});
};
var tink_core_Outcome = $hxEnums["tink.core.Outcome"] = { __ename__:true,__constructs__:null
	,Success: ($_=function(data) { return {_hx_index:0,data:data,__enum__:"tink.core.Outcome",toString:$estr}; },$_._hx_name="Success",$_.__params__ = ["data"],$_)
	,Failure: ($_=function(failure) { return {_hx_index:1,failure:failure,__enum__:"tink.core.Outcome",toString:$estr}; },$_._hx_name="Failure",$_.__params__ = ["failure"],$_)
};
tink_core_Outcome.__constructs__ = [tink_core_Outcome.Success,tink_core_Outcome.Failure];
var tink_core_Promise = {};
tink_core_Promise.noise = function(this1) {
	if(this1.getStatus()._hx_index == 4) {
		return tink_core_Promise.NEVER;
	} else {
		return tink_core_Promise.next(this1,function(v) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
		});
	}
};
tink_core_Promise.next = function(this1,f,gather) {
	return tink_core_Future.flatMap(this1,function(o) {
		switch(o._hx_index) {
		case 0:
			return f(o.data);
		case 1:
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(o.failure)));
		}
	});
};
tink_core_Promise.inParallel = function(a,concurrency) {
	return tink_core_Promise.many(a,concurrency);
};
tink_core_Promise.many = function(a,concurrency) {
	return tink_core_Future.processMany(a,concurrency,function(o) {
		return o;
	},function(o) {
		return o;
	});
};
var tink_core_Lazy = {};
tink_core_Lazy.get = function(this1) {
	this1.compute();
	return this1.get();
};
var tink_core__$Future_SuspendableFuture = function(wakeup) {
	this.status = tink_core_FutureStatus.Suspended;
	var _gthis = this;
	this.wakeup = wakeup;
	this.callbacks = new tink_core_CallbackList(true);
	this.callbacks.ondrain = function() {
		if(_gthis.status == tink_core_FutureStatus.Awaited) {
			_gthis.status = tink_core_FutureStatus.Suspended;
			var this1 = _gthis.link;
			if(this1 != null) {
				this1.cancel();
			}
			_gthis.link = null;
		}
	};
	this.callbacks.onfill = function() {
		if(_gthis.status == tink_core_FutureStatus.Suspended) {
			_gthis.status = tink_core_FutureStatus.Awaited;
			_gthis.arm();
		}
	};
};
$hxClasses["tink.core._Future.SuspendableFuture"] = tink_core__$Future_SuspendableFuture;
tink_core__$Future_SuspendableFuture.__name__ = true;
tink_core__$Future_SuspendableFuture.prototype = {
	getStatus: function() {
		return this.status;
	}
	,trigger: function(value) {
		if(this.status._hx_index != 3) {
			this.status = tink_core_FutureStatus.Ready(new tink_core__$Lazy_LazyConst(value));
			var link = this.link;
			this.link = null;
			this.wakeup = null;
			this.callbacks.invoke(value);
			if(link != null) {
				link.cancel();
			}
		}
	}
	,handle: function(callback) {
		var _g = this.status;
		if(_g._hx_index == 3) {
			tink_core_Callback.invoke(callback,tink_core_Lazy.get(_g.result));
			return null;
		} else {
			var _this = this.callbacks;
			if(_this.disposeHandlers == null) {
				return null;
			} else {
				var node = new tink_core__$Callback_ListCell(callback,_this);
				_this.cells.push(node);
				if(_this.used++ == 0) {
					var fn = _this.onfill;
					if(tink_core_Callback.depth < 500) {
						tink_core_Callback.depth++;
						fn();
						tink_core_Callback.depth--;
					} else {
						tink_core_Callback.defer(fn);
					}
				}
				return node;
			}
		}
	}
	,arm: function() {
		var _gthis = this;
		this.link = this.wakeup(function(x) {
			_gthis.trigger(x);
		});
	}
	,eager: function() {
		switch(this.status._hx_index) {
		case 0:
			this.status = tink_core_FutureStatus.EagerlyAwaited;
			this.arm();
			break;
		case 1:
			this.status = tink_core_FutureStatus.EagerlyAwaited;
			break;
		default:
		}
	}
};
var tink_core_SimpleDisposable = function(dispose) {
	this.disposeHandlers = [];
	this.f = dispose;
};
$hxClasses["tink.core.SimpleDisposable"] = tink_core_SimpleDisposable;
tink_core_SimpleDisposable.__name__ = true;
tink_core_SimpleDisposable.noop = function() {
};
tink_core_SimpleDisposable.prototype = {
	dispose: function() {
		var _g = this.disposeHandlers;
		if(_g != null) {
			this.disposeHandlers = null;
			var f = this.f;
			this.f = tink_core_SimpleDisposable.noop;
			f();
			var _g1 = 0;
			while(_g1 < _g.length) _g[_g1++]();
		}
	}
};
var tink_core_CallbackList = function(destructive) {
	if(destructive == null) {
		destructive = false;
	}
	this.onfill = function() {
	};
	this.ondrain = function() {
	};
	this.busy = false;
	this.queue = [];
	this.used = 0;
	var _gthis = this;
	tink_core_SimpleDisposable.call(this,function() {
		if(!_gthis.busy) {
			_gthis.destroy();
		}
	});
	this.destructive = destructive;
	this.cells = [];
};
$hxClasses["tink.core.CallbackList"] = tink_core_CallbackList;
tink_core_CallbackList.__name__ = true;
tink_core_CallbackList.__super__ = tink_core_SimpleDisposable;
tink_core_CallbackList.prototype = $extend(tink_core_SimpleDisposable.prototype,{
	destroy: function() {
		var _g = 0;
		var _g1 = this.cells;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.cb = null;
			c.list = null;
		}
		this.queue = null;
		this.cells = null;
		if(this.used > 0) {
			this.used = 0;
			var fn = this.ondrain;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		}
	}
	,invoke: function(data) {
		var _gthis = this;
		if(tink_core_Callback.depth < 500) {
			tink_core_Callback.depth++;
			if(_gthis.disposeHandlers != null) {
				if(_gthis.busy) {
					if(_gthis.destructive != true) {
						var _g = $bind(_gthis,_gthis.invoke);
						var data1 = data;
						var tmp = function() {
							_g(data1);
						};
						_gthis.queue.push(tmp);
					}
				} else {
					_gthis.busy = true;
					if(_gthis.destructive) {
						_gthis.dispose();
					}
					var length = _gthis.cells.length;
					var _g1 = 0;
					while(_g1 < length) {
						var _this = _gthis.cells[_g1++];
						if(_this.list != null) {
							_this.cb(data);
						}
					}
					_gthis.busy = false;
					if(_gthis.disposeHandlers == null) {
						_gthis.destroy();
					} else {
						if(_gthis.used < _gthis.cells.length) {
							_gthis.compact();
						}
						if(_gthis.queue.length > 0) {
							(_gthis.queue.shift())();
						}
					}
				}
			}
			tink_core_Callback.depth--;
		} else {
			tink_core_Callback.defer(function() {
				if(_gthis.disposeHandlers != null) {
					if(_gthis.busy) {
						if(_gthis.destructive != true) {
							var _g = $bind(_gthis,_gthis.invoke);
							var data1 = data;
							var tmp = function() {
								_g(data1);
							};
							_gthis.queue.push(tmp);
						}
					} else {
						_gthis.busy = true;
						if(_gthis.destructive) {
							_gthis.dispose();
						}
						var length = _gthis.cells.length;
						var _g1 = 0;
						while(_g1 < length) {
							var _this = _gthis.cells[_g1++];
							if(_this.list != null) {
								_this.cb(data);
							}
						}
						_gthis.busy = false;
						if(_gthis.disposeHandlers == null) {
							_gthis.destroy();
						} else {
							if(_gthis.used < _gthis.cells.length) {
								_gthis.compact();
							}
							if(_gthis.queue.length > 0) {
								(_gthis.queue.shift())();
							}
						}
					}
				}
			});
		}
	}
	,compact: function() {
		if(this.busy) {
			return;
		} else if(this.used == 0) {
			this.resize(0);
			var fn = this.ondrain;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		} else {
			var compacted = 0;
			var _g = 0;
			var _g1 = this.cells.length;
			while(_g < _g1) {
				var i = _g++;
				var _g2 = this.cells[i];
				if(_g2.cb != null) {
					if(compacted != i) {
						this.cells[compacted] = _g2;
					}
					if(++compacted == this.used) {
						break;
					}
				}
			}
			this.resize(this.used);
		}
	}
	,resize: function(length) {
		this.cells.length = length;
	}
});
var tink_core_FutureStatus = $hxEnums["tink.core.FutureStatus"] = { __ename__:true,__constructs__:null
	,Suspended: {_hx_name:"Suspended",_hx_index:0,__enum__:"tink.core.FutureStatus",toString:$estr}
	,Awaited: {_hx_name:"Awaited",_hx_index:1,__enum__:"tink.core.FutureStatus",toString:$estr}
	,EagerlyAwaited: {_hx_name:"EagerlyAwaited",_hx_index:2,__enum__:"tink.core.FutureStatus",toString:$estr}
	,Ready: ($_=function(result) { return {_hx_index:3,result:result,__enum__:"tink.core.FutureStatus",toString:$estr}; },$_._hx_name="Ready",$_.__params__ = ["result"],$_)
	,NeverEver: {_hx_name:"NeverEver",_hx_index:4,__enum__:"tink.core.FutureStatus",toString:$estr}
};
tink_core_FutureStatus.__constructs__ = [tink_core_FutureStatus.Suspended,tink_core_FutureStatus.Awaited,tink_core_FutureStatus.EagerlyAwaited,tink_core_FutureStatus.Ready,tink_core_FutureStatus.NeverEver];
var tink_core_LinkObject = function() { };
$hxClasses["tink.core.LinkObject"] = tink_core_LinkObject;
tink_core_LinkObject.__name__ = true;
var tink_core_CallbackLinkRef = function() {
};
$hxClasses["tink.core.CallbackLinkRef"] = tink_core_CallbackLinkRef;
tink_core_CallbackLinkRef.__name__ = true;
tink_core_CallbackLinkRef.prototype = {
	cancel: function() {
		var this1 = this.link;
		if(this1 != null) {
			this1.cancel();
		}
	}
};
var tink_core__$Callback_LinkPair = function(a,b) {
	this.dissolved = false;
	this.a = a;
	this.b = b;
};
$hxClasses["tink.core._Callback.LinkPair"] = tink_core__$Callback_LinkPair;
tink_core__$Callback_LinkPair.__name__ = true;
tink_core__$Callback_LinkPair.prototype = {
	cancel: function() {
		if(!this.dissolved) {
			this.dissolved = true;
			var this1 = this.a;
			if(this1 != null) {
				this1.cancel();
			}
			var this1 = this.b;
			if(this1 != null) {
				this1.cancel();
			}
			this.a = null;
			this.b = null;
		}
	}
};
var google_$cloud_secret_$manager_build_src_v1_index_SecretManagerServiceClient = require("@google-cloud/secret-manager/build/src/v1/index").SecretManagerServiceClient;
var tink_chunk_ChunkObject = function() { };
$hxClasses["tink.chunk.ChunkObject"] = tink_chunk_ChunkObject;
tink_chunk_ChunkObject.__name__ = true;
var tink_chunk_nodejs_BufferChunk = function(buffer) {
	this.buffer = buffer;
};
$hxClasses["tink.chunk.nodejs.BufferChunk"] = tink_chunk_nodejs_BufferChunk;
tink_chunk_nodejs_BufferChunk.__name__ = true;
tink_chunk_nodejs_BufferChunk.prototype = {
	getCursor: function() {
		return tink_chunk_ByteChunk.of(this.toBytes()).getCursor();
	}
	,flatten: function(into) {
		tink_chunk_ByteChunk.of(this.toBytes()).flatten(into);
	}
	,getLength: function() {
		return this.buffer.length;
	}
	,slice: function(from,to) {
		if(to > this.getLength()) {
			to = this.getLength();
		}
		if(from < 0) {
			from = 0;
		}
		if(to <= from) {
			return tink_Chunk.EMPTY;
		} else if(to == this.getLength() && from == 0) {
			return this;
		} else {
			return new tink_chunk_nodejs_BufferChunk(this.buffer.slice(from,to));
		}
	}
	,toString: function() {
		return this.buffer.toString();
	}
	,toBytes: function() {
		var copy = js_node_buffer_Buffer.allocUnsafe(this.buffer.length);
		this.buffer.copy(copy);
		return js_node_buffer__$Buffer_Helper.bytesOfBuffer(copy);
	}
	,blitTo: function(target,offset) {
		var data = target.b;
		this.buffer.copy(js_node_buffer_Buffer.from(data.buffer,data.byteOffset,target.length),offset);
	}
};
var tink_core_Callback = {};
tink_core_Callback.invoke = function(this1,data) {
	if(tink_core_Callback.depth < 500) {
		tink_core_Callback.depth++;
		this1(data);
		tink_core_Callback.depth--;
	} else {
		tink_core_Callback.defer(function() {
			this1(data);
		});
	}
};
tink_core_Callback.defer = function(f) {
	process.nextTick(f);
};
var tink_core_TypedError = function(code,message,pos) {
	if(code == null) {
		code = 500;
	}
	this.isTinkError = true;
	this.code = code;
	this.message = message;
	this.pos = pos;
	this.exceptionStack = [];
	this.callStack = [];
};
$hxClasses["tink.core.TypedError"] = tink_core_TypedError;
tink_core_TypedError.__name__ = true;
tink_core_TypedError.withData = function(code,message,data,pos) {
	return tink_core_TypedError.typed(code,message,data,pos);
};
tink_core_TypedError.typed = function(code,message,data,pos) {
	var ret = new tink_core_TypedError(code,message,pos);
	ret.data = data;
	return ret;
};
tink_core_TypedError.asError = function(v) {
	if(v != null && v.isTinkError) {
		return v;
	} else {
		return null;
	}
};
tink_core_TypedError.prototype = {
	printPos: function() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	,toString: function() {
		var ret = "Error#" + this.code + ": " + this.message;
		if(this.pos != null) {
			ret += " @ " + this.printPos();
		}
		return ret;
	}
	,throwSelf: function() {
		throw haxe_Exception.thrown(this);
	}
};
var tink_core_NamedWith = function(name,value) {
	this.name = name;
	this.value = value;
};
$hxClasses["tink.core.NamedWith"] = tink_core_NamedWith;
tink_core_NamedWith.__name__ = true;
var tink_http_HeaderField = function(name,value) {
	tink_core_NamedWith.call(this,name,value);
};
$hxClasses["tink.http.HeaderField"] = tink_http_HeaderField;
tink_http_HeaderField.__name__ = true;
tink_http_HeaderField.__super__ = tink_core_NamedWith;
tink_http_HeaderField.prototype = $extend(tink_core_NamedWith.prototype,{
	toString: function() {
		if(this.value == null) {
			return this.name;
		} else {
			return "" + this.name + ": " + this.value;
		}
	}
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var tink_http_HeaderValue = {};
tink_http_HeaderValue.parse = function(this1) {
	return tink_http_HeaderValue.parseWith(this1,function(_,params) {
		var _g = new haxe_ds_StringMap();
		while(params.hasNext()) {
			var p = params.next();
			var key = p.name;
			var _g1 = tink_url_Portion.toString(p.value);
			_g.h[key] = HxOverrides.cca(_g1,0) == 34 ? HxOverrides.substr(_g1,1,_g1.length - 2) : _g1;
		}
		return _g;
	});
};
tink_http_HeaderValue.parseWith = function(this1,parseExtension) {
	var _g = [];
	var _g1 = 0;
	var _g2 = this1.split(",");
	while(_g1 < _g2.length) {
		var v = _g2[_g1];
		++_g1;
		v = StringTools.trim(v);
		var _g3 = v.indexOf(";");
		var i = _g3 == -1 ? v.length : _g3;
		var value = HxOverrides.substr(v,0,i);
		var pos = i + 1;
		if(pos == null) {
			pos = 0;
		}
		_g.push({ value : value, extensions : parseExtension(value,new tink_url__$Query_QueryStringParser(v,";","=",pos))});
	}
	return _g;
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.prototype = {
	blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var code1 = (c & 31) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var u = (c & 15) << 18 | (b[i++] & 127) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_crypto_Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe_crypto_Base64;
haxe_crypto_Base64.__name__ = true;
haxe_crypto_Base64.encode = function(bytes,complement) {
	if(complement == null) {
		complement = true;
	}
	var str = new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).encodeBytes(bytes).toString();
	if(complement) {
		switch(bytes.length % 3) {
		case 1:
			str += "==";
			break;
		case 2:
			str += "=";
			break;
		default:
		}
	}
	return str;
};
haxe_crypto_Base64.decode = function(str,complement) {
	if(complement == null) {
		complement = true;
	}
	if(complement) {
		while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	}
	return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
};
var haxe_crypto_BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) ++nbits;
	if(nbits > 8 || len != 1 << nbits) {
		throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
	}
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe_crypto_BaseCode;
haxe_crypto_BaseCode.__name__ = true;
haxe_crypto_BaseCode.prototype = {
	encodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		var size = b.length * 8 / nbits | 0;
		var out = new haxe_io_Bytes(new ArrayBuffer(size + (b.length * 8 % nbits == 0 ? 0 : 1)));
		var buf = 0;
		var curbits = 0;
		var mask = (1 << nbits) - 1;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < nbits) {
				curbits += 8;
				buf <<= 8;
				buf |= b.b[pin++];
			}
			curbits -= nbits;
			out.b[pout++] = base.b[buf >> curbits & mask];
		}
		if(curbits > 0) {
			out.b[pout++] = base.b[buf << nbits - curbits & mask];
		}
		return out;
	}
	,initTable: function() {
		var tbl = [];
		var _g = 0;
		while(_g < 256) tbl[_g++] = -1;
		var _g = 0;
		var _g1 = this.base.length;
		while(_g < _g1) {
			var i = _g++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		if(this.tbl == null) {
			this.initTable();
		}
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = new haxe_io_Bytes(new ArrayBuffer(size));
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
};
var tink_url_Path = {};
tink_url_Path.parts = function(this1) {
	var _g = [];
	var _g1 = 0;
	var _g2 = this1.split("/");
	while(_g1 < _g2.length) {
		var p = _g2[_g1];
		++_g1;
		if(p != "") {
			_g.push(p);
		}
	}
	return _g;
};
tink_url_Path.ofString = function(s) {
	return tink_url_Path.normalize(s);
};
tink_url_Path.normalize = function(s) {
	s = StringTools.trim(StringTools.replace(s,"\\","/"));
	if(s == ".") {
		return "./";
	}
	var isDir = StringTools.endsWith(s,"/..") || StringTools.endsWith(s,"/") || StringTools.endsWith(s,"/.");
	var parts = [];
	var isAbsolute = StringTools.startsWith(s,"/");
	var up = 0;
	var _g = 0;
	var _g1 = s.split("/");
	while(_g < _g1.length) {
		var _g2 = StringTools.trim(_g1[_g++]);
		switch(_g2) {
		case "":
			break;
		case ".":
			break;
		case "..":
			if(parts.pop() == null) {
				++up;
			}
			break;
		default:
			parts.push(_g2);
		}
	}
	if(isAbsolute) {
		parts.unshift("");
	} else {
		var _g = 0;
		var _g1 = up;
		while(_g < _g1) {
			++_g;
			parts.unshift("..");
		}
	}
	if(isDir) {
		parts.push("");
	}
	return parts.join("/");
};
var tink_url__$Query_QueryStringParser = function(s,sep,set,pos) {
	this.s = s == null ? "" : s;
	this.sep = sep;
	this.set = set;
	this.pos = pos;
};
$hxClasses["tink.url._Query.QueryStringParser"] = tink_url__$Query_QueryStringParser;
tink_url__$Query_QueryStringParser.__name__ = true;
tink_url__$Query_QueryStringParser.trimmedSub = function(s,start,end) {
	if(start >= s.length) {
		return "";
	}
	while(s.charCodeAt(start) < 33) ++start;
	if(end < s.length - 1) {
		while(s.charCodeAt(end - 1) < 33) --end;
	}
	return s.substring(start,end);
};
tink_url__$Query_QueryStringParser.prototype = {
	hasNext: function() {
		return this.pos < this.s.length;
	}
	,next: function() {
		var next = this.s.indexOf(this.sep,this.pos);
		if(next == -1) {
			next = this.s.length;
		}
		var split = this.s.indexOf(this.set,this.pos);
		var start = this.pos;
		this.pos = next + this.sep.length;
		if(split == -1 || split > next) {
			return new tink_core_NamedWith(tink_url_Portion.toString(tink_url__$Query_QueryStringParser.trimmedSub(this.s,start,next)),tink_url_Portion.ofString(""));
		} else {
			return new tink_core_NamedWith(tink_url_Portion.toString(tink_url__$Query_QueryStringParser.trimmedSub(this.s,start,split)),tink_url__$Query_QueryStringParser.trimmedSub(this.s,split + this.set.length,next));
		}
	}
};
var tink_url_Portion = {};
tink_url_Portion.stringly = function(this1) {
	return tink_url_Portion.toString(this1);
};
tink_url_Portion.toString = function(this1) {
	if(this1 == null) {
		return null;
	} else {
		try {
			return decodeURIComponent(this1.split("+").join(" "));
		} catch( _g ) {
			return "";
		}
	}
};
tink_url_Portion.ofString = function(s) {
	return s == null ? "" : encodeURIComponent(s);
};
var tink_Url = {};
tink_Url.fromString = function(s) {
	return tink_Url.parse(s);
};
tink_Url.noop = function(_) {
};
tink_Url.parse = function(s,onError) {
	while(true) {
		if(s == null) {
			s = "";
			onError = null;
			continue;
		}
		if(onError == null) {
			onError = tink_Url.noop;
		}
		s = StringTools.trim(s);
		if(StringTools.startsWith(s,"data:")) {
			return { scheme : "data", payload : HxOverrides.substr(s,5,null), hosts : []};
		}
		var FORMAT = new EReg("^(([a-zA-Z][a-zA-Z0-9\\-+.]*):)?((//(([^@/]+)@)?([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?)$","");
		var HOST = new EReg("^(\\[(.*)\\]|([^:]*))(:(.*))?$","");
		FORMAT.match(s);
		var hosts;
		var _g = FORMAT.matched(7);
		if(_g == null) {
			hosts = [];
		} else {
			var _g1 = [];
			var _g2 = 0;
			var _g3 = _g.split(",");
			while(_g2 < _g3.length) {
				var host = _g3[_g2];
				++_g2;
				HOST.match(host);
				var host1;
				var _g4 = HOST.matched(3);
				var _g5 = HOST.matched(2);
				if(_g5 == null) {
					host1 = _g4;
				} else if(_g4 == null) {
					host1 = "[" + _g5 + "]";
				} else {
					onError("invalid host " + host);
					host1 = null;
				}
				var port;
				var _g6 = HOST.matched(5);
				if(_g6 == null) {
					port = null;
				} else {
					var _g7 = Std.parseInt(_g6);
					if(_g7 == null) {
						onError("invalid port " + _g6);
						port = null;
					} else {
						port = _g7;
					}
				}
				_g1.push(tink_url_Host._new(host1,port));
			}
			hosts = _g1;
		}
		var path = FORMAT.matched(8);
		if(hosts.length > 0 && path.charAt(0) != "/") {
			path = "/" + path;
		}
		return { scheme : FORMAT.matched(2), payload : FORMAT.matched(3), hosts : hosts, auth : FORMAT.matched(6), path : tink_url_Path.ofString(path), query : FORMAT.matched(10), hash : FORMAT.matched(12)};
	}
};
var tink_url_Host = {};
tink_url_Host._new = function(name,port) {
	var this1;
	if(port == null) {
		this1 = name;
	} else if(port > 65535 || port <= 0) {
		throw haxe_Exception.thrown("Invalid port");
	} else {
		this1 = "" + name + ":" + port;
	}
	return this1;
};
tink_url_Host.get_name = function(this1) {
	if(this1 == null) {
		return null;
	} else {
		var _g = this1.split("]");
		switch(_g.length) {
		case 1:
			return _g[0].split(":")[0];
		case 2:
			return _g[0] + "]";
		default:
			throw haxe_Exception.thrown("assert");
		}
	}
};
tink_url_Host.get_port = function(this1) {
	if(this1 == null) {
		return null;
	} else {
		var _g = this1.split("]");
		switch(_g.length) {
		case 1:
			var _g1 = _g[0].split(":")[1];
			if(_g1 == null) {
				return null;
			} else {
				return Std.parseInt(_g1);
			}
			break;
		case 2:
			var _g1 = _g[1].split(":")[1];
			if(_g1 == null) {
				return null;
			} else {
				return Std.parseInt(_g1);
			}
			break;
		default:
			throw haxe_Exception.thrown("assert");
		}
	}
};
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:true,__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
var haxe_CallStack = {};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	var _g1 = stack;
	while(_g < _g1.length) {
		var s = _g1[_g++];
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.subtract = function(this1,stack) {
	var startIndex = -1;
	var i = -1;
	while(++i < this1.length) {
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) if(haxe_CallStack.equalItems(this1[i],stack[_g++])) {
			if(startIndex < 0) {
				startIndex = i;
			}
			++i;
			if(i >= this1.length) {
				break;
			}
		} else {
			startIndex = -1;
		}
		if(startIndex >= 0) {
			break;
		}
	}
	if(startIndex >= 0) {
		return this1.slice(0,startIndex);
	} else {
		return this1;
	}
};
haxe_CallStack.equalItems = function(item1,item2) {
	if(item1 == null) {
		if(item2 == null) {
			return true;
		} else {
			return false;
		}
	} else {
		switch(item1._hx_index) {
		case 0:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 0) {
				return true;
			} else {
				return false;
			}
			break;
		case 1:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 1) {
				return item1.m == item2.m;
			} else {
				return false;
			}
			break;
		case 2:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 2) {
				if(item1.file == item2.file && item1.line == item2.line && item1.column == item2.column) {
					return haxe_CallStack.equalItems(item1.s,item2.s);
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 3:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 3) {
				if(item1.classname == item2.classname) {
					return item1.method == item2.method;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 4:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 4) {
				return item1.v == item2.v;
			} else {
				return false;
			}
			break;
		}
	}
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s._hx_index) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var _g = s.m;
		b.b = (b.b += "module ") + (_g == null ? "null" : "" + _g);
		break;
	case 2:
		var _g = s.s;
		var _g1 = s.file;
		var _g2 = s.line;
		var _g3 = s.column;
		if(_g != null) {
			haxe_CallStack.itemToString(b,_g);
			b.b += " (";
		}
		b.b = (b.b += _g1 == null ? "null" : "" + _g1) + " line ";
		b.b += _g2 == null ? "null" : "" + _g2;
		if(_g3 != null) {
			b.b = (b.b += " column ") + (_g3 == null ? "null" : "" + _g3);
		}
		if(_g != null) {
			b.b += ")";
		}
		break;
	case 3:
		var _g = s.classname;
		var _g1 = s.method;
		b.b = (b.b += Std.string(_g == null ? "<unknown>" : _g)) + ".";
		b.b += _g1 == null ? "null" : "" + _g1;
		break;
	case 4:
		var _g = s.v;
		b.b = (b.b += "local function #") + (_g == null ? "null" : "" + _g);
		break;
	}
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
	this.__skipStack = 0;
	var old = Error.prepareStackTrace;
	Error.prepareStackTrace = function(e) { return e.stack; }
	if(((native) instanceof Error)) {
		this.stack = native.stack;
	} else {
		var e = null;
		if(Error.captureStackTrace) {
			Error.captureStackTrace(this,haxe_Exception);
			e = this;
		} else {
			e = new Error();
			if(typeof(e.stack) == "undefined") {
				try { throw e; } catch(_) {}
				this.__skipStack++;
			}
		}
		this.stack = e.stack;
	}
	Error.prepareStackTrace = old;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		e.__skipStack++;
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,details: function() {
		if(this.get_previous() == null) {
			var tmp = "Exception: " + this.toString();
			var tmp1 = this.get_stack();
			return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
		} else {
			var result = "";
			var e = this;
			var prev = null;
			while(e != null) {
				if(prev == null) {
					var result1 = "Exception: " + e.get_message();
					var tmp = e.get_stack();
					result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
				} else {
					var prevStack = haxe_CallStack.subtract(e.get_stack(),prev.get_stack());
					result = "Exception: " + e.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
				}
				prev = e;
				e = e.get_previous();
			}
			return result;
		}
	}
	,__shiftStack: function() {
		this.__skipStack++;
	}
	,get_message: function() {
		return this.message;
	}
	,get_previous: function() {
		return this.__previousException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,get_stack: function() {
		var _g = this.__exceptionStack;
		if(_g == null) {
			var value = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.normalize(this.stack),this.__skipStack);
			this.setProperty("__exceptionStack",value);
			return value;
		} else {
			return _g;
		}
	}
	,setProperty: function(name,value) {
		try {
			Object.defineProperty(this,name,{ value : value});
		} catch( _g ) {
			this[name] = value;
		}
	}
});
var haxe_NativeStackTrace = function() { };
$hxClasses["haxe.NativeStackTrace"] = haxe_NativeStackTrace;
haxe_NativeStackTrace.__name__ = true;
haxe_NativeStackTrace.toHaxe = function(s,skip) {
	if(skip == null) {
		skip = 0;
	}
	if(s == null) {
		return [];
	} else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") {
			stack.shift();
		}
		var m = [];
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var i = _g++;
			if(skip > i) {
				continue;
			}
			var line = stack[i];
			var matched = line.match(/^    at ([A-Za-z0-9_. ]+) \(([^)]+):([0-9]+):([0-9]+)\)$/);
			if(matched != null) {
				var path = matched[1].split(".");
				if(path[0] == "$hxClasses") {
					path.shift();
				}
				var meth = path.pop();
				var file = matched[2];
				var line1 = Std.parseInt(matched[3]);
				var column = Std.parseInt(matched[4]);
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function" ? haxe_StackItem.LocalFunction() : meth == "Global code" ? null : haxe_StackItem.Method(path.join("."),meth),file,line1,column));
			} else {
				m.push(haxe_StackItem.Module(StringTools.trim(line)));
			}
		}
		return m;
	} else if(skip > 0 && Array.isArray(s)) {
		return s.slice(skip);
	} else {
		return s;
	}
};
haxe_NativeStackTrace.normalize = function(stack,skipItems) {
	if(skipItems == null) {
		skipItems = 0;
	}
	if(Array.isArray(stack) && skipItems > 0) {
		return stack.slice(skipItems);
	} else if(typeof(stack) == "string") {
		switch(stack.substring(0,6)) {
		case "Error\n":case "Error:":
			++skipItems;
			break;
		default:
		}
		return haxe_NativeStackTrace.skipLines(stack,skipItems);
	} else {
		return stack;
	}
};
haxe_NativeStackTrace.skipLines = function(stack,skip,pos) {
	if(pos == null) {
		pos = 0;
	}
	while(true) if(skip > 0) {
		pos = stack.indexOf("\n",pos);
		if(pos < 0) {
			return "";
		} else {
			skip = --skip;
			pos += 1;
			continue;
		}
	} else {
		return stack.substring(pos);
	}
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
	this.__skipStack++;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
});
var haxe_crypto_Sha1 = function() {
};
$hxClasses["haxe.crypto.Sha1"] = haxe_crypto_Sha1;
haxe_crypto_Sha1.__name__ = true;
haxe_crypto_Sha1.make = function(b) {
	var h = new haxe_crypto_Sha1().doEncode(haxe_crypto_Sha1.bytes2blks(b));
	var out = new haxe_io_Bytes(new ArrayBuffer(20));
	out.b[0] = h[0] >>> 24;
	out.b[1] = h[0] >> 16 & 255;
	out.b[2] = h[0] >> 8 & 255;
	out.b[3] = h[0] & 255;
	out.b[4] = h[1] >>> 24;
	out.b[5] = h[1] >> 16 & 255;
	out.b[6] = h[1] >> 8 & 255;
	out.b[7] = h[1] & 255;
	out.b[8] = h[2] >>> 24;
	out.b[9] = h[2] >> 16 & 255;
	out.b[10] = h[2] >> 8 & 255;
	out.b[11] = h[2] & 255;
	out.b[12] = h[3] >>> 24;
	out.b[13] = h[3] >> 16 & 255;
	out.b[14] = h[3] >> 8 & 255;
	out.b[15] = h[3] & 255;
	out.b[16] = h[4] >>> 24;
	out.b[17] = h[4] >> 16 & 255;
	out.b[18] = h[4] >> 8 & 255;
	out.b[19] = h[4] & 255;
	return out;
};
haxe_crypto_Sha1.bytes2blks = function(b) {
	var nblk = (b.length + 8 >> 6) + 1;
	var blks = [];
	var _g = 0;
	var _g1 = nblk * 16;
	while(_g < _g1) blks[_g++] = 0;
	var _g = 0;
	var _g1 = b.length;
	while(_g < _g1) {
		var i = _g++;
		blks[i >> 2] |= b.b[i] << 24 - ((i & 3) << 3);
	}
	var i = b.length;
	blks[i >> 2] |= 128 << 24 - ((i & 3) << 3);
	blks[nblk * 16 - 1] = b.length * 8;
	return blks;
};
haxe_crypto_Sha1.prototype = {
	doEncode: function(x) {
		var w = [];
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var e = -1009589776;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			var olde = e;
			var j = 0;
			while(j < 80) {
				if(j < 16) {
					w[j] = x[i + j];
				} else {
					var num = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
					w[j] = num << 1 | num >>> 31;
				}
				var t = (a << 5 | a >>> 27) + this.ft(j,b,c,d) + e + w[j];
				e = d;
				d = c;
				c = b << 30 | b >>> 2;
				b = a;
				a = t + this.kt(j);
				++j;
			}
			a += olda;
			b += oldb;
			c += oldc;
			d += oldd;
			e += olde;
			i += 16;
		}
		return [a,b,c,d,e];
	}
	,ft: function(t,b,c,d) {
		if(t < 20) {
			return b & c | ~b & d;
		}
		if(t < 40) {
			return b ^ c ^ d;
		}
		if(t < 60) {
			return b & c | b & d | c & d;
		}
		return b ^ c ^ d;
	}
	,kt: function(t) {
		if(t < 20) {
			return 1518500249;
		}
		if(t < 40) {
			return 1859775393;
		}
		if(t < 60) {
			return -1894007588;
		}
		return -899497514;
	}
};
var haxe_ds_Option = $hxEnums["haxe.ds.Option"] = { __ename__:true,__constructs__:null
	,Some: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe.ds.Option",toString:$estr}; },$_._hx_name="Some",$_.__params__ = ["v"],$_)
	,None: {_hx_name:"None",_hx_index:1,__enum__:"haxe.ds.Option",toString:$estr}
};
haxe_ds_Option.__constructs__ = [haxe_ds_Option.Some,haxe_ds_Option.None];
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = true;
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
$hxClasses["haxe.ds._StringMap.StringMapKeyIterator"] = haxe_ds__$StringMap_StringMapKeyIterator;
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = true;
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.PosException"] = haxe_exceptions_PosException;
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe_exceptions_NotImplementedException;
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
});
var haxe_io_BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = true;
haxe_io_BytesBuffer.prototype = {
	addByte: function(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		this.u8.set(new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len),this.pos);
		this.pos += len;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		var b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) {
		pos = 0;
	}
	if(len == null) {
		len = b.length - pos;
	}
	if(pos < 0 || len < 0 || pos + len > b.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe_io_BytesInput;
haxe_io_BytesInput.__name__ = true;
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	set_position: function(p) {
		if(p < 0) {
			p = 0;
		} else if(p > this.totlen) {
			p = this.totlen;
		}
		this.len = this.totlen - p;
		return this.pos = p;
	}
	,readByte: function() {
		if(this.len == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.len--;
		return this.b[this.pos++];
	}
});
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else {
		this.dir = null;
	}
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = true;
haxe_io_Path.join = function(paths) {
	var _g = [];
	var _g1 = 0;
	while(_g1 < paths.length) {
		var v = paths[_g1];
		++_g1;
		if(v != null && v != "") {
			_g.push(v);
		}
	}
	if(_g.length == 0) {
		return "";
	}
	var path = _g[0];
	var _g1 = 1;
	var _g2 = _g.length;
	while(_g1 < _g2) {
		path = haxe_io_Path.addTrailingSlash(path);
		path += _g[_g1++];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join(slash);
	if(path == slash) {
		return slash;
	}
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") {
			target.pop();
		} else if(token == "") {
			if(target.length > 0 || HxOverrides.cca(path,0) == 47) {
				target.push(token);
			}
		} else if(token != ".") {
			target.push(token);
		}
	}
	var acc_b = "";
	var colon = false;
	var slashes = false;
	var _g2_offset = 0;
	var _g2_s = target.join(slash);
	while(_g2_offset < _g2_s.length) {
		var s = _g2_s;
		var index = _g2_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g2_offset;
		}
		var c2 = c1;
		switch(c2) {
		case 47:
			if(!colon) {
				slashes = true;
			} else {
				var i = c2;
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				acc_b += String.fromCodePoint(i);
			}
			break;
		case 58:
			acc_b += ":";
			colon = true;
			break;
		default:
			var i1 = c2;
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			acc_b += String.fromCodePoint(i1);
		}
	}
	return acc_b;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) {
		return "/";
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) {
			return path + "\\";
		} else {
			return path;
		}
	} else if(c1 != path.length - 1) {
		return path + "/";
	} else {
		return path;
	}
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var httpstatus_HttpStatusMessage = {};
httpstatus_HttpStatusMessage.fromCode = function(statusCode) {
	switch(statusCode) {
	case 100:
		return "Continue";
	case 101:
		return "Switching Protocols";
	case 102:
		return "Processing";
	case 200:
		return "OK";
	case 201:
		return "Created";
	case 202:
		return "Accepted";
	case 203:
		return "Non-Authoritative Information";
	case 204:
		return "No Content";
	case 205:
		return "Reset Content";
	case 206:
		return "Partial Content";
	case 207:
		return "Multi-Status";
	case 208:
		return "Already Reported";
	case 226:
		return "IM Used";
	case 300:
		return "Multiple Choices";
	case 301:
		return "Moved Permanently";
	case 302:
		return "Found";
	case 303:
		return "See Other";
	case 304:
		return "Not Modified";
	case 305:
		return "Use Proxy";
	case 306:
		return "Switch Proxy";
	case 307:
		return "Temporary Redirect";
	case 308:
		return "Permanent Redirect";
	case 400:
		return "Bad Request";
	case 401:
		return "Unauthorized";
	case 402:
		return "Payment Required";
	case 403:
		return "Forbidden";
	case 404:
		return "Not Found";
	case 405:
		return "Method Not Allowed";
	case 406:
		return "Not Acceptable";
	case 407:
		return "Proxy Authentication Required";
	case 408:
		return "Request Timeout";
	case 409:
		return "Conflict";
	case 410:
		return "Gone";
	case 411:
		return "Length Required";
	case 412:
		return "Precondition Failed";
	case 413:
		return "Payload Too Large";
	case 414:
		return "URI Too Long";
	case 415:
		return "Unsupported Media Type";
	case 416:
		return "Range Not Satisfiable";
	case 417:
		return "Expectation Failed";
	case 418:
		return "I'm a teapot";
	case 421:
		return "Misdirected Request";
	case 422:
		return "Unprocessable Entity";
	case 423:
		return "Locked";
	case 424:
		return "Failed Dependency";
	case 426:
		return "Upgrade Required";
	case 428:
		return "Precondition Required";
	case 429:
		return "Too Many Requests";
	case 431:
		return "Request Header Fields Too Large";
	case 451:
		return "Unavailable For Legal Reasons";
	case 500:
		return "Internal Server Error";
	case 501:
		return "Not Implemented";
	case 502:
		return "Bad Gateway";
	case 503:
		return "Service Unavailable";
	case 504:
		return "Gateway Timeout";
	case 505:
		return "HTTP Version Not Supported";
	case 506:
		return "Variant Also Negotiates";
	case 507:
		return "Insufficient Storage";
	case 508:
		return "Loop Detected";
	case 510:
		return "Not Extended";
	case 511:
		return "Network Authentication Required";
	default:
		return "Unknown Status";
	}
};
var js_lib__$ArrayBuffer_ArrayBufferCompat = function() { };
$hxClasses["js.lib._ArrayBuffer.ArrayBufferCompat"] = js_lib__$ArrayBuffer_ArrayBufferCompat;
js_lib__$ArrayBuffer_ArrayBufferCompat.__name__ = true;
js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var resultArray = new Uint8Array(u.byteLength);
	resultArray.set(u);
	return resultArray.buffer;
};
var js_node_Path = require("path");
var js_node_buffer_Buffer = require("buffer").Buffer;
var js_node_buffer__$Buffer_Helper = function() { };
$hxClasses["js.node.buffer._Buffer.Helper"] = js_node_buffer__$Buffer_Helper;
js_node_buffer__$Buffer_Helper.__name__ = true;
js_node_buffer__$Buffer_Helper.bytesOfBuffer = function(b) {
	var o = Object.create(haxe_io_Bytes.prototype);
	o.length = b.byteLength;
	o.b = b;
	b.bufferValue = b;
	b.hxBytes = o;
	b.bytes = b;
	return o;
};
var js_node_http_Server = require("http").Server;
var js_node_stream_PassThrough = require("stream").PassThrough;
var js_npm_Uuid = require("uuid");
var mime_Mime = function() { };
$hxClasses["mime.Mime"] = mime_Mime;
mime_Mime.__name__ = true;
mime_Mime.get_extensions = function() {
	if(mime_Mime.extensions != null) {
		return mime_Mime.extensions;
	} else {
		mime_Mime.extensions = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = Reflect.fields(mime_Mime.db);
		while(_g < _g1.length) {
			var type = _g1[_g];
			++_g;
			var _g2 = mime_Mime.db[type].extensions;
			if(_g2 != null) {
				var _g3 = 0;
				while(_g3 < _g2.length) mime_Mime.extensions.h[_g2[_g3++]] = type;
			}
		}
		return mime_Mime.extensions;
	}
};
mime_Mime.lookup = function(path) {
	var this1 = mime_Mime.get_extensions();
	var key = path.split(".").pop().toLowerCase();
	return this1.h[key];
};
var sys_FileSystem = function() { };
$hxClasses["sys.FileSystem"] = sys_FileSystem;
sys_FileSystem.__name__ = true;
sys_FileSystem.exists = function(path) {
	try {
		js_node_Fs.accessSync(path);
		return true;
	} catch( _g ) {
		return false;
	}
};
sys_FileSystem.isDirectory = function(path) {
	try {
		return js_node_Fs.statSync(path).isDirectory();
	} catch( _g ) {
		return false;
	}
};
sys_FileSystem.createDirectory = function(path) {
	try {
		js_node_Fs.mkdirSync(path);
	} catch( _g ) {
		var _g1 = haxe_Exception.caught(_g).unwrap();
		if(_g1.code == "ENOENT") {
			sys_FileSystem.createDirectory(js_node_Path.dirname(path));
			js_node_Fs.mkdirSync(path);
		} else {
			var stat;
			try {
				stat = js_node_Fs.statSync(path);
			} catch( _g2 ) {
				throw _g1;
			}
			if(!stat.isDirectory()) {
				throw _g1;
			}
		}
	}
};
sys_FileSystem.deleteFile = function(path) {
	js_node_Fs.unlinkSync(path);
};
sys_FileSystem.deleteDirectory = function(path) {
	if(sys_FileSystem.exists(path)) {
		var _g = 0;
		var _g1 = js_node_Fs.readdirSync(path);
		while(_g < _g1.length) {
			var curPath = path + "/" + _g1[_g++];
			if(sys_FileSystem.isDirectory(curPath)) {
				sys_FileSystem.deleteDirectory(curPath);
			} else {
				js_node_Fs.unlinkSync(curPath);
			}
		}
		js_node_Fs.rmdirSync(path);
	}
};
var tink_chunk_ChunkBase = function() { };
$hxClasses["tink.chunk.ChunkBase"] = tink_chunk_ChunkBase;
tink_chunk_ChunkBase.__name__ = true;
tink_chunk_ChunkBase.prototype = {
	getCursor: function() {
		if(this.flattened == null) {
			this.flatten(this.flattened = []);
		}
		return tink_chunk_ChunkCursor.create(this.flattened.slice());
	}
	,flatten: function(into) {
	}
};
var tink__$Chunk_EmptyChunk = function() {
};
$hxClasses["tink._Chunk.EmptyChunk"] = tink__$Chunk_EmptyChunk;
tink__$Chunk_EmptyChunk.__name__ = true;
tink__$Chunk_EmptyChunk.__super__ = tink_chunk_ChunkBase;
tink__$Chunk_EmptyChunk.prototype = $extend(tink_chunk_ChunkBase.prototype,{
	getLength: function() {
		return 0;
	}
	,slice: function(from,to) {
		return this;
	}
	,blitTo: function(target,offset) {
	}
	,toString: function() {
		return "";
	}
	,toBytes: function() {
		return tink__$Chunk_EmptyChunk.EMPTY;
	}
});
var tink_Chunk = {};
tink_Chunk.concat = function(this1,that) {
	return tink_chunk_CompoundChunk.cons(this1,that);
};
tink_Chunk.join = function(chunks) {
	if(chunks == null) {
		return tink_Chunk.EMPTY;
	} else {
		switch(chunks.length) {
		case 0:
			return tink_Chunk.EMPTY;
		case 1:
			return chunks[0];
		default:
			var ret = tink_Chunk.concat(chunks[0],chunks[1]);
			var _g = 2;
			var _g1 = chunks.length;
			while(_g < _g1) ret = tink_Chunk.concat(ret,chunks[_g++]);
			return ret;
		}
	}
};
var tink_await_Error = {};
tink_await_Error.fromAny = function(any) {
	if(((any) instanceof tink_core_TypedError)) {
		return any;
	} else {
		return tink_core_TypedError.withData(0,"Unexpected Error",any,{ fileName : "tink/await/Error.hx", lineNumber : 12, className : "tink.await._Error.Error_Impl_", methodName : "fromAny"});
	}
};
var tink_await_OutcomeTools = function() { };
$hxClasses["tink.await.OutcomeTools"] = tink_await_OutcomeTools;
tink_await_OutcomeTools.__name__ = true;
tink_await_OutcomeTools.getOutcome = function(outcome,value) {
	if(outcome == null) {
		return tink_core_Outcome.Success(value);
	} else {
		switch(outcome._hx_index) {
		case 0:
			return outcome;
		case 1:
			var _g = outcome.failure;
			if(((_g) instanceof tink_core_TypedError)) {
				return outcome;
			} else {
				return tink_core_Outcome.Failure(tink_await_Error.fromAny(_g));
			}
			break;
		}
	}
};
var tink_chunk_ByteChunk = function(data,from,to) {
	this.data = data;
	this.from = from;
	this.to = to;
};
$hxClasses["tink.chunk.ByteChunk"] = tink_chunk_ByteChunk;
tink_chunk_ByteChunk.__name__ = true;
tink_chunk_ByteChunk.of = function(b) {
	if(b.length == 0) {
		return tink_Chunk.EMPTY;
	}
	var ret = new tink_chunk_ByteChunk(b.b.bufferValue,0,b.length);
	ret.wrapped = b;
	return ret;
};
tink_chunk_ByteChunk.__super__ = tink_chunk_ChunkBase;
tink_chunk_ByteChunk.prototype = $extend(tink_chunk_ChunkBase.prototype,{
	flatten: function(into) {
		into.push(this);
	}
	,getLength: function() {
		return this.to - this.from;
	}
	,getSlice: function(from,to) {
		if(to > this.to - this.from) {
			to = this.to - this.from;
		}
		if(from < 0) {
			from = 0;
		}
		if(to <= from) {
			return null;
		} else if(to == this.to - this.from && from == 0) {
			return this;
		} else {
			return new tink_chunk_ByteChunk(this.data,this.from + from,to + this.from);
		}
	}
	,slice: function(from,to) {
		var _g = this.getSlice(from,to);
		if(_g == null) {
			return tink_Chunk.EMPTY;
		} else {
			return _g;
		}
	}
	,blitTo: function(target,offset) {
		if(this.wrapped == null) {
			this.wrapped = haxe_io_Bytes.ofData(this.data);
		}
		target.blit(offset,this.wrapped,this.from,this.to - this.from);
	}
	,toBytes: function() {
		if(this.wrapped == null) {
			this.wrapped = haxe_io_Bytes.ofData(this.data);
		}
		return this.wrapped.sub(this.from,this.to - this.from);
	}
	,toString: function() {
		if(this.wrapped == null) {
			this.wrapped = haxe_io_Bytes.ofData(this.data);
		}
		return this.wrapped.getString(this.from,this.to - this.from);
	}
});
var tink_chunk_ChunkCursor = function() {
	this.currentByte = -1;
	this.currentPos = 0;
	this.length = 0;
	this.curLength = 0;
	this.curOffset = 0;
	this.curPartIndex = 0;
};
$hxClasses["tink.chunk.ChunkCursor"] = tink_chunk_ChunkCursor;
tink_chunk_ChunkCursor.__name__ = true;
tink_chunk_ChunkCursor.create = function(parts) {
	var ret = new tink_chunk_ChunkCursor();
	ret.parts = parts;
	ret.reset();
	return ret;
};
tink_chunk_ChunkCursor.prototype = {
	reset: function() {
		this.length = 0;
		this.currentPos = 0;
		this.currentByte = -1;
		this.curOffset = 0;
		var _g = 0;
		var _g1 = this.parts;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			this.length += p.to - p.from;
		}
		this.curPartIndex = 0;
		this.curPart = this.parts[0];
		if(this.curPart != null) {
			var _this = this.curPart;
			this.curLength = _this.to - _this.from;
			var _this = this.curPart;
			this.currentByte = _this.data.bytes[_this.from];
		}
	}
	,flush: function() {
		var ret = this.left();
		this.shift();
		return ret;
	}
	,add: function(chunk) {
		chunk.flatten(this.parts);
		this.reset();
	}
	,shift: function(chunk) {
		this.parts.splice(0,this.curPartIndex);
		var _g = this.parts[0];
		if(_g != null) {
			var _g1 = _g.getSlice(this.curOffset,this.curLength);
			if(_g1 == null) {
				this.parts.shift();
			} else {
				this.parts[0] = _g1;
			}
		}
		if(chunk != null) {
			this.add(chunk);
		} else {
			this.reset();
		}
	}
	,left: function() {
		if(this.curPart == null) {
			return tink_Chunk.EMPTY;
		}
		var _g = [];
		var _g1 = 0;
		var _g2 = this.curPartIndex;
		while(_g1 < _g2) _g.push(this.parts[_g1++]);
		_g.push(this.curPart.slice(0,this.curOffset));
		return tink_Chunk.join(_g);
	}
	,right: function() {
		if(this.curPart == null) {
			return tink_Chunk.EMPTY;
		}
		var _g = [];
		var _g1 = this.curPartIndex;
		var _g2 = this.parts.length;
		while(_g1 < _g2) _g.push(this.parts[_g1++]);
		if(_g.length > 0) {
			_g[0] = this.curPart.slice(this.curOffset,this.curLength);
		}
		return tink_Chunk.join(_g);
	}
	,moveTo: function(position) {
		if(this.length == 0) {
			return 0;
		}
		if(position > this.length) {
			position = this.length - 1;
		}
		if(position < 0) {
			position = 0;
		}
		this.currentPos = position;
		if(position == this.length) {
			this.ffwd();
		} else {
			var _g = 0;
			var _g1 = this.parts.length;
			while(_g < _g1) {
				var i = _g++;
				var c = this.parts[i];
				var _g2 = c.to - c.from;
				if(_g2 > position) {
					this.curPart = c;
					this.curPartIndex = i;
					this.curOffset = position;
					this.curLength = c.to - c.from;
					this.currentByte = c.data.bytes[c.from + position];
					break;
				} else {
					position -= _g2;
				}
			}
		}
		return this.currentPos;
	}
	,ffwd: function() {
		this.currentByte = -1;
		this.curLength = 0;
		this.curOffset = 0;
		this.curPart = null;
		this.curPartIndex = this.parts.length;
	}
	,next: function() {
		if(this.currentPos == this.length) {
			return false;
		}
		this.currentPos++;
		if(this.currentPos == this.length) {
			this.ffwd();
			return false;
		}
		if(this.curOffset == this.curLength - 1) {
			this.curOffset = 0;
			this.curPart = this.parts[++this.curPartIndex];
			var _this = this.curPart;
			this.curLength = _this.to - _this.from;
			var _this = this.curPart;
			this.currentByte = _this.data.bytes[_this.from];
		} else {
			var _this = this.curPart;
			this.currentByte = _this.data.bytes[_this.from + ++this.curOffset];
		}
		return true;
	}
};
var tink_chunk_CompoundChunk = function() {
};
$hxClasses["tink.chunk.CompoundChunk"] = tink_chunk_CompoundChunk;
tink_chunk_CompoundChunk.__name__ = true;
tink_chunk_CompoundChunk.asCompound = function(c) {
	if(((c) instanceof tink_chunk_CompoundChunk)) {
		return c;
	} else {
		return null;
	}
};
tink_chunk_CompoundChunk.cons = function(a,b) {
	var _g = a.getLength();
	var _g1 = b.getLength();
	if(_g == 0) {
		if(_g1 == 0) {
			return tink_Chunk.EMPTY;
		} else {
			return b;
		}
	} else if(_g1 == 0) {
		return a;
	} else {
		var _g = tink_chunk_CompoundChunk.asCompound(a);
		var _g1 = tink_chunk_CompoundChunk.asCompound(b);
		if(_g == null) {
			if(_g1 == null) {
				return tink_chunk_CompoundChunk.create([a,b],2);
			} else if(_g1.depth < 100) {
				return tink_chunk_CompoundChunk.create([a,b],_g1.depth + 1);
			} else {
				var flat = [];
				_g1.flatten(flat);
				b.flatten(flat);
				return tink_chunk_CompoundChunk.create(flat,2);
			}
		} else if(_g1 == null) {
			if(_g.depth < 100) {
				return tink_chunk_CompoundChunk.create([a,b],_g.depth + 1);
			} else {
				var flat = [];
				_g.flatten(flat);
				b.flatten(flat);
				return tink_chunk_CompoundChunk.create(flat,2);
			}
		} else {
			var depth = _g.depth > _g1.depth ? _g.depth : _g1.depth;
			return tink_chunk_CompoundChunk.create(_g.chunks.concat(_g1.chunks),depth);
		}
	}
};
tink_chunk_CompoundChunk.create = function(chunks,depth) {
	var ret = new tink_chunk_CompoundChunk();
	var offsets = [0];
	var length = 0;
	var _g = 0;
	while(_g < chunks.length) offsets.push(length += chunks[_g++].getLength());
	ret.chunks = chunks;
	ret.offsets = offsets;
	ret.length = length;
	ret.depth = depth;
	return ret;
};
tink_chunk_CompoundChunk.__super__ = tink_chunk_ChunkBase;
tink_chunk_CompoundChunk.prototype = $extend(tink_chunk_ChunkBase.prototype,{
	getLength: function() {
		return this.length;
	}
	,findChunk: function(target) {
		var min = 0;
		var max = this.offsets.length - 1;
		while(min + 1 < max) {
			var guess = min + max >> 1;
			if(this.offsets[guess] > target) {
				max = guess;
			} else {
				min = guess;
			}
		}
		return min;
	}
	,flatten: function(into) {
		var _g = 0;
		var _g1 = this.chunks;
		while(_g < _g1.length) _g1[_g++].flatten(into);
	}
	,slice: function(from,to) {
		var idxFrom = this.findChunk(from);
		var idxTo = this.findChunk(to);
		if(idxFrom == idxTo) {
			var offset = this.offsets[idxFrom];
			return this.chunks[idxFrom].slice(from - offset,to - offset);
		}
		var ret = this.chunks.slice(idxFrom,idxTo + 1);
		ret[0] = ret[0].slice(from - this.offsets[idxFrom],this.offsets[idxFrom + 1]);
		ret[ret.length - 1] = ret[ret.length - 1].slice(0,to - this.offsets[idxTo]);
		return tink_chunk_CompoundChunk.create(ret,this.depth);
	}
	,blitTo: function(target,offset) {
		var _g = 0;
		var _g1 = this.chunks.length;
		while(_g < _g1) {
			var i = _g++;
			this.chunks[i].blitTo(target,offset + this.offsets[i]);
		}
	}
	,toString: function() {
		return this.toBytes().toString();
	}
	,toBytes: function() {
		var ret = new haxe_io_Bytes(new ArrayBuffer(this.length));
		this.blitTo(ret,0);
		return ret;
	}
});
var tink_core_CallbackLink = {};
tink_core_CallbackLink.noop = function() {
};
tink_core_CallbackLink.fromMany = function(callbacks) {
	return new tink_core_SimpleLink(function() {
		if(callbacks != null) {
			var _g = 0;
			while(_g < callbacks.length) {
				var cb = callbacks[_g];
				++_g;
				if(cb != null) {
					cb.cancel();
				}
			}
		} else {
			callbacks = null;
		}
	});
};
var tink_core_SimpleLink = function(f) {
	this.f = f;
};
$hxClasses["tink.core.SimpleLink"] = tink_core_SimpleLink;
tink_core_SimpleLink.__name__ = true;
tink_core_SimpleLink.prototype = {
	cancel: function() {
		if(this.f != null) {
			this.f();
			this.f = null;
		}
	}
};
var tink_core__$Callback_ListCell = function(cb,list) {
	if(cb == null) {
		throw haxe_Exception.thrown("callback expected but null received");
	}
	this.cb = cb;
	this.list = list;
};
$hxClasses["tink.core._Callback.ListCell"] = tink_core__$Callback_ListCell;
tink_core__$Callback_ListCell.__name__ = true;
tink_core__$Callback_ListCell.prototype = {
	cancel: function() {
		if(this.list != null) {
			var list = this.list;
			this.cb = null;
			this.list = null;
			if(--list.used <= list.cells.length >> 1) {
				list.compact();
			}
		}
	}
};
var tink_core_FutureTrigger = function() {
	this.status = tink_core_FutureStatus.Awaited;
	this.list = new tink_core_CallbackList(true);
};
$hxClasses["tink.core.FutureTrigger"] = tink_core_FutureTrigger;
tink_core_FutureTrigger.__name__ = true;
tink_core_FutureTrigger.prototype = {
	getStatus: function() {
		return this.status;
	}
	,handle: function(callback) {
		var _g = this.status;
		if(_g._hx_index == 3) {
			tink_core_Callback.invoke(callback,tink_core_Lazy.get(_g.result));
			return null;
		} else {
			var _this = this.list;
			if(_this.disposeHandlers == null) {
				return null;
			} else {
				var node = new tink_core__$Callback_ListCell(callback,_this);
				_this.cells.push(node);
				if(_this.used++ == 0) {
					var fn = _this.onfill;
					if(tink_core_Callback.depth < 500) {
						tink_core_Callback.depth++;
						fn();
						tink_core_Callback.depth--;
					} else {
						tink_core_Callback.defer(fn);
					}
				}
				return node;
			}
		}
	}
	,eager: function() {
	}
	,trigger: function(result) {
		if(this.status._hx_index == 3) {
			return false;
		} else {
			this.status = tink_core_FutureStatus.Ready(new tink_core__$Lazy_LazyConst(result));
			this.list.invoke(result);
			return true;
		}
	}
};
var tink_core_OutcomeTools = function() { };
$hxClasses["tink.core.OutcomeTools"] = tink_core_OutcomeTools;
tink_core_OutcomeTools.__name__ = true;
tink_core_OutcomeTools.sure = function(outcome) {
	switch(outcome._hx_index) {
	case 0:
		return outcome.data;
	case 1:
		var _g = outcome.failure;
		var _g1 = tink_core_TypedError.asError(_g);
		if(_g1 == null) {
			throw haxe_Exception.thrown(_g);
		} else {
			return _g1.throwSelf();
		}
		break;
	}
};
var tink_core_Recover = {};
tink_core_Recover.ofSync = function(f) {
	return function(e) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(e)));
	};
};
var tink_io_StreamParserObject = function() { };
$hxClasses["tink.io.StreamParserObject"] = tink_io_StreamParserObject;
tink_io_StreamParserObject.__name__ = true;
var tink_http_Container = function() { };
$hxClasses["tink.http.Container"] = tink_http_Container;
tink_http_Container.__name__ = true;
var tink_http_ContainerResult = $hxEnums["tink.http.ContainerResult"] = { __ename__:true,__constructs__:null
	,Running: ($_=function(running) { return {_hx_index:0,running:running,__enum__:"tink.http.ContainerResult",toString:$estr}; },$_._hx_name="Running",$_.__params__ = ["running"],$_)
	,Failed: ($_=function(e) { return {_hx_index:1,e:e,__enum__:"tink.http.ContainerResult",toString:$estr}; },$_._hx_name="Failed",$_.__params__ = ["e"],$_)
	,Shutdown: {_hx_name:"Shutdown",_hx_index:2,__enum__:"tink.http.ContainerResult",toString:$estr}
};
tink_http_ContainerResult.__constructs__ = [tink_http_ContainerResult.Running,tink_http_ContainerResult.Failed,tink_http_ContainerResult.Shutdown];
var tink_http_Handler = {};
tink_http_Handler.toNodeHandler = function(this1,options) {
	var body = options == null ? function(msg) {
		var options = null;
		options = { };
		return tink_http_IncomingRequestBody.Plain(tink_io_nodejs_NodejsSource.wrap("Incoming HTTP message from " + msg.socket.remoteAddress,msg,options.chunkSize,options.onEnd));
	} : options.body == null ? function(msg) {
		var options = null;
		options = { };
		return tink_http_IncomingRequestBody.Plain(tink_io_nodejs_NodejsSource.wrap("Incoming HTTP message from " + msg.socket.remoteAddress,msg,options.chunkSize,options.onEnd));
	} : options.body;
	return function(req,res) {
		this1.process(new tink_http_IncomingRequest(req.socket.remoteAddress,tink_http_IncomingRequestHeader.fromIncomingMessage(req),body(req))).handle(function(out) {
			var headers_h = Object.create(null);
			var _this = out.header.fields;
			var _g1_current = 0;
			while(_g1_current < _this.length) {
				var h = _this[_g1_current++];
				if(!Object.prototype.hasOwnProperty.call(headers_h,h.name)) {
					headers_h[h.name] = [];
				}
				headers_h[h.name].push(h.value);
			}
			var name = new haxe_ds__$StringMap_StringMapKeyIterator(headers_h);
			while(name.hasNext()) {
				var name1 = name.next();
				res.setHeader(name1,headers_h[name1]);
			}
			res.writeHead(out.header.statusCode,out.header.reason);
			tink_io_Source.pipeTo(out.body,tink_io_nodejs_NodejsSink.wrap("Outgoing HTTP response to " + req.socket.remoteAddress,res)).handle(function(x) {
				res.end();
			});
		});
	};
};
var tink_http_HandlerObject = function() { };
$hxClasses["tink.http.HandlerObject"] = tink_http_HandlerObject;
tink_http_HandlerObject.__name__ = true;
var tink_http_SimpleHandler = function(f) {
	this.f = f;
};
$hxClasses["tink.http.SimpleHandler"] = tink_http_SimpleHandler;
tink_http_SimpleHandler.__name__ = true;
tink_http_SimpleHandler.prototype = {
	process: function(req) {
		return this.f(req);
	}
};
var tink_http_Header = function(fields) {
	this.fields = fields == null ? [] : fields;
};
$hxClasses["tink.http.Header"] = tink_http_Header;
tink_http_Header.__name__ = true;
tink_http_Header.prototype = {
	get: function(name) {
		var _g = [];
		var _g1 = 0;
		var _g2 = this.fields;
		while(_g1 < _g2.length) {
			var f = _g2[_g1];
			++_g1;
			if(f.name == name) {
				_g.push(f.value);
			}
		}
		return _g;
	}
	,byName: function(name) {
		var _g = this.get(name);
		switch(_g.length) {
		case 0:
			return tink_core_Outcome.Failure(new tink_core_TypedError(422,"No " + name + " header found",{ fileName : "tink/http/Header.hx", lineNumber : 91, className : "tink.http.Header", methodName : "byName"}));
		case 1:
			return tink_core_Outcome.Success(_g[0]);
		default:
			return tink_core_Outcome.Failure(new tink_core_TypedError(422,"Multiple entries for " + name + " header",{ fileName : "tink/http/Header.hx", lineNumber : 95, className : "tink.http.Header", methodName : "byName"}));
		}
	}
	,toString: function() {
		var _g = [];
		var _g1 = 0;
		var _g2 = this.fields;
		while(_g1 < _g2.length) _g.push(_g2[_g1++].toString());
		return _g.join("\r\n") + "\r\n" + "\r\n";
	}
};
var tink_io_ParseStep = $hxEnums["tink.io.ParseStep"] = { __ename__:true,__constructs__:null
	,Progressed: {_hx_name:"Progressed",_hx_index:0,__enum__:"tink.io.ParseStep",toString:$estr}
	,Done: ($_=function(r) { return {_hx_index:1,r:r,__enum__:"tink.io.ParseStep",toString:$estr}; },$_._hx_name="Done",$_.__params__ = ["r"],$_)
	,Failed: ($_=function(e) { return {_hx_index:2,e:e,__enum__:"tink.io.ParseStep",toString:$estr}; },$_._hx_name="Failed",$_.__params__ = ["e"],$_)
};
tink_io_ParseStep.__constructs__ = [tink_io_ParseStep.Progressed,tink_io_ParseStep.Done,tink_io_ParseStep.Failed];
var tink_http_Message = function(header,body) {
	this.header = header;
	this.body = body;
};
$hxClasses["tink.http.Message"] = tink_http_Message;
tink_http_Message.__name__ = true;
var tink_http_MiddlewareObject = function() { };
$hxClasses["tink.http.MiddlewareObject"] = tink_http_MiddlewareObject;
tink_http_MiddlewareObject.__name__ = true;
var tink_http_RequestHeader = function(method,url,protocol,fields) {
	if(protocol == null) {
		protocol = "HTTP/1.1";
	}
	this.method = method;
	this.url = url;
	this.protocol = protocol;
	tink_http_Header.call(this,fields);
};
$hxClasses["tink.http.RequestHeader"] = tink_http_RequestHeader;
tink_http_RequestHeader.__name__ = true;
tink_http_RequestHeader.__super__ = tink_http_Header;
tink_http_RequestHeader.prototype = $extend(tink_http_Header.prototype,{
	toString: function() {
		var this1 = this.url;
		return "" + this.method + " " + (this1.query == null ? this1.path : (this1.path == null ? "null" : this1.path) + "?" + (this1.query == null ? "null" : this1.query)) + " " + this.protocol + "\r\n" + tink_http_Header.prototype.toString.call(this);
	}
});
var tink_http_IncomingRequestHeader = function(method,url,protocol,fields) {
	tink_http_RequestHeader.call(this,method,url,protocol,fields);
};
$hxClasses["tink.http.IncomingRequestHeader"] = tink_http_IncomingRequestHeader;
tink_http_IncomingRequestHeader.__name__ = true;
tink_http_IncomingRequestHeader.fromIncomingMessage = function(req) {
	var req1 = req.method;
	var tmp = tink_Url.fromString(req.url);
	var tmp1 = "HTTP/" + req.httpVersion;
	var _g = [];
	var _g1 = 0;
	var _g2 = req.rawHeaders.length / 2 | 0;
	while(_g1 < _g2) {
		var i = _g1++;
		_g.push(new tink_http_HeaderField(req.rawHeaders[2 * i].toLowerCase(),req.rawHeaders[2 * i + 1]));
	}
	return new tink_http_IncomingRequestHeader(req1,tmp,tmp1,_g);
};
tink_http_IncomingRequestHeader.__super__ = tink_http_RequestHeader;
tink_http_IncomingRequestHeader.prototype = $extend(tink_http_RequestHeader.prototype,{
});
var tink_http_IncomingRequest = function(clientIp,header,body) {
	this.clientIp = clientIp;
	tink_http_Message.call(this,header,body);
};
$hxClasses["tink.http.IncomingRequest"] = tink_http_IncomingRequest;
tink_http_IncomingRequest.__name__ = true;
tink_http_IncomingRequest.__super__ = tink_http_Message;
tink_http_IncomingRequest.prototype = $extend(tink_http_Message.prototype,{
});
var tink_http_IncomingRequestBody = $hxEnums["tink.http.IncomingRequestBody"] = { __ename__:true,__constructs__:null
	,Plain: ($_=function(source) { return {_hx_index:0,source:source,__enum__:"tink.http.IncomingRequestBody",toString:$estr}; },$_._hx_name="Plain",$_.__params__ = ["source"],$_)
	,Parsed: ($_=function(parts) { return {_hx_index:1,parts:parts,__enum__:"tink.http.IncomingRequestBody",toString:$estr}; },$_._hx_name="Parsed",$_.__params__ = ["parts"],$_)
};
tink_http_IncomingRequestBody.__constructs__ = [tink_http_IncomingRequestBody.Plain,tink_http_IncomingRequestBody.Parsed];
var tink_http_ResponseHeaderBase = function(statusCode,reason,fields,protocol) {
	if(protocol == null) {
		protocol = "HTTP/1.1";
	}
	this.statusCode = statusCode;
	this.reason = reason == null ? httpstatus_HttpStatusMessage.fromCode(statusCode) : reason;
	this.protocol = protocol;
	tink_http_Header.call(this,fields);
};
$hxClasses["tink.http.ResponseHeaderBase"] = tink_http_ResponseHeaderBase;
tink_http_ResponseHeaderBase.__name__ = true;
tink_http_ResponseHeaderBase.__super__ = tink_http_Header;
tink_http_ResponseHeaderBase.prototype = $extend(tink_http_Header.prototype,{
	toString: function() {
		return "" + this.protocol + " " + this.statusCode + " " + this.reason + "\r\n" + tink_http_Header.prototype.toString.call(this);
	}
});
var tink_http__$Response_OutgoingResponseData = function(header,body) {
	tink_http_Message.call(this,header,body);
};
$hxClasses["tink.http._Response.OutgoingResponseData"] = tink_http__$Response_OutgoingResponseData;
tink_http__$Response_OutgoingResponseData.__name__ = true;
tink_http__$Response_OutgoingResponseData.__super__ = tink_http_Message;
tink_http__$Response_OutgoingResponseData.prototype = $extend(tink_http_Message.prototype,{
});
var tink_http_OutgoingResponse = {};
tink_http_OutgoingResponse.blob = function(code,chunk,contentType,headers) {
	if(code == null) {
		code = 200;
	}
	return new tink_http__$Response_OutgoingResponseData(new tink_http_ResponseHeaderBase(code,httpstatus_HttpStatusMessage.fromCode(code),[new tink_http_HeaderField("Content-Type".toLowerCase(),contentType),new tink_http_HeaderField("Content-Length".toLowerCase(),Std.string(chunk.getLength()))].concat(headers == null ? [] : headers),"HTTP/1.1"),new tink_streams_Single(new tink_core__$Lazy_LazyConst(chunk)));
};
tink_http_OutgoingResponse.reportError = function(e) {
	var code = e.code;
	if(code < 100 || code > 999) {
		code = 500;
	}
	return new tink_http__$Response_OutgoingResponseData(new tink_http_ResponseHeaderBase(code,httpstatus_HttpStatusMessage.fromCode(code),[new tink_http_HeaderField("Content-Type".toLowerCase(),"application/json")],"HTTP/1.1"),new tink_streams_Single(new tink_core__$Lazy_LazyConst(tink_chunk_ByteChunk.of(haxe_io_Bytes.ofString(JSON.stringify({ error : e.message, details : e.data}))))));
};
var tink_http_BodyPart = $hxEnums["tink.http.BodyPart"] = { __ename__:true,__constructs__:null
	,Value: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"tink.http.BodyPart",toString:$estr}; },$_._hx_name="Value",$_.__params__ = ["v"],$_)
	,File: ($_=function(handle) { return {_hx_index:1,handle:handle,__enum__:"tink.http.BodyPart",toString:$estr}; },$_._hx_name="File",$_.__params__ = ["handle"],$_)
};
tink_http_BodyPart.__constructs__ = [tink_http_BodyPart.Value,tink_http_BodyPart.File];
var tink_http_containers_NodeContainer = function(kind,opt) {
	this.kind = kind;
	this.upgradable = opt != null && opt.upgradable;
};
$hxClasses["tink.http.containers.NodeContainer"] = tink_http_containers_NodeContainer;
tink_http_containers_NodeContainer.__name__ = true;
tink_http_containers_NodeContainer.toUpgradeHandler = function(handler) {
	return function(req,socket,head) {
		var handler1 = handler;
		var req1 = req.socket.remoteAddress;
		var this1 = tink_http_IncomingRequestHeader.fromIncomingMessage(req);
		var options = null;
		options = { };
		handler1.process(new tink_http_IncomingRequest(req1,this1,tink_http_IncomingRequestBody.Plain(tink_io_nodejs_NodejsSource.wrap("Incoming HTTP message from " + req.socket.remoteAddress,socket,options.chunkSize,options.onEnd)))).handle(function(out) {
			tink_io_Source.pipeTo(out.body.prepend(new tink_streams_Single(new tink_core__$Lazy_LazyConst(tink_chunk_ByteChunk.of(haxe_io_Bytes.ofString(out.header.toString()))))),tink_io_nodejs_NodejsSink.wrap("Outgoing HTTP response to " + req.socket.remoteAddress,socket)).handle(function(_) {
				socket.end();
			});
		});
	};
};
tink_http_containers_NodeContainer.prototype = {
	run: function(handler) {
		var _gthis = this;
		return tink_core_Future.async(function(cb) {
			var failures = tink_core_Signal.trigger();
			var server;
			var _g = _gthis.kind;
			switch(_g._hx_index) {
			case 0:
				var server1 = _g.server;
				server = server1;
				break;
			case 1:
				var port = _g.port;
				var server1 = new js_node_http_Server();
				server1.listen(port);
				server = server1;
				break;
			case 2:
				var host = _g.host;
				var server1 = new js_node_http_Server();
				server1.listen(tink_url_Host.get_port(host),tink_url_Host.get_name(host));
				server = server1;
				break;
			case 3:
				var path = _g.path;
				var server1 = new js_node_http_Server();
				server1.listen(path);
				server = server1;
				break;
			case 4:
				var fd = _g.fd;
				var server1 = new js_node_http_Server();
				server1.listen(fd);
				server = server1;
				break;
			}
			var tinkify = function(e) {
				return tink_core_TypedError.withData(null,e.message,e,{ fileName : "tink/http/containers/NodeContainer.hx", lineNumber : 69, className : "tink.http.containers.NodeContainer", methodName : "run"});
			};
			server.on("error",function(e) {
				cb(tink_http_ContainerResult.Failed(e));
			});
			if(_gthis.upgradable) {
				server.on("upgrade",tink_http_containers_NodeContainer.toUpgradeHandler(handler));
			}
			var onListen = function() {
				var onListen = tink_http_ContainerResult.Running({ shutdown : function(hard) {
					if(hard) {
						console.log("tink/http/containers/NodeContainer.hx:82:","Warning: hard shutdown not implemented");
					}
					return tink_core_Future.map(tink_core_Future.async(function(cb) {
						server.close(function() {
							cb(true);
						});
					}),tink_core_Outcome.Success);
				}, failures : failures});
				cb(onListen);
			};
			if(server.listening) {
				onListen();
			} else {
				server.on("listening",onListen);
			}
			server.on("request",tink_http_Handler.toNodeHandler(handler));
			server.on("error",function(e) {
				cb(tink_http_ContainerResult.Failed(e));
			});
		});
	}
};
var tink_http_containers__$NodeContainer_ServerKindBase = $hxEnums["tink.http.containers._NodeContainer.ServerKindBase"] = { __ename__:true,__constructs__:null
	,Instance: ($_=function(server) { return {_hx_index:0,server:server,__enum__:"tink.http.containers._NodeContainer.ServerKindBase",toString:$estr}; },$_._hx_name="Instance",$_.__params__ = ["server"],$_)
	,Port: ($_=function(port) { return {_hx_index:1,port:port,__enum__:"tink.http.containers._NodeContainer.ServerKindBase",toString:$estr}; },$_._hx_name="Port",$_.__params__ = ["port"],$_)
	,Host: ($_=function(host) { return {_hx_index:2,host:host,__enum__:"tink.http.containers._NodeContainer.ServerKindBase",toString:$estr}; },$_._hx_name="Host",$_.__params__ = ["host"],$_)
	,Path: ($_=function(path) { return {_hx_index:3,path:path,__enum__:"tink.http.containers._NodeContainer.ServerKindBase",toString:$estr}; },$_._hx_name="Path",$_.__params__ = ["path"],$_)
	,Fd: ($_=function(fd) { return {_hx_index:4,fd:fd,__enum__:"tink.http.containers._NodeContainer.ServerKindBase",toString:$estr}; },$_._hx_name="Fd",$_.__params__ = ["fd"],$_)
};
tink_http_containers__$NodeContainer_ServerKindBase.__constructs__ = [tink_http_containers__$NodeContainer_ServerKindBase.Instance,tink_http_containers__$NodeContainer_ServerKindBase.Port,tink_http_containers__$NodeContainer_ServerKindBase.Host,tink_http_containers__$NodeContainer_ServerKindBase.Path,tink_http_containers__$NodeContainer_ServerKindBase.Fd];
var tink_http_middleware_WebSocket = function(ws,authenticator) {
	this.ws = ws;
	if(authenticator != null) {
		this.authenticate = authenticator;
	}
};
$hxClasses["tink.http.middleware.WebSocket"] = tink_http_middleware_WebSocket;
tink_http_middleware_WebSocket.__name__ = true;
tink_http_middleware_WebSocket.prototype = {
	authenticate: function(header) {
		console.log("tink/http/middleware/WebSocket.hx:22:","authin");
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
	}
	,apply: function(handler) {
		var _gthis = this;
		return new tink_http_SimpleHandler(function(req) {
			var header = req.header;
			var _g = tink_websocket_IncomingHandshakeRequestHeader.validate(header);
			var _g1 = req.body;
			if(_g._hx_index == 0) {
				if(_g1._hx_index == 0) {
					var src = _g1.source;
					return tink_core_Future.flatMap(_gthis.authenticate(req.header),function(o) {
						var v;
						switch(o._hx_index) {
						case 0:
							console.log("tink/http/middleware/WebSocket.hx:34:","respondin");
							v = new tink_http__$Response_OutgoingResponseData(new tink_websocket_OutgoingHandshakeResponseHeader(tink_core_OutcomeTools.sure(header.byName("sec-websocket-key".toLowerCase()))),tink_websocket_RawMessageStream.toMaskedChunkStream(_gthis.ws({ clientIp : req.clientIp, header : header, stream : tink_io_RealSourceTools.parseStream(src,new tink_websocket_Parser()).map(tink_streams_Mapping.ofPlain(tink_websocket_Frame.fromChunk)).regroup(tink_websocket_MessageRegrouper.get())}),function() {
								return null;
							}));
							break;
						case 1:
							v = tink_http_OutgoingResponse.reportError(o.failure);
							break;
						}
						return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(v));
					});
				} else {
					console.log("tink/http/middleware/WebSocket.hx:48:","processin");
					return handler.process(req);
				}
			} else {
				console.log("tink/http/middleware/WebSocket.hx:48:","processin");
				return handler.process(req);
			}
		});
	}
};
var tink_io_PipeResult = $hxEnums["tink.io.PipeResult"] = { __ename__:true,__constructs__:null
	,AllWritten: {_hx_name:"AllWritten",_hx_index:0,__enum__:"tink.io.PipeResult",toString:$estr}
	,SinkEnded: ($_=function(result,rest) { return {_hx_index:1,result:result,rest:rest,__enum__:"tink.io.PipeResult",toString:$estr}; },$_._hx_name="SinkEnded",$_.__params__ = ["result","rest"],$_)
	,SinkFailed: ($_=function(e,rest) { return {_hx_index:2,e:e,rest:rest,__enum__:"tink.io.PipeResult",toString:$estr}; },$_._hx_name="SinkFailed",$_.__params__ = ["e","rest"],$_)
	,SourceFailed: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"tink.io.PipeResult",toString:$estr}; },$_._hx_name="SourceFailed",$_.__params__ = ["e"],$_)
};
tink_io_PipeResult.__constructs__ = [tink_io_PipeResult.AllWritten,tink_io_PipeResult.SinkEnded,tink_io_PipeResult.SinkFailed,tink_io_PipeResult.SourceFailed];
var tink_io_PipeResultTools = function() { };
$hxClasses["tink.io.PipeResultTools"] = tink_io_PipeResultTools;
tink_io_PipeResultTools.__name__ = true;
tink_io_PipeResultTools.toResult = function(c,result,buffered) {
	var mk = function(s) {
		if(buffered == null) {
			return s;
		} else {
			return s.prepend(new tink_streams_Single(new tink_core__$Lazy_LazyConst(buffered)));
		}
	};
	switch(c._hx_index) {
	case 0:
		return tink_io_PipeResult.SinkEnded(result,mk(c.rest));
	case 1:
		return tink_io_PipeResult.SinkFailed(c.error,mk(c.at));
	case 2:
		return tink_io_PipeResult.SourceFailed(c.error);
	case 3:
		return tink_io_PipeResult.AllWritten;
	}
};
var tink_io_SinkObject = function() { };
$hxClasses["tink.io.SinkObject"] = tink_io_SinkObject;
tink_io_SinkObject.__name__ = true;
var tink_io_SinkBase = function() { };
$hxClasses["tink.io.SinkBase"] = tink_io_SinkBase;
tink_io_SinkBase.__name__ = true;
tink_io_SinkBase.prototype = {
	consume: function(source,options) {
		throw haxe_Exception.thrown("not implemented");
	}
};
var tink_streams_StreamObject = function() { };
$hxClasses["tink.streams.StreamObject"] = tink_streams_StreamObject;
tink_streams_StreamObject.__name__ = true;
var tink_streams_StreamBase = function() {
};
$hxClasses["tink.streams.StreamBase"] = tink_streams_StreamBase;
tink_streams_StreamBase.__name__ = true;
tink_streams_StreamBase.prototype = {
	get_depleted: function() {
		return false;
	}
	,regroup: function(f) {
		return new tink_streams__$Stream_RegroupStream(this,f);
	}
	,map: function(f) {
		return this.regroup(f);
	}
	,prepend: function(other) {
		if(this.get_depleted()) {
			return other;
		} else {
			return tink_streams__$Stream_CompoundStream.of([other,this]);
		}
	}
	,decompose: function(into) {
		if(!this.get_depleted()) {
			into.push(this);
		}
	}
	,reduce: function(initial,reducer) {
		var _gthis = this;
		return tink_core_Future.async(function(cb) {
			_gthis.forEach(tink_streams_Handler.ofUnknown(function(item) {
				return tink_core_Future.map(reducer(initial,item),function(o) {
					switch(o._hx_index) {
					case 0:
						initial = o.result;
						return tink_streams_Handled.Resume;
					case 1:
						return tink_streams_Handled.Clog(o.e);
					}
				});
			})).handle(function(c) {
				switch(c._hx_index) {
				case 0:
					throw haxe_Exception.thrown("assert");
				case 1:
					cb(tink_streams_Reduction.Crashed(c.error,c.at));
					break;
				case 2:
					cb(tink_streams_Reduction.Failed(c.error));
					break;
				case 3:
					cb(tink_streams_Reduction.Reduced(initial));
					break;
				}
			});
		});
	}
	,forEach: function(handler) {
		throw haxe_Exception.thrown("not implemented");
	}
};
var tink_streams_Empty = function() {
	tink_streams_StreamBase.call(this);
};
$hxClasses["tink.streams.Empty"] = tink_streams_Empty;
tink_streams_Empty.__name__ = true;
tink_streams_Empty.make = function() {
	return tink_streams_Empty.inst;
};
tink_streams_Empty.__super__ = tink_streams_StreamBase;
tink_streams_Empty.prototype = $extend(tink_streams_StreamBase.prototype,{
	get_depleted: function() {
		return true;
	}
	,forEach: function(handler) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Conclusion.Depleted));
	}
});
var tink_io_Source = {};
tink_io_Source.toNodeStream = function(this1) {
	var native = new js_node_stream_PassThrough();
	var source = tink_io_Source.chunked(this1);
	var write = null;
	write = function() {
		source.forEach(tink_streams_Handler.ofSafe(function(chunk) {
			var native1 = native;
			var b = chunk.toBytes();
			var data = b.b;
			if(native1.write(js_node_buffer_Buffer.from(data.buffer,data.byteOffset,b.length))) {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Resume));
			} else {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Finish));
			}
		})).handle(function(o) {
			switch(o._hx_index) {
			case 0:
				source = o.rest;
				break;
			case 2:
				native.emit("error",new Error(o.error.message));
				break;
			case 3:
				native.removeListener("drain",write);
				native.end();
				break;
			}
		});
	};
	var f = write;
	var time_ms = 1;
	var tmp = function() {
		return haxe_Timer.delay(f,time_ms);
	};
	native.on("drain",tmp);
	write();
	return native;
};
tink_io_Source.chunked = function(this1) {
	return this1;
};
tink_io_Source.concatAll = function(s) {
	return s.reduce(tink_Chunk.EMPTY,tink_streams_Reducer.ofSafe(function(res,cur) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_ReductionStep.Progress(tink_Chunk.concat(res,cur))));
	}));
};
tink_io_Source.pipeTo = function(this1,target,options) {
	return target.consume(this1,options);
};
tink_io_Source.ofError = function(e) {
	return tink_streams_Stream.ofError(e);
};
var tink_io_RealSourceTools = function() { };
$hxClasses["tink.io.RealSourceTools"] = tink_io_RealSourceTools;
tink_io_RealSourceTools.__name__ = true;
tink_io_RealSourceTools.all = function(s) {
	return tink_core_Future.map(tink_io_Source.concatAll(s),function(o) {
		switch(o._hx_index) {
		case 1:
			return tink_core_Outcome.Failure(o.error);
		case 2:
			return tink_core_Outcome.Success(o.result);
		}
	});
};
tink_io_RealSourceTools.parseStream = function(s,p) {
	return tink_io_StreamParser.parseStream(s,p);
};
var tink_io_ParseResult = $hxEnums["tink.io.ParseResult"] = { __ename__:true,__constructs__:null
	,Parsed: ($_=function(data,rest) { return {_hx_index:0,data:data,rest:rest,__enum__:"tink.io.ParseResult",toString:$estr}; },$_._hx_name="Parsed",$_.__params__ = ["data","rest"],$_)
	,Invalid: ($_=function(e,rest) { return {_hx_index:1,e:e,rest:rest,__enum__:"tink.io.ParseResult",toString:$estr}; },$_._hx_name="Invalid",$_.__params__ = ["e","rest"],$_)
	,Broke: ($_=function(e) { return {_hx_index:2,e:e,__enum__:"tink.io.ParseResult",toString:$estr}; },$_._hx_name="Broke",$_.__params__ = ["e"],$_)
};
tink_io_ParseResult.__constructs__ = [tink_io_ParseResult.Parsed,tink_io_ParseResult.Invalid,tink_io_ParseResult.Broke];
var tink_io_StreamParser = {};
tink_io_StreamParser.doParse = function(source,p,consume,finish) {
	var cursor = tink_Chunk.EMPTY.getCursor();
	var resume = true;
	var mk = function(source) {
		if(cursor.currentPos < cursor.length) {
			return source.prepend(new tink_streams_Single(new tink_core__$Lazy_LazyConst(cursor.right())));
		} else {
			return source;
		}
	};
	var flush = function() {
		var _g = cursor.flush();
		if(_g.getLength() == 0) {
			return tink_io_Source.EMPTY;
		} else {
			return new tink_streams_Single(new tink_core__$Lazy_LazyConst(_g));
		}
	};
	return tink_core_Future.flatMap(source.forEach(tink_streams_Handler.ofUnknown(function(chunk) {
		if(chunk.getLength() == 0) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Resume));
		}
		cursor.shift(chunk);
		return tink_core_Future.async(function(cb) {
			var next = null;
			next = function() {
				cursor.shift();
				var lastPos = cursor.currentPos;
				var _g = p.progress(cursor);
				switch(_g._hx_index) {
				case 0:
					if(lastPos != cursor.currentPos && cursor.currentPos < cursor.length) {
						next();
					} else {
						cb(tink_streams_Handled.Resume);
					}
					break;
				case 1:
					consume(_g.r).handle(function(o) {
						resume = o.resume;
						if(resume) {
							if(lastPos != cursor.currentPos && cursor.currentPos < cursor.length) {
								next();
							} else {
								cb(tink_streams_Handled.Resume);
							}
						} else {
							cb(tink_streams_Handled.Finish);
						}
					});
					break;
				case 2:
					cb(tink_streams_Handled.Clog(_g.e));
					break;
				}
			};
			next();
		});
	})),function(c) {
		switch(c._hx_index) {
		case 0:
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Parsed(finish(),mk(c.rest))));
		case 1:
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Invalid(c.error,mk(c.at))));
		case 2:
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Broke(c.error)));
		case 3:
			if(cursor.currentPos < cursor.length) {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Parsed(finish(),mk(new tink_streams_Single(new tink_core__$Lazy_LazyConst(tink_Chunk.EMPTY))))));
			} else if(!resume) {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Parsed(finish(),flush())));
			} else {
				var _g = p.eof(cursor);
				switch(_g._hx_index) {
				case 0:
					return tink_core_Future.map(consume(_g.data),function(_) {
						return tink_io_ParseResult.Parsed(finish(),flush());
					});
				case 1:
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_io_ParseResult.Invalid(_g.failure,flush())));
				}
			}
			break;
		}
	});
};
tink_io_StreamParser.parse = function(s,p) {
	var res = null;
	return tink_io_StreamParser.doParse(s,p,function(r) {
		res = r;
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst({ resume : false}));
	},function() {
		return res;
	});
};
tink_io_StreamParser.parseStream = function(s,p) {
	var next = null;
	next = function(step) {
		if(s.get_depleted()) {
			step(tink_streams_Step.End);
		} else {
			tink_io_StreamParser.parse(s,p).handle(function(o) {
				switch(o._hx_index) {
				case 0:
					s = o.rest;
					step(tink_streams_Step.Link(o.data,tink_streams_Generator.stream(next)));
					break;
				case 1:
					step(tink_streams_Step.Fail(o.e));
					break;
				case 2:
					step(tink_streams_Step.Fail(o.e));
					break;
				}
			});
		}
	};
	return tink_streams_Generator.stream(next);
};
var tink_streams_Generator = function(upcoming) {
	tink_streams_StreamBase.call(this);
	this.upcoming = upcoming;
};
$hxClasses["tink.streams.Generator"] = tink_streams_Generator;
tink_streams_Generator.__name__ = true;
tink_streams_Generator.stream = function(step) {
	return new tink_streams_Generator(tink_core_Future.async(step));
};
tink_streams_Generator.__super__ = tink_streams_StreamBase;
tink_streams_Generator.prototype = $extend(tink_streams_StreamBase.prototype,{
	forEach: function(handler) {
		var _gthis = this;
		return tink_core_Future.async(function(cb) {
			_gthis.upcoming.handle(function(e) {
				switch(e._hx_index) {
				case 0:
					var then = e.next;
					handler(e.value).handle(function(s) {
						switch(s._hx_index) {
						case 0:
							cb(tink_streams_Conclusion.Halted(_gthis));
							break;
						case 1:
							cb(tink_streams_Conclusion.Halted(then));
							break;
						case 2:
							then.forEach(handler).handle(cb);
							break;
						case 3:
							cb(tink_streams_Conclusion.Clogged(s.e,_gthis));
							break;
						}
					});
					break;
				case 1:
					cb(tink_streams_Conclusion.Failed(e.e));
					break;
				case 2:
					cb(tink_streams_Conclusion.Depleted);
					break;
				}
			});
		});
	}
});
var tink_io_nodejs_NodejsSink = function(target) {
	this.target = target;
};
$hxClasses["tink.io.nodejs.NodejsSink"] = tink_io_nodejs_NodejsSink;
tink_io_nodejs_NodejsSink.__name__ = true;
tink_io_nodejs_NodejsSink.wrap = function(name,native) {
	return new tink_io_nodejs_NodejsSink(new tink_io_nodejs_WrappedWritable(name,native));
};
tink_io_nodejs_NodejsSink.__super__ = tink_io_SinkBase;
tink_io_nodejs_NodejsSink.prototype = $extend(tink_io_SinkBase.prototype,{
	consume: function(source,options) {
		var _gthis = this;
		var ret = source.forEach(tink_streams_Handler.ofUnknown(function(c) {
			return tink_core_Future.map(_gthis.target.write(c),function(w) {
				switch(w._hx_index) {
				case 0:
					if(w.data) {
						return tink_streams_Handled.Resume;
					} else {
						return tink_streams_Handled.BackOff;
					}
					break;
				case 1:
					return tink_streams_Handled.Clog(w.failure);
				}
			});
		}));
		if(options != null && options.end) {
			ret.handle(function(end) {
				_gthis.target.end();
			});
		}
		return tink_core_Future.map(ret,function(c) {
			return tink_io_PipeResultTools.toResult(c,null);
		});
	}
});
var tink_io_nodejs_NodejsSource = function(target) {
	tink_streams_Generator.call(this,tink_core_Future.async(function(cb) {
		target.read().handle(function(o) {
			var cb1 = cb;
			var tmp;
			switch(o._hx_index) {
			case 0:
				var _g = o.data;
				tmp = _g == null ? tink_streams_Step.End : tink_streams_Step.Link(_g,new tink_io_nodejs_NodejsSource(target));
				break;
			case 1:
				tmp = tink_streams_Step.Fail(o.failure);
				break;
			}
			cb1(tmp);
		});
	},true));
};
$hxClasses["tink.io.nodejs.NodejsSource"] = tink_io_nodejs_NodejsSource;
tink_io_nodejs_NodejsSource.__name__ = true;
tink_io_nodejs_NodejsSource.wrap = function(name,native,chunkSize,onEnd) {
	return new tink_io_nodejs_NodejsSource(new tink_io_nodejs_WrappedReadable(name,native,chunkSize,onEnd));
};
tink_io_nodejs_NodejsSource.__super__ = tink_streams_Generator;
tink_io_nodejs_NodejsSource.prototype = $extend(tink_streams_Generator.prototype,{
});
var tink_io_nodejs_WrappedReadable = function(name,native,chunkSize,onEnd) {
	this.name = name;
	this.native = native;
	this.chunkSize = chunkSize;
	var this1 = tink_core_Future.async(function(cb) {
		native.once("end",function() {
			cb(tink_core_Outcome.Success(null));
		});
		native.once("error",function(e) {
			cb(tink_core_Outcome.Failure(new tink_core_TypedError(null,"" + e.code + " - Failed reading from " + name + " because " + e.message,{ fileName : "tink/io/nodejs/WrappedReadable.hx", lineNumber : 22, className : "tink.io.nodejs.WrappedReadable", methodName : "new"})));
		});
	});
	this1.eager();
	this.end = this1;
	if(onEnd != null) {
		this.end.handle(function() {
			process.nextTick(onEnd);
		});
	}
};
$hxClasses["tink.io.nodejs.WrappedReadable"] = tink_io_nodejs_WrappedReadable;
tink_io_nodejs_WrappedReadable.__name__ = true;
tink_io_nodejs_WrappedReadable.prototype = {
	read: function() {
		var _gthis = this;
		return tink_core_Future.first(tink_core_Future.async(function(cb) {
			var attempt = null;
			attempt = function() {
				try {
					var _g = _gthis.native.read(_gthis.chunkSize);
					if(_g == null) {
						_gthis.native.once("readable",attempt);
					} else {
						var buf = typeof(_g) == "string" ? new js_node_buffer_Buffer(_g) : _g;
						cb(tink_core_Outcome.Success(new tink_chunk_nodejs_BufferChunk(buf)));
					}
				} catch( _g ) {
					var _g1 = haxe_Exception.caught(_g).unwrap();
					cb(tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Error while reading from " + _gthis.name,_g1,{ fileName : "tink/io/nodejs/WrappedReadable.hx", lineNumber : 48, className : "tink.io.nodejs.WrappedReadable", methodName : "read"})));
				}
			};
			attempt();
		}),this.end);
	}
};
var tink_io_nodejs_WrappedWritable = function(name,native) {
	this.name = name;
	this.native = native;
	this.ended = tink_core_Future.async(function(cb) {
		native.once("end",function() {
			cb(tink_core_Outcome.Success(false));
		});
		native.once("finish",function() {
			cb(tink_core_Outcome.Success(false));
		});
		native.once("close",function() {
			cb(tink_core_Outcome.Success(false));
		});
		native.on("error",function(e) {
			cb(tink_core_Outcome.Failure(new tink_core_TypedError(null,"" + e.code + ": " + e.message,{ fileName : "tink/io/nodejs/WrappedWritable.hx", lineNumber : 24, className : "tink.io.nodejs.WrappedWritable", methodName : "new"})));
		});
	});
};
$hxClasses["tink.io.nodejs.WrappedWritable"] = tink_io_nodejs_WrappedWritable;
tink_io_nodejs_WrappedWritable.__name__ = true;
tink_io_nodejs_WrappedWritable.prototype = {
	end: function() {
		var didEnd = false;
		var this1 = this.ended.handle(function() {
			didEnd = true;
		});
		if(this1 != null) {
			this1.cancel();
		}
		if(didEnd) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(false)));
		}
		this.native.end();
		return tink_core_Promise.next(this.ended,function(_) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(true)));
		});
	}
	,write: function(chunk) {
		var _gthis = this;
		return tink_core_Future.first(tink_core_Future.async(function(cb) {
			if(chunk.getLength() == 0) {
				cb(tink_core_Outcome.Success(true));
				return;
			}
			var buf;
			if(js_node_buffer_Buffer.isBuffer(chunk.buffer)) {
				buf = chunk.buffer;
			} else {
				var b = chunk.toBytes();
				var data = b.b;
				buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,b.length);
			}
			var _g = cb;
			var a1 = tink_core_Outcome.Success(true);
			var tmp = function() {
				_g(a1);
			};
			_gthis.native.write(buf,null,tmp);
		}),this.ended);
	}
};
var tink_json_JsonString = {};
var tink_json_Parser2 = function() {
	tink_json_BasicParser.call(this);
};
$hxClasses["tink.json.Parser2"] = tink_json_Parser2;
tink_json_Parser2.__name__ = true;
tink_json_Parser2.__super__ = tink_json_BasicParser;
tink_json_Parser2.prototype = $extend(tink_json_BasicParser.prototype,{
	process0: function() {
		var _gthis = this;
		var cur = 0;
		var v_auth = null;
		var v_host = null;
		var hasv_host = false;
		var v_lmtp = null;
		var v_port = null;
		var v_secure = null;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 97:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 117) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 116) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 104) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										var _g1 = this.source.charCodeAt(this.pos++);
										var _hx_tmp1;
										if(_g1 == 58 == true) {
											break;
										} else {
											_hx_tmp1 = _g1 < 33;
											if(_hx_tmp1 != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var v_auth1;
									if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
										this.pos += 4;
										while(this.source.charCodeAt(this.pos) < 33) this.pos++;
										v_auth1 = true;
									} else {
										v_auth1 = false;
									}
									v_auth = v_auth1 ? null : this.process1();
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var tmp;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp = true;
									} else {
										tmp = false;
									}
									if(!tmp) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
					}
					break;
				case 104:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 111) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 115) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 116) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										var _g2 = this.source.charCodeAt(this.pos++);
										var _hx_tmp2;
										if(_g2 == 58 == true) {
											break;
										} else {
											_hx_tmp2 = _g2 < 33;
											if(_hx_tmp2 != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var this1 = this.parseString();
									v_host = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
									hasv_host = true;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var tmp1;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp1 = true;
									} else {
										tmp1 = false;
									}
									if(!tmp1) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
					}
					break;
				case 108:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 109) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 116) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 112) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										var _g3 = this.source.charCodeAt(this.pos++);
										var _hx_tmp3;
										if(_g3 == 58 == true) {
											break;
										} else {
											_hx_tmp3 = _g3 < 33;
											if(_hx_tmp3 != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var v_lmtp1;
									if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
										this.pos += 4;
										while(this.source.charCodeAt(this.pos) < 33) this.pos++;
										v_lmtp1 = true;
									} else {
										v_lmtp1 = false;
									}
									v_lmtp = v_lmtp1 ? null : this.parseBool();
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var tmp2;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp2 = true;
									} else {
										tmp2 = false;
									}
									if(!tmp2) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
					}
					break;
				case 112:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 111) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 114) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 116) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										var _g4 = this.source.charCodeAt(this.pos++);
										var _hx_tmp4;
										if(_g4 == 58 == true) {
											break;
										} else {
											_hx_tmp4 = _g4 < 33;
											if(_hx_tmp4 != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var v_port1;
									if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
										this.pos += 4;
										while(this.source.charCodeAt(this.pos) < 33) this.pos++;
										v_port1 = true;
									} else {
										v_port1 = false;
									}
									v_port = v_port1 ? null : parseInt(this.parseNumber());
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var tmp3;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp3 = true;
									} else {
										tmp3 = false;
									}
									if(!tmp3) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
					}
					break;
				case 115:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 101) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 99) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 117) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 114) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 101) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 34) {
											while(true) {
												var _g5 = this.source.charCodeAt(this.pos++);
												var _hx_tmp5;
												if(_g5 == 58 == true) {
													break;
												} else {
													_hx_tmp5 = _g5 < 33;
													if(_hx_tmp5 != true) {
														this.die("expected " + ":");
													}
												}
											}
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											var v_secure1;
											if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
												this.pos += 4;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												v_secure1 = true;
											} else {
												v_secure1 = false;
											}
											v_secure = v_secure1 ? null : this.parseBool();
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											var tmp4;
											if(this.source.charCodeAt(this.pos) == 44) {
												this.pos += 1;
												tmp4 = true;
											} else {
												tmp4 = false;
											}
											if(!tmp4) {
												break _hx_loop4;
											} else {
												continue;
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g6 = this.source.charCodeAt(this.pos++);
					var _hx_tmp6;
					if(_g6 == 58 == true) {
						break;
					} else {
						_hx_tmp6 = _g6 < 33;
						if(_hx_tmp6 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp5;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp5 = true;
				} else {
					tmp5 = false;
				}
				if(!tmp5) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { auth : v_auth, host : hasv_host ? v_host : __missing__("host"), lmtp : v_lmtp, port : v_port, secure : v_secure};
	}
	,process1: function() {
		var _gthis = this;
		var cur = 0;
		var v_pass = null;
		var hasv_pass = false;
		var v_user = null;
		var hasv_user = false;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 112:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 97) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 115) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 115) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										var _g1 = this.source.charCodeAt(this.pos++);
										var _hx_tmp1;
										if(_g1 == 58 == true) {
											break;
										} else {
											_hx_tmp1 = _g1 < 33;
											if(_hx_tmp1 != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var this1 = this.parseString();
									v_pass = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
									hasv_pass = true;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var tmp;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp = true;
									} else {
										tmp = false;
									}
									if(!tmp) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
					}
					break;
				case 117:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 115) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 101) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 114) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										var _g2 = this.source.charCodeAt(this.pos++);
										var _hx_tmp2;
										if(_g2 == 58 == true) {
											break;
										} else {
											_hx_tmp2 = _g2 < 33;
											if(_hx_tmp2 != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var this2 = this.parseString();
									v_user = this2.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this2 : JSON.parse("\"" + this2 + "\"");
									hasv_user = true;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									var tmp1;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp1 = true;
									} else {
										tmp1 = false;
									}
									if(!tmp1) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g3 = this.source.charCodeAt(this.pos++);
					var _hx_tmp3;
					if(_g3 == 58 == true) {
						break;
					} else {
						_hx_tmp3 = _g3 < 33;
						if(_hx_tmp3 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp2;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp2 = true;
				} else {
					tmp2 = false;
				}
				if(!tmp2) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { pass : hasv_pass ? v_pass : __missing__("pass"), user : hasv_user ? v_user : __missing__("user")};
	}
	,parse: function(source) {
		if(this.afterParsing.length > 0) {
			this.afterParsing = [];
		}
		this.init(source);
		var ret = this.process0();
		var _g = 0;
		var _g1 = this.afterParsing;
		while(_g < _g1.length) _g1[_g++]();
		if(this.afterParsing.length > 0) {
			this.afterParsing = [];
		}
		return ret;
	}
});
var tink_json_Parser3 = function() {
	tink_json_BasicParser.call(this);
};
$hxClasses["tink.json.Parser3"] = tink_json_Parser3;
tink_json_Parser3.__name__ = true;
tink_json_Parser3.__super__ = tink_json_BasicParser;
tink_json_Parser3.prototype = $extend(tink_json_BasicParser.prototype,{
	process0: function() {
		var _gthis = this;
		var cur = 0;
		var v_apiKey = null;
		var hasv_apiKey = false;
		var v_apiSecret = null;
		var hasv_apiSecret = false;
		var v_options = null;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 97:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 112) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 105) {
							cur = this.source.charCodeAt(this.pos++);
							switch(cur) {
							case 75:
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 101) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 121) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 34) {
											while(true) {
												var _g1 = this.source.charCodeAt(this.pos++);
												var _hx_tmp1;
												if(_g1 == 58 == true) {
													break;
												} else {
													_hx_tmp1 = _g1 < 33;
													if(_hx_tmp1 != true) {
														this.die("expected " + ":");
													}
												}
											}
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											var this1 = this.parseString();
											v_apiKey = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
											hasv_apiKey = true;
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											var tmp;
											if(this.source.charCodeAt(this.pos) == 44) {
												this.pos += 1;
												tmp = true;
											} else {
												tmp = false;
											}
											if(!tmp) {
												break _hx_loop4;
											} else {
												continue;
											}
										}
									}
								}
								break;
							case 83:
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 101) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 99) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 114) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 101) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 116) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 34) {
														while(true) {
															var _g2 = this.source.charCodeAt(this.pos++);
															var _hx_tmp2;
															if(_g2 == 58 == true) {
																break;
															} else {
																_hx_tmp2 = _g2 < 33;
																if(_hx_tmp2 != true) {
																	this.die("expected " + ":");
																}
															}
														}
														while(this.source.charCodeAt(this.pos) < 33) this.pos++;
														var this2 = this.parseString();
														v_apiSecret = this2.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this2 : JSON.parse("\"" + this2 + "\"");
														hasv_apiSecret = true;
														while(this.source.charCodeAt(this.pos) < 33) this.pos++;
														var tmp1;
														if(this.source.charCodeAt(this.pos) == 44) {
															this.pos += 1;
															tmp1 = true;
														} else {
															tmp1 = false;
														}
														if(!tmp1) {
															break _hx_loop4;
														} else {
															continue;
														}
													}
												}
											}
										}
									}
								}
								break;
							}
						}
					}
					break;
				case 111:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 112) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 116) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 105) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 111) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 110) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 115) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 34) {
												while(true) {
													var _g3 = this.source.charCodeAt(this.pos++);
													var _hx_tmp3;
													if(_g3 == 58 == true) {
														break;
													} else {
														_hx_tmp3 = _g3 < 33;
														if(_hx_tmp3 != true) {
															this.die("expected " + ":");
														}
													}
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var v_options1;
												if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
													this.pos += 4;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_options1 = true;
												} else {
													v_options1 = false;
												}
												v_options = v_options1 ? null : this.process1();
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var tmp2;
												if(this.source.charCodeAt(this.pos) == 44) {
													this.pos += 1;
													tmp2 = true;
												} else {
													tmp2 = false;
												}
												if(!tmp2) {
													break _hx_loop4;
												} else {
													continue;
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g4 = this.source.charCodeAt(this.pos++);
					var _hx_tmp4;
					if(_g4 == 58 == true) {
						break;
					} else {
						_hx_tmp4 = _g4 < 33;
						if(_hx_tmp4 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp3;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp3 = true;
				} else {
					tmp3 = false;
				}
				if(!tmp3) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		var __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { apiKey : hasv_apiKey ? v_apiKey : __missing__("apiKey"), apiSecret : hasv_apiSecret ? v_apiSecret : __missing__("apiSecret"), options : v_options};
	}
	,process1: function() {
		var _gthis = this;
		var cur = 0;
		var v_perform_api_call = null;
		var v_proxyUrl = null;
		var v_timeout = null;
		var v_url = null;
		var v_version = null;
		var __start__ = this.pos;
		while(true) {
			var _g = this.source.charCodeAt(this.pos++);
			var _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		var tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					var _g = this.source.charCodeAt(this.pos++);
					var _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 112:
					cur = this.source.charCodeAt(this.pos++);
					switch(cur) {
					case 101:
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 114) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 102) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 111) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 114) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 109) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 95) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 97) {
													cur = this.source.charCodeAt(this.pos++);
													if(cur == 112) {
														cur = this.source.charCodeAt(this.pos++);
														if(cur == 105) {
															cur = this.source.charCodeAt(this.pos++);
															if(cur == 95) {
																cur = this.source.charCodeAt(this.pos++);
																if(cur == 99) {
																	cur = this.source.charCodeAt(this.pos++);
																	if(cur == 97) {
																		cur = this.source.charCodeAt(this.pos++);
																		if(cur == 108) {
																			cur = this.source.charCodeAt(this.pos++);
																			if(cur == 108) {
																				cur = this.source.charCodeAt(this.pos++);
																				if(cur == 34) {
																					while(true) {
																						var _g1 = this.source.charCodeAt(this.pos++);
																						var _hx_tmp1;
																						if(_g1 == 58 == true) {
																							break;
																						} else {
																							_hx_tmp1 = _g1 < 33;
																							if(_hx_tmp1 != true) {
																								this.die("expected " + ":");
																							}
																						}
																					}
																					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																					var v_perform_api_call1;
																					if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
																						this.pos += 4;
																						while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																						v_perform_api_call1 = true;
																					} else {
																						v_perform_api_call1 = false;
																					}
																					v_perform_api_call = v_perform_api_call1 ? null : this.parseBool();
																					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
																					var tmp;
																					if(this.source.charCodeAt(this.pos) == 44) {
																						this.pos += 1;
																						tmp = true;
																					} else {
																						tmp = false;
																					}
																					if(!tmp) {
																						break _hx_loop4;
																					} else {
																						continue;
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
						break;
					case 114:
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 111) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 120) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 121) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 85) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 114) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 108) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 34) {
													while(true) {
														var _g2 = this.source.charCodeAt(this.pos++);
														var _hx_tmp2;
														if(_g2 == 58 == true) {
															break;
														} else {
															_hx_tmp2 = _g2 < 33;
															if(_hx_tmp2 != true) {
																this.die("expected " + ":");
															}
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var v_proxyUrl1;
													if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
														this.pos += 4;
														while(this.source.charCodeAt(this.pos) < 33) this.pos++;
														v_proxyUrl1 = true;
													} else {
														v_proxyUrl1 = false;
													}
													if(v_proxyUrl1) {
														v_proxyUrl = null;
													} else {
														var this1 = this.parseString();
														v_proxyUrl = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													var tmp1;
													if(this.source.charCodeAt(this.pos) == 44) {
														this.pos += 1;
														tmp1 = true;
													} else {
														tmp1 = false;
													}
													if(!tmp1) {
														break _hx_loop4;
													} else {
														continue;
													}
												}
											}
										}
									}
								}
							}
						}
						break;
					}
					break;
				case 116:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 105) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 109) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 101) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 111) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 117) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 116) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 34) {
												while(true) {
													var _g3 = this.source.charCodeAt(this.pos++);
													var _hx_tmp3;
													if(_g3 == 58 == true) {
														break;
													} else {
														_hx_tmp3 = _g3 < 33;
														if(_hx_tmp3 != true) {
															this.die("expected " + ":");
														}
													}
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var v_timeout1;
												if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
													this.pos += 4;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_timeout1 = true;
												} else {
													v_timeout1 = false;
												}
												v_timeout = v_timeout1 ? null : parseFloat(this.parseNumber());
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var tmp2;
												if(this.source.charCodeAt(this.pos) == 44) {
													this.pos += 1;
													tmp2 = true;
												} else {
													tmp2 = false;
												}
												if(!tmp2) {
													break _hx_loop4;
												} else {
													continue;
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				case 117:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 114) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 108) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 34) {
								while(true) {
									var _g4 = this.source.charCodeAt(this.pos++);
									var _hx_tmp4;
									if(_g4 == 58 == true) {
										break;
									} else {
										_hx_tmp4 = _g4 < 33;
										if(_hx_tmp4 != true) {
											this.die("expected " + ":");
										}
									}
								}
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								var v_url1;
								if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
									this.pos += 4;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									v_url1 = true;
								} else {
									v_url1 = false;
								}
								if(v_url1) {
									v_url = null;
								} else {
									var this2 = this.parseString();
									v_url = this2.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this2 : JSON.parse("\"" + this2 + "\"");
								}
								while(this.source.charCodeAt(this.pos) < 33) this.pos++;
								var tmp3;
								if(this.source.charCodeAt(this.pos) == 44) {
									this.pos += 1;
									tmp3 = true;
								} else {
									tmp3 = false;
								}
								if(!tmp3) {
									break _hx_loop4;
								} else {
									continue;
								}
							}
						}
					}
					break;
				case 118:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 101) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 114) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 115) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 105) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 111) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 110) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 34) {
												while(true) {
													var _g5 = this.source.charCodeAt(this.pos++);
													var _hx_tmp5;
													if(_g5 == 58 == true) {
														break;
													} else {
														_hx_tmp5 = _g5 < 33;
														if(_hx_tmp5 != true) {
															this.die("expected " + ":");
														}
													}
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var v_version1;
												if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
													this.pos += 4;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_version1 = true;
												} else {
													v_version1 = false;
												}
												if(v_version1) {
													v_version = null;
												} else {
													var this3 = this.parseString();
													v_version = this3.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this3 : JSON.parse("\"" + this3 + "\"");
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												var tmp4;
												if(this.source.charCodeAt(this.pos) == 44) {
													this.pos += 1;
													tmp4 = true;
												} else {
													tmp4 = false;
												}
												if(!tmp4) {
													break _hx_loop4;
												} else {
													continue;
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					var _g6 = this.source.charCodeAt(this.pos++);
					var _hx_tmp6;
					if(_g6 == 58 == true) {
						break;
					} else {
						_hx_tmp6 = _g6 < 33;
						if(_hx_tmp6 != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				var tmp5;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp5 = true;
				} else {
					tmp5 = false;
				}
				if(!tmp5) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			var tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		return { perform_api_call : v_perform_api_call, proxyUrl : v_proxyUrl, timeout : v_timeout, url : v_url, version : v_version};
	}
	,parse: function(source) {
		if(this.afterParsing.length > 0) {
			this.afterParsing = [];
		}
		this.init(source);
		var ret = this.process0();
		var _g = 0;
		var _g1 = this.afterParsing;
		while(_g < _g1.length) _g1[_g++]();
		if(this.afterParsing.length > 0) {
			this.afterParsing = [];
		}
		return ret;
	}
});
var tink_json_Value = $hxEnums["tink.json.Value"] = { __ename__:true,__constructs__:null
	,VNumber: ($_=function(f) { return {_hx_index:0,f:f,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VNumber",$_.__params__ = ["f"],$_)
	,VString: ($_=function(s) { return {_hx_index:1,s:s,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VString",$_.__params__ = ["s"],$_)
	,VNull: {_hx_name:"VNull",_hx_index:2,__enum__:"tink.json.Value",toString:$estr}
	,VBool: ($_=function(b) { return {_hx_index:3,b:b,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VBool",$_.__params__ = ["b"],$_)
	,VArray: ($_=function(a) { return {_hx_index:4,a:a,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VArray",$_.__params__ = ["a"],$_)
	,VObject: ($_=function(a) { return {_hx_index:5,a:a,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VObject",$_.__params__ = ["a"],$_)
};
tink_json_Value.__constructs__ = [tink_json_Value.VNumber,tink_json_Value.VString,tink_json_Value.VNull,tink_json_Value.VBool,tink_json_Value.VArray,tink_json_Value.VObject];
var tink_json_BasicWriter = function() {
	this.plugins = new tink_core_Annex(this);
};
$hxClasses["tink.json.BasicWriter"] = tink_json_BasicWriter;
tink_json_BasicWriter.__name__ = true;
tink_json_BasicWriter.prototype = {
	init: function() {
		this.buf = "";
	}
};
var tink_json_Writer0 = function() {
	tink_json_BasicWriter.call(this);
};
$hxClasses["tink.json.Writer0"] = tink_json_Writer0;
tink_json_Writer0.__name__ = true;
tink_json_Writer0.__super__ = tink_json_BasicWriter;
tink_json_Writer0.prototype = $extend(tink_json_BasicWriter.prototype,{
	process0: function(value) {
		var __first = true;
		this.buf += String.fromCodePoint(123);
		var value1 = value.result;
		if(__first) {
			__first = false;
		} else {
			this.buf += String.fromCodePoint(44);
		}
		this.buf += "\"result\":";
		var s = JSON.stringify(value1);
		this.buf += s;
		this.buf += String.fromCodePoint(125);
	}
	,write: function(value) {
		this.init();
		this.process0(value);
		return this.buf.toString();
	}
});
var tink_querystring_Pairs = {};
tink_querystring_Pairs.ofIterable = function(i) {
	return $getIterator(i);
};
var tink_querystring_ParserBase = function(onError,pos) {
	this.pos = pos;
	this.onError = onError == null ? $bind(this,this.abort) : onError;
};
$hxClasses["tink.querystring.ParserBase"] = tink_querystring_ParserBase;
tink_querystring_ParserBase.__name__ = true;
tink_querystring_ParserBase.prototype = {
	init: function(input,name,value) {
		this.params = new haxe_ds_StringMap();
		this.exists = new haxe_ds_StringMap();
		if(input != null) {
			while(input.hasNext()) {
				var pair = input.next();
				var name1 = name(pair);
				var this1 = this.params;
				var v = value(pair);
				this1.h[name1] = v;
				var end = name1.length;
				while(end > 0) {
					name1 = name1.substring(0,end);
					if(this.exists.h[name1]) {
						break;
					}
					this.exists.h[name1] = true;
					var _g = name1.lastIndexOf("[",end - 1);
					var _g1 = name1.lastIndexOf(".",end - 1);
					if(_g > _g1) {
						end = _g;
					} else {
						end = _g1;
					}
				}
			}
		}
	}
	,abort: function(e) {
		throw haxe_Exception.thrown(this.error("" + e.reason + " for " + e.name));
	}
	,parse: function(input) {
		throw haxe_Exception.thrown(tink_core_TypedError.withData(501,"not implemented",this.pos,{ fileName : "tink/querystring/Parser.hx", lineNumber : 58, className : "tink.querystring.ParserBase", methodName : "parse"}));
	}
	,tryParse: function(input) {
		try {
			return tink_core_Outcome.Success(this.parse(input));
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(((_g1) instanceof tink_core_TypedError)) {
				return tink_core_Outcome.Failure(_g1);
			} else {
				return tink_core_Outcome.Failure(this.error("Parse Error",_g1));
			}
		}
	}
	,error: function(reason,data) {
		return tink_core_TypedError.withData(422,reason,data,this.pos);
	}
	,fail: function(field,reason) {
		tink_core_Callback.invoke(this.onError,{ name : field, reason : reason});
		return null;
	}
	,missing: function(name) {
		return this.fail(name,"Missing value");
	}
};
var tink_querystring_Parser0 = function(onError,pos) {
	tink_querystring_ParserBase.call(this,onError,pos);
};
$hxClasses["tink.querystring.Parser0"] = tink_querystring_Parser0;
tink_querystring_Parser0.__name__ = true;
tink_querystring_Parser0.__super__ = tink_querystring_ParserBase;
tink_querystring_Parser0.prototype = $extend(tink_querystring_ParserBase.prototype,{
	getName: function(p) {
		return p.name;
	}
	,getValue: function(p) {
		return p.value;
	}
	,parse: function(input) {
		this.init(input,$bind(this,this.getName),$bind(this,this.getValue));
		return this.process0("");
	}
	,process0: function(prefix) {
		var prefix1 = prefix == "" ? "data" : prefix + ".data";
		return { _2 : this.exists.h[prefix1] ? this.params.h[prefix1] : this.missing(prefix1)};
	}
});
var tink_serialize_DecoderBase = function() {
};
$hxClasses["tink.serialize.DecoderBase"] = tink_serialize_DecoderBase;
tink_serialize_DecoderBase.__name__ = true;
tink_serialize_DecoderBase.prototype = {
	reset: function(data) {
		this.wrapped = data;
		this.input = new haxe_io_BytesInput(data);
		this.src = data.b.bufferValue;
		this.pos = 0;
		this.max = data.length;
	}
	,bytes: function() {
		var l = this.dynInt();
		var ret = this.wrapped.sub(this.pos,l);
		this.pos += l;
		return ret;
	}
	,string: function() {
		var end = this.pos;
		while(this.src.bytes[end] != 255) ++end;
		var ret = this.wrapped.getString(this.pos,end - this.pos);
		this.pos = end + 1;
		return ret;
	}
	,int32: function() {
		this.input.set_position(this.pos);
		var ret = this.input.readInt32();
		this.pos = this.input.pos;
		return ret;
	}
	,dynInt: function() {
		var ret = this.src.bytes[this.pos++];
		if(ret < 128) {
			return ret;
		} else if(ret < 192) {
			return (ret ^ 128) << 8 | this.src.bytes[this.pos++];
		} else if(ret < 224) {
			return (ret ^ 192) << 16 | this.src.bytes[this.pos++] << 8 | this.src.bytes[this.pos++];
		} else {
			return this.int32();
		}
	}
};
var tink_serialize_Decoder0 = function() {
	tink_serialize_DecoderBase.call(this);
};
$hxClasses["tink.serialize.Decoder0"] = tink_serialize_Decoder0;
tink_serialize_Decoder0.__name__ = true;
tink_serialize_Decoder0.__super__ = tink_serialize_DecoderBase;
tink_serialize_Decoder0.prototype = $extend(tink_serialize_DecoderBase.prototype,{
	process0: function() {
		var tmp;
		if(this.src.bytes[this.pos] == 255 && ++this.pos > 0) {
			tmp = null;
		} else {
			var _g = [];
			var _g1 = 0;
			var _g2 = this.dynInt();
			while(_g1 < _g2) {
				++_g1;
				_g.push(this.process1());
			}
			tmp = _g;
		}
		var tmp1 = this.src.bytes[this.pos] == 255 && ++this.pos > 0 ? null : tink_chunk_ByteChunk.of(this.bytes());
		var tmp2;
		if(this.src.bytes[this.pos] == 255 && ++this.pos > 0) {
			tmp2 = null;
		} else {
			var _g = [];
			var _g1 = 0;
			var _g2 = this.dynInt();
			while(_g1 < _g2) {
				++_g1;
				_g.push(this.process1());
			}
			tmp2 = _g;
		}
		var tmp3 = this.process1();
		var tmp4 = this.src.bytes[this.pos] == 255 && ++this.pos > 0 ? null : this.src.bytes[this.pos++] == 1;
		var tmp5 = this.string();
		var _g = [];
		var _g1 = 0;
		var _g2 = this.dynInt();
		while(_g1 < _g2) {
			++_g1;
			_g.push(this.process1());
		}
		return { bcc : tmp, body : tmp1, cc : tmp2, from : tmp3, hasAttachments : tmp4, subject : tmp5, to : _g};
	}
	,process1: function() {
		return { address : this.string(), name : this.src.bytes[this.pos] == 255 && ++this.pos > 0 ? null : this.string()};
	}
	,decode: function(data) {
		this.reset(data);
		return this.process0();
	}
});
var tink_serialize_Decoder1 = function() {
	tink_serialize_DecoderBase.call(this);
};
$hxClasses["tink.serialize.Decoder1"] = tink_serialize_Decoder1;
tink_serialize_Decoder1.__name__ = true;
tink_serialize_Decoder1.__super__ = tink_serialize_DecoderBase;
tink_serialize_Decoder1.prototype = $extend(tink_serialize_DecoderBase.prototype,{
	process0: function() {
		return { uuid : this.string()};
	}
	,decode: function(data) {
		this.reset(data);
		return this.process0();
	}
});
var tink_serialize_Decoder2 = function() {
	tink_serialize_DecoderBase.call(this);
};
$hxClasses["tink.serialize.Decoder2"] = tink_serialize_Decoder2;
tink_serialize_Decoder2.__name__ = true;
tink_serialize_Decoder2.__super__ = tink_serialize_DecoderBase;
tink_serialize_Decoder2.prototype = $extend(tink_serialize_DecoderBase.prototype,{
	process0: function() {
		return { chunk : this.bytes(), currentFile : this.string()};
	}
	,decode: function(data) {
		this.reset(data);
		return this.process0();
	}
});
var tink_serialize__$Encoder_BytesBuffer = function() {
	this.prev = [];
	this.index = 0;
	this.cur = tink_serialize__$Encoder_BytesBuffer.alloc();
};
$hxClasses["tink.serialize._Encoder.BytesBuffer"] = tink_serialize__$Encoder_BytesBuffer;
tink_serialize__$Encoder_BytesBuffer.__name__ = true;
tink_serialize__$Encoder_BytesBuffer.alloc = function() {
	var _g = tink_serialize__$Encoder_BytesBuffer.POOL.pop();
	if(_g == null) {
		return new Uint8Array(65536);
	} else {
		return _g;
	}
};
tink_serialize__$Encoder_BytesBuffer.prototype = {
	next: function() {
		this.prev.push(this.cur);
		this.cur = tink_serialize__$Encoder_BytesBuffer.alloc();
	}
	,getBytes: function() {
		var out = new Uint8Array(this.index + 65536 * this.prev.length);
		var pos = 0;
		var _g = 0;
		var _g1 = this.prev;
		while(_g < _g1.length) {
			var buf = _g1[_g];
			++_g;
			var _g2 = 0;
			while(_g2 < buf.length) out[pos++] = buf[_g2++];
		}
		var _g = 0;
		var _g1 = this.index;
		while(_g < _g1) out[pos++] = this.cur[_g++];
		this.free();
		return haxe_io_Bytes.ofData(out);
	}
	,free: function() {
		tink_serialize__$Encoder_BytesBuffer.POOL.push(this.cur);
		var _g = 0;
		var _g1 = this.prev;
		while(_g < _g1.length) tink_serialize__$Encoder_BytesBuffer.POOL.push(_g1[_g++]);
	}
};
var tink_serialize_EncoderBase = function() {
};
$hxClasses["tink.serialize.EncoderBase"] = tink_serialize_EncoderBase;
tink_serialize_EncoderBase.__name__ = true;
tink_serialize_EncoderBase.prototype = {
	reset: function() {
		this.out = new tink_serialize__$Encoder_BytesBuffer();
	}
};
var tink_serialize_Encoder0 = function() {
	tink_serialize_EncoderBase.call(this);
};
$hxClasses["tink.serialize.Encoder0"] = tink_serialize_Encoder0;
tink_serialize_Encoder0.__name__ = true;
tink_serialize_Encoder0.__super__ = tink_serialize_EncoderBase;
tink_serialize_Encoder0.prototype = $extend(tink_serialize_EncoderBase.prototype,{
	process0: function(data) {
		var _this = this.out;
		_this.cur[_this.index++] = data.done ? 1 : 0;
		if(_this.index == 65536) {
			_this.next();
		}
	}
	,encode: function(data) {
		this.reset();
		this.process0(data);
		return this.out.getBytes();
	}
});
var tink_streams_Stream = {};
tink_streams_Stream.single = function(i) {
	return new tink_streams_Single(new tink_core__$Lazy_LazyConst(i));
};
tink_streams_Stream.future = function(f) {
	return new tink_streams_FutureStream(f);
};
tink_streams_Stream.ofError = function(e) {
	return new tink_streams__$Stream_ErrorStream(e);
};
var tink_streams_RegroupStatus = $hxEnums["tink.streams.RegroupStatus"] = { __ename__:true,__constructs__:null
	,Flowing: {_hx_name:"Flowing",_hx_index:0,__enum__:"tink.streams.RegroupStatus",toString:$estr}
	,Errored: ($_=function(e) { return {_hx_index:1,e:e,__enum__:"tink.streams.RegroupStatus",toString:$estr}; },$_._hx_name="Errored",$_.__params__ = ["e"],$_)
	,Ended: {_hx_name:"Ended",_hx_index:2,__enum__:"tink.streams.RegroupStatus",toString:$estr}
};
tink_streams_RegroupStatus.__constructs__ = [tink_streams_RegroupStatus.Flowing,tink_streams_RegroupStatus.Errored,tink_streams_RegroupStatus.Ended];
var tink_streams_RegroupResult = $hxEnums["tink.streams.RegroupResult"] = { __ename__:true,__constructs__:null
	,Converted: ($_=function(data,untouched) { return {_hx_index:0,data:data,untouched:untouched,__enum__:"tink.streams.RegroupResult",toString:$estr}; },$_._hx_name="Converted",$_.__params__ = ["data","untouched"],$_)
	,Terminated: ($_=function(data) { return {_hx_index:1,data:data,__enum__:"tink.streams.RegroupResult",toString:$estr}; },$_._hx_name="Terminated",$_.__params__ = ["data"],$_)
	,Untouched: {_hx_name:"Untouched",_hx_index:2,__enum__:"tink.streams.RegroupResult",toString:$estr}
	,Errored: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"tink.streams.RegroupResult",toString:$estr}; },$_._hx_name="Errored",$_.__params__ = ["e"],$_)
};
tink_streams_RegroupResult.__constructs__ = [tink_streams_RegroupResult.Converted,tink_streams_RegroupResult.Terminated,tink_streams_RegroupResult.Untouched,tink_streams_RegroupResult.Errored];
var tink_streams_Regrouper = {};
tink_streams_Regrouper.ofFuncSync = function(f) {
	return { apply : function(i,s) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(f(i,s)));
	}};
};
var tink_streams__$Stream_CompoundStream = function(parts) {
	tink_streams_StreamBase.call(this);
	this.parts = parts;
};
$hxClasses["tink.streams._Stream.CompoundStream"] = tink_streams__$Stream_CompoundStream;
tink_streams__$Stream_CompoundStream.__name__ = true;
tink_streams__$Stream_CompoundStream.consumeParts = function(parts,handler,cb) {
	if(parts.length == 0) {
		cb(tink_streams_Conclusion.Depleted);
	} else {
		parts[0].forEach(handler).handle(function(o) {
			switch(o._hx_index) {
			case 0:
				parts = parts.slice();
				parts[0] = o.rest;
				cb(tink_streams_Conclusion.Halted(new tink_streams__$Stream_CompoundStream(parts)));
				break;
			case 1:
				var _g = o.at;
				if(_g.get_depleted()) {
					parts = parts.slice(1);
				} else {
					parts = parts.slice();
					parts[0] = _g;
				}
				cb(tink_streams_Conclusion.Clogged(o.error,new tink_streams__$Stream_CompoundStream(parts)));
				break;
			case 2:
				cb(tink_streams_Conclusion.Failed(o.error));
				break;
			case 3:
				tink_streams__$Stream_CompoundStream.consumeParts(parts.slice(1),handler,cb);
				break;
			}
		});
	}
};
tink_streams__$Stream_CompoundStream.of = function(streams) {
	var ret = [];
	var _g = 0;
	while(_g < streams.length) streams[_g++].decompose(ret);
	if(ret.length == 0) {
		return tink_streams_Empty.inst;
	} else {
		return new tink_streams__$Stream_CompoundStream(ret);
	}
};
tink_streams__$Stream_CompoundStream.__super__ = tink_streams_StreamBase;
tink_streams__$Stream_CompoundStream.prototype = $extend(tink_streams_StreamBase.prototype,{
	get_depleted: function() {
		switch(this.parts.length) {
		case 0:
			return true;
		case 1:
			return this.parts[0].get_depleted();
		default:
			return false;
		}
	}
	,decompose: function(into) {
		var _g = 0;
		var _g1 = this.parts;
		while(_g < _g1.length) _g1[_g++].decompose(into);
	}
	,forEach: function(handler) {
		var parts = this.parts;
		var handler1 = handler;
		return tink_core_Future.async(function(cb) {
			tink_streams__$Stream_CompoundStream.consumeParts(parts,handler1,cb);
		});
	}
});
var tink_streams__$Stream_RegroupStream = function(source,f,prev,buf) {
	if(prev == null) {
		prev = tink_streams_Empty.inst;
	}
	if(buf == null) {
		buf = [];
	}
	var ret = null;
	var terminated = false;
	tink_streams__$Stream_CompoundStream.call(this,[prev,tink_streams_Stream.future(tink_core_Future.map(source.forEach(tink_streams_Handler.ofUnknown(function(item) {
		buf.push(item);
		return tink_core_Future.map(f.apply(buf,tink_streams_RegroupStatus.Flowing),function(o) {
			switch(o._hx_index) {
			case 0:
				ret = o.data;
				buf = o.untouched;
				return tink_streams_Handled.Finish;
			case 1:
				var _g = o.data;
				ret = _g._hx_index == 0 ? _g.v : tink_core_Lazy.get(new tink_core__$Lazy_LazyFunc(tink_streams_Empty.make));
				terminated = true;
				return tink_streams_Handled.Finish;
			case 2:
				return tink_streams_Handled.Resume;
			case 3:
				return tink_streams_Handled.Clog(o.e);
			}
		});
	})),function(o) {
		switch(o._hx_index) {
		case 0:
			if(terminated) {
				return ret;
			} else {
				return new tink_streams__$Stream_RegroupStream(o.rest,f,ret,buf);
			}
			break;
		case 1:
			return new tink_streams__$Stream_ErrorStream(o.error);
		case 2:
			return tink_streams_Stream.ofError(o.error);
		case 3:
			if(buf.length == 0) {
				return tink_streams_Empty.inst;
			} else {
				return tink_streams_Stream.future(tink_core_Future.map(f.apply(buf,tink_streams_RegroupStatus.Ended),function(o) {
					switch(o._hx_index) {
					case 0:
						return o.data;
					case 1:
						var _g = o.data;
						if(_g._hx_index == 0) {
							return _g.v;
						} else {
							return tink_core_Lazy.get(new tink_core__$Lazy_LazyFunc(tink_streams_Empty.make));
						}
						break;
					case 2:
						return tink_streams_Empty.inst;
					case 3:
						return tink_streams_Stream.ofError(o.e);
					}
				}));
			}
			break;
		}
	}))]);
};
$hxClasses["tink.streams._Stream.RegroupStream"] = tink_streams__$Stream_RegroupStream;
tink_streams__$Stream_RegroupStream.__name__ = true;
tink_streams__$Stream_RegroupStream.__super__ = tink_streams__$Stream_CompoundStream;
tink_streams__$Stream_RegroupStream.prototype = $extend(tink_streams__$Stream_CompoundStream.prototype,{
});
var tink_streams_Handled = $hxEnums["tink.streams.Handled"] = { __ename__:true,__constructs__:null
	,BackOff: {_hx_name:"BackOff",_hx_index:0,__enum__:"tink.streams.Handled",toString:$estr}
	,Finish: {_hx_name:"Finish",_hx_index:1,__enum__:"tink.streams.Handled",toString:$estr}
	,Resume: {_hx_name:"Resume",_hx_index:2,__enum__:"tink.streams.Handled",toString:$estr}
	,Clog: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"tink.streams.Handled",toString:$estr}; },$_._hx_name="Clog",$_.__params__ = ["e"],$_)
};
tink_streams_Handled.__constructs__ = [tink_streams_Handled.BackOff,tink_streams_Handled.Finish,tink_streams_Handled.Resume,tink_streams_Handled.Clog];
var tink_streams_Conclusion = $hxEnums["tink.streams.Conclusion"] = { __ename__:true,__constructs__:null
	,Halted: ($_=function(rest) { return {_hx_index:0,rest:rest,__enum__:"tink.streams.Conclusion",toString:$estr}; },$_._hx_name="Halted",$_.__params__ = ["rest"],$_)
	,Clogged: ($_=function(error,at) { return {_hx_index:1,error:error,at:at,__enum__:"tink.streams.Conclusion",toString:$estr}; },$_._hx_name="Clogged",$_.__params__ = ["error","at"],$_)
	,Failed: ($_=function(error) { return {_hx_index:2,error:error,__enum__:"tink.streams.Conclusion",toString:$estr}; },$_._hx_name="Failed",$_.__params__ = ["error"],$_)
	,Depleted: {_hx_name:"Depleted",_hx_index:3,__enum__:"tink.streams.Conclusion",toString:$estr}
};
tink_streams_Conclusion.__constructs__ = [tink_streams_Conclusion.Halted,tink_streams_Conclusion.Clogged,tink_streams_Conclusion.Failed,tink_streams_Conclusion.Depleted];
var tink_streams_ReductionStep = $hxEnums["tink.streams.ReductionStep"] = { __ename__:true,__constructs__:null
	,Progress: ($_=function(result) { return {_hx_index:0,result:result,__enum__:"tink.streams.ReductionStep",toString:$estr}; },$_._hx_name="Progress",$_.__params__ = ["result"],$_)
	,Crash: ($_=function(e) { return {_hx_index:1,e:e,__enum__:"tink.streams.ReductionStep",toString:$estr}; },$_._hx_name="Crash",$_.__params__ = ["e"],$_)
};
tink_streams_ReductionStep.__constructs__ = [tink_streams_ReductionStep.Progress,tink_streams_ReductionStep.Crash];
var tink_streams_Reduction = $hxEnums["tink.streams.Reduction"] = { __ename__:true,__constructs__:null
	,Crashed: ($_=function(error,at) { return {_hx_index:0,error:error,at:at,__enum__:"tink.streams.Reduction",toString:$estr}; },$_._hx_name="Crashed",$_.__params__ = ["error","at"],$_)
	,Failed: ($_=function(error) { return {_hx_index:1,error:error,__enum__:"tink.streams.Reduction",toString:$estr}; },$_._hx_name="Failed",$_.__params__ = ["error"],$_)
	,Reduced: ($_=function(result) { return {_hx_index:2,result:result,__enum__:"tink.streams.Reduction",toString:$estr}; },$_._hx_name="Reduced",$_.__params__ = ["result"],$_)
};
tink_streams_Reduction.__constructs__ = [tink_streams_Reduction.Crashed,tink_streams_Reduction.Failed,tink_streams_Reduction.Reduced];
var tink_streams__$Stream_ErrorStream = function(error) {
	tink_streams_StreamBase.call(this);
	this.error = error;
};
$hxClasses["tink.streams._Stream.ErrorStream"] = tink_streams__$Stream_ErrorStream;
tink_streams__$Stream_ErrorStream.__name__ = true;
tink_streams__$Stream_ErrorStream.__super__ = tink_streams_StreamBase;
tink_streams__$Stream_ErrorStream.prototype = $extend(tink_streams_StreamBase.prototype,{
	forEach: function(handler) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Conclusion.Failed(this.error)));
	}
});
var tink_streams_Mapping = {};
tink_streams_Mapping.ofPlain = function(f) {
	return { apply : function(i,_) {
		return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_RegroupResult.Converted(tink_streams_Stream.single(f(i[0])))));
	}};
};
var tink_streams_Single = function(value) {
	tink_streams_StreamBase.call(this);
	this.value = value;
};
$hxClasses["tink.streams.Single"] = tink_streams_Single;
tink_streams_Single.__name__ = true;
tink_streams_Single.__super__ = tink_streams_StreamBase;
tink_streams_Single.prototype = $extend(tink_streams_StreamBase.prototype,{
	forEach: function(handle) {
		var _gthis = this;
		return tink_core_Future.map(handle(tink_core_Lazy.get(this.value)),function(step) {
			switch(step._hx_index) {
			case 0:
				return tink_streams_Conclusion.Halted(_gthis);
			case 1:
				return tink_streams_Conclusion.Halted(tink_streams_Empty.inst);
			case 2:
				return tink_streams_Conclusion.Depleted;
			case 3:
				return tink_streams_Conclusion.Clogged(step.e,_gthis);
			}
		});
	}
});
var tink_streams_Handler = {};
tink_streams_Handler.ofSafe = function(f) {
	return f;
};
tink_streams_Handler.ofUnknown = function(f) {
	return f;
};
var tink_streams_Reducer = {};
tink_streams_Reducer.ofSafe = function(f) {
	return f;
};
var tink_streams_FutureStream = function(f) {
	tink_streams_StreamBase.call(this);
	this.f = f;
};
$hxClasses["tink.streams.FutureStream"] = tink_streams_FutureStream;
tink_streams_FutureStream.__name__ = true;
tink_streams_FutureStream.__super__ = tink_streams_StreamBase;
tink_streams_FutureStream.prototype = $extend(tink_streams_StreamBase.prototype,{
	forEach: function(handler) {
		var _gthis = this;
		return tink_core_Future.async(function(cb) {
			_gthis.f.handle(function(s) {
				s.forEach(handler).handle(cb);
			});
		});
	}
});
var tink_streams_Step = $hxEnums["tink.streams.Step"] = { __ename__:true,__constructs__:null
	,Link: ($_=function(value,next) { return {_hx_index:0,value:value,next:next,__enum__:"tink.streams.Step",toString:$estr}; },$_._hx_name="Link",$_.__params__ = ["value","next"],$_)
	,Fail: ($_=function(e) { return {_hx_index:1,e:e,__enum__:"tink.streams.Step",toString:$estr}; },$_._hx_name="Fail",$_.__params__ = ["e"],$_)
	,End: {_hx_name:"End",_hx_index:2,__enum__:"tink.streams.Step",toString:$estr}
};
tink_streams_Step.__constructs__ = [tink_streams_Step.Link,tink_streams_Step.Fail,tink_streams_Step.End];
var tink_streams_SignalStream = function(signal) {
	var this1 = tink_core_Future.map(tink_core_Signal.nextTime(signal),function(o) {
		switch(o._hx_index) {
		case 0:
			return tink_streams_Step.Link(o.data,new tink_streams_SignalStream(signal));
		case 1:
			return tink_streams_Step.Fail(o.e);
		case 2:
			return tink_streams_Step.End;
		}
	});
	this1.eager();
	tink_streams_Generator.call(this,this1);
};
$hxClasses["tink.streams.SignalStream"] = tink_streams_SignalStream;
tink_streams_SignalStream.__name__ = true;
tink_streams_SignalStream.__super__ = tink_streams_Generator;
tink_streams_SignalStream.prototype = $extend(tink_streams_Generator.prototype,{
});
var tink_streams_Yield = $hxEnums["tink.streams.Yield"] = { __ename__:true,__constructs__:null
	,Data: ($_=function(data) { return {_hx_index:0,data:data,__enum__:"tink.streams.Yield",toString:$estr}; },$_._hx_name="Data",$_.__params__ = ["data"],$_)
	,Fail: ($_=function(e) { return {_hx_index:1,e:e,__enum__:"tink.streams.Yield",toString:$estr}; },$_._hx_name="Fail",$_.__params__ = ["e"],$_)
	,End: {_hx_name:"End",_hx_index:2,__enum__:"tink.streams.Yield",toString:$estr}
};
tink_streams_Yield.__constructs__ = [tink_streams_Yield.Data,tink_streams_Yield.Fail,tink_streams_Yield.End];
var tink_url_Query = {};
tink_url_Query.toMap = function(this1) {
	var _g = new haxe_ds_StringMap();
	var p = new tink_url__$Query_QueryStringParser(this1,"&","=",0);
	while(p.hasNext()) {
		var p1 = p.next();
		_g.h[p1.name.toString()] = p1.value;
	}
	return _g;
};
var tink_web_routing_Context = function(parent,accepts,request,depth,parts,params) {
	this.parent = parent;
	this.accepts = accepts;
	this.request = request;
	this.depth = depth;
	this.parts = parts;
	this.params = params;
};
$hxClasses["tink.web.routing.Context"] = tink_web_routing_Context;
tink_web_routing_Context.__name__ = true;
tink_web_routing_Context.ofRequest = function(request) {
	return new tink_web_routing_Context(null,tink_web_routing_Context.parseAcceptHeader(request.header),request,0,tink_url_Path.parts(request.header.url.path),tink_url_Query.toMap(request.header.url.query));
};
tink_web_routing_Context.parseAcceptHeader = function(h) {
	var _g = h.get("accept");
	if(_g.length == 0) {
		return tink_web_routing_Context.acceptsAll;
	} else {
		var accepted_h = Object.create(null);
		var _g1 = 0;
		while(_g1 < _g.length) {
			var _g2 = 0;
			var _g3 = tink_http_HeaderValue.parse(_g[_g1++]);
			while(_g2 < _g3.length) accepted_h[_g3[_g2++].value] = true;
		}
		if(accepted_h["*/*"]) {
			return tink_web_routing_Context.acceptsAll;
		} else {
			return function(t) {
				return Object.prototype.hasOwnProperty.call(accepted_h,t);
			};
		}
	}
};
tink_web_routing_Context.acceptsAll = function(s) {
	return true;
};
tink_web_routing_Context.prototype = {
	headers: function() {
		var _g = [];
		var _this = this.request.header.fields;
		var _g1_current = 0;
		while(_g1_current < _this.length) {
			var f = _this[_g1_current++];
			_g.push(new tink_core_NamedWith(f.name,f.value));
		}
		return tink_querystring_Pairs.ofIterable(_g);
	}
	,part: function(index) {
		if(this.depth + index >= this.parts.length) {
			return "";
		} else {
			return tink_url_Portion.stringly(this.parts[this.depth + index]);
		}
	}
};
var tink_web_routing_Response = {};
tink_web_routing_Response.binary = function(code,contentType,bytes,headers) {
	if(code == null) {
		code = 200;
	}
	return tink_http_OutgoingResponse.blob(code,tink_chunk_ByteChunk.of(bytes),contentType,headers);
};
tink_web_routing_Response.textual = function(code,contentType,string,headers) {
	if(code == null) {
		code = 200;
	}
	return tink_web_routing_Response.binary(code,contentType,haxe_io_Bytes.ofString(string),headers);
};
var tink_web_routing_Router0 = function(target) {
	this.target = target;
};
$hxClasses["tink.web.routing.Router0"] = tink_web_routing_Router0;
tink_web_routing_Router0.__name__ = true;
tink_web_routing_Router0.prototype = {
	route: function(ctx) {
		var l = ctx.parts.length - ctx.depth;
		var _g = ctx.request.header.method;
		var _g1 = ctx.part(0);
		var _g2 = l > 0;
		var _g3 = l > 1;
		if(_g == "POST") {
			switch(_g1) {
			case "dropoff":
				if(_g2 == true) {
					if(_g3 == false) {
						return this.dropoff(ctx);
					} else {
						var this1 = ctx.request.header.url;
						return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(404,"Not Found: [" + ctx.request.header.method + "] " + (this1.query == null ? this1.path : (this1.path == null ? "null" : this1.path) + "?" + (this1.query == null ? "null" : this1.query)),{ fileName : "src/DuckJet.hx", lineNumber : 48, className : "tink.web.routing.Router0", methodName : "route"}))));
					}
				} else {
					var this1 = ctx.request.header.url;
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(404,"Not Found: [" + ctx.request.header.method + "] " + (this1.query == null ? this1.path : (this1.path == null ? "null" : this1.path) + "?" + (this1.query == null ? "null" : this1.query)),{ fileName : "src/DuckJet.hx", lineNumber : 48, className : "tink.web.routing.Router0", methodName : "route"}))));
				}
				break;
			case "send":
				if(_g2 == true) {
					if(_g3 == false) {
						return this.send(ctx);
					} else {
						var this1 = ctx.request.header.url;
						return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(404,"Not Found: [" + ctx.request.header.method + "] " + (this1.query == null ? this1.path : (this1.path == null ? "null" : this1.path) + "?" + (this1.query == null ? "null" : this1.query)),{ fileName : "src/DuckJet.hx", lineNumber : 48, className : "tink.web.routing.Router0", methodName : "route"}))));
					}
				} else {
					var this1 = ctx.request.header.url;
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(404,"Not Found: [" + ctx.request.header.method + "] " + (this1.query == null ? this1.path : (this1.path == null ? "null" : this1.path) + "?" + (this1.query == null ? "null" : this1.query)),{ fileName : "src/DuckJet.hx", lineNumber : 48, className : "tink.web.routing.Router0", methodName : "route"}))));
				}
				break;
			default:
				var this1 = ctx.request.header.url;
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(404,"Not Found: [" + ctx.request.header.method + "] " + (this1.query == null ? this1.path : (this1.path == null ? "null" : this1.path) + "?" + (this1.query == null ? "null" : this1.query)),{ fileName : "src/DuckJet.hx", lineNumber : 48, className : "tink.web.routing.Router0", methodName : "route"}))));
			}
		} else if(_g1 == "dropoff") {
			if(_g2 == true) {
				if(_g3 == false) {
					return this.dropoff(ctx);
				} else {
					var this1 = ctx.request.header.url;
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(404,"Not Found: [" + ctx.request.header.method + "] " + (this1.query == null ? this1.path : (this1.path == null ? "null" : this1.path) + "?" + (this1.query == null ? "null" : this1.query)),{ fileName : "src/DuckJet.hx", lineNumber : 48, className : "tink.web.routing.Router0", methodName : "route"}))));
				}
			} else {
				var this1 = ctx.request.header.url;
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(404,"Not Found: [" + ctx.request.header.method + "] " + (this1.query == null ? this1.path : (this1.path == null ? "null" : this1.path) + "?" + (this1.query == null ? "null" : this1.query)),{ fileName : "src/DuckJet.hx", lineNumber : 48, className : "tink.web.routing.Router0", methodName : "route"}))));
			}
		} else {
			var this1 = ctx.request.header.url;
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(404,"Not Found: [" + ctx.request.header.method + "] " + (this1.query == null ? this1.path : (this1.path == null ? "null" : this1.path) + "?" + (this1.query == null ? "null" : this1.query)),{ fileName : "src/DuckJet.hx", lineNumber : 48, className : "tink.web.routing.Router0", methodName : "route"}))));
		}
	}
	,send: function(ctx) {
		var _gthis = this;
		return tink_core_Promise.next(new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(new tink_querystring_Parser0(null,{ fileName : "src/duck_jet/Api.hx", lineNumber : 53, className : "tink.web.routing.Router0", methodName : "send"}).tryParse(ctx.headers()))),function(__header__) {
			var _g = ctx.request.body;
			return tink_core_Promise.next(_gthis.target.send(__header__._2,_g._hx_index == 0 ? _g.source : tink_io_Source.ofError(new tink_core_TypedError(501,"not implemented",{ fileName : "tink/web/routing/Context.hx", lineNumber : 47, className : "tink.web.routing.Context", methodName : "get_rawBody"}))),function(__data__) {
				if(ctx.accepts("application/json")) {
					return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(tink_web_routing_Response.textual(200,"application/json",new tink_json_Writer0().write(__data__),[]))));
				}
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(new tink_core_TypedError(415,"Unsupported Media Type",{ fileName : "src/duck_jet/Api.hx", lineNumber : 53, className : "tink.web.routing.Router0", methodName : "send"}))));
			});
		});
	}
	,dropoff: function(ctx) {
		return tink_core_Promise.next(tink_core_Future.map(this.target.dropoff(ctx),tink_core_Outcome.Success),function(v) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(v)));
		});
	}
};
var tink_websocket_Frame = {};
tink_websocket_Frame.fromChunk = function(v) {
	return tink_websocket_FrameBase.fromChunk(v);
};
tink_websocket_Frame.ofMessage = function(message,maskingKey) {
	var opcode = 0;
	var payload = null;
	switch(message._hx_index) {
	case 0:
		opcode = 1;
		payload = haxe_io_Bytes.ofString(message.v);
		break;
	case 1:
		opcode = 2;
		payload = message.b.toBytes();
		break;
	case 2:
		opcode = 8;
		break;
	case 3:
		opcode = 9;
		payload = message.b.toBytes();
		break;
	case 4:
		opcode = 10;
		payload = message.b.toBytes();
		break;
	}
	if(maskingKey != null) {
		payload = tink_websocket_Masker.mask(tink_chunk_ByteChunk.of(payload),maskingKey).toBytes();
	}
	return new tink_websocket_FrameBase(true,false,false,false,opcode,maskingKey == null ? tink_websocket_Payload.Unmasked(tink_chunk_ByteChunk.of(payload)) : tink_websocket_Payload.Masked(tink_chunk_ByteChunk.of(payload),maskingKey));
};
var tink_websocket_FrameBase = function(fin,rsv1,rsv2,rsv3,opcode,payload) {
	this.fin = fin;
	this.rsv1 = rsv1;
	this.rsv2 = rsv2;
	this.rsv3 = rsv3;
	this.opcode = opcode;
	this.payload = payload;
};
$hxClasses["tink.websocket.FrameBase"] = tink_websocket_FrameBase;
tink_websocket_FrameBase.__name__ = true;
tink_websocket_FrameBase.fromChunk = function(chunk) {
	var bytes = chunk.toBytes();
	var data = bytes.b.bufferValue;
	var length = bytes.length;
	var pos = 0;
	pos = 1;
	var c = data.bytes[0];
	var fin = (c >> 7 & 1) == 1;
	var rsv1 = (c >> 6 & 1) == 1;
	var rsv2 = (c >> 5 & 1) == 1;
	var rsv3 = (c >> 4 & 1) == 1;
	var opcode = c & 15;
	pos = 2;
	var c = data.bytes[1];
	var mask = c >> 7 == 1;
	switch(c & 127) {
	case 126:
		pos = 3;
		pos = 4;
		break;
	case 127:
		pos = 3;
		pos = 4;
		pos = 5;
		pos = 6;
		pos = 7;
		pos = 8;
		pos = 9;
		pos = 10;
		break;
	default:
	}
	var maskingKey;
	if(mask) {
		var key = bytes.sub(pos,4);
		pos += 4;
		maskingKey = tink_websocket_MaskingKey.ofChunk(tink_chunk_ByteChunk.of(key));
	} else {
		maskingKey = null;
	}
	var payload = bytes.sub(pos,length - pos);
	return new tink_websocket_FrameBase(fin,rsv1,rsv2,rsv3,opcode,maskingKey == null ? tink_websocket_Payload.Unmasked(tink_chunk_ByteChunk.of(payload)) : tink_websocket_Payload.Masked(tink_chunk_ByteChunk.of(payload),maskingKey));
};
tink_websocket_FrameBase.prototype = {
	toChunk: function() {
		var out = new haxe_io_BytesBuffer();
		out.addByte((this.fin ? 128 : 0) | (this.rsv1 ? 64 : 0) | (this.rsv2 ? 32 : 0) | (this.rsv3 ? 16 : 0) | this.opcode);
		var tmp = this.payload._hx_index == 0 ? 128 : 0;
		var tmp1;
		var _g = this.payload;
		var tmp2;
		switch(_g._hx_index) {
		case 0:
			tmp2 = _g.masked.getLength();
			break;
		case 1:
			tmp2 = _g.unmasked.getLength();
			break;
		}
		if(tmp2 < 126) {
			var _g = this.payload;
			switch(_g._hx_index) {
			case 0:
				tmp1 = _g.masked.getLength();
				break;
			case 1:
				tmp1 = _g.unmasked.getLength();
				break;
			}
		} else {
			tmp1 = 126;
		}
		out.addByte(tmp | tmp1);
		var _g = this.payload;
		var tmp;
		switch(_g._hx_index) {
		case 0:
			tmp = _g.masked.getLength();
			break;
		case 1:
			tmp = _g.unmasked.getLength();
			break;
		}
		if(tmp >= 126) {
			var _g = this.payload;
			var tmp;
			switch(_g._hx_index) {
			case 0:
				tmp = _g.masked.getLength();
				break;
			case 1:
				tmp = _g.unmasked.getLength();
				break;
			}
			out.addByte(tmp >> 8 & 255);
			var _g = this.payload;
			var tmp;
			switch(_g._hx_index) {
			case 0:
				tmp = _g.masked.getLength();
				break;
			case 1:
				tmp = _g.unmasked.getLength();
				break;
			}
			out.addByte(tmp & 255);
		}
		if(this.payload._hx_index == 0) {
			var _g = this.payload;
			var this1;
			switch(_g._hx_index) {
			case 0:
				this1 = _g.key;
				break;
			case 1:
				this1 = null;
				break;
			}
			out.addBytes(this1.toBytes(),0,4);
		}
		var payload = this.get_maskedPayload();
		out.addBytes(payload.toBytes(),0,payload.getLength());
		return tink_chunk_ByteChunk.of(out.getBytes());
	}
	,get_maskedPayload: function() {
		var _g = this.payload;
		switch(_g._hx_index) {
		case 0:
			return _g.masked;
		case 1:
			return _g.unmasked;
		}
	}
	,get_unmaskedPayload: function() {
		var _g = this.payload;
		switch(_g._hx_index) {
		case 0:
			return tink_websocket_Masker.mask(_g.masked,_g.key);
		case 1:
			return _g.unmasked;
		}
	}
};
var tink_websocket_Payload = $hxEnums["tink.websocket.Payload"] = { __ename__:true,__constructs__:null
	,Masked: ($_=function(masked,key) { return {_hx_index:0,masked:masked,key:key,__enum__:"tink.websocket.Payload",toString:$estr}; },$_._hx_name="Masked",$_.__params__ = ["masked","key"],$_)
	,Unmasked: ($_=function(unmasked) { return {_hx_index:1,unmasked:unmasked,__enum__:"tink.websocket.Payload",toString:$estr}; },$_._hx_name="Unmasked",$_.__params__ = ["unmasked"],$_)
};
tink_websocket_Payload.__constructs__ = [tink_websocket_Payload.Masked,tink_websocket_Payload.Unmasked];
var tink_websocket_Masker = function() { };
$hxClasses["tink.websocket.Masker"] = tink_websocket_Masker;
tink_websocket_Masker.__name__ = true;
tink_websocket_Masker.mask = function(unmasked,key) {
	var masked = new haxe_io_Bytes(new ArrayBuffer(unmasked.getLength()));
	var data = unmasked.toBytes().b.bufferValue;
	var key1 = key.toBytes().b.bufferValue;
	var _g = 0;
	var _g1 = unmasked.getLength();
	while(_g < _g1) {
		var i = _g++;
		masked.b[i] = data.bytes[i] ^ key1.bytes[i % 4];
	}
	return tink_chunk_ByteChunk.of(masked);
};
var tink_websocket_IncomingHandshakeRequestHeader = {};
tink_websocket_IncomingHandshakeRequestHeader.validate = function(this1) {
	var errors = [];
	var ensureHeader = function(name,check) {
		var _g = this1.byName(name.toLowerCase());
		switch(_g._hx_index) {
		case 0:
			var _g1 = _g.data;
			if(!check(_g1)) {
				errors.push("Invalid header \"" + name + ": " + _g1 + "\"");
			}
			break;
		case 1:
			errors.push("Header " + name + " not found");
			break;
		}
	};
	ensureHeader("upgrade",function(v) {
		return v == "websocket";
	});
	ensureHeader("connection",function(v) {
		if(v != null) {
			var _g = [];
			var _g1 = 0;
			var _g2 = v.split(",");
			while(_g1 < _g2.length) _g.push(StringTools.trim(_g2[_g1++]).toLowerCase());
			return _g.indexOf("upgrade") != -1;
		} else {
			return false;
		}
	});
	ensureHeader("sec-websocket-key",function(v) {
		return v != null;
	});
	ensureHeader("sec-websocket-version",function(v) {
		return v == "13";
	});
	if(errors.length > 0) {
		return tink_core_Outcome.Failure(tink_core_TypedError.withData(null,"Invalid request header",errors,{ fileName : "tink/websocket/IncomingHandshakeRequestHeader.hx", lineNumber : 30, className : "tink.websocket._IncomingHandshakeRequestHeader.IncomingHandshakeRequestHeader_Impl_", methodName : "validate"}));
	} else {
		return tink_core_Outcome.Success(null);
	}
};
var tink_websocket_MaskingKey = {};
tink_websocket_MaskingKey.ofChunk = function(c) {
	if(c.getLength() != 4) {
		throw haxe_Exception.thrown("Invalid key length, should be 4");
	}
	return c;
};
var tink_websocket_Message = $hxEnums["tink.websocket.Message"] = { __ename__:true,__constructs__:null
	,Text: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"tink.websocket.Message",toString:$estr}; },$_._hx_name="Text",$_.__params__ = ["v"],$_)
	,Binary: ($_=function(b) { return {_hx_index:1,b:b,__enum__:"tink.websocket.Message",toString:$estr}; },$_._hx_name="Binary",$_.__params__ = ["b"],$_)
};
tink_websocket_Message.__constructs__ = [tink_websocket_Message.Text,tink_websocket_Message.Binary];
var tink_websocket_OutgoingHandshakeResponseHeader = function(key,fields) {
	var _gthis = this;
	tink_http_ResponseHeaderBase.call(this,101,"Switching Protocols",fields);
	this.accept = haxe_crypto_Base64.encode(haxe_crypto_Sha1.make(haxe_io_Bytes.ofString(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")));
	var fillHeader = function(name,value) {
		if(_gthis.byName(name.toLowerCase())._hx_index == 1) {
			_gthis.fields.push(new tink_http_HeaderField(name.toLowerCase(),value));
		}
	};
	fillHeader("upgrade","websocket");
	fillHeader("connection","upgrade");
	fillHeader("sec-websocket-accept",this.accept);
};
$hxClasses["tink.websocket.OutgoingHandshakeResponseHeader"] = tink_websocket_OutgoingHandshakeResponseHeader;
tink_websocket_OutgoingHandshakeResponseHeader.__name__ = true;
tink_websocket_OutgoingHandshakeResponseHeader.__super__ = tink_http_ResponseHeaderBase;
tink_websocket_OutgoingHandshakeResponseHeader.prototype = $extend(tink_http_ResponseHeaderBase.prototype,{
});
var tink_websocket_Parser = function() {
	this.required = 0;
	this.length = 0;
	this.reset();
};
$hxClasses["tink.websocket.Parser"] = tink_websocket_Parser;
tink_websocket_Parser.__name__ = true;
tink_websocket_Parser.prototype = {
	eof: function(rest) {
		var _g = this.progress(rest);
		switch(_g._hx_index) {
		case 0:
			return tink_core_Outcome.Failure(new tink_core_TypedError(null,"Unexpected end of input",{ fileName : "tink/websocket/Parser.hx", lineNumber : 23, className : "tink.websocket.Parser", methodName : "eof"}));
		case 1:
			return tink_core_Outcome.Success(_g.r);
		case 2:
			return tink_core_Outcome.Failure(_g.e);
		}
	}
	,progress: function(cursor) {
		if(cursor.length < this.required) {
			return tink_io_ParseStep.Progressed;
		}
		switch(this.length) {
		case -2:case -1:
			this.length = 0;
			var _g = 0;
			var _g1 = this.required;
			while(_g < _g1) {
				++_g;
				this.length = this.length << 8 | cursor.currentByte;
				cursor.next();
			}
			this.length += 2 + this.required + (this.mask ? 4 : 0);
			this.required = this.length - 2 - this.required;
			this.out = tink_Chunk.concat(this.out,cursor.left());
			return tink_io_ParseStep.Progressed;
		case 0:
			cursor.next();
			var secondByte = cursor.currentByte;
			this.mask = secondByte >> 7 == 1;
			var _g = secondByte & 127;
			var tmp;
			switch(_g) {
			case 126:
				this.length = -1;
				tmp = 2;
				break;
			case 127:
				this.length = -2;
				tmp = 8;
				break;
			default:
				this.length = _g + 2 + (this.mask ? 4 : 0);
				tmp = this.length - 2;
			}
			this.required = tmp;
			cursor.next();
			this.out = tink_Chunk.concat(this.out,cursor.left());
			return tink_io_ParseStep.Progressed;
		default:
			var ret = tink_io_ParseStep.Done(tink_Chunk.concat(this.out,cursor.right().slice(0,this.required)));
			cursor.moveTo(cursor.currentPos + this.required);
			this.reset();
			return ret;
		}
	}
	,reset: function() {
		this.out = tink_Chunk.EMPTY;
		this.length = 0;
		this.required = 2;
	}
};
var tink_websocket_RawMessage = $hxEnums["tink.websocket.RawMessage"] = { __ename__:true,__constructs__:null
	,Text: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"tink.websocket.RawMessage",toString:$estr}; },$_._hx_name="Text",$_.__params__ = ["v"],$_)
	,Binary: ($_=function(b) { return {_hx_index:1,b:b,__enum__:"tink.websocket.RawMessage",toString:$estr}; },$_._hx_name="Binary",$_.__params__ = ["b"],$_)
	,ConnectionClose: {_hx_name:"ConnectionClose",_hx_index:2,__enum__:"tink.websocket.RawMessage",toString:$estr}
	,Ping: ($_=function(b) { return {_hx_index:3,b:b,__enum__:"tink.websocket.RawMessage",toString:$estr}; },$_._hx_name="Ping",$_.__params__ = ["b"],$_)
	,Pong: ($_=function(b) { return {_hx_index:4,b:b,__enum__:"tink.websocket.RawMessage",toString:$estr}; },$_._hx_name="Pong",$_.__params__ = ["b"],$_)
};
tink_websocket_RawMessage.__constructs__ = [tink_websocket_RawMessage.Text,tink_websocket_RawMessage.Binary,tink_websocket_RawMessage.ConnectionClose,tink_websocket_RawMessage.Ping,tink_websocket_RawMessage.Pong];
var tink_websocket_RawMessageStream = {};
tink_websocket_RawMessageStream.toMaskedChunkStream = function(this1,key) {
	return tink_websocket_RawMessageStream.toMaskedFrameStream(this1,key).map(tink_streams_Mapping.ofPlain(function(f) {
		return f.toChunk();
	}));
};
tink_websocket_RawMessageStream.toMaskedFrameStream = function(this1,key) {
	return this1.map(tink_streams_Mapping.ofPlain(function(message) {
		return tink_websocket_Frame.ofMessage(message,key());
	}));
};
var tink_websocket_MessageRegrouper = function() { };
$hxClasses["tink.websocket.MessageRegrouper"] = tink_websocket_MessageRegrouper;
tink_websocket_MessageRegrouper.__name__ = true;
tink_websocket_MessageRegrouper.get = function() {
	return tink_websocket_MessageRegrouper.inst;
};
var tink_websocket_ConnectedClient = function() { };
$hxClasses["tink.websocket.ConnectedClient"] = tink_websocket_ConnectedClient;
tink_websocket_ConnectedClient.__name__ = true;
var tink_websocket_servers_TinkConnectedClient = function(clientIp,header,incoming) {
	this.clientIp = clientIp;
	this.header = header;
	this.incoming = incoming;
	this.closed = this.closedTrigger = new tink_core_FutureTrigger();
	this.messageReceived = this.messageReceivedTrigger = tink_core_Signal.trigger();
	this.outgoingTrigger = tink_core_Signal.trigger();
	this.outgoing = new tink_streams_SignalStream(this.outgoingTrigger);
};
$hxClasses["tink.websocket.servers.TinkConnectedClient"] = tink_websocket_servers_TinkConnectedClient;
tink_websocket_servers_TinkConnectedClient.__name__ = true;
tink_websocket_servers_TinkConnectedClient.prototype = {
	listen: function() {
		var _gthis = this;
		this.incoming.forEach(tink_streams_Handler.ofSafe(function(message) {
			switch(message._hx_index) {
			case 0:
				_gthis.messageReceivedTrigger.handlers.invoke(tink_websocket_Message.Text(message.v));
				break;
			case 1:
				_gthis.messageReceivedTrigger.handlers.invoke(tink_websocket_Message.Binary(message.b));
				break;
			case 2:
				_gthis.close();
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Finish));
			case 3:
				_gthis.outgoingTrigger.handlers.invoke(tink_streams_Yield.Data(tink_websocket_RawMessage.Pong(message.b)));
				break;
			case 4:
				break;
			}
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_streams_Handled.Resume));
		})).eager();
	}
	,send: function(message) {
		var _this = this.outgoingTrigger;
		var event;
		switch(message._hx_index) {
		case 0:
			event = tink_websocket_RawMessage.Text(message.v);
			break;
		case 1:
			event = tink_websocket_RawMessage.Binary(message.b);
			break;
		}
		_this.handlers.invoke(tink_streams_Yield.Data(event));
	}
	,close: function() {
		this.outgoingTrigger.handlers.invoke(tink_streams_Yield.End);
		this.closedTrigger.trigger(null);
	}
};
var why_email_AttachmentSource = $hxEnums["why.email.AttachmentSource"] = { __ename__:true,__constructs__:null
	,Local: ($_=function(path) { return {_hx_index:0,path:path,__enum__:"why.email.AttachmentSource",toString:$estr}; },$_._hx_name="Local",$_.__params__ = ["path"],$_)
	,Stream: ($_=function(source) { return {_hx_index:1,source:source,__enum__:"why.email.AttachmentSource",toString:$estr}; },$_._hx_name="Stream",$_.__params__ = ["source"],$_)
};
why_email_AttachmentSource.__constructs__ = [why_email_AttachmentSource.Local,why_email_AttachmentSource.Stream];
var why_email_Nodemailer = function(config) {
	this.transporter = why_email_NativeNodemailer.createTransport(config);
};
$hxClasses["why.email.Nodemailer"] = why_email_Nodemailer;
why_email_Nodemailer.__name__ = true;
why_email_Nodemailer.__super__ = why_email_EmailBase;
why_email_Nodemailer.prototype = $extend(why_email_EmailBase.prototype,{
	doSend: function(config) {
		var promise = this.transporter;
		var config1 = config.from;
		var config2 = config.to;
		var config3 = config.cc;
		var config4 = config.bcc;
		var config5 = config.subject;
		var config6 = config.content.text;
		var config7 = config.content.html;
		var attachments = [];
		if(config.attachments != null) {
			var _g = 0;
			var _g1 = config.attachments;
			while(_g < _g1.length) {
				var attachment = _g1[_g];
				++_g;
				var _g2 = attachment.source;
				switch(_g2._hx_index) {
				case 0:
					attachments.push({ filename : attachment.filename, path : _g2.path});
					break;
				case 1:
					attachments.push({ filename : attachment.filename, content : tink_io_Source.toNodeStream(_g2.source)});
					break;
				}
			}
		}
		return tink_core_Promise.noise(tink_core_Future.ofJsPromise(promise.sendMail({ from : config1, to : config2, cc : config3, bcc : config4, subject : config5, text : config6, html : config7, attachments : attachments})));
	}
});
var why_email_NativeNodemailer = require("nodemailer");
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.__name__ = true;
$hxClasses["Array"] = Array;
Array.__name__ = true;
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl;
}
tink_json_BasicParser.DBQT = String.fromCodePoint(34);
boisly_AppSettings._config = (function($this) {
	var $r;
	var file = "config/haxe.config.json";
	$r = new tink_core__$Lazy_LazyFunc(function() {
		return boisly_AppSettings.fromFile(file);
	});
	return $r;
}(this));
duck_$jet_Impl.EOF = "$_$_$EOF$_$_$";
duck_$jet_Ws.server = new tink_websocket_servers_TinkServer();
tink_core_Future.NEVER = new tink_core__$Future_NeverFuture();
tink_core_Promise.NOISE = new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(null)));
tink_core_Promise.NEVER = tink_core_Future.NEVER;
tink_core_Callback.depth = 0;
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
mime_Mime.db = { "application/1d-interleaved-parityfec" : { "source" : "iana"}, "application/3gpdash-qoe-report+xml" : { "source" : "iana", "compressible" : true}, "application/3gpp-ims+xml" : { "source" : "iana", "compressible" : true}, "application/a2l" : { "source" : "iana"}, "application/activemessage" : { "source" : "iana"}, "application/activity+json" : { "source" : "iana", "compressible" : true}, "application/alto-costmap+json" : { "source" : "iana", "compressible" : true}, "application/alto-costmapfilter+json" : { "source" : "iana", "compressible" : true}, "application/alto-directory+json" : { "source" : "iana", "compressible" : true}, "application/alto-endpointcost+json" : { "source" : "iana", "compressible" : true}, "application/alto-endpointcostparams+json" : { "source" : "iana", "compressible" : true}, "application/alto-endpointprop+json" : { "source" : "iana", "compressible" : true}, "application/alto-endpointpropparams+json" : { "source" : "iana", "compressible" : true}, "application/alto-error+json" : { "source" : "iana", "compressible" : true}, "application/alto-networkmap+json" : { "source" : "iana", "compressible" : true}, "application/alto-networkmapfilter+json" : { "source" : "iana", "compressible" : true}, "application/aml" : { "source" : "iana"}, "application/andrew-inset" : { "source" : "iana", "extensions" : ["ez"]}, "application/applefile" : { "source" : "iana"}, "application/applixware" : { "source" : "apache", "extensions" : ["aw"]}, "application/atf" : { "source" : "iana"}, "application/atfx" : { "source" : "iana"}, "application/atom+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["atom"]}, "application/atomcat+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["atomcat"]}, "application/atomdeleted+xml" : { "source" : "iana", "compressible" : true}, "application/atomicmail" : { "source" : "iana"}, "application/atomsvc+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["atomsvc"]}, "application/atxml" : { "source" : "iana"}, "application/auth-policy+xml" : { "source" : "iana", "compressible" : true}, "application/bacnet-xdd+zip" : { "source" : "iana", "compressible" : false}, "application/batch-smtp" : { "source" : "iana"}, "application/bdoc" : { "compressible" : false, "extensions" : ["bdoc"]}, "application/beep+xml" : { "source" : "iana", "compressible" : true}, "application/calendar+json" : { "source" : "iana", "compressible" : true}, "application/calendar+xml" : { "source" : "iana", "compressible" : true}, "application/call-completion" : { "source" : "iana"}, "application/cals-1840" : { "source" : "iana"}, "application/cbor" : { "source" : "iana"}, "application/cccex" : { "source" : "iana"}, "application/ccmp+xml" : { "source" : "iana", "compressible" : true}, "application/ccxml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["ccxml"]}, "application/cdfx+xml" : { "source" : "iana", "compressible" : true}, "application/cdmi-capability" : { "source" : "iana", "extensions" : ["cdmia"]}, "application/cdmi-container" : { "source" : "iana", "extensions" : ["cdmic"]}, "application/cdmi-domain" : { "source" : "iana", "extensions" : ["cdmid"]}, "application/cdmi-object" : { "source" : "iana", "extensions" : ["cdmio"]}, "application/cdmi-queue" : { "source" : "iana", "extensions" : ["cdmiq"]}, "application/cdni" : { "source" : "iana"}, "application/cea" : { "source" : "iana"}, "application/cea-2018+xml" : { "source" : "iana", "compressible" : true}, "application/cellml+xml" : { "source" : "iana", "compressible" : true}, "application/cfw" : { "source" : "iana"}, "application/clue_info+xml" : { "source" : "iana", "compressible" : true}, "application/cms" : { "source" : "iana"}, "application/cnrp+xml" : { "source" : "iana", "compressible" : true}, "application/coap-group+json" : { "source" : "iana", "compressible" : true}, "application/coap-payload" : { "source" : "iana"}, "application/commonground" : { "source" : "iana"}, "application/conference-info+xml" : { "source" : "iana", "compressible" : true}, "application/cose" : { "source" : "iana"}, "application/cose-key" : { "source" : "iana"}, "application/cose-key-set" : { "source" : "iana"}, "application/cpl+xml" : { "source" : "iana", "compressible" : true}, "application/csrattrs" : { "source" : "iana"}, "application/csta+xml" : { "source" : "iana", "compressible" : true}, "application/cstadata+xml" : { "source" : "iana", "compressible" : true}, "application/csvm+json" : { "source" : "iana", "compressible" : true}, "application/cu-seeme" : { "source" : "apache", "extensions" : ["cu"]}, "application/cwt" : { "source" : "iana"}, "application/cybercash" : { "source" : "iana"}, "application/dart" : { "compressible" : true}, "application/dash+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["mpd"]}, "application/dashdelta" : { "source" : "iana"}, "application/davmount+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["davmount"]}, "application/dca-rft" : { "source" : "iana"}, "application/dcd" : { "source" : "iana"}, "application/dec-dx" : { "source" : "iana"}, "application/dialog-info+xml" : { "source" : "iana", "compressible" : true}, "application/dicom" : { "source" : "iana"}, "application/dicom+json" : { "source" : "iana", "compressible" : true}, "application/dicom+xml" : { "source" : "iana", "compressible" : true}, "application/dii" : { "source" : "iana"}, "application/dit" : { "source" : "iana"}, "application/dns" : { "source" : "iana"}, "application/dns+json" : { "source" : "iana", "compressible" : true}, "application/dns-message" : { "source" : "iana"}, "application/docbook+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["dbk"]}, "application/dskpp+xml" : { "source" : "iana", "compressible" : true}, "application/dssc+der" : { "source" : "iana", "extensions" : ["dssc"]}, "application/dssc+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xdssc"]}, "application/dvcs" : { "source" : "iana"}, "application/ecmascript" : { "source" : "iana", "compressible" : true, "extensions" : ["ecma","es"]}, "application/edi-consent" : { "source" : "iana"}, "application/edi-x12" : { "source" : "iana", "compressible" : false}, "application/edifact" : { "source" : "iana", "compressible" : false}, "application/efi" : { "source" : "iana"}, "application/emergencycalldata.comment+xml" : { "source" : "iana", "compressible" : true}, "application/emergencycalldata.control+xml" : { "source" : "iana", "compressible" : true}, "application/emergencycalldata.deviceinfo+xml" : { "source" : "iana", "compressible" : true}, "application/emergencycalldata.ecall.msd" : { "source" : "iana"}, "application/emergencycalldata.providerinfo+xml" : { "source" : "iana", "compressible" : true}, "application/emergencycalldata.serviceinfo+xml" : { "source" : "iana", "compressible" : true}, "application/emergencycalldata.subscriberinfo+xml" : { "source" : "iana", "compressible" : true}, "application/emergencycalldata.veds+xml" : { "source" : "iana", "compressible" : true}, "application/emma+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["emma"]}, "application/emotionml+xml" : { "source" : "iana", "compressible" : true}, "application/encaprtp" : { "source" : "iana"}, "application/epp+xml" : { "source" : "iana", "compressible" : true}, "application/epub+zip" : { "source" : "iana", "compressible" : false, "extensions" : ["epub"]}, "application/eshop" : { "source" : "iana"}, "application/exi" : { "source" : "iana", "extensions" : ["exi"]}, "application/expect-ct-report+json" : { "source" : "iana", "compressible" : true}, "application/fastinfoset" : { "source" : "iana"}, "application/fastsoap" : { "source" : "iana"}, "application/fdt+xml" : { "source" : "iana", "compressible" : true}, "application/fhir+json" : { "source" : "iana", "compressible" : true}, "application/fhir+xml" : { "source" : "iana", "compressible" : true}, "application/fido.trusted-apps+json" : { "compressible" : true}, "application/fits" : { "source" : "iana"}, "application/font-sfnt" : { "source" : "iana"}, "application/font-tdpfr" : { "source" : "iana", "extensions" : ["pfr"]}, "application/font-woff" : { "source" : "iana", "compressible" : false}, "application/framework-attributes+xml" : { "source" : "iana", "compressible" : true}, "application/geo+json" : { "source" : "iana", "compressible" : true, "extensions" : ["geojson"]}, "application/geo+json-seq" : { "source" : "iana"}, "application/geopackage+sqlite3" : { "source" : "iana"}, "application/geoxacml+xml" : { "source" : "iana", "compressible" : true}, "application/gltf-buffer" : { "source" : "iana"}, "application/gml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["gml"]}, "application/gpx+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["gpx"]}, "application/gxf" : { "source" : "apache", "extensions" : ["gxf"]}, "application/gzip" : { "source" : "iana", "compressible" : false, "extensions" : ["gz"]}, "application/h224" : { "source" : "iana"}, "application/held+xml" : { "source" : "iana", "compressible" : true}, "application/hjson" : { "extensions" : ["hjson"]}, "application/http" : { "source" : "iana"}, "application/hyperstudio" : { "source" : "iana", "extensions" : ["stk"]}, "application/ibe-key-request+xml" : { "source" : "iana", "compressible" : true}, "application/ibe-pkg-reply+xml" : { "source" : "iana", "compressible" : true}, "application/ibe-pp-data" : { "source" : "iana"}, "application/iges" : { "source" : "iana"}, "application/im-iscomposing+xml" : { "source" : "iana", "compressible" : true}, "application/index" : { "source" : "iana"}, "application/index.cmd" : { "source" : "iana"}, "application/index.obj" : { "source" : "iana"}, "application/index.response" : { "source" : "iana"}, "application/index.vnd" : { "source" : "iana"}, "application/inkml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["ink","inkml"]}, "application/iotp" : { "source" : "iana"}, "application/ipfix" : { "source" : "iana", "extensions" : ["ipfix"]}, "application/ipp" : { "source" : "iana"}, "application/isup" : { "source" : "iana"}, "application/its+xml" : { "source" : "iana", "compressible" : true}, "application/java-archive" : { "source" : "apache", "compressible" : false, "extensions" : ["jar","war","ear"]}, "application/java-serialized-object" : { "source" : "apache", "compressible" : false, "extensions" : ["ser"]}, "application/java-vm" : { "source" : "apache", "compressible" : false, "extensions" : ["class"]}, "application/javascript" : { "source" : "iana", "charset" : "UTF-8", "compressible" : true, "extensions" : ["js","mjs"]}, "application/jf2feed+json" : { "source" : "iana", "compressible" : true}, "application/jose" : { "source" : "iana"}, "application/jose+json" : { "source" : "iana", "compressible" : true}, "application/jrd+json" : { "source" : "iana", "compressible" : true}, "application/json" : { "source" : "iana", "charset" : "UTF-8", "compressible" : true, "extensions" : ["json","map"]}, "application/json-patch+json" : { "source" : "iana", "compressible" : true}, "application/json-seq" : { "source" : "iana"}, "application/json5" : { "extensions" : ["json5"]}, "application/jsonml+json" : { "source" : "apache", "compressible" : true, "extensions" : ["jsonml"]}, "application/jwk+json" : { "source" : "iana", "compressible" : true}, "application/jwk-set+json" : { "source" : "iana", "compressible" : true}, "application/jwt" : { "source" : "iana"}, "application/kpml-request+xml" : { "source" : "iana", "compressible" : true}, "application/kpml-response+xml" : { "source" : "iana", "compressible" : true}, "application/ld+json" : { "source" : "iana", "compressible" : true, "extensions" : ["jsonld"]}, "application/lgr+xml" : { "source" : "iana", "compressible" : true}, "application/link-format" : { "source" : "iana"}, "application/load-control+xml" : { "source" : "iana", "compressible" : true}, "application/lost+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["lostxml"]}, "application/lostsync+xml" : { "source" : "iana", "compressible" : true}, "application/lxf" : { "source" : "iana"}, "application/mac-binhex40" : { "source" : "iana", "extensions" : ["hqx"]}, "application/mac-compactpro" : { "source" : "apache", "extensions" : ["cpt"]}, "application/macwriteii" : { "source" : "iana"}, "application/mads+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["mads"]}, "application/manifest+json" : { "charset" : "UTF-8", "compressible" : true, "extensions" : ["webmanifest"]}, "application/marc" : { "source" : "iana", "extensions" : ["mrc"]}, "application/marcxml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["mrcx"]}, "application/mathematica" : { "source" : "iana", "extensions" : ["ma","nb","mb"]}, "application/mathml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["mathml"]}, "application/mathml-content+xml" : { "source" : "iana", "compressible" : true}, "application/mathml-presentation+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-associated-procedure-description+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-deregister+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-envelope+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-msk+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-msk-response+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-protection-description+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-reception-report+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-register+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-register-response+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-schedule+xml" : { "source" : "iana", "compressible" : true}, "application/mbms-user-service-description+xml" : { "source" : "iana", "compressible" : true}, "application/mbox" : { "source" : "iana", "extensions" : ["mbox"]}, "application/media-policy-dataset+xml" : { "source" : "iana", "compressible" : true}, "application/media_control+xml" : { "source" : "iana", "compressible" : true}, "application/mediaservercontrol+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["mscml"]}, "application/merge-patch+json" : { "source" : "iana", "compressible" : true}, "application/metalink+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["metalink"]}, "application/metalink4+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["meta4"]}, "application/mets+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["mets"]}, "application/mf4" : { "source" : "iana"}, "application/mikey" : { "source" : "iana"}, "application/mmt-usd+xml" : { "source" : "iana", "compressible" : true}, "application/mods+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["mods"]}, "application/moss-keys" : { "source" : "iana"}, "application/moss-signature" : { "source" : "iana"}, "application/mosskey-data" : { "source" : "iana"}, "application/mosskey-request" : { "source" : "iana"}, "application/mp21" : { "source" : "iana", "extensions" : ["m21","mp21"]}, "application/mp4" : { "source" : "iana", "extensions" : ["mp4s","m4p"]}, "application/mpeg4-generic" : { "source" : "iana"}, "application/mpeg4-iod" : { "source" : "iana"}, "application/mpeg4-iod-xmt" : { "source" : "iana"}, "application/mrb-consumer+xml" : { "source" : "iana", "compressible" : true}, "application/mrb-publish+xml" : { "source" : "iana", "compressible" : true}, "application/msc-ivr+xml" : { "source" : "iana", "compressible" : true}, "application/msc-mixer+xml" : { "source" : "iana", "compressible" : true}, "application/msword" : { "source" : "iana", "compressible" : false, "extensions" : ["doc","dot"]}, "application/mud+json" : { "source" : "iana", "compressible" : true}, "application/mxf" : { "source" : "iana", "extensions" : ["mxf"]}, "application/n-quads" : { "source" : "iana", "extensions" : ["nq"]}, "application/n-triples" : { "source" : "iana", "extensions" : ["nt"]}, "application/nasdata" : { "source" : "iana"}, "application/news-checkgroups" : { "source" : "iana"}, "application/news-groupinfo" : { "source" : "iana"}, "application/news-transmission" : { "source" : "iana"}, "application/nlsml+xml" : { "source" : "iana", "compressible" : true}, "application/node" : { "source" : "iana"}, "application/nss" : { "source" : "iana"}, "application/ocsp-request" : { "source" : "iana"}, "application/ocsp-response" : { "source" : "iana"}, "application/octet-stream" : { "source" : "iana", "compressible" : false, "extensions" : ["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]}, "application/oda" : { "source" : "iana", "extensions" : ["oda"]}, "application/odm+xml" : { "source" : "iana", "compressible" : true}, "application/odx" : { "source" : "iana"}, "application/oebps-package+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["opf"]}, "application/ogg" : { "source" : "iana", "compressible" : false, "extensions" : ["ogx"]}, "application/omdoc+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["omdoc"]}, "application/onenote" : { "source" : "apache", "extensions" : ["onetoc","onetoc2","onetmp","onepkg"]}, "application/oxps" : { "source" : "iana", "extensions" : ["oxps"]}, "application/p2p-overlay+xml" : { "source" : "iana", "compressible" : true}, "application/parityfec" : { "source" : "iana"}, "application/passport" : { "source" : "iana"}, "application/patch-ops-error+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xer"]}, "application/pdf" : { "source" : "iana", "compressible" : false, "extensions" : ["pdf"]}, "application/pdx" : { "source" : "iana"}, "application/pem-certificate-chain" : { "source" : "iana"}, "application/pgp-encrypted" : { "source" : "iana", "compressible" : false, "extensions" : ["pgp"]}, "application/pgp-keys" : { "source" : "iana"}, "application/pgp-signature" : { "source" : "iana", "extensions" : ["asc","sig"]}, "application/pics-rules" : { "source" : "apache", "extensions" : ["prf"]}, "application/pidf+xml" : { "source" : "iana", "compressible" : true}, "application/pidf-diff+xml" : { "source" : "iana", "compressible" : true}, "application/pkcs10" : { "source" : "iana", "extensions" : ["p10"]}, "application/pkcs12" : { "source" : "iana"}, "application/pkcs7-mime" : { "source" : "iana", "extensions" : ["p7m","p7c"]}, "application/pkcs7-signature" : { "source" : "iana", "extensions" : ["p7s"]}, "application/pkcs8" : { "source" : "iana", "extensions" : ["p8"]}, "application/pkcs8-encrypted" : { "source" : "iana"}, "application/pkix-attr-cert" : { "source" : "iana", "extensions" : ["ac"]}, "application/pkix-cert" : { "source" : "iana", "extensions" : ["cer"]}, "application/pkix-crl" : { "source" : "iana", "extensions" : ["crl"]}, "application/pkix-pkipath" : { "source" : "iana", "extensions" : ["pkipath"]}, "application/pkixcmp" : { "source" : "iana", "extensions" : ["pki"]}, "application/pls+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["pls"]}, "application/poc-settings+xml" : { "source" : "iana", "compressible" : true}, "application/postscript" : { "source" : "iana", "compressible" : true, "extensions" : ["ai","eps","ps"]}, "application/ppsp-tracker+json" : { "source" : "iana", "compressible" : true}, "application/problem+json" : { "source" : "iana", "compressible" : true}, "application/problem+xml" : { "source" : "iana", "compressible" : true}, "application/provenance+xml" : { "source" : "iana", "compressible" : true}, "application/prs.alvestrand.titrax-sheet" : { "source" : "iana"}, "application/prs.cww" : { "source" : "iana", "extensions" : ["cww"]}, "application/prs.hpub+zip" : { "source" : "iana", "compressible" : false}, "application/prs.nprend" : { "source" : "iana"}, "application/prs.plucker" : { "source" : "iana"}, "application/prs.rdf-xml-crypt" : { "source" : "iana"}, "application/prs.xsf+xml" : { "source" : "iana", "compressible" : true}, "application/pskc+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["pskcxml"]}, "application/qsig" : { "source" : "iana"}, "application/raml+yaml" : { "compressible" : true, "extensions" : ["raml"]}, "application/raptorfec" : { "source" : "iana"}, "application/rdap+json" : { "source" : "iana", "compressible" : true}, "application/rdf+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["rdf","owl"]}, "application/reginfo+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["rif"]}, "application/relax-ng-compact-syntax" : { "source" : "iana", "extensions" : ["rnc"]}, "application/remote-printing" : { "source" : "iana"}, "application/reputon+json" : { "source" : "iana", "compressible" : true}, "application/resource-lists+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["rl"]}, "application/resource-lists-diff+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["rld"]}, "application/rfc+xml" : { "source" : "iana", "compressible" : true}, "application/riscos" : { "source" : "iana"}, "application/rlmi+xml" : { "source" : "iana", "compressible" : true}, "application/rls-services+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["rs"]}, "application/route-apd+xml" : { "source" : "iana", "compressible" : true}, "application/route-s-tsid+xml" : { "source" : "iana", "compressible" : true}, "application/route-usd+xml" : { "source" : "iana", "compressible" : true}, "application/rpki-ghostbusters" : { "source" : "iana", "extensions" : ["gbr"]}, "application/rpki-manifest" : { "source" : "iana", "extensions" : ["mft"]}, "application/rpki-publication" : { "source" : "iana"}, "application/rpki-roa" : { "source" : "iana", "extensions" : ["roa"]}, "application/rpki-updown" : { "source" : "iana"}, "application/rsd+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["rsd"]}, "application/rss+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["rss"]}, "application/rtf" : { "source" : "iana", "compressible" : true, "extensions" : ["rtf"]}, "application/rtploopback" : { "source" : "iana"}, "application/rtx" : { "source" : "iana"}, "application/samlassertion+xml" : { "source" : "iana", "compressible" : true}, "application/samlmetadata+xml" : { "source" : "iana", "compressible" : true}, "application/sbml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["sbml"]}, "application/scaip+xml" : { "source" : "iana", "compressible" : true}, "application/scim+json" : { "source" : "iana", "compressible" : true}, "application/scvp-cv-request" : { "source" : "iana", "extensions" : ["scq"]}, "application/scvp-cv-response" : { "source" : "iana", "extensions" : ["scs"]}, "application/scvp-vp-request" : { "source" : "iana", "extensions" : ["spq"]}, "application/scvp-vp-response" : { "source" : "iana", "extensions" : ["spp"]}, "application/sdp" : { "source" : "iana", "extensions" : ["sdp"]}, "application/secevent+jwt" : { "source" : "iana"}, "application/senml+cbor" : { "source" : "iana"}, "application/senml+json" : { "source" : "iana", "compressible" : true}, "application/senml+xml" : { "source" : "iana", "compressible" : true}, "application/senml-exi" : { "source" : "iana"}, "application/sensml+cbor" : { "source" : "iana"}, "application/sensml+json" : { "source" : "iana", "compressible" : true}, "application/sensml+xml" : { "source" : "iana", "compressible" : true}, "application/sensml-exi" : { "source" : "iana"}, "application/sep+xml" : { "source" : "iana", "compressible" : true}, "application/sep-exi" : { "source" : "iana"}, "application/session-info" : { "source" : "iana"}, "application/set-payment" : { "source" : "iana"}, "application/set-payment-initiation" : { "source" : "iana", "extensions" : ["setpay"]}, "application/set-registration" : { "source" : "iana"}, "application/set-registration-initiation" : { "source" : "iana", "extensions" : ["setreg"]}, "application/sgml" : { "source" : "iana"}, "application/sgml-open-catalog" : { "source" : "iana"}, "application/shf+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["shf"]}, "application/sieve" : { "source" : "iana"}, "application/simple-filter+xml" : { "source" : "iana", "compressible" : true}, "application/simple-message-summary" : { "source" : "iana"}, "application/simplesymbolcontainer" : { "source" : "iana"}, "application/slate" : { "source" : "iana"}, "application/smil" : { "source" : "iana"}, "application/smil+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["smi","smil"]}, "application/smpte336m" : { "source" : "iana"}, "application/soap+fastinfoset" : { "source" : "iana"}, "application/soap+xml" : { "source" : "iana", "compressible" : true}, "application/sparql-query" : { "source" : "iana", "extensions" : ["rq"]}, "application/sparql-results+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["srx"]}, "application/spirits-event+xml" : { "source" : "iana", "compressible" : true}, "application/sql" : { "source" : "iana"}, "application/srgs" : { "source" : "iana", "extensions" : ["gram"]}, "application/srgs+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["grxml"]}, "application/sru+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["sru"]}, "application/ssdl+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["ssdl"]}, "application/ssml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["ssml"]}, "application/stix+json" : { "source" : "iana", "compressible" : true}, "application/tamp-apex-update" : { "source" : "iana"}, "application/tamp-apex-update-confirm" : { "source" : "iana"}, "application/tamp-community-update" : { "source" : "iana"}, "application/tamp-community-update-confirm" : { "source" : "iana"}, "application/tamp-error" : { "source" : "iana"}, "application/tamp-sequence-adjust" : { "source" : "iana"}, "application/tamp-sequence-adjust-confirm" : { "source" : "iana"}, "application/tamp-status-query" : { "source" : "iana"}, "application/tamp-status-response" : { "source" : "iana"}, "application/tamp-update" : { "source" : "iana"}, "application/tamp-update-confirm" : { "source" : "iana"}, "application/tar" : { "compressible" : true}, "application/taxii+json" : { "source" : "iana", "compressible" : true}, "application/tei+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["tei","teicorpus"]}, "application/tetra_isi" : { "source" : "iana"}, "application/thraud+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["tfi"]}, "application/timestamp-query" : { "source" : "iana"}, "application/timestamp-reply" : { "source" : "iana"}, "application/timestamped-data" : { "source" : "iana", "extensions" : ["tsd"]}, "application/tlsrpt+gzip" : { "source" : "iana"}, "application/tlsrpt+json" : { "source" : "iana", "compressible" : true}, "application/tnauthlist" : { "source" : "iana"}, "application/trickle-ice-sdpfrag" : { "source" : "iana"}, "application/trig" : { "source" : "iana"}, "application/ttml+xml" : { "source" : "iana", "compressible" : true}, "application/tve-trigger" : { "source" : "iana"}, "application/tzif" : { "source" : "iana"}, "application/tzif-leap" : { "source" : "iana"}, "application/ulpfec" : { "source" : "iana"}, "application/urc-grpsheet+xml" : { "source" : "iana", "compressible" : true}, "application/urc-ressheet+xml" : { "source" : "iana", "compressible" : true}, "application/urc-targetdesc+xml" : { "source" : "iana", "compressible" : true}, "application/urc-uisocketdesc+xml" : { "source" : "iana", "compressible" : true}, "application/vcard+json" : { "source" : "iana", "compressible" : true}, "application/vcard+xml" : { "source" : "iana", "compressible" : true}, "application/vemmi" : { "source" : "iana"}, "application/vividence.scriptfile" : { "source" : "apache"}, "application/vnd.1000minds.decision-model+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp-prose+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp-prose-pc3ch+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp-v2x-local-service-information" : { "source" : "iana"}, "application/vnd.3gpp.access-transfer-events+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.bsf+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.gmop+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mc-signalling-ear" : { "source" : "iana"}, "application/vnd.3gpp.mcdata-affiliation-command+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcdata-info+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcdata-payload" : { "source" : "iana"}, "application/vnd.3gpp.mcdata-service-config+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcdata-signalling" : { "source" : "iana"}, "application/vnd.3gpp.mcdata-ue-config+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcdata-user-profile+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcptt-affiliation-command+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcptt-floor-request+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcptt-info+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcptt-location-info+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcptt-mbms-usage-info+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcptt-service-config+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcptt-signed+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcptt-ue-config+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcptt-ue-init-config+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcptt-user-profile+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcvideo-affiliation-command+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcvideo-affiliation-info+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcvideo-location-info+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcvideo-mbms-usage-info+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcvideo-service-config+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcvideo-transmission-request+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcvideo-ue-config+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mcvideo-user-profile+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.mid-call+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.pic-bw-large" : { "source" : "iana", "extensions" : ["plb"]}, "application/vnd.3gpp.pic-bw-small" : { "source" : "iana", "extensions" : ["psb"]}, "application/vnd.3gpp.pic-bw-var" : { "source" : "iana", "extensions" : ["pvb"]}, "application/vnd.3gpp.sms" : { "source" : "iana"}, "application/vnd.3gpp.sms+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.srvcc-ext+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.srvcc-info+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.state-and-event-info+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp.ussd+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp2.bcmcsinfo+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.3gpp2.sms" : { "source" : "iana"}, "application/vnd.3gpp2.tcap" : { "source" : "iana", "extensions" : ["tcap"]}, "application/vnd.3lightssoftware.imagescal" : { "source" : "iana"}, "application/vnd.3m.post-it-notes" : { "source" : "iana", "extensions" : ["pwn"]}, "application/vnd.accpac.simply.aso" : { "source" : "iana", "extensions" : ["aso"]}, "application/vnd.accpac.simply.imp" : { "source" : "iana", "extensions" : ["imp"]}, "application/vnd.acucobol" : { "source" : "iana", "extensions" : ["acu"]}, "application/vnd.acucorp" : { "source" : "iana", "extensions" : ["atc","acutc"]}, "application/vnd.adobe.air-application-installer-package+zip" : { "source" : "apache", "compressible" : false, "extensions" : ["air"]}, "application/vnd.adobe.flash.movie" : { "source" : "iana"}, "application/vnd.adobe.formscentral.fcdt" : { "source" : "iana", "extensions" : ["fcdt"]}, "application/vnd.adobe.fxp" : { "source" : "iana", "extensions" : ["fxp","fxpl"]}, "application/vnd.adobe.partial-upload" : { "source" : "iana"}, "application/vnd.adobe.xdp+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xdp"]}, "application/vnd.adobe.xfdf" : { "source" : "iana", "extensions" : ["xfdf"]}, "application/vnd.aether.imp" : { "source" : "iana"}, "application/vnd.afpc.afplinedata" : { "source" : "iana"}, "application/vnd.afpc.modca" : { "source" : "iana"}, "application/vnd.ah-barcode" : { "source" : "iana"}, "application/vnd.ahead.space" : { "source" : "iana", "extensions" : ["ahead"]}, "application/vnd.airzip.filesecure.azf" : { "source" : "iana", "extensions" : ["azf"]}, "application/vnd.airzip.filesecure.azs" : { "source" : "iana", "extensions" : ["azs"]}, "application/vnd.amadeus+json" : { "source" : "iana", "compressible" : true}, "application/vnd.amazon.ebook" : { "source" : "apache", "extensions" : ["azw"]}, "application/vnd.amazon.mobi8-ebook" : { "source" : "iana"}, "application/vnd.americandynamics.acc" : { "source" : "iana", "extensions" : ["acc"]}, "application/vnd.amiga.ami" : { "source" : "iana", "extensions" : ["ami"]}, "application/vnd.amundsen.maze+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.android.package-archive" : { "source" : "apache", "compressible" : false, "extensions" : ["apk"]}, "application/vnd.anki" : { "source" : "iana"}, "application/vnd.anser-web-certificate-issue-initiation" : { "source" : "iana", "extensions" : ["cii"]}, "application/vnd.anser-web-funds-transfer-initiation" : { "source" : "apache", "extensions" : ["fti"]}, "application/vnd.antix.game-component" : { "source" : "iana", "extensions" : ["atx"]}, "application/vnd.apache.thrift.binary" : { "source" : "iana"}, "application/vnd.apache.thrift.compact" : { "source" : "iana"}, "application/vnd.apache.thrift.json" : { "source" : "iana"}, "application/vnd.api+json" : { "source" : "iana", "compressible" : true}, "application/vnd.apothekende.reservation+json" : { "source" : "iana", "compressible" : true}, "application/vnd.apple.installer+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["mpkg"]}, "application/vnd.apple.keynote" : { "source" : "iana", "extensions" : ["keynote"]}, "application/vnd.apple.mpegurl" : { "source" : "iana", "extensions" : ["m3u8"]}, "application/vnd.apple.numbers" : { "source" : "iana", "extensions" : ["numbers"]}, "application/vnd.apple.pages" : { "source" : "iana", "extensions" : ["pages"]}, "application/vnd.apple.pkpass" : { "compressible" : false, "extensions" : ["pkpass"]}, "application/vnd.arastra.swi" : { "source" : "iana"}, "application/vnd.aristanetworks.swi" : { "source" : "iana", "extensions" : ["swi"]}, "application/vnd.artisan+json" : { "source" : "iana", "compressible" : true}, "application/vnd.artsquare" : { "source" : "iana"}, "application/vnd.astraea-software.iota" : { "source" : "iana", "extensions" : ["iota"]}, "application/vnd.audiograph" : { "source" : "iana", "extensions" : ["aep"]}, "application/vnd.autopackage" : { "source" : "iana"}, "application/vnd.avalon+json" : { "source" : "iana", "compressible" : true}, "application/vnd.avistar+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.balsamiq.bmml+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.balsamiq.bmpr" : { "source" : "iana"}, "application/vnd.banana-accounting" : { "source" : "iana"}, "application/vnd.bbf.usp.msg" : { "source" : "iana"}, "application/vnd.bbf.usp.msg+json" : { "source" : "iana", "compressible" : true}, "application/vnd.bekitzur-stech+json" : { "source" : "iana", "compressible" : true}, "application/vnd.bint.med-content" : { "source" : "iana"}, "application/vnd.biopax.rdf+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.blink-idb-value-wrapper" : { "source" : "iana"}, "application/vnd.blueice.multipass" : { "source" : "iana", "extensions" : ["mpm"]}, "application/vnd.bluetooth.ep.oob" : { "source" : "iana"}, "application/vnd.bluetooth.le.oob" : { "source" : "iana"}, "application/vnd.bmi" : { "source" : "iana", "extensions" : ["bmi"]}, "application/vnd.businessobjects" : { "source" : "iana", "extensions" : ["rep"]}, "application/vnd.byu.uapi+json" : { "source" : "iana", "compressible" : true}, "application/vnd.cab-jscript" : { "source" : "iana"}, "application/vnd.canon-cpdl" : { "source" : "iana"}, "application/vnd.canon-lips" : { "source" : "iana"}, "application/vnd.capasystems-pg+json" : { "source" : "iana", "compressible" : true}, "application/vnd.cendio.thinlinc.clientconf" : { "source" : "iana"}, "application/vnd.century-systems.tcp_stream" : { "source" : "iana"}, "application/vnd.chemdraw+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["cdxml"]}, "application/vnd.chess-pgn" : { "source" : "iana"}, "application/vnd.chipnuts.karaoke-mmd" : { "source" : "iana", "extensions" : ["mmd"]}, "application/vnd.cinderella" : { "source" : "iana", "extensions" : ["cdy"]}, "application/vnd.cirpack.isdn-ext" : { "source" : "iana"}, "application/vnd.citationstyles.style+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["csl"]}, "application/vnd.claymore" : { "source" : "iana", "extensions" : ["cla"]}, "application/vnd.cloanto.rp9" : { "source" : "iana", "extensions" : ["rp9"]}, "application/vnd.clonk.c4group" : { "source" : "iana", "extensions" : ["c4g","c4d","c4f","c4p","c4u"]}, "application/vnd.cluetrust.cartomobile-config" : { "source" : "iana", "extensions" : ["c11amc"]}, "application/vnd.cluetrust.cartomobile-config-pkg" : { "source" : "iana", "extensions" : ["c11amz"]}, "application/vnd.coffeescript" : { "source" : "iana"}, "application/vnd.collabio.xodocuments.document" : { "source" : "iana"}, "application/vnd.collabio.xodocuments.document-template" : { "source" : "iana"}, "application/vnd.collabio.xodocuments.presentation" : { "source" : "iana"}, "application/vnd.collabio.xodocuments.presentation-template" : { "source" : "iana"}, "application/vnd.collabio.xodocuments.spreadsheet" : { "source" : "iana"}, "application/vnd.collabio.xodocuments.spreadsheet-template" : { "source" : "iana"}, "application/vnd.collection+json" : { "source" : "iana", "compressible" : true}, "application/vnd.collection.doc+json" : { "source" : "iana", "compressible" : true}, "application/vnd.collection.next+json" : { "source" : "iana", "compressible" : true}, "application/vnd.comicbook+zip" : { "source" : "iana", "compressible" : false}, "application/vnd.comicbook-rar" : { "source" : "iana"}, "application/vnd.commerce-battelle" : { "source" : "iana"}, "application/vnd.commonspace" : { "source" : "iana", "extensions" : ["csp"]}, "application/vnd.contact.cmsg" : { "source" : "iana", "extensions" : ["cdbcmsg"]}, "application/vnd.coreos.ignition+json" : { "source" : "iana", "compressible" : true}, "application/vnd.cosmocaller" : { "source" : "iana", "extensions" : ["cmc"]}, "application/vnd.crick.clicker" : { "source" : "iana", "extensions" : ["clkx"]}, "application/vnd.crick.clicker.keyboard" : { "source" : "iana", "extensions" : ["clkk"]}, "application/vnd.crick.clicker.palette" : { "source" : "iana", "extensions" : ["clkp"]}, "application/vnd.crick.clicker.template" : { "source" : "iana", "extensions" : ["clkt"]}, "application/vnd.crick.clicker.wordbank" : { "source" : "iana", "extensions" : ["clkw"]}, "application/vnd.criticaltools.wbs+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["wbs"]}, "application/vnd.ctc-posml" : { "source" : "iana", "extensions" : ["pml"]}, "application/vnd.ctct.ws+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.cups-pdf" : { "source" : "iana"}, "application/vnd.cups-postscript" : { "source" : "iana"}, "application/vnd.cups-ppd" : { "source" : "iana", "extensions" : ["ppd"]}, "application/vnd.cups-raster" : { "source" : "iana"}, "application/vnd.cups-raw" : { "source" : "iana"}, "application/vnd.curl" : { "source" : "iana"}, "application/vnd.curl.car" : { "source" : "apache", "extensions" : ["car"]}, "application/vnd.curl.pcurl" : { "source" : "apache", "extensions" : ["pcurl"]}, "application/vnd.cyan.dean.root+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.cybank" : { "source" : "iana"}, "application/vnd.d2l.coursepackage1p0+zip" : { "source" : "iana", "compressible" : false}, "application/vnd.dart" : { "source" : "iana", "compressible" : true, "extensions" : ["dart"]}, "application/vnd.data-vision.rdz" : { "source" : "iana", "extensions" : ["rdz"]}, "application/vnd.datapackage+json" : { "source" : "iana", "compressible" : true}, "application/vnd.dataresource+json" : { "source" : "iana", "compressible" : true}, "application/vnd.debian.binary-package" : { "source" : "iana"}, "application/vnd.dece.data" : { "source" : "iana", "extensions" : ["uvf","uvvf","uvd","uvvd"]}, "application/vnd.dece.ttml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["uvt","uvvt"]}, "application/vnd.dece.unspecified" : { "source" : "iana", "extensions" : ["uvx","uvvx"]}, "application/vnd.dece.zip" : { "source" : "iana", "extensions" : ["uvz","uvvz"]}, "application/vnd.denovo.fcselayout-link" : { "source" : "iana", "extensions" : ["fe_launch"]}, "application/vnd.desmume.movie" : { "source" : "iana"}, "application/vnd.dir-bi.plate-dl-nosuffix" : { "source" : "iana"}, "application/vnd.dm.delegation+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.dna" : { "source" : "iana", "extensions" : ["dna"]}, "application/vnd.document+json" : { "source" : "iana", "compressible" : true}, "application/vnd.dolby.mlp" : { "source" : "apache", "extensions" : ["mlp"]}, "application/vnd.dolby.mobile.1" : { "source" : "iana"}, "application/vnd.dolby.mobile.2" : { "source" : "iana"}, "application/vnd.doremir.scorecloud-binary-document" : { "source" : "iana"}, "application/vnd.dpgraph" : { "source" : "iana", "extensions" : ["dpg"]}, "application/vnd.dreamfactory" : { "source" : "iana", "extensions" : ["dfac"]}, "application/vnd.drive+json" : { "source" : "iana", "compressible" : true}, "application/vnd.ds-keypoint" : { "source" : "apache", "extensions" : ["kpxx"]}, "application/vnd.dtg.local" : { "source" : "iana"}, "application/vnd.dtg.local.flash" : { "source" : "iana"}, "application/vnd.dtg.local.html" : { "source" : "iana"}, "application/vnd.dvb.ait" : { "source" : "iana", "extensions" : ["ait"]}, "application/vnd.dvb.dvbj" : { "source" : "iana"}, "application/vnd.dvb.esgcontainer" : { "source" : "iana"}, "application/vnd.dvb.ipdcdftnotifaccess" : { "source" : "iana"}, "application/vnd.dvb.ipdcesgaccess" : { "source" : "iana"}, "application/vnd.dvb.ipdcesgaccess2" : { "source" : "iana"}, "application/vnd.dvb.ipdcesgpdd" : { "source" : "iana"}, "application/vnd.dvb.ipdcroaming" : { "source" : "iana"}, "application/vnd.dvb.iptv.alfec-base" : { "source" : "iana"}, "application/vnd.dvb.iptv.alfec-enhancement" : { "source" : "iana"}, "application/vnd.dvb.notif-aggregate-root+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.dvb.notif-container+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.dvb.notif-generic+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.dvb.notif-ia-msglist+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.dvb.notif-ia-registration-request+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.dvb.notif-ia-registration-response+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.dvb.notif-init+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.dvb.pfr" : { "source" : "iana"}, "application/vnd.dvb.service" : { "source" : "iana", "extensions" : ["svc"]}, "application/vnd.dxr" : { "source" : "iana"}, "application/vnd.dynageo" : { "source" : "iana", "extensions" : ["geo"]}, "application/vnd.dzr" : { "source" : "iana"}, "application/vnd.easykaraoke.cdgdownload" : { "source" : "iana"}, "application/vnd.ecdis-update" : { "source" : "iana"}, "application/vnd.ecip.rlp" : { "source" : "iana"}, "application/vnd.ecowin.chart" : { "source" : "iana", "extensions" : ["mag"]}, "application/vnd.ecowin.filerequest" : { "source" : "iana"}, "application/vnd.ecowin.fileupdate" : { "source" : "iana"}, "application/vnd.ecowin.series" : { "source" : "iana"}, "application/vnd.ecowin.seriesrequest" : { "source" : "iana"}, "application/vnd.ecowin.seriesupdate" : { "source" : "iana"}, "application/vnd.efi.img" : { "source" : "iana"}, "application/vnd.efi.iso" : { "source" : "iana"}, "application/vnd.emclient.accessrequest+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.enliven" : { "source" : "iana", "extensions" : ["nml"]}, "application/vnd.enphase.envoy" : { "source" : "iana"}, "application/vnd.eprints.data+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.epson.esf" : { "source" : "iana", "extensions" : ["esf"]}, "application/vnd.epson.msf" : { "source" : "iana", "extensions" : ["msf"]}, "application/vnd.epson.quickanime" : { "source" : "iana", "extensions" : ["qam"]}, "application/vnd.epson.salt" : { "source" : "iana", "extensions" : ["slt"]}, "application/vnd.epson.ssf" : { "source" : "iana", "extensions" : ["ssf"]}, "application/vnd.ericsson.quickcall" : { "source" : "iana"}, "application/vnd.espass-espass+zip" : { "source" : "iana", "compressible" : false}, "application/vnd.eszigno3+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["es3","et3"]}, "application/vnd.etsi.aoc+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.asic-e+zip" : { "source" : "iana", "compressible" : false}, "application/vnd.etsi.asic-s+zip" : { "source" : "iana", "compressible" : false}, "application/vnd.etsi.cug+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.iptvcommand+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.iptvdiscovery+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.iptvprofile+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.iptvsad-bc+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.iptvsad-cod+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.iptvsad-npvr+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.iptvservice+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.iptvsync+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.iptvueprofile+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.mcid+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.mheg5" : { "source" : "iana"}, "application/vnd.etsi.overload-control-policy-dataset+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.pstn+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.sci+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.simservs+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.timestamp-token" : { "source" : "iana"}, "application/vnd.etsi.tsl+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.etsi.tsl.der" : { "source" : "iana"}, "application/vnd.eudora.data" : { "source" : "iana"}, "application/vnd.evolv.ecig.profile" : { "source" : "iana"}, "application/vnd.evolv.ecig.settings" : { "source" : "iana"}, "application/vnd.evolv.ecig.theme" : { "source" : "iana"}, "application/vnd.exstream-empower+zip" : { "source" : "iana", "compressible" : false}, "application/vnd.exstream-package" : { "source" : "iana"}, "application/vnd.ezpix-album" : { "source" : "iana", "extensions" : ["ez2"]}, "application/vnd.ezpix-package" : { "source" : "iana", "extensions" : ["ez3"]}, "application/vnd.f-secure.mobile" : { "source" : "iana"}, "application/vnd.fastcopy-disk-image" : { "source" : "iana"}, "application/vnd.fdf" : { "source" : "iana", "extensions" : ["fdf"]}, "application/vnd.fdsn.mseed" : { "source" : "iana", "extensions" : ["mseed"]}, "application/vnd.fdsn.seed" : { "source" : "iana", "extensions" : ["seed","dataless"]}, "application/vnd.ffsns" : { "source" : "iana"}, "application/vnd.filmit.zfc" : { "source" : "iana"}, "application/vnd.fints" : { "source" : "iana"}, "application/vnd.firemonkeys.cloudcell" : { "source" : "iana"}, "application/vnd.flographit" : { "source" : "iana", "extensions" : ["gph"]}, "application/vnd.fluxtime.clip" : { "source" : "iana", "extensions" : ["ftc"]}, "application/vnd.font-fontforge-sfd" : { "source" : "iana"}, "application/vnd.framemaker" : { "source" : "iana", "extensions" : ["fm","frame","maker","book"]}, "application/vnd.frogans.fnc" : { "source" : "iana", "extensions" : ["fnc"]}, "application/vnd.frogans.ltf" : { "source" : "iana", "extensions" : ["ltf"]}, "application/vnd.fsc.weblaunch" : { "source" : "iana", "extensions" : ["fsc"]}, "application/vnd.fujitsu.oasys" : { "source" : "iana", "extensions" : ["oas"]}, "application/vnd.fujitsu.oasys2" : { "source" : "iana", "extensions" : ["oa2"]}, "application/vnd.fujitsu.oasys3" : { "source" : "iana", "extensions" : ["oa3"]}, "application/vnd.fujitsu.oasysgp" : { "source" : "iana", "extensions" : ["fg5"]}, "application/vnd.fujitsu.oasysprs" : { "source" : "iana", "extensions" : ["bh2"]}, "application/vnd.fujixerox.art-ex" : { "source" : "iana"}, "application/vnd.fujixerox.art4" : { "source" : "iana"}, "application/vnd.fujixerox.ddd" : { "source" : "iana", "extensions" : ["ddd"]}, "application/vnd.fujixerox.docuworks" : { "source" : "iana", "extensions" : ["xdw"]}, "application/vnd.fujixerox.docuworks.binder" : { "source" : "iana", "extensions" : ["xbd"]}, "application/vnd.fujixerox.docuworks.container" : { "source" : "iana"}, "application/vnd.fujixerox.hbpl" : { "source" : "iana"}, "application/vnd.fut-misnet" : { "source" : "iana"}, "application/vnd.futoin+cbor" : { "source" : "iana"}, "application/vnd.futoin+json" : { "source" : "iana", "compressible" : true}, "application/vnd.fuzzysheet" : { "source" : "iana", "extensions" : ["fzs"]}, "application/vnd.genomatix.tuxedo" : { "source" : "iana", "extensions" : ["txd"]}, "application/vnd.geo+json" : { "source" : "iana", "compressible" : true}, "application/vnd.geocube+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.geogebra.file" : { "source" : "iana", "extensions" : ["ggb"]}, "application/vnd.geogebra.tool" : { "source" : "iana", "extensions" : ["ggt"]}, "application/vnd.geometry-explorer" : { "source" : "iana", "extensions" : ["gex","gre"]}, "application/vnd.geonext" : { "source" : "iana", "extensions" : ["gxt"]}, "application/vnd.geoplan" : { "source" : "iana", "extensions" : ["g2w"]}, "application/vnd.geospace" : { "source" : "iana", "extensions" : ["g3w"]}, "application/vnd.gerber" : { "source" : "iana"}, "application/vnd.globalplatform.card-content-mgt" : { "source" : "iana"}, "application/vnd.globalplatform.card-content-mgt-response" : { "source" : "iana"}, "application/vnd.gmx" : { "source" : "iana", "extensions" : ["gmx"]}, "application/vnd.google-apps.document" : { "compressible" : false, "extensions" : ["gdoc"]}, "application/vnd.google-apps.presentation" : { "compressible" : false, "extensions" : ["gslides"]}, "application/vnd.google-apps.spreadsheet" : { "compressible" : false, "extensions" : ["gsheet"]}, "application/vnd.google-earth.kml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["kml"]}, "application/vnd.google-earth.kmz" : { "source" : "iana", "compressible" : false, "extensions" : ["kmz"]}, "application/vnd.gov.sk.e-form+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.gov.sk.e-form+zip" : { "source" : "iana", "compressible" : false}, "application/vnd.gov.sk.xmldatacontainer+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.grafeq" : { "source" : "iana", "extensions" : ["gqf","gqs"]}, "application/vnd.gridmp" : { "source" : "iana"}, "application/vnd.groove-account" : { "source" : "iana", "extensions" : ["gac"]}, "application/vnd.groove-help" : { "source" : "iana", "extensions" : ["ghf"]}, "application/vnd.groove-identity-message" : { "source" : "iana", "extensions" : ["gim"]}, "application/vnd.groove-injector" : { "source" : "iana", "extensions" : ["grv"]}, "application/vnd.groove-tool-message" : { "source" : "iana", "extensions" : ["gtm"]}, "application/vnd.groove-tool-template" : { "source" : "iana", "extensions" : ["tpl"]}, "application/vnd.groove-vcard" : { "source" : "iana", "extensions" : ["vcg"]}, "application/vnd.hal+json" : { "source" : "iana", "compressible" : true}, "application/vnd.hal+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["hal"]}, "application/vnd.handheld-entertainment+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["zmm"]}, "application/vnd.hbci" : { "source" : "iana", "extensions" : ["hbci"]}, "application/vnd.hc+json" : { "source" : "iana", "compressible" : true}, "application/vnd.hcl-bireports" : { "source" : "iana"}, "application/vnd.hdt" : { "source" : "iana"}, "application/vnd.heroku+json" : { "source" : "iana", "compressible" : true}, "application/vnd.hhe.lesson-player" : { "source" : "iana", "extensions" : ["les"]}, "application/vnd.hp-hpgl" : { "source" : "iana", "extensions" : ["hpgl"]}, "application/vnd.hp-hpid" : { "source" : "iana", "extensions" : ["hpid"]}, "application/vnd.hp-hps" : { "source" : "iana", "extensions" : ["hps"]}, "application/vnd.hp-jlyt" : { "source" : "iana", "extensions" : ["jlt"]}, "application/vnd.hp-pcl" : { "source" : "iana", "extensions" : ["pcl"]}, "application/vnd.hp-pclxl" : { "source" : "iana", "extensions" : ["pclxl"]}, "application/vnd.httphone" : { "source" : "iana"}, "application/vnd.hydrostatix.sof-data" : { "source" : "iana", "extensions" : ["sfd-hdstx"]}, "application/vnd.hyper+json" : { "source" : "iana", "compressible" : true}, "application/vnd.hyper-item+json" : { "source" : "iana", "compressible" : true}, "application/vnd.hyperdrive+json" : { "source" : "iana", "compressible" : true}, "application/vnd.hzn-3d-crossword" : { "source" : "iana"}, "application/vnd.ibm.afplinedata" : { "source" : "iana"}, "application/vnd.ibm.electronic-media" : { "source" : "iana"}, "application/vnd.ibm.minipay" : { "source" : "iana", "extensions" : ["mpy"]}, "application/vnd.ibm.modcap" : { "source" : "iana", "extensions" : ["afp","listafp","list3820"]}, "application/vnd.ibm.rights-management" : { "source" : "iana", "extensions" : ["irm"]}, "application/vnd.ibm.secure-container" : { "source" : "iana", "extensions" : ["sc"]}, "application/vnd.iccprofile" : { "source" : "iana", "extensions" : ["icc","icm"]}, "application/vnd.ieee.1905" : { "source" : "iana"}, "application/vnd.igloader" : { "source" : "iana", "extensions" : ["igl"]}, "application/vnd.imagemeter.folder+zip" : { "source" : "iana", "compressible" : false}, "application/vnd.imagemeter.image+zip" : { "source" : "iana", "compressible" : false}, "application/vnd.immervision-ivp" : { "source" : "iana", "extensions" : ["ivp"]}, "application/vnd.immervision-ivu" : { "source" : "iana", "extensions" : ["ivu"]}, "application/vnd.ims.imsccv1p1" : { "source" : "iana"}, "application/vnd.ims.imsccv1p2" : { "source" : "iana"}, "application/vnd.ims.imsccv1p3" : { "source" : "iana"}, "application/vnd.ims.lis.v2.result+json" : { "source" : "iana", "compressible" : true}, "application/vnd.ims.lti.v2.toolconsumerprofile+json" : { "source" : "iana", "compressible" : true}, "application/vnd.ims.lti.v2.toolproxy+json" : { "source" : "iana", "compressible" : true}, "application/vnd.ims.lti.v2.toolproxy.id+json" : { "source" : "iana", "compressible" : true}, "application/vnd.ims.lti.v2.toolsettings+json" : { "source" : "iana", "compressible" : true}, "application/vnd.ims.lti.v2.toolsettings.simple+json" : { "source" : "iana", "compressible" : true}, "application/vnd.informedcontrol.rms+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.informix-visionary" : { "source" : "iana"}, "application/vnd.infotech.project" : { "source" : "iana"}, "application/vnd.infotech.project+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.innopath.wamp.notification" : { "source" : "iana"}, "application/vnd.insors.igm" : { "source" : "iana", "extensions" : ["igm"]}, "application/vnd.intercon.formnet" : { "source" : "iana", "extensions" : ["xpw","xpx"]}, "application/vnd.intergeo" : { "source" : "iana", "extensions" : ["i2g"]}, "application/vnd.intertrust.digibox" : { "source" : "iana"}, "application/vnd.intertrust.nncp" : { "source" : "iana"}, "application/vnd.intu.qbo" : { "source" : "iana", "extensions" : ["qbo"]}, "application/vnd.intu.qfx" : { "source" : "iana", "extensions" : ["qfx"]}, "application/vnd.iptc.g2.catalogitem+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.iptc.g2.conceptitem+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.iptc.g2.knowledgeitem+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.iptc.g2.newsitem+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.iptc.g2.newsmessage+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.iptc.g2.packageitem+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.iptc.g2.planningitem+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.ipunplugged.rcprofile" : { "source" : "iana", "extensions" : ["rcprofile"]}, "application/vnd.irepository.package+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["irp"]}, "application/vnd.is-xpr" : { "source" : "iana", "extensions" : ["xpr"]}, "application/vnd.isac.fcs" : { "source" : "iana", "extensions" : ["fcs"]}, "application/vnd.jam" : { "source" : "iana", "extensions" : ["jam"]}, "application/vnd.japannet-directory-service" : { "source" : "iana"}, "application/vnd.japannet-jpnstore-wakeup" : { "source" : "iana"}, "application/vnd.japannet-payment-wakeup" : { "source" : "iana"}, "application/vnd.japannet-registration" : { "source" : "iana"}, "application/vnd.japannet-registration-wakeup" : { "source" : "iana"}, "application/vnd.japannet-setstore-wakeup" : { "source" : "iana"}, "application/vnd.japannet-verification" : { "source" : "iana"}, "application/vnd.japannet-verification-wakeup" : { "source" : "iana"}, "application/vnd.jcp.javame.midlet-rms" : { "source" : "iana", "extensions" : ["rms"]}, "application/vnd.jisp" : { "source" : "iana", "extensions" : ["jisp"]}, "application/vnd.joost.joda-archive" : { "source" : "iana", "extensions" : ["joda"]}, "application/vnd.jsk.isdn-ngn" : { "source" : "iana"}, "application/vnd.kahootz" : { "source" : "iana", "extensions" : ["ktz","ktr"]}, "application/vnd.kde.karbon" : { "source" : "iana", "extensions" : ["karbon"]}, "application/vnd.kde.kchart" : { "source" : "iana", "extensions" : ["chrt"]}, "application/vnd.kde.kformula" : { "source" : "iana", "extensions" : ["kfo"]}, "application/vnd.kde.kivio" : { "source" : "iana", "extensions" : ["flw"]}, "application/vnd.kde.kontour" : { "source" : "iana", "extensions" : ["kon"]}, "application/vnd.kde.kpresenter" : { "source" : "iana", "extensions" : ["kpr","kpt"]}, "application/vnd.kde.kspread" : { "source" : "iana", "extensions" : ["ksp"]}, "application/vnd.kde.kword" : { "source" : "iana", "extensions" : ["kwd","kwt"]}, "application/vnd.kenameaapp" : { "source" : "iana", "extensions" : ["htke"]}, "application/vnd.kidspiration" : { "source" : "iana", "extensions" : ["kia"]}, "application/vnd.kinar" : { "source" : "iana", "extensions" : ["kne","knp"]}, "application/vnd.koan" : { "source" : "iana", "extensions" : ["skp","skd","skt","skm"]}, "application/vnd.kodak-descriptor" : { "source" : "iana", "extensions" : ["sse"]}, "application/vnd.las.las+json" : { "source" : "iana", "compressible" : true}, "application/vnd.las.las+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["lasxml"]}, "application/vnd.leap+json" : { "source" : "iana", "compressible" : true}, "application/vnd.liberty-request+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.llamagraphics.life-balance.desktop" : { "source" : "iana", "extensions" : ["lbd"]}, "application/vnd.llamagraphics.life-balance.exchange+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["lbe"]}, "application/vnd.lotus-1-2-3" : { "source" : "iana", "extensions" : ["123"]}, "application/vnd.lotus-approach" : { "source" : "iana", "extensions" : ["apr"]}, "application/vnd.lotus-freelance" : { "source" : "iana", "extensions" : ["pre"]}, "application/vnd.lotus-notes" : { "source" : "iana", "extensions" : ["nsf"]}, "application/vnd.lotus-organizer" : { "source" : "iana", "extensions" : ["org"]}, "application/vnd.lotus-screencam" : { "source" : "iana", "extensions" : ["scm"]}, "application/vnd.lotus-wordpro" : { "source" : "iana", "extensions" : ["lwp"]}, "application/vnd.macports.portpkg" : { "source" : "iana", "extensions" : ["portpkg"]}, "application/vnd.mapbox-vector-tile" : { "source" : "iana"}, "application/vnd.marlin.drm.actiontoken+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.marlin.drm.conftoken+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.marlin.drm.license+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.marlin.drm.mdcf" : { "source" : "iana"}, "application/vnd.mason+json" : { "source" : "iana", "compressible" : true}, "application/vnd.maxmind.maxmind-db" : { "source" : "iana"}, "application/vnd.mcd" : { "source" : "iana", "extensions" : ["mcd"]}, "application/vnd.medcalcdata" : { "source" : "iana", "extensions" : ["mc1"]}, "application/vnd.mediastation.cdkey" : { "source" : "iana", "extensions" : ["cdkey"]}, "application/vnd.meridian-slingshot" : { "source" : "iana"}, "application/vnd.mfer" : { "source" : "iana", "extensions" : ["mwf"]}, "application/vnd.mfmp" : { "source" : "iana", "extensions" : ["mfm"]}, "application/vnd.micro+json" : { "source" : "iana", "compressible" : true}, "application/vnd.micrografx.flo" : { "source" : "iana", "extensions" : ["flo"]}, "application/vnd.micrografx.igx" : { "source" : "iana", "extensions" : ["igx"]}, "application/vnd.microsoft.portable-executable" : { "source" : "iana"}, "application/vnd.microsoft.windows.thumbnail-cache" : { "source" : "iana"}, "application/vnd.miele+json" : { "source" : "iana", "compressible" : true}, "application/vnd.mif" : { "source" : "iana", "extensions" : ["mif"]}, "application/vnd.minisoft-hp3000-save" : { "source" : "iana"}, "application/vnd.mitsubishi.misty-guard.trustweb" : { "source" : "iana"}, "application/vnd.mobius.daf" : { "source" : "iana", "extensions" : ["daf"]}, "application/vnd.mobius.dis" : { "source" : "iana", "extensions" : ["dis"]}, "application/vnd.mobius.mbk" : { "source" : "iana", "extensions" : ["mbk"]}, "application/vnd.mobius.mqy" : { "source" : "iana", "extensions" : ["mqy"]}, "application/vnd.mobius.msl" : { "source" : "iana", "extensions" : ["msl"]}, "application/vnd.mobius.plc" : { "source" : "iana", "extensions" : ["plc"]}, "application/vnd.mobius.txf" : { "source" : "iana", "extensions" : ["txf"]}, "application/vnd.mophun.application" : { "source" : "iana", "extensions" : ["mpn"]}, "application/vnd.mophun.certificate" : { "source" : "iana", "extensions" : ["mpc"]}, "application/vnd.motorola.flexsuite" : { "source" : "iana"}, "application/vnd.motorola.flexsuite.adsi" : { "source" : "iana"}, "application/vnd.motorola.flexsuite.fis" : { "source" : "iana"}, "application/vnd.motorola.flexsuite.gotap" : { "source" : "iana"}, "application/vnd.motorola.flexsuite.kmr" : { "source" : "iana"}, "application/vnd.motorola.flexsuite.ttc" : { "source" : "iana"}, "application/vnd.motorola.flexsuite.wem" : { "source" : "iana"}, "application/vnd.motorola.iprm" : { "source" : "iana"}, "application/vnd.mozilla.xul+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xul"]}, "application/vnd.ms-3mfdocument" : { "source" : "iana"}, "application/vnd.ms-artgalry" : { "source" : "iana", "extensions" : ["cil"]}, "application/vnd.ms-asf" : { "source" : "iana"}, "application/vnd.ms-cab-compressed" : { "source" : "iana", "extensions" : ["cab"]}, "application/vnd.ms-color.iccprofile" : { "source" : "apache"}, "application/vnd.ms-excel" : { "source" : "iana", "compressible" : false, "extensions" : ["xls","xlm","xla","xlc","xlt","xlw"]}, "application/vnd.ms-excel.addin.macroenabled.12" : { "source" : "iana", "extensions" : ["xlam"]}, "application/vnd.ms-excel.sheet.binary.macroenabled.12" : { "source" : "iana", "extensions" : ["xlsb"]}, "application/vnd.ms-excel.sheet.macroenabled.12" : { "source" : "iana", "extensions" : ["xlsm"]}, "application/vnd.ms-excel.template.macroenabled.12" : { "source" : "iana", "extensions" : ["xltm"]}, "application/vnd.ms-fontobject" : { "source" : "iana", "compressible" : true, "extensions" : ["eot"]}, "application/vnd.ms-htmlhelp" : { "source" : "iana", "extensions" : ["chm"]}, "application/vnd.ms-ims" : { "source" : "iana", "extensions" : ["ims"]}, "application/vnd.ms-lrm" : { "source" : "iana", "extensions" : ["lrm"]}, "application/vnd.ms-office.activex+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.ms-officetheme" : { "source" : "iana", "extensions" : ["thmx"]}, "application/vnd.ms-opentype" : { "source" : "apache", "compressible" : true}, "application/vnd.ms-outlook" : { "compressible" : false, "extensions" : ["msg"]}, "application/vnd.ms-package.obfuscated-opentype" : { "source" : "apache"}, "application/vnd.ms-pki.seccat" : { "source" : "apache", "extensions" : ["cat"]}, "application/vnd.ms-pki.stl" : { "source" : "apache", "extensions" : ["stl"]}, "application/vnd.ms-playready.initiator+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.ms-powerpoint" : { "source" : "iana", "compressible" : false, "extensions" : ["ppt","pps","pot"]}, "application/vnd.ms-powerpoint.addin.macroenabled.12" : { "source" : "iana", "extensions" : ["ppam"]}, "application/vnd.ms-powerpoint.presentation.macroenabled.12" : { "source" : "iana", "extensions" : ["pptm"]}, "application/vnd.ms-powerpoint.slide.macroenabled.12" : { "source" : "iana", "extensions" : ["sldm"]}, "application/vnd.ms-powerpoint.slideshow.macroenabled.12" : { "source" : "iana", "extensions" : ["ppsm"]}, "application/vnd.ms-powerpoint.template.macroenabled.12" : { "source" : "iana", "extensions" : ["potm"]}, "application/vnd.ms-printdevicecapabilities+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.ms-printing.printticket+xml" : { "source" : "apache", "compressible" : true}, "application/vnd.ms-printschematicket+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.ms-project" : { "source" : "iana", "extensions" : ["mpp","mpt"]}, "application/vnd.ms-tnef" : { "source" : "iana"}, "application/vnd.ms-windows.devicepairing" : { "source" : "iana"}, "application/vnd.ms-windows.nwprinting.oob" : { "source" : "iana"}, "application/vnd.ms-windows.printerpairing" : { "source" : "iana"}, "application/vnd.ms-windows.wsd.oob" : { "source" : "iana"}, "application/vnd.ms-wmdrm.lic-chlg-req" : { "source" : "iana"}, "application/vnd.ms-wmdrm.lic-resp" : { "source" : "iana"}, "application/vnd.ms-wmdrm.meter-chlg-req" : { "source" : "iana"}, "application/vnd.ms-wmdrm.meter-resp" : { "source" : "iana"}, "application/vnd.ms-word.document.macroenabled.12" : { "source" : "iana", "extensions" : ["docm"]}, "application/vnd.ms-word.template.macroenabled.12" : { "source" : "iana", "extensions" : ["dotm"]}, "application/vnd.ms-works" : { "source" : "iana", "extensions" : ["wps","wks","wcm","wdb"]}, "application/vnd.ms-wpl" : { "source" : "iana", "extensions" : ["wpl"]}, "application/vnd.ms-xpsdocument" : { "source" : "iana", "compressible" : false, "extensions" : ["xps"]}, "application/vnd.msa-disk-image" : { "source" : "iana"}, "application/vnd.mseq" : { "source" : "iana", "extensions" : ["mseq"]}, "application/vnd.msign" : { "source" : "iana"}, "application/vnd.multiad.creator" : { "source" : "iana"}, "application/vnd.multiad.creator.cif" : { "source" : "iana"}, "application/vnd.music-niff" : { "source" : "iana"}, "application/vnd.musician" : { "source" : "iana", "extensions" : ["mus"]}, "application/vnd.muvee.style" : { "source" : "iana", "extensions" : ["msty"]}, "application/vnd.mynfc" : { "source" : "iana", "extensions" : ["taglet"]}, "application/vnd.ncd.control" : { "source" : "iana"}, "application/vnd.ncd.reference" : { "source" : "iana"}, "application/vnd.nearst.inv+json" : { "source" : "iana", "compressible" : true}, "application/vnd.nervana" : { "source" : "iana"}, "application/vnd.netfpx" : { "source" : "iana"}, "application/vnd.neurolanguage.nlu" : { "source" : "iana", "extensions" : ["nlu"]}, "application/vnd.nimn" : { "source" : "iana"}, "application/vnd.nintendo.nitro.rom" : { "source" : "iana"}, "application/vnd.nintendo.snes.rom" : { "source" : "iana"}, "application/vnd.nitf" : { "source" : "iana", "extensions" : ["ntf","nitf"]}, "application/vnd.noblenet-directory" : { "source" : "iana", "extensions" : ["nnd"]}, "application/vnd.noblenet-sealer" : { "source" : "iana", "extensions" : ["nns"]}, "application/vnd.noblenet-web" : { "source" : "iana", "extensions" : ["nnw"]}, "application/vnd.nokia.catalogs" : { "source" : "iana"}, "application/vnd.nokia.conml+wbxml" : { "source" : "iana"}, "application/vnd.nokia.conml+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.nokia.iptv.config+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.nokia.isds-radio-presets" : { "source" : "iana"}, "application/vnd.nokia.landmark+wbxml" : { "source" : "iana"}, "application/vnd.nokia.landmark+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.nokia.landmarkcollection+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.nokia.n-gage.ac+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.nokia.n-gage.data" : { "source" : "iana", "extensions" : ["ngdat"]}, "application/vnd.nokia.n-gage.symbian.install" : { "source" : "iana", "extensions" : ["n-gage"]}, "application/vnd.nokia.ncd" : { "source" : "iana"}, "application/vnd.nokia.pcd+wbxml" : { "source" : "iana"}, "application/vnd.nokia.pcd+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.nokia.radio-preset" : { "source" : "iana", "extensions" : ["rpst"]}, "application/vnd.nokia.radio-presets" : { "source" : "iana", "extensions" : ["rpss"]}, "application/vnd.novadigm.edm" : { "source" : "iana", "extensions" : ["edm"]}, "application/vnd.novadigm.edx" : { "source" : "iana", "extensions" : ["edx"]}, "application/vnd.novadigm.ext" : { "source" : "iana", "extensions" : ["ext"]}, "application/vnd.ntt-local.content-share" : { "source" : "iana"}, "application/vnd.ntt-local.file-transfer" : { "source" : "iana"}, "application/vnd.ntt-local.ogw_remote-access" : { "source" : "iana"}, "application/vnd.ntt-local.sip-ta_remote" : { "source" : "iana"}, "application/vnd.ntt-local.sip-ta_tcp_stream" : { "source" : "iana"}, "application/vnd.oasis.opendocument.chart" : { "source" : "iana", "extensions" : ["odc"]}, "application/vnd.oasis.opendocument.chart-template" : { "source" : "iana", "extensions" : ["otc"]}, "application/vnd.oasis.opendocument.database" : { "source" : "iana", "extensions" : ["odb"]}, "application/vnd.oasis.opendocument.formula" : { "source" : "iana", "extensions" : ["odf"]}, "application/vnd.oasis.opendocument.formula-template" : { "source" : "iana", "extensions" : ["odft"]}, "application/vnd.oasis.opendocument.graphics" : { "source" : "iana", "compressible" : false, "extensions" : ["odg"]}, "application/vnd.oasis.opendocument.graphics-template" : { "source" : "iana", "extensions" : ["otg"]}, "application/vnd.oasis.opendocument.image" : { "source" : "iana", "extensions" : ["odi"]}, "application/vnd.oasis.opendocument.image-template" : { "source" : "iana", "extensions" : ["oti"]}, "application/vnd.oasis.opendocument.presentation" : { "source" : "iana", "compressible" : false, "extensions" : ["odp"]}, "application/vnd.oasis.opendocument.presentation-template" : { "source" : "iana", "extensions" : ["otp"]}, "application/vnd.oasis.opendocument.spreadsheet" : { "source" : "iana", "compressible" : false, "extensions" : ["ods"]}, "application/vnd.oasis.opendocument.spreadsheet-template" : { "source" : "iana", "extensions" : ["ots"]}, "application/vnd.oasis.opendocument.text" : { "source" : "iana", "compressible" : false, "extensions" : ["odt"]}, "application/vnd.oasis.opendocument.text-master" : { "source" : "iana", "extensions" : ["odm"]}, "application/vnd.oasis.opendocument.text-template" : { "source" : "iana", "extensions" : ["ott"]}, "application/vnd.oasis.opendocument.text-web" : { "source" : "iana", "extensions" : ["oth"]}, "application/vnd.obn" : { "source" : "iana"}, "application/vnd.ocf+cbor" : { "source" : "iana"}, "application/vnd.oftn.l10n+json" : { "source" : "iana", "compressible" : true}, "application/vnd.oipf.contentaccessdownload+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oipf.contentaccessstreaming+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oipf.cspg-hexbinary" : { "source" : "iana"}, "application/vnd.oipf.dae.svg+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oipf.dae.xhtml+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oipf.mippvcontrolmessage+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oipf.pae.gem" : { "source" : "iana"}, "application/vnd.oipf.spdiscovery+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oipf.spdlist+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oipf.ueprofile+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oipf.userprofile+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.olpc-sugar" : { "source" : "iana", "extensions" : ["xo"]}, "application/vnd.oma-scws-config" : { "source" : "iana"}, "application/vnd.oma-scws-http-request" : { "source" : "iana"}, "application/vnd.oma-scws-http-response" : { "source" : "iana"}, "application/vnd.oma.bcast.associated-procedure-parameter+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.bcast.drm-trigger+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.bcast.imd+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.bcast.ltkm" : { "source" : "iana"}, "application/vnd.oma.bcast.notification+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.bcast.provisioningtrigger" : { "source" : "iana"}, "application/vnd.oma.bcast.sgboot" : { "source" : "iana"}, "application/vnd.oma.bcast.sgdd+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.bcast.sgdu" : { "source" : "iana"}, "application/vnd.oma.bcast.simple-symbol-container" : { "source" : "iana"}, "application/vnd.oma.bcast.smartcard-trigger+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.bcast.sprov+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.bcast.stkm" : { "source" : "iana"}, "application/vnd.oma.cab-address-book+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.cab-feature-handler+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.cab-pcc+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.cab-subs-invite+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.cab-user-prefs+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.dcd" : { "source" : "iana"}, "application/vnd.oma.dcdc" : { "source" : "iana"}, "application/vnd.oma.dd2+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["dd2"]}, "application/vnd.oma.drm.risd+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.group-usage-list+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.lwm2m+json" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.lwm2m+tlv" : { "source" : "iana"}, "application/vnd.oma.pal+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.poc.detailed-progress-report+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.poc.final-report+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.poc.groups+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.poc.invocation-descriptor+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.poc.optimized-progress-report+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.push" : { "source" : "iana"}, "application/vnd.oma.scidm.messages+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oma.xcap-directory+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.omads-email+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.omads-file+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.omads-folder+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.omaloc-supl-init" : { "source" : "iana"}, "application/vnd.onepager" : { "source" : "iana"}, "application/vnd.onepagertamp" : { "source" : "iana"}, "application/vnd.onepagertamx" : { "source" : "iana"}, "application/vnd.onepagertat" : { "source" : "iana"}, "application/vnd.onepagertatp" : { "source" : "iana"}, "application/vnd.onepagertatx" : { "source" : "iana"}, "application/vnd.openblox.game+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openblox.game-binary" : { "source" : "iana"}, "application/vnd.openeye.oeb" : { "source" : "iana"}, "application/vnd.openofficeorg.extension" : { "source" : "apache", "extensions" : ["oxt"]}, "application/vnd.openstreetmap.data+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.custom-properties+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.customxmlproperties+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.drawing+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.drawingml.chart+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.extended-properties+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.comments+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.presentation" : { "source" : "iana", "compressible" : false, "extensions" : ["pptx"]}, "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.slide" : { "source" : "iana", "extensions" : ["sldx"]}, "application/vnd.openxmlformats-officedocument.presentationml.slide+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.slideshow" : { "source" : "iana", "extensions" : ["ppsx"]}, "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.tags+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.template" : { "source" : "iana", "extensions" : ["potx"]}, "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : { "source" : "iana", "compressible" : false, "extensions" : ["xlsx"]}, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.template" : { "source" : "iana", "extensions" : ["xltx"]}, "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.theme+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.themeoverride+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.vmldrawing" : { "source" : "iana"}, "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : { "source" : "iana", "compressible" : false, "extensions" : ["docx"]}, "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.template" : { "source" : "iana", "extensions" : ["dotx"]}, "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-package.core-properties+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.openxmlformats-package.relationships+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oracle.resource+json" : { "source" : "iana", "compressible" : true}, "application/vnd.orange.indata" : { "source" : "iana"}, "application/vnd.osa.netdeploy" : { "source" : "iana"}, "application/vnd.osgeo.mapguide.package" : { "source" : "iana", "extensions" : ["mgp"]}, "application/vnd.osgi.bundle" : { "source" : "iana"}, "application/vnd.osgi.dp" : { "source" : "iana", "extensions" : ["dp"]}, "application/vnd.osgi.subsystem" : { "source" : "iana", "extensions" : ["esa"]}, "application/vnd.otps.ct-kip+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.oxli.countgraph" : { "source" : "iana"}, "application/vnd.pagerduty+json" : { "source" : "iana", "compressible" : true}, "application/vnd.palm" : { "source" : "iana", "extensions" : ["pdb","pqa","oprc"]}, "application/vnd.panoply" : { "source" : "iana"}, "application/vnd.paos.xml" : { "source" : "iana"}, "application/vnd.patentdive" : { "source" : "iana"}, "application/vnd.patientecommsdoc" : { "source" : "iana"}, "application/vnd.pawaafile" : { "source" : "iana", "extensions" : ["paw"]}, "application/vnd.pcos" : { "source" : "iana"}, "application/vnd.pg.format" : { "source" : "iana", "extensions" : ["str"]}, "application/vnd.pg.osasli" : { "source" : "iana", "extensions" : ["ei6"]}, "application/vnd.piaccess.application-licence" : { "source" : "iana"}, "application/vnd.picsel" : { "source" : "iana", "extensions" : ["efif"]}, "application/vnd.pmi.widget" : { "source" : "iana", "extensions" : ["wg"]}, "application/vnd.poc.group-advertisement+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.pocketlearn" : { "source" : "iana", "extensions" : ["plf"]}, "application/vnd.powerbuilder6" : { "source" : "iana", "extensions" : ["pbd"]}, "application/vnd.powerbuilder6-s" : { "source" : "iana"}, "application/vnd.powerbuilder7" : { "source" : "iana"}, "application/vnd.powerbuilder7-s" : { "source" : "iana"}, "application/vnd.powerbuilder75" : { "source" : "iana"}, "application/vnd.powerbuilder75-s" : { "source" : "iana"}, "application/vnd.preminet" : { "source" : "iana"}, "application/vnd.previewsystems.box" : { "source" : "iana", "extensions" : ["box"]}, "application/vnd.proteus.magazine" : { "source" : "iana", "extensions" : ["mgz"]}, "application/vnd.psfs" : { "source" : "iana"}, "application/vnd.publishare-delta-tree" : { "source" : "iana", "extensions" : ["qps"]}, "application/vnd.pvi.ptid1" : { "source" : "iana", "extensions" : ["ptid"]}, "application/vnd.pwg-multiplexed" : { "source" : "iana"}, "application/vnd.pwg-xhtml-print+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.qualcomm.brew-app-res" : { "source" : "iana"}, "application/vnd.quarantainenet" : { "source" : "iana"}, "application/vnd.quark.quarkxpress" : { "source" : "iana", "extensions" : ["qxd","qxt","qwd","qwt","qxl","qxb"]}, "application/vnd.quobject-quoxdocument" : { "source" : "iana"}, "application/vnd.radisys.moml+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-audit+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-audit-conf+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-audit-conn+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-audit-dialog+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-audit-stream+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-conf+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-dialog+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-dialog-base+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-dialog-fax-detect+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-dialog-fax-sendrecv+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-dialog-group+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-dialog-speech+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.radisys.msml-dialog-transform+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.rainstor.data" : { "source" : "iana"}, "application/vnd.rapid" : { "source" : "iana"}, "application/vnd.rar" : { "source" : "iana"}, "application/vnd.realvnc.bed" : { "source" : "iana", "extensions" : ["bed"]}, "application/vnd.recordare.musicxml" : { "source" : "iana", "extensions" : ["mxl"]}, "application/vnd.recordare.musicxml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["musicxml"]}, "application/vnd.renlearn.rlprint" : { "source" : "iana"}, "application/vnd.restful+json" : { "source" : "iana", "compressible" : true}, "application/vnd.rig.cryptonote" : { "source" : "iana", "extensions" : ["cryptonote"]}, "application/vnd.rim.cod" : { "source" : "apache", "extensions" : ["cod"]}, "application/vnd.rn-realmedia" : { "source" : "apache", "extensions" : ["rm"]}, "application/vnd.rn-realmedia-vbr" : { "source" : "apache", "extensions" : ["rmvb"]}, "application/vnd.route66.link66+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["link66"]}, "application/vnd.rs-274x" : { "source" : "iana"}, "application/vnd.ruckus.download" : { "source" : "iana"}, "application/vnd.s3sms" : { "source" : "iana"}, "application/vnd.sailingtracker.track" : { "source" : "iana", "extensions" : ["st"]}, "application/vnd.sbm.cid" : { "source" : "iana"}, "application/vnd.sbm.mid2" : { "source" : "iana"}, "application/vnd.scribus" : { "source" : "iana"}, "application/vnd.sealed.3df" : { "source" : "iana"}, "application/vnd.sealed.csf" : { "source" : "iana"}, "application/vnd.sealed.doc" : { "source" : "iana"}, "application/vnd.sealed.eml" : { "source" : "iana"}, "application/vnd.sealed.mht" : { "source" : "iana"}, "application/vnd.sealed.net" : { "source" : "iana"}, "application/vnd.sealed.ppt" : { "source" : "iana"}, "application/vnd.sealed.tiff" : { "source" : "iana"}, "application/vnd.sealed.xls" : { "source" : "iana"}, "application/vnd.sealedmedia.softseal.html" : { "source" : "iana"}, "application/vnd.sealedmedia.softseal.pdf" : { "source" : "iana"}, "application/vnd.seemail" : { "source" : "iana", "extensions" : ["see"]}, "application/vnd.sema" : { "source" : "iana", "extensions" : ["sema"]}, "application/vnd.semd" : { "source" : "iana", "extensions" : ["semd"]}, "application/vnd.semf" : { "source" : "iana", "extensions" : ["semf"]}, "application/vnd.shana.informed.formdata" : { "source" : "iana", "extensions" : ["ifm"]}, "application/vnd.shana.informed.formtemplate" : { "source" : "iana", "extensions" : ["itp"]}, "application/vnd.shana.informed.interchange" : { "source" : "iana", "extensions" : ["iif"]}, "application/vnd.shana.informed.package" : { "source" : "iana", "extensions" : ["ipk"]}, "application/vnd.shootproof+json" : { "source" : "iana", "compressible" : true}, "application/vnd.sigrok.session" : { "source" : "iana"}, "application/vnd.simtech-mindmapper" : { "source" : "iana", "extensions" : ["twd","twds"]}, "application/vnd.siren+json" : { "source" : "iana", "compressible" : true}, "application/vnd.smaf" : { "source" : "iana", "extensions" : ["mmf"]}, "application/vnd.smart.notebook" : { "source" : "iana"}, "application/vnd.smart.teacher" : { "source" : "iana", "extensions" : ["teacher"]}, "application/vnd.software602.filler.form+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.software602.filler.form-xml-zip" : { "source" : "iana"}, "application/vnd.solent.sdkm+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["sdkm","sdkd"]}, "application/vnd.spotfire.dxp" : { "source" : "iana", "extensions" : ["dxp"]}, "application/vnd.spotfire.sfs" : { "source" : "iana", "extensions" : ["sfs"]}, "application/vnd.sqlite3" : { "source" : "iana"}, "application/vnd.sss-cod" : { "source" : "iana"}, "application/vnd.sss-dtf" : { "source" : "iana"}, "application/vnd.sss-ntf" : { "source" : "iana"}, "application/vnd.stardivision.calc" : { "source" : "apache", "extensions" : ["sdc"]}, "application/vnd.stardivision.draw" : { "source" : "apache", "extensions" : ["sda"]}, "application/vnd.stardivision.impress" : { "source" : "apache", "extensions" : ["sdd"]}, "application/vnd.stardivision.math" : { "source" : "apache", "extensions" : ["smf"]}, "application/vnd.stardivision.writer" : { "source" : "apache", "extensions" : ["sdw","vor"]}, "application/vnd.stardivision.writer-global" : { "source" : "apache", "extensions" : ["sgl"]}, "application/vnd.stepmania.package" : { "source" : "iana", "extensions" : ["smzip"]}, "application/vnd.stepmania.stepchart" : { "source" : "iana", "extensions" : ["sm"]}, "application/vnd.street-stream" : { "source" : "iana"}, "application/vnd.sun.wadl+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["wadl"]}, "application/vnd.sun.xml.calc" : { "source" : "apache", "extensions" : ["sxc"]}, "application/vnd.sun.xml.calc.template" : { "source" : "apache", "extensions" : ["stc"]}, "application/vnd.sun.xml.draw" : { "source" : "apache", "extensions" : ["sxd"]}, "application/vnd.sun.xml.draw.template" : { "source" : "apache", "extensions" : ["std"]}, "application/vnd.sun.xml.impress" : { "source" : "apache", "extensions" : ["sxi"]}, "application/vnd.sun.xml.impress.template" : { "source" : "apache", "extensions" : ["sti"]}, "application/vnd.sun.xml.math" : { "source" : "apache", "extensions" : ["sxm"]}, "application/vnd.sun.xml.writer" : { "source" : "apache", "extensions" : ["sxw"]}, "application/vnd.sun.xml.writer.global" : { "source" : "apache", "extensions" : ["sxg"]}, "application/vnd.sun.xml.writer.template" : { "source" : "apache", "extensions" : ["stw"]}, "application/vnd.sus-calendar" : { "source" : "iana", "extensions" : ["sus","susp"]}, "application/vnd.svd" : { "source" : "iana", "extensions" : ["svd"]}, "application/vnd.swiftview-ics" : { "source" : "iana"}, "application/vnd.symbian.install" : { "source" : "apache", "extensions" : ["sis","sisx"]}, "application/vnd.syncml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xsm"]}, "application/vnd.syncml.dm+wbxml" : { "source" : "iana", "extensions" : ["bdm"]}, "application/vnd.syncml.dm+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xdm"]}, "application/vnd.syncml.dm.notification" : { "source" : "iana"}, "application/vnd.syncml.dmddf+wbxml" : { "source" : "iana"}, "application/vnd.syncml.dmddf+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.syncml.dmtnds+wbxml" : { "source" : "iana"}, "application/vnd.syncml.dmtnds+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.syncml.ds.notification" : { "source" : "iana"}, "application/vnd.tableschema+json" : { "source" : "iana", "compressible" : true}, "application/vnd.tao.intent-module-archive" : { "source" : "iana", "extensions" : ["tao"]}, "application/vnd.tcpdump.pcap" : { "source" : "iana", "extensions" : ["pcap","cap","dmp"]}, "application/vnd.think-cell.ppttc+json" : { "source" : "iana", "compressible" : true}, "application/vnd.tmd.mediaflex.api+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.tml" : { "source" : "iana"}, "application/vnd.tmobile-livetv" : { "source" : "iana", "extensions" : ["tmo"]}, "application/vnd.tri.onesource" : { "source" : "iana"}, "application/vnd.trid.tpt" : { "source" : "iana", "extensions" : ["tpt"]}, "application/vnd.triscape.mxs" : { "source" : "iana", "extensions" : ["mxs"]}, "application/vnd.trueapp" : { "source" : "iana", "extensions" : ["tra"]}, "application/vnd.truedoc" : { "source" : "iana"}, "application/vnd.ubisoft.webplayer" : { "source" : "iana"}, "application/vnd.ufdl" : { "source" : "iana", "extensions" : ["ufd","ufdl"]}, "application/vnd.uiq.theme" : { "source" : "iana", "extensions" : ["utz"]}, "application/vnd.umajin" : { "source" : "iana", "extensions" : ["umj"]}, "application/vnd.unity" : { "source" : "iana", "extensions" : ["unityweb"]}, "application/vnd.uoml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["uoml"]}, "application/vnd.uplanet.alert" : { "source" : "iana"}, "application/vnd.uplanet.alert-wbxml" : { "source" : "iana"}, "application/vnd.uplanet.bearer-choice" : { "source" : "iana"}, "application/vnd.uplanet.bearer-choice-wbxml" : { "source" : "iana"}, "application/vnd.uplanet.cacheop" : { "source" : "iana"}, "application/vnd.uplanet.cacheop-wbxml" : { "source" : "iana"}, "application/vnd.uplanet.channel" : { "source" : "iana"}, "application/vnd.uplanet.channel-wbxml" : { "source" : "iana"}, "application/vnd.uplanet.list" : { "source" : "iana"}, "application/vnd.uplanet.list-wbxml" : { "source" : "iana"}, "application/vnd.uplanet.listcmd" : { "source" : "iana"}, "application/vnd.uplanet.listcmd-wbxml" : { "source" : "iana"}, "application/vnd.uplanet.signal" : { "source" : "iana"}, "application/vnd.uri-map" : { "source" : "iana"}, "application/vnd.valve.source.material" : { "source" : "iana"}, "application/vnd.vcx" : { "source" : "iana", "extensions" : ["vcx"]}, "application/vnd.vd-study" : { "source" : "iana"}, "application/vnd.vectorworks" : { "source" : "iana"}, "application/vnd.vel+json" : { "source" : "iana", "compressible" : true}, "application/vnd.verimatrix.vcas" : { "source" : "iana"}, "application/vnd.veryant.thin" : { "source" : "iana"}, "application/vnd.vidsoft.vidconference" : { "source" : "iana"}, "application/vnd.visio" : { "source" : "iana", "extensions" : ["vsd","vst","vss","vsw"]}, "application/vnd.visionary" : { "source" : "iana", "extensions" : ["vis"]}, "application/vnd.vividence.scriptfile" : { "source" : "iana"}, "application/vnd.vsf" : { "source" : "iana", "extensions" : ["vsf"]}, "application/vnd.wap.sic" : { "source" : "iana"}, "application/vnd.wap.slc" : { "source" : "iana"}, "application/vnd.wap.wbxml" : { "source" : "iana", "extensions" : ["wbxml"]}, "application/vnd.wap.wmlc" : { "source" : "iana", "extensions" : ["wmlc"]}, "application/vnd.wap.wmlscriptc" : { "source" : "iana", "extensions" : ["wmlsc"]}, "application/vnd.webturbo" : { "source" : "iana", "extensions" : ["wtb"]}, "application/vnd.wfa.p2p" : { "source" : "iana"}, "application/vnd.wfa.wsc" : { "source" : "iana"}, "application/vnd.windows.devicepairing" : { "source" : "iana"}, "application/vnd.wmc" : { "source" : "iana"}, "application/vnd.wmf.bootstrap" : { "source" : "iana"}, "application/vnd.wolfram.mathematica" : { "source" : "iana"}, "application/vnd.wolfram.mathematica.package" : { "source" : "iana"}, "application/vnd.wolfram.player" : { "source" : "iana", "extensions" : ["nbp"]}, "application/vnd.wordperfect" : { "source" : "iana", "extensions" : ["wpd"]}, "application/vnd.wqd" : { "source" : "iana", "extensions" : ["wqd"]}, "application/vnd.wrq-hp3000-labelled" : { "source" : "iana"}, "application/vnd.wt.stf" : { "source" : "iana", "extensions" : ["stf"]}, "application/vnd.wv.csp+wbxml" : { "source" : "iana"}, "application/vnd.wv.csp+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.wv.ssp+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.xacml+json" : { "source" : "iana", "compressible" : true}, "application/vnd.xara" : { "source" : "iana", "extensions" : ["xar"]}, "application/vnd.xfdl" : { "source" : "iana", "extensions" : ["xfdl"]}, "application/vnd.xfdl.webform" : { "source" : "iana"}, "application/vnd.xmi+xml" : { "source" : "iana", "compressible" : true}, "application/vnd.xmpie.cpkg" : { "source" : "iana"}, "application/vnd.xmpie.dpkg" : { "source" : "iana"}, "application/vnd.xmpie.plan" : { "source" : "iana"}, "application/vnd.xmpie.ppkg" : { "source" : "iana"}, "application/vnd.xmpie.xlim" : { "source" : "iana"}, "application/vnd.yamaha.hv-dic" : { "source" : "iana", "extensions" : ["hvd"]}, "application/vnd.yamaha.hv-script" : { "source" : "iana", "extensions" : ["hvs"]}, "application/vnd.yamaha.hv-voice" : { "source" : "iana", "extensions" : ["hvp"]}, "application/vnd.yamaha.openscoreformat" : { "source" : "iana", "extensions" : ["osf"]}, "application/vnd.yamaha.openscoreformat.osfpvg+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["osfpvg"]}, "application/vnd.yamaha.remote-setup" : { "source" : "iana"}, "application/vnd.yamaha.smaf-audio" : { "source" : "iana", "extensions" : ["saf"]}, "application/vnd.yamaha.smaf-phrase" : { "source" : "iana", "extensions" : ["spf"]}, "application/vnd.yamaha.through-ngn" : { "source" : "iana"}, "application/vnd.yamaha.tunnel-udpencap" : { "source" : "iana"}, "application/vnd.yaoweme" : { "source" : "iana"}, "application/vnd.yellowriver-custom-menu" : { "source" : "iana", "extensions" : ["cmp"]}, "application/vnd.youtube.yt" : { "source" : "iana"}, "application/vnd.zul" : { "source" : "iana", "extensions" : ["zir","zirz"]}, "application/vnd.zzazz.deck+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["zaz"]}, "application/voicexml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["vxml"]}, "application/voucher-cms+json" : { "source" : "iana", "compressible" : true}, "application/vq-rtcpxr" : { "source" : "iana"}, "application/wasm" : { "compressible" : true, "extensions" : ["wasm"]}, "application/watcherinfo+xml" : { "source" : "iana", "compressible" : true}, "application/webpush-options+json" : { "source" : "iana", "compressible" : true}, "application/whoispp-query" : { "source" : "iana"}, "application/whoispp-response" : { "source" : "iana"}, "application/widget" : { "source" : "iana", "extensions" : ["wgt"]}, "application/winhlp" : { "source" : "apache", "extensions" : ["hlp"]}, "application/wita" : { "source" : "iana"}, "application/wordperfect5.1" : { "source" : "iana"}, "application/wsdl+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["wsdl"]}, "application/wspolicy+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["wspolicy"]}, "application/x-7z-compressed" : { "source" : "apache", "compressible" : false, "extensions" : ["7z"]}, "application/x-abiword" : { "source" : "apache", "extensions" : ["abw"]}, "application/x-ace-compressed" : { "source" : "apache", "extensions" : ["ace"]}, "application/x-amf" : { "source" : "apache"}, "application/x-apple-diskimage" : { "source" : "apache", "extensions" : ["dmg"]}, "application/x-arj" : { "compressible" : false, "extensions" : ["arj"]}, "application/x-authorware-bin" : { "source" : "apache", "extensions" : ["aab","x32","u32","vox"]}, "application/x-authorware-map" : { "source" : "apache", "extensions" : ["aam"]}, "application/x-authorware-seg" : { "source" : "apache", "extensions" : ["aas"]}, "application/x-bcpio" : { "source" : "apache", "extensions" : ["bcpio"]}, "application/x-bdoc" : { "compressible" : false, "extensions" : ["bdoc"]}, "application/x-bittorrent" : { "source" : "apache", "extensions" : ["torrent"]}, "application/x-blorb" : { "source" : "apache", "extensions" : ["blb","blorb"]}, "application/x-bzip" : { "source" : "apache", "compressible" : false, "extensions" : ["bz"]}, "application/x-bzip2" : { "source" : "apache", "compressible" : false, "extensions" : ["bz2","boz"]}, "application/x-cbr" : { "source" : "apache", "extensions" : ["cbr","cba","cbt","cbz","cb7"]}, "application/x-cdlink" : { "source" : "apache", "extensions" : ["vcd"]}, "application/x-cfs-compressed" : { "source" : "apache", "extensions" : ["cfs"]}, "application/x-chat" : { "source" : "apache", "extensions" : ["chat"]}, "application/x-chess-pgn" : { "source" : "apache", "extensions" : ["pgn"]}, "application/x-chrome-extension" : { "extensions" : ["crx"]}, "application/x-cocoa" : { "source" : "nginx", "extensions" : ["cco"]}, "application/x-compress" : { "source" : "apache"}, "application/x-conference" : { "source" : "apache", "extensions" : ["nsc"]}, "application/x-cpio" : { "source" : "apache", "extensions" : ["cpio"]}, "application/x-csh" : { "source" : "apache", "extensions" : ["csh"]}, "application/x-deb" : { "compressible" : false}, "application/x-debian-package" : { "source" : "apache", "extensions" : ["deb","udeb"]}, "application/x-dgc-compressed" : { "source" : "apache", "extensions" : ["dgc"]}, "application/x-director" : { "source" : "apache", "extensions" : ["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]}, "application/x-doom" : { "source" : "apache", "extensions" : ["wad"]}, "application/x-dtbncx+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["ncx"]}, "application/x-dtbook+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["dtb"]}, "application/x-dtbresource+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["res"]}, "application/x-dvi" : { "source" : "apache", "compressible" : false, "extensions" : ["dvi"]}, "application/x-envoy" : { "source" : "apache", "extensions" : ["evy"]}, "application/x-eva" : { "source" : "apache", "extensions" : ["eva"]}, "application/x-font-bdf" : { "source" : "apache", "extensions" : ["bdf"]}, "application/x-font-dos" : { "source" : "apache"}, "application/x-font-framemaker" : { "source" : "apache"}, "application/x-font-ghostscript" : { "source" : "apache", "extensions" : ["gsf"]}, "application/x-font-libgrx" : { "source" : "apache"}, "application/x-font-linux-psf" : { "source" : "apache", "extensions" : ["psf"]}, "application/x-font-pcf" : { "source" : "apache", "extensions" : ["pcf"]}, "application/x-font-snf" : { "source" : "apache", "extensions" : ["snf"]}, "application/x-font-speedo" : { "source" : "apache"}, "application/x-font-sunos-news" : { "source" : "apache"}, "application/x-font-type1" : { "source" : "apache", "extensions" : ["pfa","pfb","pfm","afm"]}, "application/x-font-vfont" : { "source" : "apache"}, "application/x-freearc" : { "source" : "apache", "extensions" : ["arc"]}, "application/x-futuresplash" : { "source" : "apache", "extensions" : ["spl"]}, "application/x-gca-compressed" : { "source" : "apache", "extensions" : ["gca"]}, "application/x-glulx" : { "source" : "apache", "extensions" : ["ulx"]}, "application/x-gnumeric" : { "source" : "apache", "extensions" : ["gnumeric"]}, "application/x-gramps-xml" : { "source" : "apache", "extensions" : ["gramps"]}, "application/x-gtar" : { "source" : "apache", "extensions" : ["gtar"]}, "application/x-gzip" : { "source" : "apache"}, "application/x-hdf" : { "source" : "apache", "extensions" : ["hdf"]}, "application/x-httpd-php" : { "compressible" : true, "extensions" : ["php"]}, "application/x-install-instructions" : { "source" : "apache", "extensions" : ["install"]}, "application/x-iso9660-image" : { "source" : "apache", "extensions" : ["iso"]}, "application/x-java-archive-diff" : { "source" : "nginx", "extensions" : ["jardiff"]}, "application/x-java-jnlp-file" : { "source" : "apache", "compressible" : false, "extensions" : ["jnlp"]}, "application/x-javascript" : { "compressible" : true}, "application/x-latex" : { "source" : "apache", "compressible" : false, "extensions" : ["latex"]}, "application/x-lua-bytecode" : { "extensions" : ["luac"]}, "application/x-lzh-compressed" : { "source" : "apache", "extensions" : ["lzh","lha"]}, "application/x-makeself" : { "source" : "nginx", "extensions" : ["run"]}, "application/x-mie" : { "source" : "apache", "extensions" : ["mie"]}, "application/x-mobipocket-ebook" : { "source" : "apache", "extensions" : ["prc","mobi"]}, "application/x-mpegurl" : { "compressible" : false}, "application/x-ms-application" : { "source" : "apache", "extensions" : ["application"]}, "application/x-ms-shortcut" : { "source" : "apache", "extensions" : ["lnk"]}, "application/x-ms-wmd" : { "source" : "apache", "extensions" : ["wmd"]}, "application/x-ms-wmz" : { "source" : "apache", "extensions" : ["wmz"]}, "application/x-ms-xbap" : { "source" : "apache", "extensions" : ["xbap"]}, "application/x-msaccess" : { "source" : "apache", "extensions" : ["mdb"]}, "application/x-msbinder" : { "source" : "apache", "extensions" : ["obd"]}, "application/x-mscardfile" : { "source" : "apache", "extensions" : ["crd"]}, "application/x-msclip" : { "source" : "apache", "extensions" : ["clp"]}, "application/x-msdos-program" : { "extensions" : ["exe"]}, "application/x-msdownload" : { "source" : "apache", "extensions" : ["exe","dll","com","bat","msi"]}, "application/x-msmediaview" : { "source" : "apache", "extensions" : ["mvb","m13","m14"]}, "application/x-msmetafile" : { "source" : "apache", "extensions" : ["wmf","wmz","emf","emz"]}, "application/x-msmoney" : { "source" : "apache", "extensions" : ["mny"]}, "application/x-mspublisher" : { "source" : "apache", "extensions" : ["pub"]}, "application/x-msschedule" : { "source" : "apache", "extensions" : ["scd"]}, "application/x-msterminal" : { "source" : "apache", "extensions" : ["trm"]}, "application/x-mswrite" : { "source" : "apache", "extensions" : ["wri"]}, "application/x-netcdf" : { "source" : "apache", "extensions" : ["nc","cdf"]}, "application/x-ns-proxy-autoconfig" : { "compressible" : true, "extensions" : ["pac"]}, "application/x-nzb" : { "source" : "apache", "extensions" : ["nzb"]}, "application/x-perl" : { "source" : "nginx", "extensions" : ["pl","pm"]}, "application/x-pilot" : { "source" : "nginx", "extensions" : ["prc","pdb"]}, "application/x-pkcs12" : { "source" : "apache", "compressible" : false, "extensions" : ["p12","pfx"]}, "application/x-pkcs7-certificates" : { "source" : "apache", "extensions" : ["p7b","spc"]}, "application/x-pkcs7-certreqresp" : { "source" : "apache", "extensions" : ["p7r"]}, "application/x-rar-compressed" : { "source" : "apache", "compressible" : false, "extensions" : ["rar"]}, "application/x-redhat-package-manager" : { "source" : "nginx", "extensions" : ["rpm"]}, "application/x-research-info-systems" : { "source" : "apache", "extensions" : ["ris"]}, "application/x-sea" : { "source" : "nginx", "extensions" : ["sea"]}, "application/x-sh" : { "source" : "apache", "compressible" : true, "extensions" : ["sh"]}, "application/x-shar" : { "source" : "apache", "extensions" : ["shar"]}, "application/x-shockwave-flash" : { "source" : "apache", "compressible" : false, "extensions" : ["swf"]}, "application/x-silverlight-app" : { "source" : "apache", "extensions" : ["xap"]}, "application/x-sql" : { "source" : "apache", "extensions" : ["sql"]}, "application/x-stuffit" : { "source" : "apache", "compressible" : false, "extensions" : ["sit"]}, "application/x-stuffitx" : { "source" : "apache", "extensions" : ["sitx"]}, "application/x-subrip" : { "source" : "apache", "extensions" : ["srt"]}, "application/x-sv4cpio" : { "source" : "apache", "extensions" : ["sv4cpio"]}, "application/x-sv4crc" : { "source" : "apache", "extensions" : ["sv4crc"]}, "application/x-t3vm-image" : { "source" : "apache", "extensions" : ["t3"]}, "application/x-tads" : { "source" : "apache", "extensions" : ["gam"]}, "application/x-tar" : { "source" : "apache", "compressible" : true, "extensions" : ["tar"]}, "application/x-tcl" : { "source" : "apache", "extensions" : ["tcl","tk"]}, "application/x-tex" : { "source" : "apache", "extensions" : ["tex"]}, "application/x-tex-tfm" : { "source" : "apache", "extensions" : ["tfm"]}, "application/x-texinfo" : { "source" : "apache", "extensions" : ["texinfo","texi"]}, "application/x-tgif" : { "source" : "apache", "extensions" : ["obj"]}, "application/x-ustar" : { "source" : "apache", "extensions" : ["ustar"]}, "application/x-virtualbox-hdd" : { "compressible" : true, "extensions" : ["hdd"]}, "application/x-virtualbox-ova" : { "compressible" : true, "extensions" : ["ova"]}, "application/x-virtualbox-ovf" : { "compressible" : true, "extensions" : ["ovf"]}, "application/x-virtualbox-vbox" : { "compressible" : true, "extensions" : ["vbox"]}, "application/x-virtualbox-vbox-extpack" : { "compressible" : false, "extensions" : ["vbox-extpack"]}, "application/x-virtualbox-vdi" : { "compressible" : true, "extensions" : ["vdi"]}, "application/x-virtualbox-vhd" : { "compressible" : true, "extensions" : ["vhd"]}, "application/x-virtualbox-vmdk" : { "compressible" : true, "extensions" : ["vmdk"]}, "application/x-wais-source" : { "source" : "apache", "extensions" : ["src"]}, "application/x-web-app-manifest+json" : { "compressible" : true, "extensions" : ["webapp"]}, "application/x-www-form-urlencoded" : { "source" : "iana", "compressible" : true}, "application/x-x509-ca-cert" : { "source" : "apache", "extensions" : ["der","crt","pem"]}, "application/x-xfig" : { "source" : "apache", "extensions" : ["fig"]}, "application/x-xliff+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["xlf"]}, "application/x-xpinstall" : { "source" : "apache", "compressible" : false, "extensions" : ["xpi"]}, "application/x-xz" : { "source" : "apache", "extensions" : ["xz"]}, "application/x-zmachine" : { "source" : "apache", "extensions" : ["z1","z2","z3","z4","z5","z6","z7","z8"]}, "application/x400-bp" : { "source" : "iana"}, "application/xacml+xml" : { "source" : "iana", "compressible" : true}, "application/xaml+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["xaml"]}, "application/xcap-att+xml" : { "source" : "iana", "compressible" : true}, "application/xcap-caps+xml" : { "source" : "iana", "compressible" : true}, "application/xcap-diff+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xdf"]}, "application/xcap-el+xml" : { "source" : "iana", "compressible" : true}, "application/xcap-error+xml" : { "source" : "iana", "compressible" : true}, "application/xcap-ns+xml" : { "source" : "iana", "compressible" : true}, "application/xcon-conference-info+xml" : { "source" : "iana", "compressible" : true}, "application/xcon-conference-info-diff+xml" : { "source" : "iana", "compressible" : true}, "application/xenc+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xenc"]}, "application/xhtml+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xhtml","xht"]}, "application/xhtml-voice+xml" : { "source" : "apache", "compressible" : true}, "application/xliff+xml" : { "source" : "iana", "compressible" : true}, "application/xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xml","xsl","xsd","rng"]}, "application/xml-dtd" : { "source" : "iana", "compressible" : true, "extensions" : ["dtd"]}, "application/xml-external-parsed-entity" : { "source" : "iana"}, "application/xml-patch+xml" : { "source" : "iana", "compressible" : true}, "application/xmpp+xml" : { "source" : "iana", "compressible" : true}, "application/xop+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xop"]}, "application/xproc+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["xpl"]}, "application/xslt+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xslt"]}, "application/xspf+xml" : { "source" : "apache", "compressible" : true, "extensions" : ["xspf"]}, "application/xv+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["mxml","xhvml","xvml","xvm"]}, "application/yang" : { "source" : "iana", "extensions" : ["yang"]}, "application/yang-data+json" : { "source" : "iana", "compressible" : true}, "application/yang-data+xml" : { "source" : "iana", "compressible" : true}, "application/yang-patch+json" : { "source" : "iana", "compressible" : true}, "application/yang-patch+xml" : { "source" : "iana", "compressible" : true}, "application/yin+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["yin"]}, "application/zip" : { "source" : "iana", "compressible" : false, "extensions" : ["zip"]}, "application/zlib" : { "source" : "iana"}, "application/zstd" : { "source" : "iana"}, "audio/1d-interleaved-parityfec" : { "source" : "iana"}, "audio/32kadpcm" : { "source" : "iana"}, "audio/3gpp" : { "source" : "iana", "compressible" : false, "extensions" : ["3gpp"]}, "audio/3gpp2" : { "source" : "iana"}, "audio/aac" : { "source" : "iana"}, "audio/ac3" : { "source" : "iana"}, "audio/adpcm" : { "source" : "apache", "extensions" : ["adp"]}, "audio/amr" : { "source" : "iana"}, "audio/amr-wb" : { "source" : "iana"}, "audio/amr-wb+" : { "source" : "iana"}, "audio/aptx" : { "source" : "iana"}, "audio/asc" : { "source" : "iana"}, "audio/atrac-advanced-lossless" : { "source" : "iana"}, "audio/atrac-x" : { "source" : "iana"}, "audio/atrac3" : { "source" : "iana"}, "audio/basic" : { "source" : "iana", "compressible" : false, "extensions" : ["au","snd"]}, "audio/bv16" : { "source" : "iana"}, "audio/bv32" : { "source" : "iana"}, "audio/clearmode" : { "source" : "iana"}, "audio/cn" : { "source" : "iana"}, "audio/dat12" : { "source" : "iana"}, "audio/dls" : { "source" : "iana"}, "audio/dsr-es201108" : { "source" : "iana"}, "audio/dsr-es202050" : { "source" : "iana"}, "audio/dsr-es202211" : { "source" : "iana"}, "audio/dsr-es202212" : { "source" : "iana"}, "audio/dv" : { "source" : "iana"}, "audio/dvi4" : { "source" : "iana"}, "audio/eac3" : { "source" : "iana"}, "audio/encaprtp" : { "source" : "iana"}, "audio/evrc" : { "source" : "iana"}, "audio/evrc-qcp" : { "source" : "iana"}, "audio/evrc0" : { "source" : "iana"}, "audio/evrc1" : { "source" : "iana"}, "audio/evrcb" : { "source" : "iana"}, "audio/evrcb0" : { "source" : "iana"}, "audio/evrcb1" : { "source" : "iana"}, "audio/evrcnw" : { "source" : "iana"}, "audio/evrcnw0" : { "source" : "iana"}, "audio/evrcnw1" : { "source" : "iana"}, "audio/evrcwb" : { "source" : "iana"}, "audio/evrcwb0" : { "source" : "iana"}, "audio/evrcwb1" : { "source" : "iana"}, "audio/evs" : { "source" : "iana"}, "audio/fwdred" : { "source" : "iana"}, "audio/g711-0" : { "source" : "iana"}, "audio/g719" : { "source" : "iana"}, "audio/g722" : { "source" : "iana"}, "audio/g7221" : { "source" : "iana"}, "audio/g723" : { "source" : "iana"}, "audio/g726-16" : { "source" : "iana"}, "audio/g726-24" : { "source" : "iana"}, "audio/g726-32" : { "source" : "iana"}, "audio/g726-40" : { "source" : "iana"}, "audio/g728" : { "source" : "iana"}, "audio/g729" : { "source" : "iana"}, "audio/g7291" : { "source" : "iana"}, "audio/g729d" : { "source" : "iana"}, "audio/g729e" : { "source" : "iana"}, "audio/gsm" : { "source" : "iana"}, "audio/gsm-efr" : { "source" : "iana"}, "audio/gsm-hr-08" : { "source" : "iana"}, "audio/ilbc" : { "source" : "iana"}, "audio/ip-mr_v2.5" : { "source" : "iana"}, "audio/isac" : { "source" : "apache"}, "audio/l16" : { "source" : "iana"}, "audio/l20" : { "source" : "iana"}, "audio/l24" : { "source" : "iana", "compressible" : false}, "audio/l8" : { "source" : "iana"}, "audio/lpc" : { "source" : "iana"}, "audio/melp" : { "source" : "iana"}, "audio/melp1200" : { "source" : "iana"}, "audio/melp2400" : { "source" : "iana"}, "audio/melp600" : { "source" : "iana"}, "audio/midi" : { "source" : "apache", "extensions" : ["mid","midi","kar","rmi"]}, "audio/mobile-xmf" : { "source" : "iana"}, "audio/mp3" : { "compressible" : false, "extensions" : ["mp3"]}, "audio/mp4" : { "source" : "iana", "compressible" : false, "extensions" : ["m4a","mp4a"]}, "audio/mp4a-latm" : { "source" : "iana"}, "audio/mpa" : { "source" : "iana"}, "audio/mpa-robust" : { "source" : "iana"}, "audio/mpeg" : { "source" : "iana", "compressible" : false, "extensions" : ["mpga","mp2","mp2a","mp3","m2a","m3a"]}, "audio/mpeg4-generic" : { "source" : "iana"}, "audio/musepack" : { "source" : "apache"}, "audio/ogg" : { "source" : "iana", "compressible" : false, "extensions" : ["oga","ogg","spx"]}, "audio/opus" : { "source" : "iana"}, "audio/parityfec" : { "source" : "iana"}, "audio/pcma" : { "source" : "iana"}, "audio/pcma-wb" : { "source" : "iana"}, "audio/pcmu" : { "source" : "iana"}, "audio/pcmu-wb" : { "source" : "iana"}, "audio/prs.sid" : { "source" : "iana"}, "audio/qcelp" : { "source" : "iana"}, "audio/raptorfec" : { "source" : "iana"}, "audio/red" : { "source" : "iana"}, "audio/rtp-enc-aescm128" : { "source" : "iana"}, "audio/rtp-midi" : { "source" : "iana"}, "audio/rtploopback" : { "source" : "iana"}, "audio/rtx" : { "source" : "iana"}, "audio/s3m" : { "source" : "apache", "extensions" : ["s3m"]}, "audio/silk" : { "source" : "apache", "extensions" : ["sil"]}, "audio/smv" : { "source" : "iana"}, "audio/smv-qcp" : { "source" : "iana"}, "audio/smv0" : { "source" : "iana"}, "audio/sp-midi" : { "source" : "iana"}, "audio/speex" : { "source" : "iana"}, "audio/t140c" : { "source" : "iana"}, "audio/t38" : { "source" : "iana"}, "audio/telephone-event" : { "source" : "iana"}, "audio/tetra_acelp" : { "source" : "iana"}, "audio/tone" : { "source" : "iana"}, "audio/uemclip" : { "source" : "iana"}, "audio/ulpfec" : { "source" : "iana"}, "audio/usac" : { "source" : "iana"}, "audio/vdvi" : { "source" : "iana"}, "audio/vmr-wb" : { "source" : "iana"}, "audio/vnd.3gpp.iufp" : { "source" : "iana"}, "audio/vnd.4sb" : { "source" : "iana"}, "audio/vnd.audiokoz" : { "source" : "iana"}, "audio/vnd.celp" : { "source" : "iana"}, "audio/vnd.cisco.nse" : { "source" : "iana"}, "audio/vnd.cmles.radio-events" : { "source" : "iana"}, "audio/vnd.cns.anp1" : { "source" : "iana"}, "audio/vnd.cns.inf1" : { "source" : "iana"}, "audio/vnd.dece.audio" : { "source" : "iana", "extensions" : ["uva","uvva"]}, "audio/vnd.digital-winds" : { "source" : "iana", "extensions" : ["eol"]}, "audio/vnd.dlna.adts" : { "source" : "iana"}, "audio/vnd.dolby.heaac.1" : { "source" : "iana"}, "audio/vnd.dolby.heaac.2" : { "source" : "iana"}, "audio/vnd.dolby.mlp" : { "source" : "iana"}, "audio/vnd.dolby.mps" : { "source" : "iana"}, "audio/vnd.dolby.pl2" : { "source" : "iana"}, "audio/vnd.dolby.pl2x" : { "source" : "iana"}, "audio/vnd.dolby.pl2z" : { "source" : "iana"}, "audio/vnd.dolby.pulse.1" : { "source" : "iana"}, "audio/vnd.dra" : { "source" : "iana", "extensions" : ["dra"]}, "audio/vnd.dts" : { "source" : "iana", "extensions" : ["dts"]}, "audio/vnd.dts.hd" : { "source" : "iana", "extensions" : ["dtshd"]}, "audio/vnd.dts.uhd" : { "source" : "iana"}, "audio/vnd.dvb.file" : { "source" : "iana"}, "audio/vnd.everad.plj" : { "source" : "iana"}, "audio/vnd.hns.audio" : { "source" : "iana"}, "audio/vnd.lucent.voice" : { "source" : "iana", "extensions" : ["lvp"]}, "audio/vnd.ms-playready.media.pya" : { "source" : "iana", "extensions" : ["pya"]}, "audio/vnd.nokia.mobile-xmf" : { "source" : "iana"}, "audio/vnd.nortel.vbk" : { "source" : "iana"}, "audio/vnd.nuera.ecelp4800" : { "source" : "iana", "extensions" : ["ecelp4800"]}, "audio/vnd.nuera.ecelp7470" : { "source" : "iana", "extensions" : ["ecelp7470"]}, "audio/vnd.nuera.ecelp9600" : { "source" : "iana", "extensions" : ["ecelp9600"]}, "audio/vnd.octel.sbc" : { "source" : "iana"}, "audio/vnd.presonus.multitrack" : { "source" : "iana"}, "audio/vnd.qcelp" : { "source" : "iana"}, "audio/vnd.rhetorex.32kadpcm" : { "source" : "iana"}, "audio/vnd.rip" : { "source" : "iana", "extensions" : ["rip"]}, "audio/vnd.rn-realaudio" : { "compressible" : false}, "audio/vnd.sealedmedia.softseal.mpeg" : { "source" : "iana"}, "audio/vnd.vmx.cvsd" : { "source" : "iana"}, "audio/vnd.wave" : { "compressible" : false}, "audio/vorbis" : { "source" : "iana", "compressible" : false}, "audio/vorbis-config" : { "source" : "iana"}, "audio/wav" : { "compressible" : false, "extensions" : ["wav"]}, "audio/wave" : { "compressible" : false, "extensions" : ["wav"]}, "audio/webm" : { "source" : "apache", "compressible" : false, "extensions" : ["weba"]}, "audio/x-aac" : { "source" : "apache", "compressible" : false, "extensions" : ["aac"]}, "audio/x-aiff" : { "source" : "apache", "extensions" : ["aif","aiff","aifc"]}, "audio/x-caf" : { "source" : "apache", "compressible" : false, "extensions" : ["caf"]}, "audio/x-flac" : { "source" : "apache", "extensions" : ["flac"]}, "audio/x-m4a" : { "source" : "nginx", "extensions" : ["m4a"]}, "audio/x-matroska" : { "source" : "apache", "extensions" : ["mka"]}, "audio/x-mpegurl" : { "source" : "apache", "extensions" : ["m3u"]}, "audio/x-ms-wax" : { "source" : "apache", "extensions" : ["wax"]}, "audio/x-ms-wma" : { "source" : "apache", "extensions" : ["wma"]}, "audio/x-pn-realaudio" : { "source" : "apache", "extensions" : ["ram","ra"]}, "audio/x-pn-realaudio-plugin" : { "source" : "apache", "extensions" : ["rmp"]}, "audio/x-realaudio" : { "source" : "nginx", "extensions" : ["ra"]}, "audio/x-tta" : { "source" : "apache"}, "audio/x-wav" : { "source" : "apache", "extensions" : ["wav"]}, "audio/xm" : { "source" : "apache", "extensions" : ["xm"]}, "chemical/x-cdx" : { "source" : "apache", "extensions" : ["cdx"]}, "chemical/x-cif" : { "source" : "apache", "extensions" : ["cif"]}, "chemical/x-cmdf" : { "source" : "apache", "extensions" : ["cmdf"]}, "chemical/x-cml" : { "source" : "apache", "extensions" : ["cml"]}, "chemical/x-csml" : { "source" : "apache", "extensions" : ["csml"]}, "chemical/x-pdb" : { "source" : "apache"}, "chemical/x-xyz" : { "source" : "apache", "extensions" : ["xyz"]}, "font/collection" : { "source" : "iana", "extensions" : ["ttc"]}, "font/otf" : { "source" : "iana", "compressible" : true, "extensions" : ["otf"]}, "font/sfnt" : { "source" : "iana"}, "font/ttf" : { "source" : "iana", "extensions" : ["ttf"]}, "font/woff" : { "source" : "iana", "extensions" : ["woff"]}, "font/woff2" : { "source" : "iana", "extensions" : ["woff2"]}, "image/aces" : { "source" : "iana", "extensions" : ["exr"]}, "image/apng" : { "compressible" : false, "extensions" : ["apng"]}, "image/avci" : { "source" : "iana"}, "image/avcs" : { "source" : "iana"}, "image/bmp" : { "source" : "iana", "compressible" : true, "extensions" : ["bmp"]}, "image/cgm" : { "source" : "iana", "extensions" : ["cgm"]}, "image/dicom-rle" : { "source" : "iana", "extensions" : ["drle"]}, "image/emf" : { "source" : "iana", "extensions" : ["emf"]}, "image/fits" : { "source" : "iana", "extensions" : ["fits"]}, "image/g3fax" : { "source" : "iana", "extensions" : ["g3"]}, "image/gif" : { "source" : "iana", "compressible" : false, "extensions" : ["gif"]}, "image/heic" : { "source" : "iana", "extensions" : ["heic"]}, "image/heic-sequence" : { "source" : "iana", "extensions" : ["heics"]}, "image/heif" : { "source" : "iana", "extensions" : ["heif"]}, "image/heif-sequence" : { "source" : "iana", "extensions" : ["heifs"]}, "image/ief" : { "source" : "iana", "extensions" : ["ief"]}, "image/jls" : { "source" : "iana", "extensions" : ["jls"]}, "image/jp2" : { "source" : "iana", "compressible" : false, "extensions" : ["jp2","jpg2"]}, "image/jpeg" : { "source" : "iana", "compressible" : false, "extensions" : ["jpeg","jpg","jpe"]}, "image/jpm" : { "source" : "iana", "compressible" : false, "extensions" : ["jpm"]}, "image/jpx" : { "source" : "iana", "compressible" : false, "extensions" : ["jpx","jpf"]}, "image/ktx" : { "source" : "iana", "extensions" : ["ktx"]}, "image/naplps" : { "source" : "iana"}, "image/pjpeg" : { "compressible" : false}, "image/png" : { "source" : "iana", "compressible" : false, "extensions" : ["png"]}, "image/prs.btif" : { "source" : "iana", "extensions" : ["btif"]}, "image/prs.pti" : { "source" : "iana", "extensions" : ["pti"]}, "image/pwg-raster" : { "source" : "iana"}, "image/sgi" : { "source" : "apache", "extensions" : ["sgi"]}, "image/svg+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["svg","svgz"]}, "image/t38" : { "source" : "iana", "extensions" : ["t38"]}, "image/tiff" : { "source" : "iana", "compressible" : false, "extensions" : ["tif","tiff"]}, "image/tiff-fx" : { "source" : "iana", "extensions" : ["tfx"]}, "image/vnd.adobe.photoshop" : { "source" : "iana", "compressible" : true, "extensions" : ["psd"]}, "image/vnd.airzip.accelerator.azv" : { "source" : "iana", "extensions" : ["azv"]}, "image/vnd.cns.inf2" : { "source" : "iana"}, "image/vnd.dece.graphic" : { "source" : "iana", "extensions" : ["uvi","uvvi","uvg","uvvg"]}, "image/vnd.djvu" : { "source" : "iana", "extensions" : ["djvu","djv"]}, "image/vnd.dvb.subtitle" : { "source" : "iana", "extensions" : ["sub"]}, "image/vnd.dwg" : { "source" : "iana", "extensions" : ["dwg"]}, "image/vnd.dxf" : { "source" : "iana", "extensions" : ["dxf"]}, "image/vnd.fastbidsheet" : { "source" : "iana", "extensions" : ["fbs"]}, "image/vnd.fpx" : { "source" : "iana", "extensions" : ["fpx"]}, "image/vnd.fst" : { "source" : "iana", "extensions" : ["fst"]}, "image/vnd.fujixerox.edmics-mmr" : { "source" : "iana", "extensions" : ["mmr"]}, "image/vnd.fujixerox.edmics-rlc" : { "source" : "iana", "extensions" : ["rlc"]}, "image/vnd.globalgraphics.pgb" : { "source" : "iana"}, "image/vnd.microsoft.icon" : { "source" : "iana", "extensions" : ["ico"]}, "image/vnd.mix" : { "source" : "iana"}, "image/vnd.mozilla.apng" : { "source" : "iana"}, "image/vnd.ms-modi" : { "source" : "iana", "extensions" : ["mdi"]}, "image/vnd.ms-photo" : { "source" : "apache", "extensions" : ["wdp"]}, "image/vnd.net-fpx" : { "source" : "iana", "extensions" : ["npx"]}, "image/vnd.radiance" : { "source" : "iana"}, "image/vnd.sealed.png" : { "source" : "iana"}, "image/vnd.sealedmedia.softseal.gif" : { "source" : "iana"}, "image/vnd.sealedmedia.softseal.jpg" : { "source" : "iana"}, "image/vnd.svf" : { "source" : "iana"}, "image/vnd.tencent.tap" : { "source" : "iana", "extensions" : ["tap"]}, "image/vnd.valve.source.texture" : { "source" : "iana", "extensions" : ["vtf"]}, "image/vnd.wap.wbmp" : { "source" : "iana", "extensions" : ["wbmp"]}, "image/vnd.xiff" : { "source" : "iana", "extensions" : ["xif"]}, "image/vnd.zbrush.pcx" : { "source" : "iana", "extensions" : ["pcx"]}, "image/webp" : { "source" : "apache", "extensions" : ["webp"]}, "image/wmf" : { "source" : "iana", "extensions" : ["wmf"]}, "image/x-3ds" : { "source" : "apache", "extensions" : ["3ds"]}, "image/x-cmu-raster" : { "source" : "apache", "extensions" : ["ras"]}, "image/x-cmx" : { "source" : "apache", "extensions" : ["cmx"]}, "image/x-freehand" : { "source" : "apache", "extensions" : ["fh","fhc","fh4","fh5","fh7"]}, "image/x-icon" : { "source" : "apache", "compressible" : true, "extensions" : ["ico"]}, "image/x-jng" : { "source" : "nginx", "extensions" : ["jng"]}, "image/x-mrsid-image" : { "source" : "apache", "extensions" : ["sid"]}, "image/x-ms-bmp" : { "source" : "nginx", "compressible" : true, "extensions" : ["bmp"]}, "image/x-pcx" : { "source" : "apache", "extensions" : ["pcx"]}, "image/x-pict" : { "source" : "apache", "extensions" : ["pic","pct"]}, "image/x-portable-anymap" : { "source" : "apache", "extensions" : ["pnm"]}, "image/x-portable-bitmap" : { "source" : "apache", "extensions" : ["pbm"]}, "image/x-portable-graymap" : { "source" : "apache", "extensions" : ["pgm"]}, "image/x-portable-pixmap" : { "source" : "apache", "extensions" : ["ppm"]}, "image/x-rgb" : { "source" : "apache", "extensions" : ["rgb"]}, "image/x-tga" : { "source" : "apache", "extensions" : ["tga"]}, "image/x-xbitmap" : { "source" : "apache", "extensions" : ["xbm"]}, "image/x-xcf" : { "compressible" : false}, "image/x-xpixmap" : { "source" : "apache", "extensions" : ["xpm"]}, "image/x-xwindowdump" : { "source" : "apache", "extensions" : ["xwd"]}, "message/cpim" : { "source" : "iana"}, "message/delivery-status" : { "source" : "iana"}, "message/disposition-notification" : { "source" : "iana", "extensions" : ["disposition-notification"]}, "message/external-body" : { "source" : "iana"}, "message/feedback-report" : { "source" : "iana"}, "message/global" : { "source" : "iana", "extensions" : ["u8msg"]}, "message/global-delivery-status" : { "source" : "iana", "extensions" : ["u8dsn"]}, "message/global-disposition-notification" : { "source" : "iana", "extensions" : ["u8mdn"]}, "message/global-headers" : { "source" : "iana", "extensions" : ["u8hdr"]}, "message/http" : { "source" : "iana", "compressible" : false}, "message/imdn+xml" : { "source" : "iana", "compressible" : true}, "message/news" : { "source" : "iana"}, "message/partial" : { "source" : "iana", "compressible" : false}, "message/rfc822" : { "source" : "iana", "compressible" : true, "extensions" : ["eml","mime"]}, "message/s-http" : { "source" : "iana"}, "message/sip" : { "source" : "iana"}, "message/sipfrag" : { "source" : "iana"}, "message/tracking-status" : { "source" : "iana"}, "message/vnd.si.simp" : { "source" : "iana"}, "message/vnd.wfa.wsc" : { "source" : "iana", "extensions" : ["wsc"]}, "model/3mf" : { "source" : "iana"}, "model/gltf+json" : { "source" : "iana", "compressible" : true, "extensions" : ["gltf"]}, "model/gltf-binary" : { "source" : "iana", "compressible" : true, "extensions" : ["glb"]}, "model/iges" : { "source" : "iana", "compressible" : false, "extensions" : ["igs","iges"]}, "model/mesh" : { "source" : "iana", "compressible" : false, "extensions" : ["msh","mesh","silo"]}, "model/stl" : { "source" : "iana"}, "model/vnd.collada+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["dae"]}, "model/vnd.dwf" : { "source" : "iana", "extensions" : ["dwf"]}, "model/vnd.flatland.3dml" : { "source" : "iana"}, "model/vnd.gdl" : { "source" : "iana", "extensions" : ["gdl"]}, "model/vnd.gs-gdl" : { "source" : "apache"}, "model/vnd.gs.gdl" : { "source" : "iana"}, "model/vnd.gtw" : { "source" : "iana", "extensions" : ["gtw"]}, "model/vnd.moml+xml" : { "source" : "iana", "compressible" : true}, "model/vnd.mts" : { "source" : "iana", "extensions" : ["mts"]}, "model/vnd.opengex" : { "source" : "iana"}, "model/vnd.parasolid.transmit.binary" : { "source" : "iana"}, "model/vnd.parasolid.transmit.text" : { "source" : "iana"}, "model/vnd.rosette.annotated-data-model" : { "source" : "iana"}, "model/vnd.usdz+zip" : { "source" : "iana", "compressible" : false}, "model/vnd.valve.source.compiled-map" : { "source" : "iana"}, "model/vnd.vtu" : { "source" : "iana", "extensions" : ["vtu"]}, "model/vrml" : { "source" : "iana", "compressible" : false, "extensions" : ["wrl","vrml"]}, "model/x3d+binary" : { "source" : "apache", "compressible" : false, "extensions" : ["x3db","x3dbz"]}, "model/x3d+fastinfoset" : { "source" : "iana"}, "model/x3d+vrml" : { "source" : "apache", "compressible" : false, "extensions" : ["x3dv","x3dvz"]}, "model/x3d+xml" : { "source" : "iana", "compressible" : true, "extensions" : ["x3d","x3dz"]}, "model/x3d-vrml" : { "source" : "iana"}, "multipart/alternative" : { "source" : "iana", "compressible" : false}, "multipart/appledouble" : { "source" : "iana"}, "multipart/byteranges" : { "source" : "iana"}, "multipart/digest" : { "source" : "iana"}, "multipart/encrypted" : { "source" : "iana", "compressible" : false}, "multipart/form-data" : { "source" : "iana", "compressible" : false}, "multipart/header-set" : { "source" : "iana"}, "multipart/mixed" : { "source" : "iana", "compressible" : false}, "multipart/multilingual" : { "source" : "iana"}, "multipart/parallel" : { "source" : "iana"}, "multipart/related" : { "source" : "iana", "compressible" : false}, "multipart/report" : { "source" : "iana"}, "multipart/signed" : { "source" : "iana", "compressible" : false}, "multipart/vnd.bint.med-plus" : { "source" : "iana"}, "multipart/voice-message" : { "source" : "iana"}, "multipart/x-mixed-replace" : { "source" : "iana"}, "text/1d-interleaved-parityfec" : { "source" : "iana"}, "text/cache-manifest" : { "source" : "iana", "compressible" : true, "extensions" : ["appcache","manifest"]}, "text/calendar" : { "source" : "iana", "extensions" : ["ics","ifb"]}, "text/calender" : { "compressible" : true}, "text/cmd" : { "compressible" : true}, "text/coffeescript" : { "extensions" : ["coffee","litcoffee"]}, "text/css" : { "source" : "iana", "charset" : "UTF-8", "compressible" : true, "extensions" : ["css"]}, "text/csv" : { "source" : "iana", "compressible" : true, "extensions" : ["csv"]}, "text/csv-schema" : { "source" : "iana"}, "text/directory" : { "source" : "iana"}, "text/dns" : { "source" : "iana"}, "text/ecmascript" : { "source" : "iana"}, "text/encaprtp" : { "source" : "iana"}, "text/enriched" : { "source" : "iana"}, "text/fwdred" : { "source" : "iana"}, "text/grammar-ref-list" : { "source" : "iana"}, "text/html" : { "source" : "iana", "compressible" : true, "extensions" : ["html","htm","shtml"]}, "text/jade" : { "extensions" : ["jade"]}, "text/javascript" : { "source" : "iana", "compressible" : true}, "text/jcr-cnd" : { "source" : "iana"}, "text/jsx" : { "compressible" : true, "extensions" : ["jsx"]}, "text/less" : { "compressible" : true, "extensions" : ["less"]}, "text/markdown" : { "source" : "iana", "compressible" : true, "extensions" : ["markdown","md"]}, "text/mathml" : { "source" : "nginx", "extensions" : ["mml"]}, "text/mizar" : { "source" : "iana"}, "text/n3" : { "source" : "iana", "compressible" : true, "extensions" : ["n3"]}, "text/parameters" : { "source" : "iana"}, "text/parityfec" : { "source" : "iana"}, "text/plain" : { "source" : "iana", "compressible" : true, "extensions" : ["txt","text","conf","def","list","log","in","ini"]}, "text/provenance-notation" : { "source" : "iana"}, "text/prs.fallenstein.rst" : { "source" : "iana"}, "text/prs.lines.tag" : { "source" : "iana", "extensions" : ["dsc"]}, "text/prs.prop.logic" : { "source" : "iana"}, "text/raptorfec" : { "source" : "iana"}, "text/red" : { "source" : "iana"}, "text/rfc822-headers" : { "source" : "iana"}, "text/richtext" : { "source" : "iana", "compressible" : true, "extensions" : ["rtx"]}, "text/rtf" : { "source" : "iana", "compressible" : true, "extensions" : ["rtf"]}, "text/rtp-enc-aescm128" : { "source" : "iana"}, "text/rtploopback" : { "source" : "iana"}, "text/rtx" : { "source" : "iana"}, "text/sgml" : { "source" : "iana", "extensions" : ["sgml","sgm"]}, "text/shex" : { "extensions" : ["shex"]}, "text/slim" : { "extensions" : ["slim","slm"]}, "text/strings" : { "source" : "iana"}, "text/stylus" : { "extensions" : ["stylus","styl"]}, "text/t140" : { "source" : "iana"}, "text/tab-separated-values" : { "source" : "iana", "compressible" : true, "extensions" : ["tsv"]}, "text/troff" : { "source" : "iana", "extensions" : ["t","tr","roff","man","me","ms"]}, "text/turtle" : { "source" : "iana", "charset" : "UTF-8", "extensions" : ["ttl"]}, "text/ulpfec" : { "source" : "iana"}, "text/uri-list" : { "source" : "iana", "compressible" : true, "extensions" : ["uri","uris","urls"]}, "text/vcard" : { "source" : "iana", "compressible" : true, "extensions" : ["vcard"]}, "text/vnd.a" : { "source" : "iana"}, "text/vnd.abc" : { "source" : "iana"}, "text/vnd.ascii-art" : { "source" : "iana"}, "text/vnd.curl" : { "source" : "iana", "extensions" : ["curl"]}, "text/vnd.curl.dcurl" : { "source" : "apache", "extensions" : ["dcurl"]}, "text/vnd.curl.mcurl" : { "source" : "apache", "extensions" : ["mcurl"]}, "text/vnd.curl.scurl" : { "source" : "apache", "extensions" : ["scurl"]}, "text/vnd.debian.copyright" : { "source" : "iana"}, "text/vnd.dmclientscript" : { "source" : "iana"}, "text/vnd.dvb.subtitle" : { "source" : "iana", "extensions" : ["sub"]}, "text/vnd.esmertec.theme-descriptor" : { "source" : "iana"}, "text/vnd.fly" : { "source" : "iana", "extensions" : ["fly"]}, "text/vnd.fmi.flexstor" : { "source" : "iana", "extensions" : ["flx"]}, "text/vnd.gml" : { "source" : "iana"}, "text/vnd.graphviz" : { "source" : "iana", "extensions" : ["gv"]}, "text/vnd.hgl" : { "source" : "iana"}, "text/vnd.in3d.3dml" : { "source" : "iana", "extensions" : ["3dml"]}, "text/vnd.in3d.spot" : { "source" : "iana", "extensions" : ["spot"]}, "text/vnd.iptc.newsml" : { "source" : "iana"}, "text/vnd.iptc.nitf" : { "source" : "iana"}, "text/vnd.latex-z" : { "source" : "iana"}, "text/vnd.motorola.reflex" : { "source" : "iana"}, "text/vnd.ms-mediapackage" : { "source" : "iana"}, "text/vnd.net2phone.commcenter.command" : { "source" : "iana"}, "text/vnd.radisys.msml-basic-layout" : { "source" : "iana"}, "text/vnd.senx.warpscript" : { "source" : "iana"}, "text/vnd.si.uricatalogue" : { "source" : "iana"}, "text/vnd.sun.j2me.app-descriptor" : { "source" : "iana", "extensions" : ["jad"]}, "text/vnd.trolltech.linguist" : { "source" : "iana"}, "text/vnd.wap.si" : { "source" : "iana"}, "text/vnd.wap.sl" : { "source" : "iana"}, "text/vnd.wap.wml" : { "source" : "iana", "extensions" : ["wml"]}, "text/vnd.wap.wmlscript" : { "source" : "iana", "extensions" : ["wmls"]}, "text/vtt" : { "charset" : "UTF-8", "compressible" : true, "extensions" : ["vtt"]}, "text/x-asm" : { "source" : "apache", "extensions" : ["s","asm"]}, "text/x-c" : { "source" : "apache", "extensions" : ["c","cc","cxx","cpp","h","hh","dic"]}, "text/x-component" : { "source" : "nginx", "extensions" : ["htc"]}, "text/x-fortran" : { "source" : "apache", "extensions" : ["f","for","f77","f90"]}, "text/x-gwt-rpc" : { "compressible" : true}, "text/x-handlebars-template" : { "extensions" : ["hbs"]}, "text/x-java-source" : { "source" : "apache", "extensions" : ["java"]}, "text/x-jquery-tmpl" : { "compressible" : true}, "text/x-lua" : { "extensions" : ["lua"]}, "text/x-markdown" : { "compressible" : true, "extensions" : ["mkd"]}, "text/x-nfo" : { "source" : "apache", "extensions" : ["nfo"]}, "text/x-opml" : { "source" : "apache", "extensions" : ["opml"]}, "text/x-org" : { "compressible" : true, "extensions" : ["org"]}, "text/x-pascal" : { "source" : "apache", "extensions" : ["p","pas"]}, "text/x-processing" : { "compressible" : true, "extensions" : ["pde"]}, "text/x-sass" : { "extensions" : ["sass"]}, "text/x-scss" : { "extensions" : ["scss"]}, "text/x-setext" : { "source" : "apache", "extensions" : ["etx"]}, "text/x-sfv" : { "source" : "apache", "extensions" : ["sfv"]}, "text/x-suse-ymp" : { "compressible" : true, "extensions" : ["ymp"]}, "text/x-uuencode" : { "source" : "apache", "extensions" : ["uu"]}, "text/x-vcalendar" : { "source" : "apache", "extensions" : ["vcs"]}, "text/x-vcard" : { "source" : "apache", "extensions" : ["vcf"]}, "text/xml" : { "source" : "iana", "compressible" : true, "extensions" : ["xml"]}, "text/xml-external-parsed-entity" : { "source" : "iana"}, "text/yaml" : { "extensions" : ["yaml","yml"]}, "video/1d-interleaved-parityfec" : { "source" : "iana"}, "video/3gpp" : { "source" : "iana", "extensions" : ["3gp","3gpp"]}, "video/3gpp-tt" : { "source" : "iana"}, "video/3gpp2" : { "source" : "iana", "extensions" : ["3g2"]}, "video/bmpeg" : { "source" : "iana"}, "video/bt656" : { "source" : "iana"}, "video/celb" : { "source" : "iana"}, "video/dv" : { "source" : "iana"}, "video/encaprtp" : { "source" : "iana"}, "video/h261" : { "source" : "iana", "extensions" : ["h261"]}, "video/h263" : { "source" : "iana", "extensions" : ["h263"]}, "video/h263-1998" : { "source" : "iana"}, "video/h263-2000" : { "source" : "iana"}, "video/h264" : { "source" : "iana", "extensions" : ["h264"]}, "video/h264-rcdo" : { "source" : "iana"}, "video/h264-svc" : { "source" : "iana"}, "video/h265" : { "source" : "iana"}, "video/iso.segment" : { "source" : "iana"}, "video/jpeg" : { "source" : "iana", "extensions" : ["jpgv"]}, "video/jpeg2000" : { "source" : "iana"}, "video/jpm" : { "source" : "apache", "extensions" : ["jpm","jpgm"]}, "video/mj2" : { "source" : "iana", "extensions" : ["mj2","mjp2"]}, "video/mp1s" : { "source" : "iana"}, "video/mp2p" : { "source" : "iana"}, "video/mp2t" : { "source" : "iana", "extensions" : ["ts"]}, "video/mp4" : { "source" : "iana", "compressible" : false, "extensions" : ["mp4","mp4v","mpg4"]}, "video/mp4v-es" : { "source" : "iana"}, "video/mpeg" : { "source" : "iana", "compressible" : false, "extensions" : ["mpeg","mpg","mpe","m1v","m2v"]}, "video/mpeg4-generic" : { "source" : "iana"}, "video/mpv" : { "source" : "iana"}, "video/nv" : { "source" : "iana"}, "video/ogg" : { "source" : "iana", "compressible" : false, "extensions" : ["ogv"]}, "video/parityfec" : { "source" : "iana"}, "video/pointer" : { "source" : "iana"}, "video/quicktime" : { "source" : "iana", "compressible" : false, "extensions" : ["qt","mov"]}, "video/raptorfec" : { "source" : "iana"}, "video/raw" : { "source" : "iana"}, "video/rtp-enc-aescm128" : { "source" : "iana"}, "video/rtploopback" : { "source" : "iana"}, "video/rtx" : { "source" : "iana"}, "video/smpte291" : { "source" : "iana"}, "video/smpte292m" : { "source" : "iana"}, "video/ulpfec" : { "source" : "iana"}, "video/vc1" : { "source" : "iana"}, "video/vc2" : { "source" : "iana"}, "video/vnd.cctv" : { "source" : "iana"}, "video/vnd.dece.hd" : { "source" : "iana", "extensions" : ["uvh","uvvh"]}, "video/vnd.dece.mobile" : { "source" : "iana", "extensions" : ["uvm","uvvm"]}, "video/vnd.dece.mp4" : { "source" : "iana"}, "video/vnd.dece.pd" : { "source" : "iana", "extensions" : ["uvp","uvvp"]}, "video/vnd.dece.sd" : { "source" : "iana", "extensions" : ["uvs","uvvs"]}, "video/vnd.dece.video" : { "source" : "iana", "extensions" : ["uvv","uvvv"]}, "video/vnd.directv.mpeg" : { "source" : "iana"}, "video/vnd.directv.mpeg-tts" : { "source" : "iana"}, "video/vnd.dlna.mpeg-tts" : { "source" : "iana"}, "video/vnd.dvb.file" : { "source" : "iana", "extensions" : ["dvb"]}, "video/vnd.fvt" : { "source" : "iana", "extensions" : ["fvt"]}, "video/vnd.hns.video" : { "source" : "iana"}, "video/vnd.iptvforum.1dparityfec-1010" : { "source" : "iana"}, "video/vnd.iptvforum.1dparityfec-2005" : { "source" : "iana"}, "video/vnd.iptvforum.2dparityfec-1010" : { "source" : "iana"}, "video/vnd.iptvforum.2dparityfec-2005" : { "source" : "iana"}, "video/vnd.iptvforum.ttsavc" : { "source" : "iana"}, "video/vnd.iptvforum.ttsmpeg2" : { "source" : "iana"}, "video/vnd.motorola.video" : { "source" : "iana"}, "video/vnd.motorola.videop" : { "source" : "iana"}, "video/vnd.mpegurl" : { "source" : "iana", "extensions" : ["mxu","m4u"]}, "video/vnd.ms-playready.media.pyv" : { "source" : "iana", "extensions" : ["pyv"]}, "video/vnd.nokia.interleaved-multimedia" : { "source" : "iana"}, "video/vnd.nokia.mp4vr" : { "source" : "iana"}, "video/vnd.nokia.videovoip" : { "source" : "iana"}, "video/vnd.objectvideo" : { "source" : "iana"}, "video/vnd.radgamettools.bink" : { "source" : "iana"}, "video/vnd.radgamettools.smacker" : { "source" : "iana"}, "video/vnd.sealed.mpeg1" : { "source" : "iana"}, "video/vnd.sealed.mpeg4" : { "source" : "iana"}, "video/vnd.sealed.swf" : { "source" : "iana"}, "video/vnd.sealedmedia.softseal.mov" : { "source" : "iana"}, "video/vnd.uvvu.mp4" : { "source" : "iana", "extensions" : ["uvu","uvvu"]}, "video/vnd.vivo" : { "source" : "iana", "extensions" : ["viv"]}, "video/vp8" : { "source" : "iana"}, "video/webm" : { "source" : "apache", "compressible" : false, "extensions" : ["webm"]}, "video/x-f4v" : { "source" : "apache", "extensions" : ["f4v"]}, "video/x-fli" : { "source" : "apache", "extensions" : ["fli"]}, "video/x-flv" : { "source" : "apache", "compressible" : false, "extensions" : ["flv"]}, "video/x-m4v" : { "source" : "apache", "extensions" : ["m4v"]}, "video/x-matroska" : { "source" : "apache", "compressible" : false, "extensions" : ["mkv","mk3d","mks"]}, "video/x-mng" : { "source" : "apache", "extensions" : ["mng"]}, "video/x-ms-asf" : { "source" : "apache", "extensions" : ["asf","asx"]}, "video/x-ms-vob" : { "source" : "apache", "extensions" : ["vob"]}, "video/x-ms-wm" : { "source" : "apache", "extensions" : ["wm"]}, "video/x-ms-wmv" : { "source" : "apache", "compressible" : false, "extensions" : ["wmv"]}, "video/x-ms-wmx" : { "source" : "apache", "extensions" : ["wmx"]}, "video/x-ms-wvx" : { "source" : "apache", "extensions" : ["wvx"]}, "video/x-msvideo" : { "source" : "apache", "extensions" : ["avi"]}, "video/x-sgi-movie" : { "source" : "apache", "extensions" : ["movie"]}, "video/x-smv" : { "source" : "apache", "extensions" : ["smv"]}, "x-conference/x-cooltalk" : { "source" : "apache", "extensions" : ["ice"]}, "x-shader/x-fragment" : { "compressible" : true}, "x-shader/x-vertex" : { "compressible" : true}};
tink__$Chunk_EmptyChunk.EMPTY = new haxe_io_Bytes(new ArrayBuffer(0));
tink_Chunk.EMPTY = new tink__$Chunk_EmptyChunk();
tink_streams_Empty.inst = new tink_streams_Empty();
tink_io_Source.EMPTY = tink_streams_Empty.inst;
tink_json_JsonString.BACKSLASH = "\\";
tink_serialize__$Encoder_BytesBuffer.POOL = [];
tink_websocket_MessageRegrouper.inst = tink_streams_Regrouper.ofFuncSync(function(frames,s) {
	if(!frames[frames.length - 1].fin) {
		return tink_streams_RegroupResult.Untouched;
	}
	var mergeBytes = function() {
		var out = tink_Chunk.EMPTY;
		var _g = 0;
		while(_g < frames.length) out = tink_Chunk.concat(out,frames[_g++].get_unmaskedPayload());
		return out;
	};
	var tmp;
	switch(frames[0].opcode) {
	case 0:
		throw haxe_Exception.thrown("Unreachable");
	case 1:
		tmp = tink_websocket_RawMessage.Text(mergeBytes().toString());
		break;
	case 2:
		tmp = tink_websocket_RawMessage.Binary(mergeBytes());
		break;
	case 8:
		tmp = tink_websocket_RawMessage.ConnectionClose;
		break;
	case 9:
		tmp = tink_websocket_RawMessage.Ping(mergeBytes());
		break;
	case 10:
		tmp = tink_websocket_RawMessage.Pong(mergeBytes());
		break;
	}
	return tink_streams_RegroupResult.Converted(tink_streams_Stream.single(tmp));
});
DuckJet.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
