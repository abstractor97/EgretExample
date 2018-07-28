var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 主页场景
 * @author chenkai
 * @since 2017/5/24
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomeSceneSkin";
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    HomeScene.prototype.onTouchTap = function () {
        ShakeTool.getInstance().shakeObj(this, 1, 20, 20);
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
//# sourceMappingURL=HomeScene.js.map