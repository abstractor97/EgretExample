var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 长按识别二维码
 * 创建img标签的二维码，在微信里长按扫描识别
 * @author chenkai
 * @since 2017/4/17
 *
 * example:
 * var qrCode:QRCode = new QRCode("resource/assets/qrcode.jpg");
 * qrCode.setPosition(100, 100, 200, 200);
 * qrCode.showHtmlCode();
 */
var QRCode = (function () {
    /**
     * @param htmlCodeUrl htmlCode二维码链接
     */
    function QRCode(htmlCodeUrl) {
        var gameDiv = document.getElementById("gameDiv");
        this.htmlCode = document.createElement("img");
        this.htmlCode.src = htmlCodeUrl;
        this.htmlCode.style.position = "absolute";
        this.htmlCode.style.display = "none";
        gameDiv.appendChild(this.htmlCode);
    }
    /**
     * 显示二维码
     */
    QRCode.prototype.showHtmlCode = function () {
        if (this.htmlCode) {
            this.htmlCode.style.display = "inline";
        }
    };
    /**隐藏二维码*/
    QRCode.prototype.hideHtmlCode = function () {
        if (this.htmlCode) {
            this.htmlCode.style.display = "none";
        }
    };
    /**
     * 设置二维码图片位置
     * @param xPos x坐标
     * @param yPos y坐标
     * @param width 宽度
     * @param height 高度
     */
    QRCode.prototype.setPosition = function (xPos, yPos, width, height) {
        if (this.htmlCode == null) {
            return;
        }
        //竖屏
        if (document.body.clientWidth < document.body.clientHeight) {
            var wScale = document.body.clientWidth / GameConst.stage.stageWidth;
            var hScale = document.body.clientHeight / GameConst.stage.stageHeight;
            this.htmlCode.style.width = width * wScale + "px";
            this.htmlCode.style.height = height * hScale + "px";
            this.htmlCode.style.left = xPos * wScale + "px";
            this.htmlCode.style.top = yPos * hScale + "px";
        }
        else {
            var wScale = document.body.clientWidth / GameConst.stage.stageHeight;
            var hScale = document.body.clientHeight / GameConst.stage.stageWidth;
            this.htmlCode.style.width = height * wScale + "px";
            this.htmlCode.style.height = width * hScale + "px";
            this.htmlCode.style.top = (GameConst.stage.stageWidth - xPos - width) * hScale + "px";
            this.htmlCode.style.left = yPos * wScale + "px";
        }
    };
    /**销毁*/
    QRCode.prototype.destroy = function () {
        if (this.htmlCode) {
            this.htmlCode.parentNode.removeChild(this.htmlCode);
            this.htmlCode = null;
        }
    };
    return QRCode;
}());
__reflect(QRCode.prototype, "QRCode");
