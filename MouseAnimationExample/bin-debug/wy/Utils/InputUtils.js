var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     * 输入框提示控制类
     *
     * @example
     * <pre>
     *      wy.InputUtils.register(input,'默认提示');
     * </pre>
     *
     * @version 0.0.5
     * @platform egret3.0.2
     */
    var InputUtils = (function () {
        function InputUtils() {
        }
        /**
         * 初始化
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        InputUtils.init = function () {
            this.inputs = [];
            this.inputDatas = [];
            this.defaultColor = 0x96d3ff;
            this.inputColor = 0;
        };
        /**
         * 注册添加提示输入框
         *
         * @param input 输入框
         * @param defaultStr 输入框为空时 提示字
         * @param defaultColor? 提示字的颜色
         * @param inputColor? 输入框的字的颜色
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        InputUtils.register = function (input, defaultStr, defaultColor, inputColor) {
            if (input.type != egret.TextFieldType.INPUT) {
                console.log('input type is not input');
                return;
            }
            if (!defaultColor) {
                defaultColor = this.defaultColor;
            }
            if (!inputColor) {
                inputColor = this.inputColor;
            }
            var index = this.inputs.indexOf(input);
            if (index < 0) {
                this.inputs.push(input);
                input.text = defaultStr + '';
                input.textColor = defaultColor;
                this.inputDatas.push({ 'inputColor': inputColor, 'defaultColor': defaultColor, 'defaultStr': defaultStr });
                input.addEventListener(egret.TextEvent.FOCUS_IN, this.onFocusIn, this);
                input.addEventListener(egret.TextEvent.FOCUS_OUT, this.onFocusOut, this);
            }
        };
        /**
         * 取消input的提示同时取消监听
         *
         * @param input 输入框
         *
         * @version 0.0.5
         * @platform egret3.0.2
         */
        InputUtils.unregister = function (input) {
            var index = this.inputs.indexOf(input);
            if (index >= 0) {
                this.inputs[index].addEventListener(egret.TextEvent.FOCUS_IN, this.onFocusIn, this);
                this.inputs[index].addEventListener(egret.TextEvent.FOCUS_OUT, this.onFocusOut, this);
                this.inputs.splice(index, 1);
                this.inputDatas.splice(index, 1);
            }
        };
        InputUtils.onFocusIn = function (e) {
            var input = e.currentTarget;
            if (input) {
                var index = this.inputs.indexOf(input);
                if (this.inputDatas[index] && input.textColor == this.inputDatas[index].defaultColor) {
                    input.text = '';
                    input.textColor = this.inputDatas[index].inputColor;
                }
            }
        };
        InputUtils.onFocusOut = function (e) {
            var input = e.currentTarget;
            if (input) {
                var index = this.inputs.indexOf(input);
                if (input.text == '' && this.inputDatas[index]) {
                    input.text = this.inputDatas[index].defaultStr + '';
                    input.textColor = this.inputDatas[index].defaultColor;
                }
            }
        };
        return InputUtils;
    }());
    wy.InputUtils = InputUtils;
    __reflect(InputUtils.prototype, "wy.InputUtils");
})(wy || (wy = {}));
//# sourceMappingURL=InputUtils.js.map