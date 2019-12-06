var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 摇一摇类
 * @example
 * <pre>
 *      Yaoyiyao.Ins.init();
 *      Yaoyiyao.Ins.start(succCallback,failCallback,thisObj);
 *      Yaoyiyao.Ins.end();
 * </pre>
 *
 * @version 0.0.6
 * @platform egret3.0.3
 */
var Yaoyiyao = (function () {
    function Yaoyiyao() {
        this.SHAKE_THRESHOLD = 3000;
        this.SHAKE_THRESHOLD2 = 2000;
        this.last_update = 0;
        this.motion = null;
        this.shakeCount = 0;
        this.succCallBack = null;
        this.failCallBack = null;
    }
    Yaoyiyao.getInstance = function () {
        if (!this.Ins) {
            this.Ins = new Yaoyiyao;
        }
        return this.Ins;
    };
    /**
     * 初始化摇一摇基础配置数据
     * @param threshold 摇成功的阈值
     * @param interval 监测摇状态的数据的间隔
     * @param diffratio 阈值调参 和阈值判定相关
     * @param threshold2 摇失败的阈值
     *
     * @version 0.0.6
     * @platform egret3.0.3
     */
    Yaoyiyao.prototype.init = function (threshold, interval, diffratio, threshold2) {
        if (threshold === void 0) { threshold = 3000; }
        if (interval === void 0) { interval = 100; }
        if (diffratio === void 0) { diffratio = 12000; }
        if (threshold2 === void 0) { threshold2 = 1000; }
        this.last_x = 0;
        this.last_y = 0;
        this.last_z = 0;
        this.isYaoing = false;
        this.motion = new egret.Motion();
        this.interval = interval;
        this.SHAKE_THRESHOLD = threshold;
        this.SHAKE_THRESHOLD2 = threshold2;
        this.diff_ratio = diffratio;
    };
    /**
     * 开始监测设备摇一摇运动状态的数据
     * @param succCallback? 摇一摇成功回调
     * @param failCallback? 摇一摇失败回调
     * @param thisObj? 回调this引用
     *
     * @version 0.0.6
     * @platform egret3.0.3
     */
    Yaoyiyao.prototype.start = function (succCallback, failCallback, thisObj) {
        this.succCallBack = succCallback;
        this.failCallBack = failCallback;
        this.thisObj = thisObj;
        this.motion.addEventListener(egret.Event.CHANGE, this.deviceMotionHandler, this);
        this.motion.start();
    };
    /**
     * 取消读取设备运动状态数据
     *
     * @version 0.0.3
     * @platform egret3.0.3
     */
    Yaoyiyao.prototype.end = function () {
        this.motion.removeEventListener(egret.Event.CHANGE, this.deviceMotionHandler, this);
        this.isYaoing = true;
    };
    /**
     * 监听函数
     * @param e
     *
     * @version 0.0.6
     * @platform egret3.0.3
     */
    Yaoyiyao.prototype.deviceMotionHandler = function (e) {
        var acceleration = e.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime - this.last_update) > this.interval) {
            var diffTime = curTime - this.last_update;
            this.last_update = curTime;
            var nX = acceleration.x;
            var nY = acceleration.y;
            var nZ = acceleration.z;
            var speed = Math.abs(nX + nY + nZ - this.last_x - this.last_y - this.last_z) / diffTime * this.diff_ratio;
            if (speed > this.SHAKE_THRESHOLD) {
                console.log('yaoing');
                if (this.isYaoing == false) {
                    e.currentTarget.removeEventListener(egret.Event.CHANGE, this.deviceMotionHandler, this);
                    this.isYaoing = true;
                    this.last_x = nX;
                    this.last_y = nY;
                    this.last_z = nZ;
                    this.onYaoyiyaoSucc();
                }
            }
            else if (speed > this.SHAKE_THRESHOLD2) {
                this.last_x = nX;
                this.last_y = nY;
                this.last_z = nZ;
                if (this.failCallBack) {
                    if (this.thisObj) {
                        this.failCallBack.call(this.thisObj);
                    }
                    else {
                        this.failCallBack();
                    }
                }
            }
        }
    };
    /**
     *  摇一摇成功回调
     *
     * @version 0.0.6
     * @platform egret3.0.3
     */
    Yaoyiyao.prototype.onYaoyiyaoSucc = function () {
        if (this.succCallBack) {
            if (this.thisObj) {
                this.succCallBack.call(this.thisObj);
            }
            else {
                this.succCallBack();
            }
        }
    };
    return Yaoyiyao;
}());
__reflect(Yaoyiyao.prototype, "Yaoyiyao");
//# sourceMappingURL=Yaoyiyao.js.map