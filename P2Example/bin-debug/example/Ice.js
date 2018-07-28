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
 * 冰块+重力感应
 * @author chenkai
 * @since 2017/6/23
 *
 */
var Ice = (function (_super) {
    __extends(Ice, _super);
    function Ice() {
        var _this = _super.call(this) || this;
        _this.gX = 50;
        _this.gY = 50;
        _this.isDebug = false;
        _this.isMobile = egret.Capabilities.isMobile;
        //创建背景
        var bg = new egret.Bitmap(RES.getRes("bg_png"));
        _this.addChild(bg);
        //创建文本
        _this.textField = new egret.TextField();
        _this.textField.text = "点击屏幕生成一个冰块";
        _this.addChild(_this.textField);
        //创建物理世界
        _this.createWorld();
        _this.createGround();
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.addOneBox, _this);
        //开启重力感应
        if (_this.isMobile) {
            var orientation = new egret.DeviceOrientation();
            orientation.addEventListener(egret.Event.CHANGE, _this.onOrientation, _this);
            orientation.start();
        }
        return _this;
    }
    //e.alpha   z轴角速度0~360   根据啥来算的，东南西北？，向右减少，向左增加
    //e.beta  x轴角速度-90-90 手机平放0度，手机头朝上增加，手机头朝下减少
    //e.gamma y轴角速度-90~270 手机平放0度，向右倾斜增加，向左倾斜减少
    Ice.prototype.onOrientation = function (e) {
        //        this.textField.text = e.alpha + "\n" + e.beta + "\n" + e.gamma + "\n" + this.world.gravity[0] + "\n" + this.world.gravity[1];
        if (this.isMobile) {
            this.world.gravity = [e.gamma / 90 * this.gX, e.beta / 90 * this.gY];
        }
    };
    //每帧更新刚体皮肤
    Ice.prototype.onEnterFrame = function () {
        this.world.step(0.1);
        var len = this.world.bodies.length;
        for (var i = 0; i < len; i++) {
            var body = this.world.bodies[i];
            if (body.displays) {
                var display = body.displays[0];
                display.x = body.position[0];
                display.y = body.position[1];
                display.rotation = body.angle * 180 / Math.PI;
            }
        }
    };
    //点击增加一个冰块
    Ice.prototype.addOneBox = function (e) {
        var rand = Math.floor(Math.random() * 7); // 0-6
        var display = new egret.Bitmap(RES.getRes("ice00" + rand));
        display.x = e.stageX;
        display.y = e.stageY;
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        display.cacheAsBitmap = true;
        this.addChild(display);
        var body = this.getOneRectBody(display.width, display.height);
        body.position = [e.stageX, e.stageY];
        body.displays = [display];
    };
    //创建世界
    Ice.prototype.createWorld = function () {
        this.world = new p2.World();
        //this.world.sleepMode = p2.World.BODY_SLEEPING;   //睡眠后，物体落地则不会感应重力感应
        this.world.gravity = [0, 30];
    };
    //创建上下左右地板
    Ice.prototype.createGround = function () {
        var buttomBody = this.getOneRectBody(GameConst.stage.stageWidth, 1);
        buttomBody.type = p2.Body.KINEMATIC;
        buttomBody.position = [GameConst.stage.stageWidth / 2, GameConst.stage.stageHeight];
        //        var buttomDisp: egret.Sprite = this.getOneRectSkin(GameConst.stage.stageWidth,10,0x0000ff);
        //        buttomBody.displays = [buttomDisp];
        //        this.addChild(buttomDisp);
        var topBody = this.getOneRectBody(GameConst.stage.stageWidth, 1);
        topBody.type = p2.Body.KINEMATIC;
        topBody.position = [GameConst.stage.stageWidth / 2, 0];
        //        var topDisp: egret.Sprite = this.getOneRectSkin(GameConst.stage.stageWidth,10,0x0000ff);
        //        topBody.displays = [topDisp];
        //        this.addChild(topDisp);
        var leftBody = this.getOneRectBody(1, GameConst.stage.stageHeight);
        leftBody.type = p2.Body.KINEMATIC;
        leftBody.position = [0, GameConst.stage.stageHeight / 2];
        //        var leftDisp: egret.Sprite = this.getOneRectSkin(1,GameConst.stage.stageHeight,0x0000ff);
        //        leftBody.displays = [leftDisp];
        //        this.addChild(leftDisp);
        var rightBody = this.getOneRectBody(1, GameConst.stage.stageHeight);
        rightBody.type = p2.Body.KINEMATIC;
        rightBody.position = [GameConst.stage.stageWidth, GameConst.stage.stageHeight / 2];
        //        var rightDisp: egret.Sprite = this.getOneRectSkin(1,GameConst.stage.stageHeight,0x0000ff);
        //        rightBody.displays = [rightDisp];
        //        this.addChild(rightDisp);
    };
    //获取一个方块刚体
    Ice.prototype.getOneRectBody = function (w, h) {
        var shape = new p2.Box({ width: w, height: h });
        var body = new p2.Body({ mass: 100 });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    //获取一个Plane刚体
    Ice.prototype.getOnePlaneBody = function () {
        var shape = new p2.Plane();
        var body = new p2.Body();
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    //创建一个方块皮肤
    Ice.prototype.getOneRectSkin = function (w, h, color) {
        if (color === void 0) { color = 0xff0000; }
        var sp = new egret.Sprite();
        sp.graphics.beginFill(color);
        sp.graphics.drawRect(0, 0, w, h);
        sp.graphics.endFill();
        sp.anchorOffsetX = sp.width / 2;
        sp.anchorOffsetY = sp.height / 2;
        return sp;
    };
    return Ice;
}(egret.Sprite));
__reflect(Ice.prototype, "Ice");
//# sourceMappingURL=Ice.js.map