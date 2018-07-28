var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 浮力
 * @author chenkai
 * @since 2017/6/28
 */
var Buoyancy = (function (_super) {
    __extends(Buoyancy, _super);
    function Buoyancy() {
        var _this = _super.call(this) || this;
        _this.shapePosition = [0, 0]; //shape的世界坐标点
        _this.centerOfBouyancy = [0, 0]; //浮力中心
        _this.liftForce = [0, 0]; //向上举起的力
        _this.viscousForce = [0, 0]; //粘性力
        _this.shapeAngle = 0; //shape的世界角度
        _this.k = 100; //水淹没量，计算浮力的系数
        _this.c = 0.8; //粘性力系数
        _this.v = [0, 0]; //物体某一点的速度
        _this.aabb = new p2.AABB(); //轴对齐包围盒也被称作矩形盒
        //测试
        _this.debugDraw = new p2DebugDraw();
        _this.world = _this.debugDraw.world;
        _this.addChild(_this.debugDraw);
        //创建水平面
        _this.planeBody = _this.debugDraw.createPlane();
        _this.planeBody.collisionResponse = false; //触发碰撞事件，但是不会发生碰撞
        _this.planeBody.position = [0, 500];
        //创建圆形
        _this.circleBody = _this.debugDraw.createCircle(50);
        _this.circleBody.mass = 1;
        _this.circleBody.position = [100, 100];
        //创建矩形
        _this.boxBody = _this.debugDraw.createRect(50, 100);
        _this.boxBody.mass = 1;
        _this.boxBody.position = [300, 100];
        _this.boxBody.angularVelocity = 0.5;
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        return _this;
    }
    Buoyancy.prototype.onEnterFrame = function () {
        this.applyAABBBuoyancyForces(this.boxBody, this.planeBody.position, this.k, this.c);
        //this.applyAABBBuoyancyForces(this.circleBody, this.planeBody.position, this.k, this.c);
    };
    //浮力计算
    Buoyancy.prototype.applyAABBBuoyancyForces = function (body, planePosition, k, c) {
        for (var i = 0; i < body.shapes.length; i++) {
            var shape = body.shapes[i];
            //获取shape的世界坐标和角度
            body.vectorToWorldFrame(this.shapePosition, shape.position); //将本地坐标点转换为世界坐标点   (世界坐标点， 本地坐标点)
            p2.vec2.add(this.shapePosition, this.shapePosition, body.position); //向量相加？
            this.shapeAngle = shape.angle + body.angle; //?
            //根据shape世界坐标和角度，获取aabb(矩形包围盒)
            shape.computeAABB(this.aabb, this.shapePosition, this.shapeAngle);
            //console.log(this.aabb.upperBound, this.aabb.lowerBound);  
            //由于egret和p2的坐标系不一样，导致边界不一样，upperBound(右下点) = [325, 150.72000122070312]  lowerBound(左上点) = [275, 50.720001220703125]
            //获取物体在水里的面积和浮力中心点
            var areaUnderWater; //在水里的面积
            //全部下沉在水里
            if (this.aabb.lowerBound[1] > planePosition[1]) {
                // Fully submerged
                p2.vec2.copy(this.centerOfBouyancy, this.shapePosition);
                areaUnderWater = shape.area; //area = width*height = 50*100 = 5000
            }
            else if (this.aabb.upperBound[1] > planePosition[1]) {
                // Partially submerged
                var width = this.aabb.upperBound[0] - this.aabb.lowerBound[0]; //物体宽度
                var height = this.aabb.upperBound[1] - this.planeBody.position[1]; //物体在水下的高度
                areaUnderWater = width * height;
                p2.vec2.set(this.centerOfBouyancy, this.aabb.upperBound[0] - width / 2, this.aabb.upperBound[1] - height / 2);
            }
            else {
                continue;
            }
            //根据侵入水里的面积，计算浮力
            p2.vec2.subtract(this.liftForce, planePosition, this.centerOfBouyancy);
            p2.vec2.scale(this.liftForce, this.liftForce, areaUnderWater * 0.005); //areaUnderWater*k  由于k系数太大，这里自调
            this.liftForce[0] = 0;
            //计算浮力发生的中心点(中心点世界坐标，转成本地坐标)
            p2.vec2.subtract(this.centerOfBouyancy, this.centerOfBouyancy, body.position);
            //获取粘性力，将中心点的力按系数c=0.8衰减 (有掉入水中并弹起，逐渐稳定的过程)
            body.getVelocityAtPoint(this.v, this.centerOfBouyancy); //获取物体某一点速度
            p2.vec2.scale(this.viscousForce, this.v, -c);
            //添加粘性力和浮力
            body.applyForce(this.viscousForce, this.centerOfBouyancy);
            body.applyForce(this.liftForce, this.centerOfBouyancy);
        }
    };
    return Buoyancy;
}(egret.Sprite));
__reflect(Buoyancy.prototype, "Buoyancy");
//# sourceMappingURL=Buoyancy.js.map