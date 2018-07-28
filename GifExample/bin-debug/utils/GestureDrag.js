var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
*  文 件 名： GestureDrag.ts
*  功    能： 手指按住拖动
*  内    容：
*  作    者： Rikimaru
*  生成日期： 2016/3/14
*  修改日期：
*  修改日志：
*
* Example:
* var ges:GestureDrag = new GestureDrag(this.bm);
* ges.start();
* ges.stop();
* ges.destroy();
*/
var GestureDrag = (function () {
    function GestureDrag() {
        this.curPointID = -1; //当前触摸ID
    }
    GestureDrag.prototype.setTarget = function (target) {
        this.target = target;
    };
    GestureDrag.prototype.start = function () {
        this.curPointID = -1;
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    GestureDrag.prototype.stop = function () {
        this.curPointID = -1;
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    GestureDrag.prototype.onTouchBegin = function (e) {
        if (this.curPointID != -1) {
            return;
        }
        this.curPointID = e.touchPointID;
        this.lastX = e.stageX;
        this.lastY = e.stageY;
        StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    GestureDrag.prototype.onTouchMove = function (e) {
        if (e.touchPointID == this.curPointID) {
            this.target.x += e.stageX - this.lastX;
            this.target.y += e.stageY - this.lastY;
            this.lastX = e.stageX;
            this.lastY = e.stageY;
        }
    };
    GestureDrag.prototype.onTouchEnd = function (e) {
        if (e.touchPointID == this.curPointID) {
            this.curPointID = -1;
            StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }
    };
    GestureDrag.prototype.destroy = function () {
        this.stop();
        this.target = null;
    };
    return GestureDrag;
}());
__reflect(GestureDrag.prototype, "GestureDrag");
//# sourceMappingURL=GestureDrag.js.map