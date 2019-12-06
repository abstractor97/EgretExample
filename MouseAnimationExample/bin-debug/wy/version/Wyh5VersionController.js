var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wy;
(function (wy) {
    var Wyh5VersionController = (function (_super) {
        __extends(Wyh5VersionController, _super);
        function Wyh5VersionController() {
            return _super.call(this) || this;
        }
        Wyh5VersionController.prototype.fetchVersion = function (callback) {
            callback.onSuccess(null);
            return;
            /*

            todo

            let self = this;

            let virtualUrl:string = "all.manifest";

            let httpLoader:egret.HttpRequest = new egret.HttpRequest();
            httpLoader.addEventListener(egret.Event.COMPLETE, onLoadComplete, this);
            httpLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, this);

            httpLoader.open(virtualUrl + "?r=" + Date.now(), "get");
            httpLoader.send();

            function onError(event:egret.IOErrorEvent) {
                removeListeners();
                self.dispatchEvent(event);
            }

            function onLoadComplete() {
                removeListeners();

                self._versionInfo = JSON.parse(httpLoader.response);

                window.setTimeout(function () {
                    self.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                }, 0);
            }

            function removeListeners():void {
                httpLoader.removeEventListener(egret.Event.COMPLETE, onLoadComplete, self);
                httpLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
            }

            */
        };
        /**
         * 获取所有有变化的文件
         * @returns {any[]}
         */
        Wyh5VersionController.prototype.getChangeList = function () {
            return [];
        };
        Wyh5VersionController.prototype.getVirtualUrl = function (url) {
            if (url.indexOf("wxLocalResource:") < 0 &&
                url.indexOf("data:") < 0 &&
                url.indexOf("blob:") < 0) {
                return url + "?v=" + wy.Data.VERSION;
            }
            else {
                return url;
            }
            /*

            todo

            if (DEBUG) {
                return url;
            }
            if (this._versionInfo && this._versionInfo[url]) {
                return "resource/" + this._versionInfo[url]["v"].substring(0, 2) + "/" + this._versionInfo[url]["v"] + "_" + this._versionInfo[url]["s"] + "." + url.substring(url.lastIndexOf(".") + 1);
            }
            else {
                return url;
            }

            */
        };
        return Wyh5VersionController;
    }(egret.EventDispatcher));
    wy.Wyh5VersionController = Wyh5VersionController;
    __reflect(Wyh5VersionController.prototype, "wy.Wyh5VersionController", ["RES.IVersionController"]);
})(wy || (wy = {}));
//# sourceMappingURL=Wyh5VersionController.js.map