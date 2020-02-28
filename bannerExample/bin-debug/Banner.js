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
//热门大厅上面 广告组件
var Banner = (function (_super) {
    __extends(Banner, _super);
    function Banner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.radioList = [];
        //当前滚动的 下标
        _this._currentIndex = 0;
        _this.scrollDeriction = "right";
        _this.SCROLL_RIGHT = "right";
        _this.SCROLL_LEFT = "left";
        _this._timeHandler = null;
        _this.isLoad = false;
        return _this;
    }
    Banner.prototype.init = function () {
        egret.ImageLoader.crossOrigin = "anonymous";
        this.skinName = panels.BannerSkin;
    };
    Banner.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.isLoad = false;
        this.bannerScroller.verticalScrollBar = null;
        this.bannerScroller.horizontalScrollBar = null;
        this.bannerList.dataProvider = this._dataProvider = new eui.ArrayCollection();
        this.bannerList.itemRenderer = IRBannerItem;
        this.addListener();
    };
    Banner.prototype.onComplete = function () {
        console.log("onComplete");
    };
    Banner.prototype.addListener = function () {
        this.bannerScroller.addEventListener(egret.Event.CHANGE, this.onListRefresh, this);
        this.bannerScroller.addEventListener(eui.UIEvent.CHANGE_END, this.onScrollComplete, this);
        this.bannerList.addEventListener(egret.Event.CHANGE, this.onSelectItem, this);
    };
    Banner.prototype.removeListener = function () {
        this.bannerList.removeEventListener(egret.Event.CHANGE, this.onSelectItem, this);
    };
    Banner.prototype.refreshData = function () {
        if (!this.isLoad) {
            this.clearTimeHandler();
            this.initData();
            this.isLoad = true;
        }
    };
    Banner.prototype.onScrollComplete = function (event) {
        //滑动结束直接设置 下一一个
        var len = this._dataProvider.source.length;
        if (this.scrollDeriction == this.SCROLL_RIGHT) {
            this._currentIndex++;
            if (this._currentIndex >= len) {
                this._currentIndex = 0;
            }
        }
        else {
            this._currentIndex--;
            if (this._currentIndex <= 0) {
                this._currentIndex = 0;
            }
        }
        this.bannerScroller.viewport.scrollH = this._currentIndex * 750;
        //滑动结束回复定时器
        this.playAnimation();
        var radio = this.getRadio(this._currentIndex);
        if (radio) {
            radio.selected = true;
        }
    };
    Banner.prototype.onListRefresh = function (event) {
        //限制每次只滑动一屏的距离
        var scrollH = this.bannerScroller.viewport.scrollH;
        //区分左右滑动
        var currentH = this._currentIndex * 750;
        var len = this._dataProvider.source.length;
        if (this._currentIndex == 0) {
            this.scrollDeriction = this.SCROLL_RIGHT;
        }
        else if (this._currentIndex == len) {
            this.scrollDeriction = this.SCROLL_LEFT;
        }
        else {
            if (scrollH > currentH) {
                this.scrollDeriction = this.SCROLL_RIGHT;
            }
            else {
                this.scrollDeriction = this.SCROLL_LEFT;
            }
        }
        if (this.scrollDeriction == this.SCROLL_RIGHT) {
            var nextIndex = this._currentIndex + 1;
            var scroolEndH = (nextIndex) * 750;
            if (scrollH >= scroolEndH) {
                this.bannerScroller.viewport.scrollH = scroolEndH;
            }
        }
        else {
            nextIndex = this._currentIndex - 1;
            var scroolEndH = (nextIndex) * 750;
            if (scrollH <= scroolEndH) {
                this.bannerScroller.viewport.scrollH = scroolEndH;
            }
        }
        var radio = this.getRadio(nextIndex);
        if (radio) {
            radio.selected = true;
        }
        //滑动时清空 定时
        this.clearTimeHandler();
    };
    /**
     * 点击列表Item
    */
    Banner.prototype.onSelectItem = function (event) {
        var _this = this;
        var data = this.bannerList.selectedItem;
        egret.callLater(function () {
            _this.bannerList.selectedIndex = -1;
        }, this);
    };
    /**
     * 初始化点击事件 zhu
     */
    Banner.prototype._enableEvent = function (bEnable) {
        var func = "addEventListener";
        if (!bEnable) {
            func = "removeEventListener";
        }
    };
    /**
         * 初始化默认数据 zhu
         */
    Banner.prototype._initDefault = function () {
    };
    /**
     * 点击头像 zhu
     */
    Banner.prototype._onTouchHead = function () {
    };
    Banner.prototype.playAnimation = function () {
        var _this = this;
        var len = this._dataProvider.source.length;
        this._timeHandler = setInterval(function () {
            _this._currentIndex++;
            if (_this._currentIndex == len) {
                _this._currentIndex = 0;
            }
            egret.Tween.get(_this.bannerScroller.viewport).to({ scrollH: _this._currentIndex * 750, ease: egret.Ease.quadOut }, 200);
            var radio = _this.getRadio(_this._currentIndex);
            if (radio) {
                radio.selected = true;
            }
        }, 5000);
    };
    //设置滚动效果
    Banner.prototype.setAnimation = function () {
        this._currentIndex = 0;
        this.playAnimation();
    };
    Banner.prototype.getRadio = function (index) {
        if (this.radioList.length > 0) {
            return this.radioList[index];
        }
        else {
            return null;
        }
    };
    Banner.prototype.initData = function () {
        var exml = "\n\t\t<e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down,disabled\" height=\"8\" width=\"21\">\n\t\t\t\t<e:Image source=\"point_gray_png\" horizontalCenter=\"0\" verticalCenter=\"0\" width=\"100%\" height=\"100%\" alpha=\"0\"/>\n\t\t\t\t<e:Image source=\"point_gray_png\" source.down=\"point_white_png\" horizontalCenter=\"0\" verticalCenter=\"0\"/>\n\t\t</e:Skin>";
        var hots = [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }, { index: 5 }, { index: 6 }, { index: 7 }, { index: 8 }];
        this._dataProvider.source = hots;
        this.bannerList.width = hots.length * 750;
        for (var i = 0; i < hots.length; i++) {
            var rdb = new eui.RadioButton();
            rdb.skinName = exml;
            rdb.selected = true; //默认选项
            rdb.width = 21;
            rdb.height = 8;
            rdb.groupName = "radioGrp";
            rdb.name = "radio" + i;
            this.radioGroup.addChild(rdb);
            this.radioList.push(rdb);
        }
        this.setAnimation();
    };
    Banner.prototype.clearTimeHandler = function () {
        if (this._timeHandler) {
            clearInterval(this._timeHandler);
            this._timeHandler = null;
        }
    };
    Banner.prototype.cleartBanner = function () {
        this.radioGroup.removeChildren();
        this._dataProvider.source = [];
        this.radioList = [];
    };
    Banner.prototype.show = function () {
        console.log("----banner show-------");
        this.initData();
    };
    return Banner;
}(eui.Component));
__reflect(Banner.prototype, "Banner");
var IRBannerItem = (function (_super) {
    __extends(IRBannerItem, _super);
    function IRBannerItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IRBannerItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // this["item"]["addClickListener"](this._onClickIdx, this);
    };
    IRBannerItem.prototype._onClickIdx = function () {
        var data = this.data;
    };
    IRBannerItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.lbl.text = data.index;
    };
    return IRBannerItem;
}(eui.ItemRenderer));
__reflect(IRBannerItem.prototype, "IRBannerItem");
//# sourceMappingURL=Banner.js.map