var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     * 从相册选图
     *
     * @example
     * 非微信方式
     * <pre>
     *      wy.UploadImg.upload(this.compFunc,this);
     * </pre>
     * 微信选图
     * <pre>
     *      wy.UploadImg.upload(this.compFunc,this,1);
     * </pre>
     * 默认非微信方式
     *
     * @version 0.0.3
     * @platform egret3.0.3
     */
    var UploadImg = (function () {
        function UploadImg() {
        }
        /**
         * 加载图片
         * @param compFunc 加载完成图片回调
         * @param thisObj 回调this
         * @param type 加载方式 0是非微信选图 selectImage  1是微信选图 selectImageWX
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        UploadImg.upload = function (compFunc, thisObj, type) {
            if (type === void 0) { type = 0; }
            this.func = compFunc;
            this.thisObj = thisObj;
            if (type == 0) {
                selectImage(this.selectHandler, this);
            }
            else {
                selectImageWX(this.selectHandler, this);
            }
        };
        /**
         * @private
         *
         * 获取到了选择的图片的地址 通过getResByUrl去获取图片纹理
         *
         * @param thisRef
         * @param imgURL
         * @param file
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        UploadImg.selectHandler = function (thisRef, imgURL, file) {
            RES.getResByUrl(imgURL, thisRef.compFunc, thisRef, RES.ResourceItem.TYPE_IMAGE);
        };
        /**
         * @private
         *
         * @param texture 选择的图片的纹理数据
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        UploadImg.compFunc = function (texture) {
            if (this.thisObj) {
                if (this.func) {
                    this.func.call(this.thisObj, texture);
                }
            }
            else {
                if (this.func) {
                    this.func(texture);
                }
            }
        };
        return UploadImg;
    }());
    wy.UploadImg = UploadImg;
    __reflect(UploadImg.prototype, "wy.UploadImg");
})(wy || (wy = {}));
//# sourceMappingURL=UploadImg.js.map