var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 摇一摇工具类
 * @author chenkai
 * @since 2017/4/20
 */
var ShakeTool = (function (_super) {
    __extends(ShakeTool, _super);
    function ShakeTool() {
        var _this = _super.call(this) || this;
        _this.xAngle = 0; //设备绕x角度
        _this.yAngle = 0; //设备绕y角度
        _this.zAngle = 0; //设备绕z角度
        _this.last_x = 0; //上一次绕x角度
        _this.last_y = 0; //上一次绕y角度
        _this.last_z = 0; //上一次绕z角度
        _this.shakeCount = 0; //摇动次数
        _this.lastTime = 0; //上一次更新时间
        _this.shakeAngle = 45; //当晃动角度大于limit时，算摇动一次
        return _this;
    }
    /**开始 */
    ShakeTool.prototype.start = function () {
        //重置数据
        this.shakeCount = 0;
        this.lastTime = 0;
        this.last_x = 0;
        this.last_y = 0;
        this.last_z = 0;
        //开始监听
        this.orientation || (this.orientation = new egret.DeviceOrientation());
        this.orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
        this.orientation.start();
    };
    /**停止 */
    ShakeTool.prototype.stop = function () {
        if (this.orientation) {
            this.orientation.removeEventListener(egret.Event.CHANGE, this.onOrientation, this);
            this.orientation.stop();
        }
    };
    ShakeTool.prototype.onOrientation = function (e) {
        var curTime = egret.getTimer();
        //每100ms判断一次
        if (curTime - this.lastTime > 100) {
            this.lastTime = curTime;
            this.xAngle = e.beta; //x轴
            this.yAngle = e.gamma; //y轴
            this.zAngle = e.alpha; //z轴
            //旋转超过一定角度，则算摇动一次
            if (Math.abs(this.last_x - this.xAngle) > this.shakeAngle ||
                Math.abs(this.last_y - this.yAngle) > this.shakeAngle ||
                Math.abs(this.last_z - this.zAngle) > this.shakeAngle) {
                this.shakeCount++;
            }
            this.last_x = this.xAngle;
            this.last_y = this.yAngle;
            this.last_z = this.zAngle;
        }
        //派发事件
        this.dispatchEventWith(egret.Event.CHANGE, false, { x: this.xAngle, y: this.yAngle, z: this.zAngle, shakeCount: this.shakeCount });
    };
    return ShakeTool;
}(egret.EventDispatcher));
__reflect(ShakeTool.prototype, "ShakeTool");
//# sourceMappingURL=ShakeTool.js.map