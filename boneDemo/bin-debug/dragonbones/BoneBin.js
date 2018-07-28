var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 二进制
 */
var BoneBin = (function (_super) {
    __extends(BoneBin, _super);
    function BoneBin() {
        var _this = _super.call(this) || this;
        var factory = dragonBones.EgretFactory.factory;
        factory.parseDragonBonesData(RES.getRes("NewDragon_ske_bin"));
        factory.parseTextureAtlasData(RES.getRes("NewDragon_tex2_json"), RES.getRes("NewDragon_tex3_png"));
        _this.armatureDisplay = factory.buildArmatureDisplay("armatureName");
        _this.armatureDisplay.animation.play("stand", 0);
        _this.addChild(_this.armatureDisplay);
        return _this;
    }
    BoneBin.prototype.destoryMe = function () {
        this.parent && this.parent.removeChild(this);
        this.armatureDisplay.animation.reset();
        this.armatureDisplay.dispose();
        var factory = dragonBones.EgretFactory.factory;
        factory.clear(true);
    };
    return BoneBin;
}(egret.DisplayObjectContainer));
__reflect(BoneBin.prototype, "BoneBin");
