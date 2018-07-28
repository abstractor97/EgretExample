var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 插值
 * 1. 不知插值是干什么的...
 *
 *
 * @author chenkai
 * @since 2017/6/23
 */
var Interpolation = (function (_super) {
    __extends(Interpolation, _super);
    function Interpolation() {
        var _this = _super.call(this) || this;
        //创建世界
        _this.world = new p2.World();
        _this.world.gravity = [0, 10];
        //创建圆
        var ball = new p2.Circle({ radius: 100 });
        _this.ballBody = new p2.Body({ mass: 1, position: [400, 100] });
        _this.ballBody.addShape(ball);
        _this.world.addBody(_this.ballBody);
        var ballSp = _this.createCircle(0xff0000, 100);
        _this.ballBody.displays = [ballSp];
        _this.addChild(ballSp);
        var ball2 = new p2.Circle({ radius: 100 });
        _this.ball2Body = new p2.Body({ mass: 1, position: [200, 100] });
        _this.ball2Body.addShape(ball2);
        _this.world.addBody(_this.ball2Body);
        var ballSp2 = _this.createCircle(0x00ff00, 100);
        _this.ball2Body.displays = [ballSp2];
        _this.addChild(ballSp2);
        //创建地板
        var plane = new p2.Plane();
        _this.planeBody = new p2.Body();
        _this.planeBody.addShape(plane);
        _this.world.addBody(_this.planeBody);
        _this.planeBody.position = [0, GameConst.stage.stageHeight];
        _this.planeBody.angle = Math.PI;
        //监听
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        return _this;
    }
    Interpolation.prototype.onEnterFrame = function () {
        this.world.step(60 / 1000);
        var display = this.ballBody.displays[0];
        display.x = this.ballBody.position[0];
        display.y = this.ballBody.position[1];
        display.rotation = this.ballBody.angle * 180 / Math.PI;
        var display = this.ball2Body.displays[0];
        display.x = this.ball2Body.interpolatedPosition[0]; //插值始终是0，不知如何使用
        display.y = this.ball2Body.interpolatedPosition[1];
        display.rotation = this.ball2Body.angle * 180 / Math.PI;
    };
    Interpolation.prototype.createCircle = function (color, radius) {
        var sp = new egret.Sprite();
        sp.graphics.beginFill(color);
        sp.graphics.drawCircle(0, 0, 100); //circle中心点在几何中心，rectangle中心点在左上角.所以circle不需要设置锚点
        sp.graphics.endFill();
        return sp;
    };
    return Interpolation;
}(egret.Sprite));
__reflect(Interpolation.prototype, "Interpolation");
//# sourceMappingURL=Interpolation.js.map