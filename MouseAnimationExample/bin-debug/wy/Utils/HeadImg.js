var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wy;
(function (wy) {
    /**
     * 头像图片显示类
     * 可以设置显示圆形或者正方形
     *
     * @example
     * <pre>
     *     var img:wy.HeadImg = new wy.HeadImg();//构造函数可以传入半径，如果不是圆形，那传入的值则是正方形边长的一半
     *     img.source = 'http://wx.qlogo.cn/mmopen/JUvAvnJSpXADD7HxXhh8866bbibVAkabWP41MqsRZlUm1oePib2vVIhKbu4WWicGEPDKh4nbyGSuSjgMcJ756ANEHS023qPwmH5/132';
     *     img.x = wy.GameInterface.stage.stageWidth>>1;
     *     img.y = wy.GameInterface.stage.stageHeight>>1;
     *     this.addChild(img);
     * </pre>
     *
     * @version 0.0.3
     * @platform egret3.0.3
     *
     */
    var HeadImg = (function (_super) {
        __extends(HeadImg, _super);
        function HeadImg(radius, isCircle) {
            if (isCircle === void 0) { isCircle = true; }
            var _this = _super.call(this) || this;
            var rad;
            if (radius) {
                rad = radius;
            }
            else {
                rad = HeadImg.RADIUS;
            }
            _this.bmp = new egret.Bitmap();
            _this.addChild(_this.bmp);
            _this.bmp.width = _this.bmp.height = rad * 2;
            _this.bmp.x = _this.bmp.y = -rad;
            _this.imgLoad = new egret.ImageLoader();
            _this.imgLoad.crossOrigin = "anonymous";
            if (isCircle) {
                _this.shpMask = new egret.Shape();
                _this.shpMask.graphics.beginFill(0xffffff, 1);
                _this.shpMask.graphics.drawCircle(0, 0, rad);
                _this.shpMask.graphics.endFill();
                _this.addChild(_this.shpMask);
                _this.bmp.mask = _this.shpMask;
            }
            return _this;
        }
        Object.defineProperty(HeadImg.prototype, "source", {
            /**
             * 获取图片地址
             *
             * @version 0.0.3
             * @platform egret3.0.3
             */
            get: function () {
                return this._source;
            },
            /**
             * set 设置图片地址 并加载显示
             *
             * @version 0.0.3
             * @platform egret3.0.3
             */
            set: function (value) {
                this._source = value;
                // RES.getResByUrl(value, this.compFunc, this, RES.ResourceItem.TYPE_IMAGE);
                this.imgLoad.addEventListener(egret.Event.COMPLETE, this.compFunc, this);
                this.imgLoad.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioError, this);
                this.imgLoad.load(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * 图片加载完成
         *
         * @param texture
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        HeadImg.prototype.compFunc = function (e) {
            if (this.bmp) {
                var texture = new egret.Texture();
                texture._setBitmapData(e.currentTarget.data);
                this.bmp.texture = texture;
            }
        };
        HeadImg.prototype.ioError = function (e) {
            console.warn("HeadImg source load fail");
        };
        Object.defineProperty(HeadImg.prototype, "texture", {
            /**
             * 获取图片纹理
             *
             * @version 0.0.3
             * @platform egret3.0.3
             */
            get: function () {
                if (this.bmp) {
                    return this.bmp.texture;
                }
                return null;
            },
            /**
             * 设置图片纹理
             *
             * @version 0.0.3
             * @platform egret3.0.3
             */
            set: function (texure) {
                if (this.bmp) {
                    this.bmp.texture = texure;
                }
            },
            enumerable: true,
            configurable: true
        });
        return HeadImg;
    }(egret.DisplayObjectContainer));
    /**
     * 通用半径 默认50
     *
     * @version 0.0.3
     * @platform egret3.0.3
     */
    HeadImg.RADIUS = 50;
    wy.HeadImg = HeadImg;
    __reflect(HeadImg.prototype, "wy.HeadImg");
})(wy || (wy = {}));
//# sourceMappingURL=HeadImg.js.map