var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 根据系统时间的计时器
 * @author chenkai
 * @since 2016/12/30
 * Example:
 * var dateTimer:DateTimer = new DateTimer(1000);
 * dateTimer.addEventListeners(egret.TimerEvent.TIMER, this.onTimerHandler, this);
 * dateTimer.addEventListeners(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
 * dateTimer.reset();
 * dateTimer.start();
 */
var DateTimer = (function (_super) {
    __extends(DateTimer, _super);
    function DateTimer(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        var _this = _super.call(this) || this;
        _this.delay = delay;
        _this.repeatCount = repeatCount;
        return _this;
    }
    /**开始计时 */
    DateTimer.prototype.start = function () {
        this.previous = egret.getTimer();
        this.accTime = 0;
        egret.startTick(this.update, this);
    };
    /**重置计时 */
    DateTimer.prototype.reset = function () {
        this.previous = egret.getTimer();
        this.accTime = 0;
        this.currentCount = 0;
    };
    /**停止计时 */
    DateTimer.prototype.stop = function () {
        egret.stopTick(this.update, this);
    };
    /**更新时间 */
    DateTimer.prototype.update = function () {
        this.curTime = egret.getTimer();
        this.passTime = this.curTime - this.previous;
        this.previous = this.curTime;
        this.accTime += this.passTime;
        while (this.accTime >= this.delay) {
            this.accTime -= this.delay;
            this.currentCount++;
            if (this.repeatCount > 0 && (this.currentCount == this.repeatCount)) {
                this.dispatchEvent(new egret.TimerEvent(egret.TimerEvent.TIMER_COMPLETE));
                this.stop();
            }
            this.dispatchEvent(new egret.TimerEvent(egret.TimerEvent.TIMER));
        }
        return false;
    };
    return DateTimer;
}(egret.EventDispatcher));
__reflect(DateTimer.prototype, "DateTimer");
