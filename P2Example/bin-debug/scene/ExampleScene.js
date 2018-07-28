var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 例子场景
 * @author chenkai
 * @since 2017/6/30
 */
var ExampleScene = (function (_super) {
    __extends(ExampleScene, _super);
    function ExampleScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "ExampleSceneSkin";
        return _this;
    }
    ExampleScene.prototype.childrenCreated = function () {
        this.addChild(new BoxTest());
    };
    return ExampleScene;
}(eui.Component));
__reflect(ExampleScene.prototype, "ExampleScene");
//# sourceMappingURL=ExampleScene.js.map