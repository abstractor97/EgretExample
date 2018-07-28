var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 鼠标拖拽物体移动
 *
 * 1. 刚体约束的使用
 * 2. 原理是向两个刚体添加约束点。一个是拖拽的刚体，一个不可见的刚体。好比躯干+手臂，在躯干和手臂之间，增加一个骨骼点。
 * 3. 鼠标触摸移动时，移动不可见的刚体，这时可见的刚体由于约束，会跟随不可见刚体移动并旋转。旋转点 = 触摸点 = 两刚体约束点。
 *
 * @author chenkai
 * @since  2017/6/23
 */
var MouseJoint = (function (_super) {
    __extends(MouseJoint, _super);
    function MouseJoint() {
        var _this = _super.call(this) || this;
        //测试模块
        _this.debugDraw = new p2DebugDraw();
        _this.addChild(_this.debugDraw);
        //创建矩形
        _this.boxBody = _this.debugDraw.createRect(200, 100);
        _this.boxBody.position = [300, 0];
        //创建地板
        var plane = _this.debugDraw.createPlane();
        //创建鼠标body
        _this.mouseBody = new p2.Body();
        _this.debugDraw.world.addBody(_this.mouseBody);
        //监听触摸
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
        return _this;
    }
    //触摸开始，在触摸矩形的位置，添加矩形和一个不可见刚体的约束
    MouseJoint.prototype.onTouchBegin = function (e) {
        console.log("begin");
        var position = [e.stageX, e.stageY];
        var hitBodies = this.debugDraw.world.hitTest(position, [this.boxBody], 1); //测试世界点是否重叠物体
        console.log("触摸坐标:", e.stageX, e.stageY, "重叠物体数量:", hitBodies.length);
        if (hitBodies.length) {
            this.mouseBody.position[0] = position[0];
            this.mouseBody.position[1] = position[1];
            this.mouseConstraint = new p2.RevoluteConstraint(this.mouseBody, this.boxBody, {
                worldPivot: position,
                collideConnected: false //连接物体是否碰撞
            });
            this.debugDraw.world.addConstraint(this.mouseConstraint); //添加约束
        }
    };
    //触摸移动，移动不可见刚体，利用约束，让矩形跟随移动和旋转
    MouseJoint.prototype.onTouchMove = function (e) {
        var position = [e.stageX, e.stageY];
        this.mouseBody.position[0] = position[0];
        this.mouseBody.position[1] = position[1];
    };
    //触摸停止，移除约束，矩形自由下落
    MouseJoint.prototype.onTouchEnd = function (e) {
        console.log("end");
        this.debugDraw.world.removeConstraint(this.mouseConstraint);
        this.mouseConstraint = null;
    };
    return MouseJoint;
}(egret.Sprite));
__reflect(MouseJoint.prototype, "MouseJoint");
//# sourceMappingURL=MouseJoint.js.map