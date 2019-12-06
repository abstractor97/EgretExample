var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 *
 *
 *自动生成类
 *
 *请不要直接在此编码  重新生成会覆盖此类的
 *
 *如非必要请勿改动
 *
 *
 */
var LoadingUIUI = (function (_super) {
    __extends(LoadingUIUI, _super);
    function LoadingUIUI() {
        var _this = _super.call(this) || this;
        _this.width = 640;
        _this.height = 1036;
        _this.createChildren();
        return _this;
    }
    LoadingUIUI.prototype.createChildren = function () {
        this.textField = new egret.TextField();
        this.textField.text = "100%";
        this.textField.x = 245;
        this.textField.y = 498;
        this.textField.width = 150;
        this.textField.height = 40;
        this.textField.textAlign = "center";
        this.textField.textColor = 0xff0000;
        this.textField.size = 20;
        this.textField.fontFamily = "微软雅黑";
        this.addChild(this.textField);
        //动画
    };
    return LoadingUIUI;
}(wy.BaseSprite));
__reflect(LoadingUIUI.prototype, "LoadingUIUI");
//# sourceMappingURL=LoadingUIUI.js.map