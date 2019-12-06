module wy {
    /**
     * 通用数据类
	 * 
	 * 用户openid 用户头像地址 用户昵称 用户性别 用户城市 用户国籍 
	 * 
	 * @example 
	 * 
	 * <pre>
	 *     wy.Data.openid
	 *     wy.Data.share('title','xxxxx',-1);//分享朋友和分享朋友圈都设置
	 *     wy.Data.share('title','xxxxx',0);//只设置分享朋友
	 *     wy.Data.share('title','xxxxx',1);//只设置分享朋友圈
	 * </pre>
	 * 
	 * @version 0.0.3
	 * @platform egret3.0.3
	 * 
     */
	export class Data {
		public constructor() {
		}

		/**
		 * 游戏版本号
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static VERSION: string = "";

		/**
		 * 游戏链接地址
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static URL: string = '';
		/**
		 * 用户openid
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static openid: string;
		/**
		 * 用户头像地址
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static headimgurl: string;
		/**
		 * 用户昵称
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static nickname: string;
		/**
		 * 用户性别
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static sex: string;
		/**
		 * 用户所在城市
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static city: string;
		/**
		 * 用户国籍
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static country: string;
		/**
		 * 分享过来的openid
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static shareid: string;

		/**
		 * 数据初始化，获取当前用户信息存储起来
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static init(): void {
			wy.Data.URL = window['gameUrl'];
			wy.Data.VERSION = window['gameVersion'];

			this.openid = this.getItemByName('openid');
			this.headimgurl = this.getItemByName('imgURL');
			this.nickname = this.getItemByName('name');
			this.sex = this.getItemByName('sex');
			this.city = this.getItemByName('city');
			this.country = this.getItemByName('country');
			this.shareid = this.getItemByName('shareid');

			this.delCookie('shareid');
			this.delCookie('openid');
		}

		/**
		 * 设置分享数据
		 * 
		 * @param key 要设置的字段名 title  desc  link imgUrl 
		 * @param value 要设置的值
		 * @param type -1小于0 朋友圈和朋友都设置  0 只设置朋友  1只设置朋友圈
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static share(key: string, value: string, type: number = -1): void {
			if (type < 0) {
				window['sharedata'][key] = value;
				window['timelinedata'][key] = value;
				window['wx'].onMenuShareAppMessage(window['sharedata']);
				window['wx'].onMenuShareTimeline(window['timelinedata']);
			} else if (type == 0) {
				window['sharedata'][key] = value;
				window['wx'].onMenuShareAppMessage(window['sharedata']);
			} else if (type == 1) {
				window['timelinedata'][key] = value;
				window['wx'].onMenuShareTimeline(window['timelinedata']);
			}
		}

		/**
		 * 获取指定字段存储起来的值 会按egret.localStorage window.localStorage cookie顺序里去拿拿到即返回
		 * 如果还没拿到 则可能不是weixin.php过来的，那么就会通过getQueryString去链接地址的尾部去获取
		 * @param item 要拿值的字段
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static getItemByName(item: string): any {
			var ans;
			ans = decodeURIComponent(decodeURIComponent(this.getCookie(item)));
			if (!ans) {
				ans = window.localStorage.getItem(item);
				if (!ans) {
					ans = egret.localStorage.getItem(item);
				}
			}
			return ans;
		}

		/**
		 * 删除指定字段存储起来的值
		 * 
		 * @param item 要删除的字段名
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static delItemByName(item: string): void {
			egret.localStorage.removeItem(item);
			window.localStorage.removeItem(item);
			this.delCookie(item);
		}

		/**
		 *获取url后面带的参数
		 *
		 * @param name 要获取值的字段
		 *
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static getUrlParameter(name: string) {
			var value = decodeURI(decodeURI(egret.getOption(name)));
			return value;
		}

		/**
		 * 获取cookie值
		 * 
		 * @param name 要获取值的字段
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static getCookie(name): any {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg))
				return arr[2];
			else
				return null;
		}

		/**
		 * 过期指定字段名的值
		 * 
		 * @param name 要过期值的字段名
		 * 
		 * @version 0.0.3
	 	 * @platform egret3.0.3
		 */
		public static delCookie(name): void {
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval = this.getCookie(name);
			if (cval != null)
				document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
		}

	}
}