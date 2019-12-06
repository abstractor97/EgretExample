module wy {
    /**
     * 正则验证方法类
	 * 
	 * @version 0.0.4
	 * @platform egret3.0.2 
     */
	export class RegUtils {

		/**
		 * 检查输入手机号码是否正确
		 * 
		 * @param strMobile 手机号码字符串
		 * @return 如果通过验证返回true,否则返回false 
		 * 
		 * @version 0.0.4
	 	 * @platform egret3.0.2
		 */
		public static checkMobile(strMobile): boolean {
			var regu = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
			if (regu.test(strMobile)) {
				return true;
			}
			else {
				return false;
			}
		}
	}
}