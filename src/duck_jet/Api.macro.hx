package duck_jet;

using tink.MacroApi;

import haxe.macro.Expr;

class Impl {
	public static function sess(e:haxe.macro.Expr) {
		var inner:haxe.macro.Expr = null;

		var ct = (function getType(e)
			return switch e.expr {
				case EParenthesis(e): getType(e);
				case ECheckType(e, ct):
					inner = e;
					ct;
				default: throw 'expected a check-type expression got ${e}';
			})(e);

		var actualExpr = macro $b{
			[(macro final binData:$ct = tink.Json.parse(d)), inner]
		};

		return macro switch m {
			case Text(d):
				try $actualExpr catch (e) {
					fire_duck.Logger.log(Error.withData("Invalid transmission data: " + e.details(),
						e));
					client.close();
          
				}

			default:
        fire_duck.Logger.log('ignore');
				return;
		}
	}
}
