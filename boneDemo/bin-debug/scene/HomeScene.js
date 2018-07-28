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
 * 测试
 * @author
 * @date 2017/11/14
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.boneList = [];
        _this.mcList = [];
        _this.fastList = [];
        _this.binList = [];
        _this.skinName = "HomeSceneSkin";
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.boneTouch, this);
    };
    //创建骨骼
    HomeScene.prototype.boneTouch = function (e) {
        switch (e.target) {
            case this.bone1:
                this.createBone(1);
                break;
            case this.bone10:
                this.createBone(10);
                break;
            case this.clearBone:
                this.clearBones();
                break;
            case this.mc1:
                this.createMC(1);
                break;
            case this.mc10:
                this.createMC(10);
                break;
            case this.clearMC:
                this.clearMCs();
                break;
            case this.bone100:
                this.createBone(100);
                break;
            case this.mc100:
                this.createMC(100);
                break;
            case this.fast1:
                this.createFast(1);
                break;
            case this.fast10:
                this.createFast(10);
                break;
            case this.fast100:
                this.createFast(100);
                break;
            case this.clearFast:
                this.clearFasts();
                break;
            case this.bin1:
                this.createBin(1);
                break;
            case this.bin10:
                this.createBin(10);
                break;
            case this.bin100:
                this.createBin(100);
                break;
            case this.clearBin:
                this.clearBins();
                break;
        }
    };
    //创建一个骨骼
    HomeScene.prototype.createBone = function (num) {
        for (var i = 0; i < num; i++) {
            var db = new BoneJson();
            db.x = 200 + Math.random() * 800;
            db.y = 300 + Math.random() * 200;
            this.boneGroup.addChild(db);
            this.boneList.push(db);
        }
        this.boneLabel.text = "骨骼数量:" + this.boneList.length;
    };
    //清理骨骼
    HomeScene.prototype.clearBones = function () {
        var len = this.boneList.length;
        for (var i = 0; i < len; i++) {
            var bone = this.boneList[i];
            bone.destoryMe();
        }
        this.boneList.length = 0;
        this.boneLabel.text = "骨骼数量:" + this.boneList.length;
        dragonBones.EgretFactory.factory.clear(true);
    };
    //创建一个MC
    HomeScene.prototype.createMC = function (num) {
        for (var i = 0; i < num; i++) {
            var mc = new BoneMC();
            mc.x = Math.random() * 1000;
            mc.y = 500 + Math.random() * 200;
            mc.play(-1);
            this.boneGroup.addChild(mc);
            this.mcList.push(mc);
        }
        this.mcLabel.text = "动画数量:" + this.mcList.length;
    };
    //清理动画
    HomeScene.prototype.clearMCs = function () {
        var len = this.mcList.length;
        for (var i = 0; i < len; i++) {
            var mc = this.mcList[i];
            mc.stop();
            mc.parent && mc.parent.removeChild(mc);
        }
        this.mcList.length = 0;
        this.mcLabel.text = "动画数量:" + this.mcList.length;
    };
    //创建极速骨骼
    HomeScene.prototype.createFast = function (num) {
        for (var i = 0; i < num; i++) {
            var movie = new BoneFast();
            this.addChild(movie); // 添加 Movie 到显示列表
            movie.x = 100 + Math.random() * 1000;
            movie.y = 300 + Math.random() * 300;
            this.boneGroup.addChild(movie); // 添加 Movie 到显示列表
            this.fastList.push(movie);
        }
        this.fastLabel.text = "极速数量:" + this.fastList.length;
    };
    //清理极速
    HomeScene.prototype.clearFasts = function () {
        var len = this.fastList.length;
        for (var i = 0; i < len; i++) {
            var fast = this.fastList[i];
            fast.destoryMe();
        }
        this.fastList.length = 0;
        this.fastLabel.text = "动画数量:" + this.fastList.length;
    };
    //创建二进制骨骼
    HomeScene.prototype.createBin = function (num) {
        for (var i = 0; i < num; i++) {
            var bone = new BoneBin();
            this.addChild(bone); // 添加 Movie 到显示列表
            bone.x = 100 + Math.random() * 1000;
            bone.y = 300 + Math.random() * 300;
            this.boneGroup.addChild(bone); // 添加 Movie 到显示列表
            this.binList.push(bone);
        }
        this.binLabel.text = "二进数量:" + this.binList.length;
    };
    //清理二进制骨骼
    HomeScene.prototype.clearBins = function () {
        var len = this.binList.length;
        for (var i = 0; i < len; i++) {
            var bone = this.binList[i];
            bone.destoryMe();
        }
        this.binList.length = 0;
        this.binLabel.text = "动画数量:" + this.binList.length;
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
