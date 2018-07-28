var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 射线
 * @author chenkai
 * @since 2017/6/27
 */
var RaycastingD = (function (_super) {
    __extends(RaycastingD, _super);
    function RaycastingD() {
        var _this = _super.call(this) || this;
        _this.result = new p2.RaycastResult();
        _this.hitPoint = p2.vec2.create();
        _this.rayClosestSp = new egret.Sprite();
        //创建测试
        _this.debugDraw = new p2DebugDraw();
        _this.world = _this.debugDraw.world;
        _this.addChild(_this.debugDraw);
        //创建射线
        _this.rayClosest = new p2.Ray({
            mode: p2.Ray.CLOSEST,
            from: [300, 300],
            to: [100, 100]
        });
        //创建box
        _this.boxBody = _this.debugDraw.createRect(200, 100);
        _this.boxBody.mass = 0;
        _this.boxBody.position = [100, 200];
        _this.boxBody.angularVelocity = 1; //角速度
        _this.boxBody.angularDamping = 0; //角阻尼
        //创建circle
        _this.circleBody = _this.debugDraw.createCircle(50);
        _this.circleBody.mass = 0;
        _this.circleBody.position = [100, 400];
        _this.circleBody.angularVelocity = 1;
        _this.circleBody.angularDamping = 0;
        //创建capsule 胶囊
        _this.capsuleBody = _this.debugDraw.createCapsule(10, 100);
        _this.capsuleBody.mass = 0;
        _this.capsuleBody.position = [200, 500];
        _this.capsuleBody.angularVelocity = 1;
        _this.capsuleBody.angularDamping = 0;
        //创建地板
        _this.planeBody = _this.debugDraw.createPlane();
        _this.planeBody.position = [300, 0];
        _this.planeBody.angle = Math.PI / 3;
        //创建Convex 凸面
        _this.convexBody = _this.debugDraw.createConvex();
        _this.convexBody.mass = 0;
        _this.convexBody.position = [350, 500];
        _this.convexBody.angularVelocity = 1;
        _this.convexBody.angularDamping = 0;
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        return _this;
    }
    RaycastingD.prototype.onEnterFrame = function () {
        this.drawRays();
    };
    //绘制射线
    RaycastingD.prototype.drawRays = function () {
        //获取射线碰撞结果
        var result = new p2.RaycastResult();
        this.world.raycast(result, this.rayClosest);
        //绘制射线
        this.rayClosestSp.graphics.clear();
        this.rayClosestSp.graphics.lineStyle(2, 0x00ff00);
        this.rayClosestSp.graphics.moveTo(this.rayClosest.from[0], this.rayClosest.from[1]);
        this.rayClosestSp.graphics.lineTo(this.rayClosest.to[0], this.rayClosest.to[1]);
        this.addChild(this.rayClosestSp);
        //在射线碰撞坐标位置绘制一个圆形
        result.getHitPoint(this.hitPoint, this.rayClosest); //hitPoint 碰撞点
        if (result.hasHit()) {
            this.rayClosestSp.graphics.beginFill(0x00ff00, 0.5);
            this.rayClosestSp.graphics.drawArc(this.hitPoint[0], this.hitPoint[1], 10, 0, 2 * Math.PI);
            this.rayClosestSp.graphics.endFill();
        }
        //绘制射线碰撞位置的法线
        this.rayClosestSp.graphics.moveTo(this.hitPoint[0], this.hitPoint[1]);
        this.rayClosestSp.graphics.lineTo(this.hitPoint[0] + result.normal[0] * 100, this.hitPoint[1] + result.normal[1] * 100); //result.normal 世界空间中命中的法线
    };
    return RaycastingD;
}(egret.Sprite));
__reflect(RaycastingD.prototype, "RaycastingD");
//# sourceMappingURL=RaycastingD.js.map