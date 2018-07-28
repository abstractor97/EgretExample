var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Http请求类
 * 序列发送http请求
 * @author chenkai
 * @date 2016/12/18
 *
 * Example:
 * App.Http.initServer("http://123123123.com");
 * App.Http.send({head:"login",account:"chenkai"}, this.revLogin, this);
 */
var Http = (function () {
    function Http() {
        /**请求格式POST or GET*/
        this.httpMethod = egret.HttpMethod.GET;
        /**发送缓存*/
        this.cacheList = [];
        /**请求状态*/
        this.requesting = false;
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
    }
    Http.getInstance = function () {
        if (this.instance == null) {
            this.instance = new Http();
        }
        return this.instance;
    };
    /**
     * 初始化http访问地址
     * @serverUrl 访问地址
     */
    Http.prototype.initServerUrl = function (serverUrl) {
        this.serverUrl = serverUrl;
    };
    /**
     * 发送
     * @msg 消息字符串 一般为json格式
     * @callBack 回调
     * @thisObject 回调执行对象
     */
    Http.prototype.send = function (msg, callBack, thisObject) {
        if (this.httpMethod == egret.HttpMethod.GET) {
            this.cacheList.push([null, callBack, thisObject]);
        }
        else {
            this.cacheList.push([JSON.stringify(msg), callBack, thisObject]);
        }
        this.next();
    };
    /**发送下一条*/
    Http.prototype.next = function () {
        if (this.requesting) {
            return;
        }
        if (this.cacheList.length == 0) {
            return;
        }
        this.curSend = this.cacheList.shift();
        this.request.open(this.serverUrl, this.httpMethod);
        this.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //this.request.setRequestHeader("Content-Type","application/json");
        if (this.httpMethod == egret.HttpMethod.GET) {
            this.request.send();
        }
        else {
            this.request.send(this.curSend[0]);
        }
        this.requesting = true;
    };
    /**发送完成*/
    Http.prototype.onPostComplete = function (e) {
        egret.log("postComplete");
        if (this.curSend) {
            this.curSend[1].call(this.curSend[2], this.request.response);
        }
        this.requesting = false;
        this.next();
    };
    /**发送失败*/
    Http.prototype.onPostIOError = function (e) {
        egret.error("Http send error:", e.data);
        this.requesting = false;
        this.next();
    };
    /**删除所有请求*/
    Http.prototype.clearAllRequest = function () {
        this.request.abort();
        this.curSend = null;
        this.cacheList.length = 0;
    };
    return Http;
}());
__reflect(Http.prototype, "Http");
