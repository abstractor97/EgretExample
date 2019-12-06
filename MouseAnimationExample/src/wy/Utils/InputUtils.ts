module wy {
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
    export class InputUtils {

        /**
         * input容器
         * 
         * @version 0.0.5
	     * @platform egret3.0.2 
         */
        private static inputs: egret.TextField[];
        /**
         * input的默认提示，默认提示字的颜色，输入字的颜色
         * 
         * @version 0.0.5
	     * @platform egret3.0.2
         */
        private static inputDatas: any[];

        /**
         * 初始化
         * 
         * @version 0.0.5
	     * @platform egret3.0.2
         */
        public static init(): void {
            this.inputs = [];
            this.inputDatas = [];
            this.defaultColor = 0x96d3ff;
            this.inputColor = 0;
        }
        /**
         * 默认提示字的颜色
         * 
         * @version 0.0.5
	     * @platform egret3.0.2
         */
        public static defaultColor: number;
        /**
         * 输入字的颜色
         * 
         * @version 0.0.5
	     * @platform egret3.0.2
         */
        public static inputColor: number;

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
        public static register(input: egret.TextField, defaultStr: string, defaultColor?: number, inputColor?: number): void {
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

            let index = this.inputs.indexOf(input);
            if (index < 0) {
                this.inputs.push(input);
                input.text = defaultStr + '';
                input.textColor = defaultColor;
                this.inputDatas.push({ 'inputColor': inputColor, 'defaultColor': defaultColor, 'defaultStr': defaultStr });
                input.addEventListener(egret.TextEvent.FOCUS_IN, this.onFocusIn, this);
                input.addEventListener(egret.TextEvent.FOCUS_OUT, this.onFocusOut, this);
            }
        }

        /**
         * 取消input的提示同时取消监听
         * 
         * @param input 输入框
         * 
         * @version 0.0.5
	     * @platform egret3.0.2
         */
        public static unregister(input: egret.TextField): void {
            let index = this.inputs.indexOf(input);
            if (index >= 0) {
                this.inputs[index].addEventListener(egret.TextEvent.FOCUS_IN, this.onFocusIn, this);
                this.inputs[index].addEventListener(egret.TextEvent.FOCUS_OUT, this.onFocusOut, this);
                this.inputs.splice(index, 1);
                this.inputDatas.splice(index, 1);
            }
        }

        private static onFocusIn(e: egret.TextEvent): void {
            let input = <egret.TextField>e.currentTarget;
            if (input) {
                let index = this.inputs.indexOf(input);
                if (this.inputDatas[index] && input.textColor == this.inputDatas[index].defaultColor) {
                    input.text = '';
                    input.textColor = this.inputDatas[index].inputColor;
                }
            }
        }
        private static onFocusOut(e: egret.TextEvent): void {
            let input = <egret.TextField>e.currentTarget;
            if (input) {
                let index = this.inputs.indexOf(input);
                if (input.text == '' && this.inputDatas[index]) {
                    input.text = this.inputDatas[index].defaultStr + '';
                    input.textColor = this.inputDatas[index].defaultColor;
                }
            }
        }
    }
}