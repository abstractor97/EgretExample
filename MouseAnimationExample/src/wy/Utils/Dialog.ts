module wy {
    /**
     * Dialog 提示弹窗工具
     *@example 使用方法如下
     *<pre>
     *     wy.Dialog.show("xxx");
     *     或  wy.Dialog.show("xxx",this,callBackFunc);
     *     callBackFunc 为回调方法 
     *</pre>
     *
     *@version 0.0.2
     *@platform egret 3.0.3
     */
    export class Dialog extends egret.Sprite {
        constructor() {
            super();
            this.createOk();
        }

        private dialog: egret.Sprite;
        private dialog_btn_none: egret.Shape;
        private dialog_btn_select: egret.Shape;
        private line: egret.Shape;

        private content_text: egret.TextField;

        private callBackFunc: Function;
        private thisObj: any;

        private createOk() {
            this.graphics.beginFill(0x000000, 0.3);
            this.graphics.drawRect(0, 0, 640, 1036);
            this.graphics.endFill();

            this.touchEnabled = true;

            this.dialog = new egret.Sprite();
            this.dialog.graphics.beginFill(0xffffff, 1);
            this.dialog.graphics.drawRoundRect(0, 0, 400, 260, 50);
            this.dialog.graphics.endFill();
            this.addChild(this.dialog);

            this.dialog.anchorOffsetX = this.dialog.width >> 1;
            this.dialog.anchorOffsetY = this.dialog.height >> 1;
            this.dialog.x = (640 - this.dialog.width) / 2 + this.dialog.anchorOffsetX;
            this.dialog.y = (1036 - this.dialog.height) / 2 + this.dialog.anchorOffsetY;

            this.dialog_btn_none = new egret.Shape();
            this.dialog_btn_none.graphics.beginFill(0xffffff, 1);
            this.dialog_btn_none.graphics.drawRoundRect(0, 0, 400, 70, 50);
            this.dialog_btn_none.graphics.endFill();
            this.dialog_btn_none.y = 190;
            this.dialog.addChild(this.dialog_btn_none);

            this.dialog_btn_select = new egret.Shape();
            this.dialog_btn_select.graphics.beginFill(0xa8a5a5, 0.5);
            this.dialog_btn_select.graphics.drawRoundRect(0, 0, 400, 70, 50);
            this.dialog_btn_select.graphics.endFill();
            this.dialog_btn_select.y = 190;
            this.dialog.addChild(this.dialog_btn_select);
            this.dialog_btn_select.visible = false;

            this.line = new egret.Shape();
            this.line.graphics.lineStyle(1, 0x535353);
            this.line.graphics.moveTo(0, 190);
            this.line.graphics.lineTo(400, 190);
            this.dialog.addChild(this.line);


            var txt: egret.TextField = new egret.TextField();
            txt.x = 0;
            txt.y = 190;
            txt.textAlign = egret.HorizontalAlign.CENTER;
            txt.verticalAlign = egret.VerticalAlign.MIDDLE;
            txt.fontFamily = "微软雅黑";
            txt.width = 400;
            txt.height = 70;
            txt.textColor = 0x000000;
            txt.multiline = false;
            txt.size = 30;
            txt.text = "确定";

            this.dialog.addChild(txt);

            this.content_text = new egret.TextField();
            this.content_text.x = 20;
            this.content_text.y = 10;
            this.content_text.textAlign = egret.HorizontalAlign.CENTER;
            this.content_text.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.content_text.fontFamily = "微软雅黑";
            this.content_text.width = 360;
            this.content_text.height = 170;
            this.content_text.textColor = 0x000000;
            this.content_text.multiline = true;
            this.content_text.lineSpacing = 15;
            this.content_text.size = 25;

            this.dialog.addChild(this.content_text);

            this.dialog_btn_none.touchEnabled = true;
            this.dialog_btn_none.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.tap_begin, this);
            this.dialog_btn_none.addEventListener(egret.TouchEvent.TOUCH_END, this.tap_end, this);
            this.dialog_btn_none.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.tap_out, this);
        }
        /**
         *
         *
         *@version 0.0.2
         *@platform egret 3.0.3
         */
        private show_dialog(content: string, obj: any, thisObj?: any, callBackFunc?: any) {
            this.dialog_btn_none.touchEnabled = true;
            this.content_text.text = content;
            obj.addChild(this);

            this.callBackFunc = callBackFunc;
            this.thisObj = thisObj;
        }
        /**
         *@private
         *
         *@version 0.0.2
         *@platform egret 3.0.3
         */
        private tap_begin() {
            this.dialog_btn_select.visible = true;
        }
        /**
         *@private
         *
         *@version 0.0.2
         *@platform egret 3.0.3
         */
        private tap_out() {
            this.dialog_btn_select.visible = false;
        }
        /**
         *@private
         *
         *@version 0.0.2
         *@platform egret 3.0.3
         */
        private tap_end() {
            this.dialog_btn_none.touchEnabled = false;
            this.dialog_btn_select.visible = false;

            if (this) {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            }
            if (this.thisObj) {
                if (this.callBackFunc) {
                    this.callBackFunc.call(this.thisObj);
                }
            }
        }

        private static dialog: Dialog = new Dialog();
        /**
         *设置要提示的内容
         *
         *@param content 要提示的内容
         *@param thisObj 传this
         *@param callBackFunc 回调的方法
         *@param obj 需要添加的位置 默认是wy.GameInterface.stage
         *
         *
         *@version 0.0.2
         *@platform egret 3.0.3
         */
        public static show(content: string, thisObj?: any, callBackFunc?: any, obj: any = wy.GameInterface.stage) {
            this.dialog.show_dialog(content, obj, thisObj, callBackFunc);
        }
    }
}