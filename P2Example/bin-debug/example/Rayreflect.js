var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 射线反射
 * 1. p2.vec2.reflect 反射
 * @author chenkai
 * @since 2017/6/28
 */
var Rayreflect = (function (_super) {
    __extends(Rayreflect, _super);
    function Rayreflect() {
        var _this = _super.call(this) || this;
        _this.raySp = new egret.Sprite();
        _this.result = new p2.RaycastResult();
        _this.hitPoint = p2.vec2.create();
        //测试
        _this.debugDraw = new p2DebugDraw();
        _this.world = _this.debugDraw.world;
        _this.addChild(_this.debugDraw);
        //创建一个方块
        _this.boxBody = _this.debugDraw.createRect(100, 50);
        _this.boxBody.mass = 0;
        _this.boxBody.angularVelocity = 1;
        _this.boxBody.angularDamping = 0;
        _this.boxBody.position = [300, 300];
        //创建一条线
        _this.lineBody = _this.debugDraw.createLine(400);
        _this.lineBody.mass = 0;
        _this.lineBody.angle = Math.PI / 3;
        _this.lineBody.position = [400, 400];
        //绘制射线
        _this.ray = new p2.Ray();
        _this.ray.mode = p2.Ray.CLOSEST;
        _this.ray.from = [10, 10];
        _this.ray.to = [500, 600];
        _this.ray.update(); //改变from和to后需要update，否则修改不生效
        //每帧更新
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        return _this;
    }
    Rayreflect.prototype.onEnterFrame = function () {
        this.drawRay();
    };
    //绘制射线
    Rayreflect.prototype.drawRay = function () {
        //重置射线位置
        this.ray.from = [10, 10];
        this.ray.to = [500, 600];
        this.ray.update();
        this.raySp.graphics.clear();
        this.raySp.graphics.lineStyle(1, 0x00ff00);
        this.addChild(this.raySp);
        //循环获取碰撞结果，直到没有碰撞
        var hit = 0;
        while (this.world.raycast(this.result, this.ray) && (hit++) < 10) {
            this.result.getHitPoint(this.hitPoint, this.ray); //获取碰撞点坐标
            //绘制射线起始点到碰撞点，并将起始点移动到碰撞点
            this.raySp.graphics.moveTo(this.ray.from[0], this.ray.from[1]);
            this.raySp.graphics.lineTo(this.hitPoint[0], this.hitPoint[1]);
            p2.vec2.copy(this.ray.from, this.hitPoint);
            this.ray.update();
            if (this.result.hasHit()) {
                p2.vec2.reflect(this.ray.direction, this.ray.direction, this.result.normal); //沿法线反射向量 (需要反射向量，反射结果向量，法线)
                //重置射线
                this.ray.from[0] += this.ray.direction[0] * 0.001;
                this.ray.from[1] += this.ray.direction[1] * 0.001;
                this.ray.to[0] = this.ray.from[0] + this.ray.direction[0] * 100;
                this.ray.to[1] = this.ray.from[1] + this.ray.direction[1] * 100;
                this.ray.update();
                this.result.reset();
            }
        }
        this.raySp.graphics.moveTo(this.ray.from[0], this.ray.from[1]);
        this.raySp.graphics.lineTo(this.ray.to[0], this.ray.to[1]);
    };
    return Rayreflect;
}(egret.Sprite));
__reflect(Rayreflect.prototype, "Rayreflect");
//# sourceMappingURL=Rayreflect.js.map