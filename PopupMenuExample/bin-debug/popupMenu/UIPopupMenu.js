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
 * 弹出菜单
 * @author chenkai
 * @since 2017/6/14
 *
 * Example:
 * 1. 拖动UIPopupMenu自定义组件到场景exml中，并设置UIPopopMenuSkin
 * 2. var popupMenu:UIPopupMenu;
 *    popupMenu.setListSkin("ListItemSkin");   //设置列表条目皮肤
 *    popupMenu.addItem("条目1");              //增加列表项
 *    popupMenu.addItem("条目2");
 *    popupMenu.removeItem("条目1");           //移除列表项
 */
var UIPopupMenu = (function (_super) {
    __extends(UIPopupMenu, _super);
    function UIPopupMenu() {
        var _this = _super.call(this) || this;
        _this.listItems = []; //列表内容
        _this.bOpen = false; //是否展开状态 
        _this.openSpeed = 200; //展开速度
        return _this;
    }
    UIPopupMenu.prototype.childrenCreated = function () {
        //设置遮罩
        this.listMask.y = this.menuBtn.y + this.menuBtn.height;
        this.list.mask = this.listMask;
        //设置列表初始位置
        this.list.y = this.menuBtn.y + this.menuBtn.height;
        //设置菜单背景
        this.menuBgMask.y = this.menuBtn.y + this.menuBtn.height;
        this.menuBg.y = this.menuBg.y + this.menuBtn.height;
        this.menuBg.mask = this.menuBgMask;
        //菜单按钮监听
        this.menuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenuBtnTouch, this);
        //列表监听
        this.list.addEventListener(egret.TouchEvent.CHANGE, this.onChange, this);
    };
    /**
     * 设置list皮肤
     * @skinName 皮肤名
     */
    UIPopupMenu.prototype.setListSkin = function (skinName) {
        this.list.itemRendererSkinName = skinName;
        this.list.y = this.menuBtn.y + this.menuBtn.height;
    };
    /**
     * 增加条目
     * @itemValue 条目内容
     */
    UIPopupMenu.prototype.addItem = function (itemValue) {
        //设置list值
        this.listItems.push({ itemValue: itemValue });
        this.list.dataProvider = new eui.ArrayCollection(this.listItems);
        //设置遮罩
        this.listMask.height = this.list.height;
        this.menuBgMask.height = this.list.height;
        //设置菜单背景高度
        this.menuBg.height = this.list.height;
        //收缩状态，调整位置，否则增加列表项后会露出来
        if (this.bOpen == false) {
            this.list.y = this.menuBtn.y + this.menuBtn.height - this.list.height;
            this.menuBg.y = this.menuBtn.y + this.menuBtn.height - this.list.height;
        }
    };
    /**
     * 移除条目
     * @itemValue 条目内容
     */
    UIPopupMenu.prototype.removeItem = function (itemValue) {
        //移除条目
        var len = this.listItems.length;
        for (var i = len - 1; i >= 0; i--) {
            var obj = this.listItems[i];
            if (obj.itemValue == itemValue) {
                this.listItems.splice(i, 1);
                break;
            }
        }
        //设置list
        this.list.dataProvider = new eui.ArrayCollection(this.listItems);
        //设置遮罩高度
        this.listMask.height = this.list.height;
        this.menuBgMask.height = this.list.height;
        this.menuBg.height = this.list.height;
    };
    /**
     * 展开
     */
    UIPopupMenu.prototype.open = function () {
        egret.Tween.removeTweens(this.list);
        this.bOpen = true;
        egret.Tween.get(this.list).to({ y: this.menuBtn.y + this.menuBtn.height }, this.openSpeed);
        egret.Tween.get(this.menuBg).to({ y: this.menuBtn.y + this.menuBtn.height }, this.openSpeed);
        this.list.selectedIndex = -1; //设置默认选中项
    };
    /**
     * 收缩
     * tween 是否有缓动动画
     */
    UIPopupMenu.prototype.close = function (bTween) {
        if (bTween === void 0) { bTween = true; }
        egret.Tween.removeTweens(this.list);
        this.bOpen = false;
        if (bTween) {
            egret.Tween.get(this.list).to({ y: this.menuBtn.y + this.menuBtn.height - this.list.height }, this.openSpeed);
            egret.Tween.get(this.menuBg).to({ y: this.menuBtn.y + this.menuBtn.height - this.list.height }, this.openSpeed);
        }
        else {
            this.list.y = this.menuBtn.y + this.menuBtn.height - this.list.height;
            this.menuBg.y = this.menuBtn.y + this.menuBtn.height - this.list.height;
        }
    };
    //触摸菜单按钮
    UIPopupMenu.prototype.onMenuBtnTouch = function (e) {
        //展开时，点击收缩
        if (this.bOpen) {
            this.close();
            //收缩时，点击展开
        }
        else {
            this.open();
        }
    };
    //选中列表项
    UIPopupMenu.prototype.onChange = function (e) {
        //console.log(this.list.selectedIndex);  //选中项索引
        //console.log(this.list.selectedItem.itemValue);   //选中列表项对象 
        this.close(false);
        this.dispatchEventWith(egret.TouchEvent.CHANGE, false, { selectedIndex: this.list.selectedIndex, itemValue: this.list.selectedItem.itemValue });
    };
    UIPopupMenu.prototype.gC = function () {
        //菜单按钮监听
        this.menuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMenuBtnTouch, this);
        //列表监听
        this.list.removeEventListener(egret.TouchEvent.CHANGE, this.onChange, this);
    };
    return UIPopupMenu;
}(eui.Component));
__reflect(UIPopupMenu.prototype, "UIPopupMenu");
//# sourceMappingURL=UIPopupMenu.js.map