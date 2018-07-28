var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 主页场景
 * @author chenkai
 * @since 2017/4/20
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomeSceneSkin";
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        this.shakeTest();
    };
    HomeScene.prototype.shakeTest = function () {
        this.shakeTool = new ShakeTool();
        this.shakeTool.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.shakeTool.start();
    };
    HomeScene.prototype.onChange = function (e) {
        var data = e.data;
        this.label0.text = data.x;
        this.label1.text = data.y;
        this.label2.text = data.z;
        if (data.shakeCount > 6) {
            egret.log("摇一摇完成");
            this.shakeTool.stop();
        }
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
//# sourceMappingURL=HomeScene.js.map