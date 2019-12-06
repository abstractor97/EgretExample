
module wy {
    /**
     *页面切换效果索引string
     *
     * @version 0.0.1
	 * @platform egret3.0.2
     */
    export class PopType {
        /** 
         * 左边飞入
         * @version 0.0.1
	 	 * @platform egret3.0.2 
         */
        public static LEFTIN:string = "wy.PageLeftIn";

        /** 
         * 右边飞入 
         * @version 0.0.1
	 	 * @platform egret3.0.2
         */
        public static RIGHTIN:string = "wy.PageRightIn";

        /** 
         * 从上飞入 
         * @version 0.0.1
	 	 * @platform egret3.0.2
         **/
        public static TOPIN:string = "wy.PageTopIn";

        /** 
         * 从下飞入 
         * @version 0.0.1
	 	 * @platform egret3.0.2
         **/
        public static BOTTOMIN:string = "wy.PageBottomIn";

        /** 
         * 淡入 
         * @version 0.0.1
	 	 * @platform egret3.0.2
         */
        public static ALPHAIN:string = "wy.PageAlphaIn";

        /** 弹出来 **/
        public static EJECTIN = "wy.PageScaleIn";

        // /** 砸下去 **/
        // public static DOWNIN = "downin";




        /** 
         * 左边飞出 
         * @version 0.0.1
	 	 * @platform egret3.0.2
         */
        public static LEFTOUT:string = "wy.PageLeftOut";

        /** 
         * 右边飞出 
         * @version 0.0.1
	 	 * @platform egret3.0.2
         */
        public static RIGHTOUT:string = "wy.PageRightOut";

        /** 
         * 从上飞出 
         * @version 0.0.1
	 	 * @platform egret3.0.2
         */
        public static TOPOUT:string = "wy.PageTopOut";

        /** 
         * 从下飞出 
         * @version 0.0.1
	 	 * @platform egret3.0.2
         */
        public static BOTTOMOUT:string = "wy.PageBottomOut";

        /** 
         * 淡出 
         * @version 0.0.1
	 	 * @platform egret3.0.2
         */
        public static ALPHAOUT:string = "wy.PageAlphaOut";

        /** 缩回去 **/
        public static EJECTOUT = "wy.PageScaleOut";

        // /** 放大消失 **/
        // public static DOWNOUT = "downout";

        public constructor() {
        }
    }
}
