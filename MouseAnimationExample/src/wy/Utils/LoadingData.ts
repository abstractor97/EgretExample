module wy {

    /**
     * LoadingData 后台交互数据获取等待Loading
     *
     *@example 使用方法如下
     *<pre>
     *        样式
     *        wy.LoadingData.STYLE:number  (1 - 6 )  默认为6
     *        wy.LoadingData.BG_ALPHA:number (0 - 1) 默认为0
     *        显示
     *        wy.LoadingData.open();
     *
     *        关闭  
     *        wy.LoadingData.close();
     *</pre>
     *
     *@version 0.0.2
     *@platform egret 3.0.3
     */
    export class LoadingData extends egret.DisplayObjectContainer {
        constructor() {
            super();
        }

        private dialog: egret.Sprite;
        private shape_sprite: egret.Sprite;
        private bg: egret.Shape;
        public static STYLE: number = 6;
        public static BG_ALPHA: number = 0;
        public createOk(isVertical: boolean) {
            this.bg = new egret.Shape();
            this.bg.graphics.beginFill(0x000000, wy.LoadingData.BG_ALPHA);
            if (isVertical) {
                if (wy.LoadingData.STYLE < 3) {
                    var x = (640 - 300) >> 1;
                    var y = (1036 - 200) >> 1;
                } else {
                    var x = (640 - 100) >> 1;
                    var y = (1036 - 100) >> 1;
                }

                this.bg.graphics.drawRect(0, 0, 640, 1036);
            } else {
                if (wy.LoadingData.STYLE < 3) {
                    var x = (1036 - 200) >> 1;
                    var y = (640 - 300) >> 1;
                } else {
                    var x = (1036 - 100) >> 1;
                    var y = (640 - 100) >> 1;
                }

                this.bg.graphics.drawRect(0, 0, 1036, 640);
            }
            this.bg.graphics.endFill();
            this.addChild(this.bg);
            this.bg.touchEnabled = true;



            if (wy.LoadingData.STYLE < 3) {

                this.dialog = new egret.Sprite();
                this.dialog.graphics.beginFill(0x1E1E1E, 0);
                this.dialog.graphics.drawRoundRect(0, 0, 300, 200, 25);
                this.dialog.graphics.endFill();
                this.addChild(this.dialog);
                // var x = (640 - 300) >> 1;
                // var y = (1036 - 200) >> 1;
                this.dialog.x = x;
                this.dialog.y = y;

                this.shape_sprite = new egret.Sprite();
                this.shape_sprite.graphics.beginFill(0xff0000, 0);
                this.shape_sprite.graphics.drawRect(0, 0, 140, 140);
                this.shape_sprite.graphics.endFill();
                this.dialog.addChild(this.shape_sprite);
                this.shape_sprite.anchorOffsetX = this.shape_sprite.width >> 1;
                this.shape_sprite.anchorOffsetY = this.shape_sprite.height >> 1;
                this.shape_sprite.x = 83 + this.shape_sprite.anchorOffsetX;
                this.shape_sprite.y = 35 + this.shape_sprite.anchorOffsetY;
            } else {

                this.dialog = new egret.Sprite();
                this.dialog.graphics.beginFill(0x1E1E1E, 0.5);
                this.dialog.graphics.drawRoundRect(0, 0, 100, 100, 25);
                this.dialog.graphics.endFill();
                this.addChild(this.dialog);
                // var x = (640 - 300) >> 1;
                // var y = (1036 - 200) >> 1;
                this.dialog.x = x;
                this.dialog.y = y;

                this.shape_sprite = new egret.Sprite();
                this.shape_sprite.graphics.beginFill(0xff0000, 0);
                this.shape_sprite.graphics.drawRect(0, 0, 70, 70);
                this.shape_sprite.graphics.endFill();
                this.dialog.addChild(this.shape_sprite);
                this.shape_sprite.anchorOffsetX = this.shape_sprite.width >> 1;
                this.shape_sprite.anchorOffsetY = this.shape_sprite.height >> 1;
                this.shape_sprite.x = 15 + this.shape_sprite.anchorOffsetX;
                this.shape_sprite.y = 15 + this.shape_sprite.anchorOffsetY;
            }

            switch (wy.LoadingData.STYLE) {
                case 1:
                    this.style1();
                    break;
                case 2:
                    this.style2();
                    break;
                case 3:
                    this.style3();
                    break;
                case 4:
                    this.style4();
                    break;
                case 5:
                    this.style5();
                    break;
                case 6:
                    this.style6();
                    break;
                default:
                    break;
            }


        }

        /**
        *@private
        *
        *@version 0.0.2
        *@platform egret 3.0.3
        */
        private style1() {
            var temp: number = 70;
            var loading1: egret.Shape;
            loading1 = new egret.Shape();
            loading1.graphics.lineStyle(3, 0xffffff, 1);
            loading1.graphics.drawCircle(temp, temp, temp);
            loading1.graphics.endFill();
            this.shape_sprite.addChild(loading1);

            var loading2: egret.Shape;
            loading2 = new egret.Shape();
            loading2.graphics.beginFill(0xffffff);
            loading2.graphics.drawCircle(28, 15, 7);
            loading2.graphics.endFill();
            this.shape_sprite.addChild(loading2);

            egret.Tween.get(this.shape_sprite, { loop: true }).to({ rotation: 360 }, 2000, egret.Ease.cubicOut);

        }

        /**
        *@private
        *
        *@version 0.0.2
        *@platform egret 3.0.3
        */
        private style2() {
            var loading1: egret.Shape;
            var loading2: egret.Shape;
            var loading3: egret.Shape;
            var loading4: egret.Shape;

            loading1 = new egret.Shape();
            loading1.graphics.beginFill(0xffffff);
            loading1.graphics.drawCircle(120, 72, 10);
            loading1.graphics.endFill();
            this.shape_sprite.addChild(loading1);

            loading2 = new egret.Shape();
            loading2.graphics.beginFill(0xffffff, 0.8);
            loading2.graphics.drawCircle(99, 18, 8);
            loading2.graphics.endFill();
            this.shape_sprite.addChild(loading2);

            loading3 = new egret.Shape();
            loading3.graphics.beginFill(0xffffff, 0.6);
            loading3.graphics.drawCircle(35.5, 18.5, 6);
            loading3.graphics.endFill();
            this.shape_sprite.addChild(loading3);

            loading4 = new egret.Shape();
            loading4.graphics.beginFill(0xffffff, 0.4);
            loading4.graphics.drawCircle(10, 71, 4);
            loading4.graphics.endFill();
            this.shape_sprite.addChild(loading4);

            egret.Tween.get(this.shape_sprite, { loop: true }).to({ rotation: 360 }, 1000);
        }

        /**
        *@private
        *
        *@version 0.0.2
        *@platform egret 3.0.3
        */
        private style3() {
            var loading1: egret.Shape;
            var loading2: egret.Shape;
            var loading3: egret.Shape;
            var loading4: egret.Shape;

            loading1 = new egret.Shape();
            loading1.graphics.beginFill(0xffffff);
            loading1.graphics.drawCircle(35, 60, 10);
            loading1.graphics.endFill();
            this.shape_sprite.addChild(loading1);

            loading2 = new egret.Shape();
            loading2.graphics.beginFill(0xffffff);
            loading2.graphics.drawCircle(10, 35, 10);
            loading2.graphics.endFill();
            this.shape_sprite.addChild(loading2);

            loading3 = new egret.Shape();
            loading3.graphics.beginFill(0xffffff);
            loading3.graphics.drawCircle(35, 10, 10);
            loading3.graphics.endFill();
            this.shape_sprite.addChild(loading3);

            loading4 = new egret.Shape();
            loading4.graphics.beginFill(0xffffff);
            loading4.graphics.drawCircle(60, 35, 10);
            loading4.graphics.endFill();
            this.shape_sprite.addChild(loading4);

            egret.Tween.get(this.shape_sprite, { loop: true }).to({ scaleX: 0.5, scaleY: 0.5 }, 800).to({ scaleX: 1, scaleY: 1 }, 800);
            egret.Tween.get(this.shape_sprite, { loop: true }).to({ rotation: 360 }, 1600);
        }

        /**
        *@private
        *
        *@version 0.0.2
        *@platform egret 3.0.3
        */
        private style4() {
            var loading1: egret.Shape;
            var loading2: egret.Shape;
            var loading3: egret.Shape;
            var loading4: egret.Shape;

            loading1 = new egret.Shape();
            loading1.graphics.beginFill(0xffffff);
            loading1.graphics.drawCircle(0, 0, 10);
            loading1.graphics.endFill();
            this.shape_sprite.addChild(loading1);

            loading2 = new egret.Shape();
            loading2.graphics.beginFill(0xffffff);
            loading2.graphics.drawCircle(0, 0, 10);
            loading2.graphics.endFill();
            this.shape_sprite.addChild(loading2);

            loading3 = new egret.Shape();
            loading3.graphics.beginFill(0xffffff);
            loading3.graphics.drawCircle(0, 0, 10);
            loading3.graphics.endFill();
            this.shape_sprite.addChild(loading3);

            loading4 = new egret.Shape();
            loading4.graphics.beginFill(0xffffff);
            loading4.graphics.drawCircle(0, 0, 10);
            loading4.graphics.endFill();
            this.shape_sprite.addChild(loading4);

            loading1.x = loading2.x = loading3.x = loading4.x = 35;
            loading1.y = loading2.y = loading3.y = loading4.y = 35;

            egret.Tween.get(loading1, { loop: true }).to({ x: 35, y: 60 }, 1000).wait(1000).to({ x: 35, y: 35 }, 1000).wait(500);
            egret.Tween.get(loading2, { loop: true }).to({ x: 10, y: 35 }, 1000).wait(1000).to({ x: 35, y: 35 }, 1000).wait(500);
            egret.Tween.get(loading3, { loop: true }).to({ x: 35, y: 10 }, 1000).wait(1000).to({ x: 35, y: 35 }, 1000).wait(500);
            egret.Tween.get(loading4, { loop: true }).to({ x: 60, y: 35 }, 1000).wait(1000).to({ x: 35, y: 35 }, 1000).wait(500);
            egret.Tween.get(this.shape_sprite, { loop: true }).to({ rotation: 360 }, 1600);
        }

        /**
        *@private
        *
        *@version 0.0.2
        *@platform egret 3.0.3
        */
        private style5() {
            var loading1: egret.Shape;
            var loading2: egret.Shape;
            var loading3: egret.Shape;
            var loading4: egret.Shape;

            loading1 = new egret.Shape();
            loading1.graphics.beginFill(0xffffff);
            loading1.graphics.drawCircle(0, 0, 10);
            loading1.graphics.endFill();
            this.shape_sprite.addChild(loading1);

            loading2 = new egret.Shape();
            loading2.graphics.beginFill(0xffffff);
            loading2.graphics.drawCircle(0, 0, 10);
            loading2.graphics.endFill();
            this.shape_sprite.addChild(loading2);

            loading3 = new egret.Shape();
            loading3.graphics.beginFill(0xffffff);
            loading3.graphics.drawCircle(0, 0, 10);
            loading3.graphics.endFill();
            this.shape_sprite.addChild(loading3);

            loading4 = new egret.Shape();
            loading4.graphics.beginFill(0xffffff);
            loading4.graphics.drawCircle(0, 0, 10);
            loading4.graphics.endFill();
            this.shape_sprite.addChild(loading4);

            loading1.x = loading2.x = loading3.x = loading4.x = 35;
            loading1.y = loading2.y = loading3.y = loading4.y = 35;
            // loading1.alpha = loading2.alpha = loading3.alpha = loading4.alpha = 0;

            var Tween1 = () => {
                loading1.alpha = loading2.alpha = loading3.alpha = loading4.alpha = 0;
                loading1.alpha = 1;
                egret.Tween.get(loading1).to({ x: 35, y: 60 }, 600).wait(500).call(() => {
                    loading2.alpha = 1;
                    egret.Tween.get(loading2).to({ x: 10, y: 35 }, 600).wait(500).call(() => {
                        loading3.alpha = 1;
                        egret.Tween.get(loading3).to({ x: 35, y: 10 }, 600).wait(500).call(() => {
                            loading4.alpha = 1;
                            egret.Tween.get(loading4).to({ x: 60, y: 35 }, 600).wait(1000).call(Tween2, this);
                        }, this);
                    }, this);
                }, this);
            }

            var Tween2 = () => {
                egret.Tween.get(loading1).to({ x: 35, y: 35 }, 600).wait(500).call(() => {
                    egret.Tween.get(loading2).to({ x: 35, y: 35 }, 600).wait(500).call(() => {
                        egret.Tween.get(loading3).to({ x: 35, y: 35 }, 600).wait(500).call(() => {
                            egret.Tween.get(loading4).to({ x: 35, y: 35 }, 600).wait(600).call(Tween1, this);
                        }, this);
                    }, this);
                }, this);
            }

            Tween1();

            egret.Tween.get(this.shape_sprite, { loop: true }).to({ rotation: 360 }, 1600);
        }

         /**
       *@private
       *
       *@version 0.0.2
       *@platform egret 3.0.3
       */
        private style6() {
            var loading1: egret.Shape;
            var loading2: egret.Shape;

            loading1 = new egret.Shape();
            loading1.graphics.beginFill(0xffffff);
            loading1.graphics.drawCircle(0, 0, 14);
            loading1.graphics.endFill();
            this.dialog.addChild(loading1);

            loading2 = new egret.Shape();
            loading2.graphics.beginFill(0xffffff);
            loading2.graphics.drawCircle(0, 0, 14);
            loading2.graphics.endFill();
            this.dialog.addChild(loading2);

            wy.Tools.center(loading1);
            wy.Tools.center(loading2);

            var x1, x2, y1, y2, tmpx;

            x1 = (this.dialog.width / 2 - loading1.width) * 0.5 + 28;
            loading1.x = x1;


            x2 = this.dialog.width / 2 + (this.dialog.width - loading1.width) * 0.5 - 14;
            loading2.x = x2;

            y1 = y2 = (this.dialog.height - loading1.height) * 0.5 + loading1.anchorOffsetY + 5;
            loading1.y = y1;
            loading2.y = y2;

            tmpx = x1 + (x2 - x1) * 0.5;

            var tweenTime: number = 400;

            egret.Tween.get(loading1, { loop: true }).to({ x: tmpx, scaleX: 1.1, scaleY: 1.1 }, tweenTime).to({ x: x2, scaleX: 1, scaleY: 1 }, tweenTime)
                .to({ x: tmpx, scaleX: 0.9, scaleY: 0.9, alpha: 0.6 }, tweenTime).to({ x: x1, scaleX: 1, scaleY: 1, alpha: 1 }, tweenTime);
            egret.Tween.get(loading2, { loop: true }).to({ x: tmpx, scaleX: 0.9, scaleY: 0.9, alpha: 0.6 }, tweenTime).to({ x: x1, scaleX: 1, scaleY: 1, alpha: 1 }, tweenTime)
                .to({ x: tmpx, scaleX: 1.1, scaleY: 1.1 }, tweenTime).to({ x: x2, scaleX: 1, scaleY: 1 }, tweenTime);

        }

        /**
        *@private
        *
        *@version 0.0.2
        *@platform egret 3.0.3
        */
        private open_loading(isVertical: boolean, obj: any) {
            this.createOk(isVertical);
            obj.addChild(this);
        }
        /**
        *@private
        *
        *@version 0.0.2
        *@platform egret 3.0.3
        */
        private close_loading() {
            if (this) {
                if (this.parent) {
                    this.removeChildren();
                    this.parent.removeChild(this);
                }
            }
        }

        private static loadingData: LoadingData = new LoadingData();
        /**
         *显示Loading界面
         * @param isVertical 是否为竖屏  默认为true
         * @param obj 需要添加的位置  默认为wy.GameInterface.stage
         *
         *@version 0.0.2
         *@platform egret 3.0.3
         */
        public static open(isVertical: boolean = true, obj: any = wy.GameInterface.stage) {
            this.loadingData.open_loading(isVertical, obj);
        }

        /**
         *关闭Loading界面
         *
         *
         *@version 0.0.2
         *@platform egret 3.0.3
         */
        public static close() {
            this.loadingData.close_loading();
        }
    }



    /**
     *  
    //  */
    // class Loading_Data {
    //     constructor() {
    //     }

    //     public static loading: LoadingData = new LoadingData();


    //     public static open_loading(obj: any) {
    //         this.loading.open_loading(obj);
    //     }

    //     public static close_loading() {
    //         this.loading.close_loading();
    //     }
    // }
}