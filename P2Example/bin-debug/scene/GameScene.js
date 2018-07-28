var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏场景
 * @author chenkai
 * @since 2017/6/22
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.demoList = ["Box", "Ice", "Interpolation", "MouseJoint", "Character", "Platformer", "RaycastingD", "Rayreflect",
            "Buoyancy", "Car"];
        _this.skinName = "GameSceneSkin";
        return _this;
    }
    GameScene.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    GameScene.prototype.onTouchTap = function (e) {
        var len = this.btnGroup.numChildren;
        for (var i = 0; i < len; i++) {
            if (e.target == this.btnGroup.getChildAt(i)) {
                if (this.curExample != null) {
                    this.curExample.parent && this.curExample.parent.removeChild(this.curExample);
                }
                var clz = egret.getDefinitionByName(this.demoList[i]);
                if (clz) {
                    this.curExample = new clz();
                    this.addChild(this.curExample);
                }
            }
        }
    };
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map