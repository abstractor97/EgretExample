
namespace wy {

    export class Wyh5VersionController extends egret.EventDispatcher implements RES.IVersionController {

        constructor() {
            super();
        }

        private _versionInfo: Object;

        public fetchVersion(callback: egret.AsyncCallback): void {

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
        }

        /**
         * 获取所有有变化的文件
         * @returns {any[]}
         */
        public getChangeList(): Array<{ url: string; size: number }> {
            return [];
        }

        public getVirtualUrl(url: string): string {

            if (
                url.indexOf("wxLocalResource:") < 0 &&
                url.indexOf("data:") < 0 &&
				url.indexOf("blob:") < 0
            ) {
                return url + "?v=" + wy.Data.VERSION;
            } else {
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
        }
    }
}