var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var wy;
(function (wy) {
    /**
     * Toast 提示工具
     *@example 使用方法如下
      *<pre>
      *     wy.Toast.setContent("xxx",y=?,isBottomIn=false);
      *     y:默认为900（设置提示框的Y坐标）
      *     isBottomIn:是否从下飞入显示（默认为false）
      *</pre>
      *
      *@version 0.0.2
      *@platform egret 3.0.3
      */
    var Toast = (function () {
        function Toast() {
        }
        /**
         *显示Toast提示框
         * @param conten 提示内容
         * @param _y 自定义显示y的值
         * @param pa 需要添加的位置 默认是wy.GameInterface
         * @param isBottomIn 是否需要从下飞入 默认是true
         */
        Toast.setContent = function (conten, _y, isBottomIn, pa) {
            if (_y === void 0) { _y = null; }
            if (isBottomIn === void 0) { isBottomIn = true; }
            if (pa === void 0) { pa = wy.GameInterface; }
            this.isChange = false;
            var tf = this.InstanceTf();
            tf.width = NaN;
            tf.text = conten;
            if (tf.width >= pa.stage.stageWidth - 100) {
                tf.width = pa.stage.stageWidth - 100;
            }
            // console.log("w " + tf.width);
            //当内容长度改变时
            if (tf.width != this.TF_WIDTH || tf.height != this.TF_HEIGHT) {
                this.isChange = true;
            }
            this.TF_WIDTH = tf.width + 60;
            this.TF_HEIGHT = tf.height + 40;
            tf.y = 20;
            var spr = this.InstanceSpr();
            spr.x = (pa.stage.stageWidth - spr.width) / 2;
            egret.Tween.removeTweens(spr);
            var y = pa.stage.stageHeight - 150;
            if (y + this.TF_HEIGHT + 40 >= pa.stage.stageHeight) {
                y -= 50;
            }
            if (_y) {
                isBottomIn = false;
                y = _y;
            }
            if (isBottomIn) {
                spr.y = pa.stage.stageHeight;
                egret.Tween.get(spr).to({ y: y }, 300);
            }
            egret.Tween.get(spr).to({ alpha: 1 }, 300).wait(2000).to({ alpha: 0 }, 300).call(function () {
                if (spr.parent) {
                    spr.parent.removeChild(spr);
                }
            });
            spr.y = y;
            pa.stage.addChild(spr);
            // wy.GameInterface.stage.addChild(spr);
        };
        /**
         *version 0.0.1
         *platform egret3.0.3
         */
        // private static InstanceSpr(): egret.Sprite {
        //     if (this._instanceSpr == null) {
        //         this._instanceSpr = new egret.Sprite();
        //         var matrix: egret.Matrix = new egret.Matrix();
        //         matrix.createGradientBox(this.TF_WIDTH, this.TF_HEIGHT);
        //         this._instanceSpr.graphics.beginGradientFill(egret.GradientType.LINEAR, [this.BG_COLOR, this.BG_COLOR, this.BG_COLOR], [0, 1, 0], [0, 127, 255], matrix);
        //         this._instanceSpr.graphics.drawRect(0, 0, this.TF_WIDTH, this.TF_HEIGHT);
        //         this._instanceSpr.graphics.endFill();
        //         this.toastText = new egret.TextField;
        //         this.toastText.size = this.FONT_SIZE;
        //         this.toastText.x = this.toastText.y = 0;
        //         this.toastText.width = this.TF_WIDTH;
        //         this.toastText.height = this.TF_HEIGHT;
        //         this.toastText.textAlign = "center";
        //         this.toastText.fontFamily = "微软雅黑";
        //         this.toastText.verticalAlign = egret.VerticalAlign.MIDDLE;
        //         this.toastText.textColor = this.TXT_COLOR;
        //         this._instanceSpr.addChild(this.toastText);
        //     }
        //     this._instanceSpr.alpha = 0;
        //     return this._instanceSpr;
        // }
        Toast.InstanceTf = function () {
            if (this.toastText == null) {
                this.toastText = new egret.TextField;
                this.toastText.size = this.FONT_SIZE;
                this.toastText.x = 30;
                this.toastText.textAlign = "center";
                this.toastText.fontFamily = "微软雅黑";
                this.toastText.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.toastText.textColor = this.TXT_COLOR;
                this.toastText.lineSpacing = 15;
            }
            return this.toastText;
        };
        Toast.InstanceSpr = function () {
            if (this._instanceSpr == null || this.isChange) {
                if (this._instanceSpr) {
                    if (this._instanceSpr.parent) {
                        this._instanceSpr.parent.removeChild(this._instanceSpr);
                    }
                }
                this._instanceSpr = new egret.Sprite();
                this._instanceSpr.graphics.beginFill(this.BG_COLOR, 1);
                this._instanceSpr.graphics.drawRoundRect(0, 0, this.TF_WIDTH, this.TF_HEIGHT, 20);
                this._instanceSpr.graphics.endFill();
                this._instanceSpr.addChild(this.toastText);
            }
            this._instanceSpr.alpha = 0;
            return this._instanceSpr;
        };
        return Toast;
    }());
    /**
     * 默认提示框背景颜色
     * @version 0.0.1
     * @platform egret3.0.3
     */
    Toast.BG_COLOR = 0x343434;
    /**
     *默认提示文字颜色
     *@version 0.0.1
     *@platform egret3.0.3
     */
    Toast.TXT_COLOR = 0xffffff;
    /**
     *默认提示文字大小
     *@version 0.0.1
     *@platform egret3.0.3
     */
    Toast.FONT_SIZE = 30;
    /**
     *文本长度是否改变
     *@version 0.0.1
     *@platform egret3.0.3
     */
    Toast.isChange = false;
    wy.Toast = Toast;
    __reflect(Toast.prototype, "wy.Toast");
})(wy || (wy = {}));
//# sourceMappingURL=Toast.js.map