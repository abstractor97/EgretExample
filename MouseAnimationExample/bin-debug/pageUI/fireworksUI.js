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
var fireworksUI = (function (_super) {
    __extends(fireworksUI, _super);
    function fireworksUI() {
        var _this = _super.call(this) || this;
        _this.width = 640;
        _this.height = 1036;
        _this.createChildren();
        return _this;
    }
    fireworksUI.prototype.createChildren = function () {
        //动画
    };
    return fireworksUI;
}(wy.BaseSprite));
__reflect(fireworksUI.prototype, "fireworksUI");
//# sourceMappingURL=fireworksUI.js.map