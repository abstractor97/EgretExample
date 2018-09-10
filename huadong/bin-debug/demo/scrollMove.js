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
var scrollMove = (function (_super) {
    __extends(scrollMove, _super);
    function scrollMove() {
        var _this = _super.call(this) || this;
        _this.moveListDate = [];
        _this.needUp = false;
        _this.needDown = false;
        _this.skinName = "resource/demoSkins/scrollSK.exml";
        _this.addEventListener(egret.Event.COMPLETE, _this.addToStage, _this);
        return _this;
    }
    scrollMove.prototype.createChilden = function () {
        _super.prototype.createChildren.call(this);
    };
    scrollMove.prototype.addData = function (dataLists) {
        this.moveGroup.removeChildren();
        for (var i = 0; i < dataLists.length; i++) {
            this.moveGroup.addChild(dataLists[i]);
        }
        this.moveScroll.addEventListener(eui.UIEvent.CHANGE, this.moveHandler, this);
        this.moveScroll.addEventListener(eui.UIEvent.CHANGE_END, this.outHandler, this);
    };
    scrollMove.prototype.addToStage = function () {
        var dataArrylen = (this.moveListDate.length > 0) ? this.moveListDate.length : 10;
        for (var i = 0; i < dataArrylen; i++) {
            var dataList = new eui.Group();
            dataList.width = 600;
            dataList.height = 86;
            dataList.x = 0;
            dataList.y = (i * 110);
            //list背景
            var itemImage = new eui.Image();
            itemImage.source = "sss_png";
            itemImage.x = 0;
            itemImage.y = 0;
            itemImage.width = 600;
            itemImage.height = 86;
            itemImage.fillMode = egret.BitmapFillMode.SCALE; //图片填充方式
            itemImage.touchEnabled = true;
            dataList.addChild(itemImage);
            this.moveListDate.push(dataList);
        }
        this.addData(this.moveListDate);
    };
    scrollMove.prototype.moveHandler = function (evt) {
        //检测是否超过滚动底部
        // console.log(this.moveScroll.viewport.scrollV);
        // console.log(this.moveScroll.viewport.contentHeight - this.moveScroll.viewport.height);
        console.log(this.moveScroll.viewport.scrollV > this.moveScroll.viewport.contentHeight - this.moveScroll.viewport.height);
        if (this.moveScroll.viewport.scrollV > (this.moveScroll.viewport.contentHeight - this.moveScroll.viewport.height) + 40) {
            this.needUp = true;
        }
    };
    scrollMove.prototype.outHandler = function (evt) {
        //停止滚动时判断needUp是否为true
        console.log(this.needUp);
        if (this.needUp) {
            this.needUp = false;
            this.addToStage();
        }
    };
    return scrollMove;
}(eui.Component));
__reflect(scrollMove.prototype, "scrollMove");
//# sourceMappingURL=scrollMove.js.map