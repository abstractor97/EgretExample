var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
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
    var Data = (function () {
        function Data() {
        }
        /**
         * 数据初始化，获取当前用户信息存储起来
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        Data.init = function () {
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
        };
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
        Data.share = function (key, value, type) {
            if (type === void 0) { type = -1; }
            if (type < 0) {
                window['sharedata'][key] = value;
                window['timelinedata'][key] = value;
                window['wx'].onMenuShareAppMessage(window['sharedata']);
                window['wx'].onMenuShareTimeline(window['timelinedata']);
            }
            else if (type == 0) {
                window['sharedata'][key] = value;
                window['wx'].onMenuShareAppMessage(window['sharedata']);
            }
            else if (type == 1) {
                window['timelinedata'][key] = value;
                window['wx'].onMenuShareTimeline(window['timelinedata']);
            }
        };
        /**
         * 获取指定字段存储起来的值 会按egret.localStorage window.localStorage cookie顺序里去拿拿到即返回
         * 如果还没拿到 则可能不是weixin.php过来的，那么就会通过getQueryString去链接地址的尾部去获取
         * @param item 要拿值的字段
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        Data.getItemByName = function (item) {
            var ans;
            ans = decodeURIComponent(decodeURIComponent(this.getCookie(item)));
            if (!ans) {
                ans = window.localStorage.getItem(item);
                if (!ans) {
                    ans = egret.localStorage.getItem(item);
                }
            }
            return ans;
        };
        /**
         * 删除指定字段存储起来的值
         *
         * @param item 要删除的字段名
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        Data.delItemByName = function (item) {
            egret.localStorage.removeItem(item);
            window.localStorage.removeItem(item);
            this.delCookie(item);
        };
        /**
         *获取url后面带的参数
         *
         * @param name 要获取值的字段
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        Data.getUrlParameter = function (name) {
            var value = decodeURI(decodeURI(egret.getOption(name)));
            return value;
        };
        /**
         * 获取cookie值
         *
         * @param name 要获取值的字段
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        Data.getCookie = function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return arr[2];
            else
                return null;
        };
        /**
         * 过期指定字段名的值
         *
         * @param name 要过期值的字段名
         *
         * @version 0.0.3
         * @platform egret3.0.3
         */
        Data.delCookie = function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
        };
        return Data;
    }());
    /**
     * 游戏版本号
     *
     * @version 0.0.3
     * @platform egret3.0.3
     */
    Data.VERSION = "";
    /**
     * 游戏链接地址
     *
     * @version 0.0.3
     * @platform egret3.0.3
     */
    Data.URL = '';
    wy.Data = Data;
    __reflect(Data.prototype, "wy.Data");
})(wy || (wy = {}));
//# sourceMappingURL=Data.js.map