module wy {
    /**
     *舞台工具主类
     *
     *@version 0.0.1
     *@since 2017/4/21
     *
     */
  export  class StageMain extends SingleClass {
        /**
         *舞台工具类
         */
        public static get StageUtils(): StageUtils {
            return StageUtils.getInstance();
        }
    }
}