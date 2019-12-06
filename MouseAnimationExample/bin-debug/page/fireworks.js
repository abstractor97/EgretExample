var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 *@author
 *
 */
var fireworks = (function (_super) {
    __extends(fireworks, _super);
    function fireworks() {
        return _super.call(this) || this;
    }
    fireworks.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    fireworks.prototype.show = function (data) {
        _super.prototype.show.call(this, data);
        var bg = wy.Tools.createSprBtn(0, 0, 640, 1236, 0xffffff, 1);
        this.addChild(bg);
        var imageLoader = new egret.ImageLoader();
        imageLoader.load("./resource/assets/build.png");
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loaderComplete, this);
        // wy.Tween.do(this);
    };
    fireworks.prototype.loaderComplete = function (e) {
        var imageLoader = e.currentTarget;
        var imageData = imageLoader.data;
        var texture = new egret.Texture();
        texture._setBitmapData(imageData);
        var image = new egret.Bitmap(texture);
        this.addChild(image);
        console.log(imageData);
        console.log(imageData.width);
        console.log(imageData.height);
        var s_w = 10; // 像素点的大小;
        var s_h = 10; // 像素点的大小;
        var rows = Math.ceil(imageData.width / s_w); // 行数
        var cols = Math.ceil(imageData.height / s_h); // 列数
        var len = rows * cols; // 总数量
        var pos = 0; //当前位置
        var par_x = 0, par_y = 0; // 粒子所在位置
        var textureArr = [];
        console.log(rows, cols);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                par_x = j * s_w;
                par_y = i * s_h;
                var rect = new egret.Rectangle(par_x, par_y, s_w, s_h);
                var texture_1 = new egret.RenderTexture();
                texture_1.drawToTexture(image, rect);
                // textureArr.push({ _x: par_x, _y: par_y, _texture: texture });
                var bitmap = new egret.Bitmap(texture_1);
                this.addChild(bitmap);
                bitmap.width = s_w;
                bitmap.height = s_h;
                bitmap.x = par_x;
                bitmap.y = par_y;
                pos++;
            }
        }
        console.log(pos);
        // console.log(textureArr);
        wy.Tools.removeFromParent(image);
        // for (){
        // }
    };
    fireworks.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    fireworks.prototype.onTouchTap = function (e) {
        switch (e.currentTarget) {
            default:
                break;
        }
    };
    return fireworks;
}(fireworksUI));
__reflect(fireworks.prototype, "fireworks");
//# sourceMappingURL=fireworks.js.map