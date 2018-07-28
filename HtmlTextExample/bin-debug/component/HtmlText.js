var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 显示在egret中的文本
 * 其实就是<p>标签显示在canvas之上，用于长按复制文本中的内容。比如优惠码等。
 * @author chenkai
 * @since  2017/3/15
 */
var HTMLText = (function () {
    //...其他属性自行扩展
    function HTMLText() {
        /**字体大小*/
        this._fontSize = 40;
        //在egret的div下创建<p>
        var gameDiv = document.getElementById("gameDiv");
        this.p = document.createElement("p");
        gameDiv.appendChild(this.p);
        //设置<p>属性
        this.p.style.border = "0px";
        this.p.style.backgroundColor = "transparent";
        this.p.style.position = "absolute";
        this.p.style.fontSize = this.fontSize + "px";
        this.p.style.display = "none";
        this.p.style.color = "#000000";
        this.p.style.textAlign = "center";
    }
    Object.defineProperty(HTMLText.prototype, "fontSize", {
        /**字体大小 */
        get: function () {
            return this._fontSize;
        },
        /**字体大小 */
        set: function (value) {
            this._fontSize = value;
            this.p.style.fontSize = this._fontSize + "px";
        },
        enumerable: true,
        configurable: true
    });
    /**设置文本内容*/
    HTMLText.prototype.setValue = function (value) {
        this.p.style.display = "inline";
        this.p.innerHTML = value;
    };
    /**
     * 根据canvas中的位置和高宽，来设置<p>位置和高宽
     * @param xPos egret中 x坐标
     * @param yPos y坐标
     * @param width 宽度
     * @param height 高度
     */
    HTMLText.prototype.setPosition = function (xPos, yPos, width, height) {
        //计算stage和浏览器的比例
        var wScale = document.body.clientWidth / App.StageUtils.stageWidth;
        var hScale = document.body.clientHeight / App.StageUtils.stageHeight;
        //根据比例设置<p>的位置和高宽
        this.p.style.left = xPos * wScale + "px";
        this.p.style.top = yPos * hScale - this.fontSize + "px";
        this.p.style.width = width * wScale + "px";
        this.p.style.height = height * hScale + "px";
        this.p.style.display = "inline";
    };
    /**显示 */
    HTMLText.prototype.show = function () {
        this.p && (this.p.style.display = "inline");
    };
    /**隐藏*/
    HTMLText.prototype.hide = function () {
        this.p && (this.p.style.display = "none");
    };
    return HTMLText;
}());
__reflect(HTMLText.prototype, "HTMLText");
