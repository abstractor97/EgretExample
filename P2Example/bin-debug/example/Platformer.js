var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 控制人物在斜面平台行走
 * 1. collisionGroup和collisionMask碰撞组的用法
 *
 * @author chenkai
 * @since 2017/6/27
 */
var Platformer = (function (_super) {
    __extends(Platformer, _super);
    function Platformer() {
        var _this = _super.call(this) || this;
        _this.SCENERY_GROUP = 0x01; //碰撞检测组
        _this.PLAYER_GROUP = 0x02;
        //创建测试
        _this.debugDraw = new p2DebugDraw();
        _this.world = _this.debugDraw.world;
        _this.addChild(_this.debugDraw);
        //增加静止的矩形和圆形
        _this.addStaticCircle(100, 500, 100, 200);
        _this.addStaticBox(400, 500, -Math.PI / 4, 100, 300);
        _this.addStaticBox(600, 600, 0, 300, 100);
        //增加人物
        _this.characterBody = _this.debugDraw.createRect(50, 100);
        _this.characterBody.mass = 1;
        _this.characterBody.position = [500, 300];
        _this.characterBody.fixedRotation = true;
        _this.characterBody.damping = 0;
        var characterShape = _this.characterBody.shapes[0];
        characterShape.collisionGroup = _this.PLAYER_GROUP; //collisionGroup隶属于的碰撞组bit mask。 作用：相同碰撞组可以碰撞，不同碰撞组不能碰撞
        characterShape.collisionMask = _this.SCENERY_GROUP; //collisionMask指定可以与其他哪些碰撞组碰撞。 这里可以和场景碰撞，但是不能和PLAYER碰撞。即使collisionGroup都是PLAYER。
        //characterShape.collisionMask = this.PLAYER_GROUP | this.SCENERY_GROUP;  //可以和SCENERY和PLAYER两个碰撞组碰撞。
        //增加另一个人物
        var characterBody2 = _this.debugDraw.createRect(50, 100);
        characterBody2.mass = 1;
        characterBody2.position = [600, 300];
        characterBody2.fixedRotation = true;
        characterBody2.damping = 0;
        var characterShape2 = characterBody2.shapes[0];
        characterShape2.collisionGroup = _this.PLAYER_GROUP;
        characterShape2.collisionMask = _this.SCENERY_GROUP;
        console.log("角色1:", characterShape.collisionGroup, characterShape.collisionMask);
        console.log("角色2:", characterShape2.collisionGroup, characterShape2.collisionMask);
        //鼠标事件
        var keyListener = new KeyListener();
        keyListener.addEventListener(KeyListener.EVENT_KEY_DOWN, _this.onKeyDown, _this);
        return _this;
    }
    Platformer.prototype.onKeyDown = function (e) {
        var keyCode = e.data;
        switch (keyCode) {
            case KeyListener.Left:
                this.characterBody.velocity[0] = -100;
                break;
            case KeyListener.Right:
                this.characterBody.velocity[0] = 100;
                break;
        }
    };
    //增加静止的矩形
    Platformer.prototype.addStaticBox = function (x, y, angle, width, height) {
        var boxBody = this.debugDraw.createRect(width, height);
        boxBody.position = [x, y];
        boxBody.angle = angle;
        boxBody.mass = 0;
        boxBody.type = p2.Body.KINEMATIC;
        var shape = boxBody.shapes[0];
        shape.collisionGroup = this.SCENERY_GROUP;
        shape.collisionMask = this.PLAYER_GROUP;
        console.log("矩形:", shape.collisionGroup, shape.collisionMask);
    };
    //增加静止的圆形
    Platformer.prototype.addStaticCircle = function (x, y, angle, radius) {
        var boxBody = this.debugDraw.createCircle(radius);
        boxBody.position = [x, y];
        boxBody.angle = angle;
        boxBody.mass = 0;
        boxBody.type = p2.Body.KINEMATIC;
        var shape = boxBody.shapes[0];
        shape.collisionGroup = this.SCENERY_GROUP;
        shape.collisionMask = this.PLAYER_GROUP;
    };
    return Platformer;
}(egret.Sprite));
__reflect(Platformer.prototype, "Platformer");
//# sourceMappingURL=Platformer.js.map