var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
var Http = (function (_super) {
    __extends(Http, _super);
    function Http() {
        var _this = _super.call(this) || this;
        /**请求格式POST or GET*/
        _this.httpMethod = egret.HttpMethod.POST;
        /**发送缓存*/
        _this.cacheList = [];
        /**请求状态*/
        _this.requesting = false;
        _this.request = new egret.HttpRequest();
        _this.request.responseType = egret.HttpResponseType.TEXT;
        _this.request.addEventListener(egret.Event.COMPLETE, _this.onPostComplete, _this);
        _this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, _this.onPostIOError, _this);
        return _this;
    }
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
        this.cacheList.push([JSON.stringify(msg), callBack, thisObject]);
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
        //this.request.setRequestHeader("Content-Type","multipart/form-data");
        this.request.send(this.curSend[0]);
        this.requesting = true;
    };
    /**发送完成*/
    Http.prototype.onPostComplete = function (e) {
        if (this.curSend) {
            this.curSend[1].call(this.curSend[2], this.request.response);
        }
        this.requesting = false;
        this.next();
    };
    /**发送失败*/
    Http.prototype.onPostIOError = function (e) {
        egret.log("Http send error");
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
}(SingleClass));
__reflect(Http.prototype, "Http");
