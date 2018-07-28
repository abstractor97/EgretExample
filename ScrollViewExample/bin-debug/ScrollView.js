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
*  文 件 名：ItemScroll.ts
*  功    能： 滚动组件
*  内    容： 自定义组件，支持多张图片水平(垂直)切换滚动
*
* Example:
* 1. 从自定义组件中找到ItemScroller，并拖动到exml上
* 2. 将需要显示对象(图片等)拖动到ItemScroller的Group下
* 3. 设置Group的布局为垂直or水平
*/
var ScrollView = (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView() {
        var _this = _super.call(this) || this;
        /**当前滚动到第几项  0表示第1项*/
        _this.curItemCount = 0;
        /**滚动时间*/
        _this.delayScroll = 250;
        /**滚动中*/
        _this.bScrolling = false;
        return _this;
    }
    ScrollView.prototype.childrenCreated = function () {
        //立即验证，获取width、height
        this.validateNow();
        //判断是垂直还是水平滚动
        var widthDist = this.viewport.contentWidth - this.viewport.width;
        if (widthDist > 0) {
            this.isHScroller = true;
            this.itemSize = this.viewport.width;
            this.itemNum = this.viewport.contentWidth / this.viewport.width;
        }
        else {
            this.isHScroller = false;
            this.itemSize = this.viewport.height;
            this.itemNum = this.viewport.contentHeight / this.viewport.height;
        }
        //滚动容器设置
        this.throwSpeed = 0;
        this.bounces = true;
        this.addEventListener(eui.UIEvent.CHANGE_START, this.onChangeStartHandler, this);
        this.addEventListener(eui.UIEvent.CHANGE_END, this.onChangeEndHandler, this);
    };
    /**可以滚动*/
    ScrollView.prototype.start = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
    };
    /**禁用滚动*/
    ScrollView.prototype.stop = function () {
        this.touchEnabled = false;
        this.touchChildren = false;
    };
    /**拖动开始*/
    ScrollView.prototype.onChangeStartHandler = function () {
        console.log("ItemScroller >> " + "change start");
        if (this.isHScroller) {
            this.touchStartPos = this.viewport.scrollH;
        }
        else {
            this.touchStartPos = this.viewport.scrollV;
        }
    };
    /**拖动结束*/
    ScrollView.prototype.onChangeEndHandler = function () {
        console.log("ItemScroller >> " + "change end");
        if (this.touchStartPos == -1) {
            return;
        }
        var dict;
        if (this.isHScroller) {
            dict = this.viewport.scrollH - this.touchStartPos;
        }
        else {
            dict = this.viewport.scrollV - this.touchStartPos;
        }
        if (dict > 0) {
            this.scrollToNext();
        }
        else if (dict < 0) {
            this.scrollToLast();
        }
        this.touchStartPos = -1;
    };
    /**滑动到下一项*/
    ScrollView.prototype.scrollToNext = function () {
        if (this.bScrolling) {
            return;
        }
        var item = this.curItemCount;
        if (item < this.itemNum - 1) {
            item++;
        }
        this.scrollToItem(item);
    };
    /**滑动到上一项*/
    ScrollView.prototype.scrollToLast = function () {
        if (this.bScrolling) {
            return;
        }
        var item = this.curItemCount;
        if (item > 0) {
            item--;
        }
        this.scrollToItem(item);
    };
    /**
     * 滚动到指定项 (0是第一项)
     * @item 指定项
     */
    ScrollView.prototype.scrollToItem = function (item) {
        var _this = this;
        if (this.bScrolling) {
            return;
        }
        if (item >= 0 && item < this.itemNum) {
            this.bScrolling = true;
            this.disableTouch();
            this.curItemCount = item;
            egret.Tween.removeTweens(this.viewport);
            if (this.isHScroller) {
                egret.Tween.get(this.viewport).to({ scrollH: item * this.itemSize, ease: egret.Ease.quadOut }, this.delayScroll);
            }
            else {
                egret.Tween.get(this.viewport).to({ scrollV: item * this.itemSize, ease: egret.Ease.quadOut }, this.delayScroll);
            }
            egret.Tween.get(this.viewport).wait(this.delayScroll).call(function () {
                _this.bScrolling = false;
                _this.enableTouch();
                _this.dispatchEventWith(ScrollView.EVENT_SCROLL_COMPLETE, false, _this.curItemCount);
            }, this);
        }
    };
    ScrollView.prototype.enableTouch = function () {
        this.touchEnabled = true;
        this.touchChildren = true;
    };
    ScrollView.prototype.disableTouch = function () {
        this.touchChildren = false;
        this.touchEnabled = false;
    };
    /**销毁*/
    ScrollView.prototype.destroy = function () {
    };
    /**滚动完成*/
    ScrollView.EVENT_SCROLL_COMPLETE = "EVENT_SCROLL_COMPLETE";
    return ScrollView;
}(eui.Scroller));
__reflect(ScrollView.prototype, "ScrollView");
//# sourceMappingURL=ScrollView.js.map