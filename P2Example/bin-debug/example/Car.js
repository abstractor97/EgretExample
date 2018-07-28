var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 汽车
 * @author chenkai
 * @since 2017/6/29
 *
 * 1. RevoluteConstraint 约束使用，合体小车
 * 2. force和velocity区别
 */
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this) || this;
        _this.PLANE = 0x01;
        _this.CIRCLE = 0x02;
        _this.CAR = 0x03;
        //测试类
        _this.debugDraw = new p2DebugDraw();
        _this.world = _this.debugDraw.world;
        _this.addChild(_this.debugDraw);
        //设置世界默认材料的摩擦，防止小车打滑
        _this.world.defaultContactMaterial.friction = 100;
        //创建地面
        _this.planeBody = _this.debugDraw.createPlane();
        _this.planeBody.position = [0, 500];
        _this.planeBody.mass = 0;
        //创建一个大圆
        _this.circleBody = _this.debugDraw.createCircle(200);
        _this.circleBody.position = [700, 500];
        var circleShape = _this.circleBody.shapes[0];
        circleShape.collisionMask = _this.CAR;
        //创建车身
        _this.carBody = _this.debugDraw.createRect(100, 50);
        _this.carBody.position = [100, 100];
        _this.carBody.mass = 1;
        var carShape = _this.carBody.shapes[0];
        //创建轮子
        _this.wheelBody1 = _this.debugDraw.createCircle(30);
        _this.wheelBody2 = _this.debugDraw.createCircle(30);
        _this.wheelBody1.mass = 1;
        _this.wheelBody2.mass = 1;
        _this.wheelBody1.position = [_this.carBody.position[0], _this.carBody.position[1] + 35];
        _this.wheelBody2.position = [_this.carBody.position[0] + 100, _this.carBody.position[1] + 35];
        //增加轮子和车身的转动约束
        var revoluteBack = new p2.RevoluteConstraint(_this.carBody, _this.wheelBody1, {
            localPivotA: [-50, 25],
            localPivotB: [0, 0],
            collideConnected: false
        });
        var revoluteFront = new p2.RevoluteConstraint(_this.carBody, _this.wheelBody2, {
            localPivotA: [50, 25],
            localPivotB: [0, 0],
            collideConnected: false
        });
        _this.world.addConstraint(revoluteBack);
        _this.world.addConstraint(revoluteFront);
        //???
        revoluteBack.motorEnabled = true; //电机？？
        //revoluteBack.setMotorSpeed(10);   //报错  error: Cannot set property 'relativeVelocity' of undefined
        //键盘操作小车
        var keyListener = new KeyListener();
        keyListener.addEventListener(KeyListener.EVENT_KEY_DOWN, _this.onKeyDown, _this);
        keyListener.addEventListener(KeyListener.EVENT_KEY_UP, _this.onKeyUp, _this);
        return _this;
    }
    //键盘按下，小车移动
    Car.prototype.onKeyDown = function (e) {
        var keyCode = e.data;
        switch (keyCode) {
            case KeyListener.Right:
                // this.carBody.velocity[0] = 100;        //velocity速度，直接改变速度，恒定
                // this.wheelBody1.velocity[0] = 100;
                // this.wheelBody2.velocity[0] = 100;
                this.carBody.force[0] = 100; //force，添加力，速度会从0逐渐加快
                this.wheelBody1.force[0] = 100;
                this.wheelBody2.force[0] = 100;
                break;
            case KeyListener.Left:
                // this.carBody.velocity[0] = -100;
                // this.wheelBody1.velocity[0] = -100;
                // this.wheelBody2.velocity[0] = -100;
                this.carBody.force[0] = -100;
                this.wheelBody1.force[0] = -100;
                this.wheelBody2.force[0] = -100;
                break;
        }
    };
    //键盘释放，小车停止移动
    Car.prototype.onKeyUp = function (e) {
        var keyCode = e.data;
        switch (keyCode) {
            case KeyListener.Right:
                // this.carBody.velocity[0] = 0;
                // this.wheelBody1.velocity[0] = 0;
                // this.wheelBody2.velocity[0] = 0;
                this.carBody.force[0] = 0;
                this.wheelBody1.force[0] = 0;
                this.wheelBody2.force[0] = 0;
                break;
            case KeyListener.Left:
                // this.carBody.velocity[0] = 0;
                // this.wheelBody1.velocity[0] = 0;
                // this.wheelBody2.velocity[0] = 0;
                this.carBody.force[0] = 0;
                this.wheelBody1.force[0] = 0;
                this.wheelBody2.force[0] = 0;
                break;
        }
    };
    return Car;
}(egret.Sprite));
__reflect(Car.prototype, "Car");
//# sourceMappingURL=Car.js.map