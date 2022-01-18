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
			[(macro final binData:$ct = tink.Serialize.decode(d)), inner]
		};

		return macro switch m {
			case Binary(d):
				try $actualExpr catch (e) {
					client.close();
					trace(Error.withData("Invalid transmission data", e));
				}

			default:
				throw 'I know not what you speak of';
		}
	}
}
