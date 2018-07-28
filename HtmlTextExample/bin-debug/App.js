var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * App主类
 * @author rikimaru
 * @since 2017/3/15
 */
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(App, "StageUtils", {
        /**舞台工具类*/
        get: function () {
            return StageUtils.getInstance();
        },
        enumerable: true,
        configurable: true
    });
    return App;
}(SingleClass));
__reflect(App.prototype, "App");
