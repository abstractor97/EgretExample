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
 * Json格式骨骼
 */
var BoneJson = (function (_super) {
    __extends(BoneJson, _super);
    function BoneJson() {
        var _this = _super.call(this) || this;
        var factory = dragonBones.EgretFactory.factory;
        var dragonbonesData = RES.getRes("NewDragon_ske_json");
        var textureData = RES.getRes("NewDragon_tex_json");
        var texture = RES.getRes("NewDragon_tex2_png");
        factory.parseDragonBonesData(dragonbonesData);
        factory.parseTextureAtlasData(textureData, texture);
        _this.armatureDisplay = factory.buildArmatureDisplay("armatureName");
        _this.armatureDisplay.animation.play("stand", 0);
        _this.addChild(_this.armatureDisplay);
        return _this;
    }
    BoneJson.prototype.destoryMe = function () {
        this.armatureDisplay.animation.stop();
        this.armatureDisplay.animation.reset();
        this.armatureDisplay.dispose();
        this.armatureDisplay = null;
        this.parent && this.parent.removeChild(this);
    };
    return BoneJson;
}(egret.DisplayObjectContainer));
__reflect(BoneJson.prototype, "BoneJson");
