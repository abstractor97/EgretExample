var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 创建一个方块，自由落体
 *
 * 1. 世界，矩形，地板的使用
 *
 * @author chenkai
 * @since 2017/6/23
 */
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        var _this = _super.call(this) || this;
        //创建world
        _this.world = new p2.World();
        _this.world.sleepMode = p2.World.BODY_SLEEPING;
        _this.world.gravity = [0, 10];
        //创建box
        var box = new p2.Box({ width: 50, height: 50 });
        _this.boxBody = new p2.Body({ mass: 1, angularVelocity: 1, position: [100, 100] });
        _this.boxBody.addShape(box);
        _this.world.addBody(_this.boxBody);
        _this.ball = _this.createBox();
        _this.boxBody.displays = [_this.ball];
        _this.addChild(_this.ball);
        //创建plane  Plane shape class. The plane is facing in the Y direction.
        var plane = new p2.Plane();
        _this.planeBody = new p2.Body({ position: [GameConst.stage.stageWidth / 2, GameConst.stage.stageHeight - 100] });
        _this.planeBody.angle = Math.PI;
        _this.planeBody.addShape(plane);
        _this.world.addBody(_this.planeBody);
        _this.plane = _this.createPlane();
        _this.planeBody.displays = [_this.plane];
        //每帧更新
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        return _this;
    }
    Box.prototype.onEnterFrame = function () {
        //更新物理世界
        this.world.step(60 / 1000);
        var len = this.world.bodies.length;
        for (var i = 0; i < len; i++) {
            var body = this.world.bodies[i];
            var display = body.displays[0];
            display.x = body.position[0]; //同步刚体和egret显示对象的位置和旋转角度
            display.y = body.position[1];
            display.rotation = body.angle * 180 / Math.PI;
        }
    };
    Box.prototype.createBox = function () {
        var sp = new egret.Sprite();
        sp.graphics.beginFill(0xff0000);
        sp.graphics.drawRect(0, 0, 50, 50);
        sp.graphics.endFill();
        sp.anchorOffsetX = sp.width / 2;
        sp.anchorOffsetY = sp.height / 2;
        return sp;
    };
    Box.prototype.createPlane = function () {
        var sp = new egret.Sprite();
        sp.graphics.lineStyle(10, 0x00ff00);
        sp.graphics.moveTo(0, 0);
        sp.graphics.lineTo(GameConst.stage.stageWidth, 0);
        sp.anchorOffsetX = sp.width / 2;
        sp.anchorOffsetY = sp.height / 2;
        this.addChild(sp);
        return sp;
    };
    return Box;
}(egret.Sprite));
__reflect(Box.prototype, "Box");
//# sourceMappingURL=Box.js.map