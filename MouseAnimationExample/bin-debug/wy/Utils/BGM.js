var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    /**
     * 背景音乐管理工具
     * @example 使用如下方式引用此类
     * <pre>
     * 		wy.BGM.loadMusic(bgmName,needStart);
     * </pre>
     * 如果不需要加载完就播放直接设置needStart为false即可，默认是true
     *
     * @version 0.0.2
     * @platform egret.3.0.3
     */
    var BGM = (function () {
        function BGM() {
        }
        /**
         * 初始化背景音乐
         *
         * @param bgm 背景音乐名称
         * @param needStart 加载完是否需要直接播放
         * @param playImg 背景音乐控制按钮播放时资源名称
         * @param stopImg 背景音乐控制按钮停止播放时资源名称 如果没有 则和播放时的一样
         * @param posX 背景音乐控制按钮的x坐标
         * @param posY 背景音乐控制按钮的y坐标
         *
         * @version 0.0.2
         * @platform egret.3.0.3
         */
        BGM.init = function (bgm, needStart, playImg, stopImg, posX, posY) {
            if (posX === void 0) { posX = 50; }
            if (posY === void 0) { posY = 50; }
            this.posX = posX;
            this.posY = posY;
            this.playImg = playImg;
            if (stopImg) {
                this.stopImg = stopImg;
            }
            else {
                this.stopImg = this.playImg;
            }
            this.createMusicBtn();
            this.btnNeedParent = true;
            this.loadMusic(bgm, needStart);
        };
        BGM.loadMusic = function (bgm, needStart) {
            if (needStart === void 0) { needStart = true; }
            // RES.getResByUrl("resource/assets/" + bgm + ".mp3", this.onSoundLoadOK1, this);
            this.bgmSound = new egret.Sound();
            this.bgmSound.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            this.bgmSound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            this.bgmSound.load("resource/assets/" + bgm + ".mp3");
            this.needStart = needStart;
        };
        BGM.onLoadFinish = function (e) {
            this.bgmSound = e.target;
            if (this.needStart) {
                if (window['wx'] && window['is_weixin']()) {
                    window['wx'].getNetworkType({
                        success: function (res) {
                            var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                            wy.BGM.startMusic();
                        }
                    });
                }
                else {
                    this.startMusic();
                }
            }
        };
        BGM.onLoadError = function (e) {
            egret.warn('音频加载出错');
        };
        /**
         * 开始播放音乐
         *
         * @version 0.0.2
         * @platform egret3.0.3
         */
        BGM.startMusic = function () {
            if (this.bgmSound) {
                if (this.musicBtn && this.musicBtn['state'] == 0) {
                    this.onClickMusicBtn();
                }
                if (this.btnNeedParent && this.musicBtn && !this.musicBtn.parent) {
                    wy.GameInterface.stage.addChild(this.musicBtn);
                    this.musicBtn.x = this.posX;
                    this.musicBtn.y = this.posY;
                }
            }
        };
        /**
         * 停止播放音乐
         *
         * @version 0.0.2
         * @platform egret3.0.3
         */
        BGM.endMusic = function () {
            if (this.musicBtn && this.musicBtn['state'] == 1) {
                this.onClickMusicBtn();
            }
        };
        /**
         *设置播放按钮的位置
    
         * @param x
         * @param y
         *
         * @version 0.0.2
         * @platform egret3.0.3
         */
        BGM.setXY = function (x, y) {
            if (this.musicBtn) {
                this.posX = x;
                this.posY = y;
                this.musicBtn.x = x;
                this.musicBtn.y = y;
            }
        };
        BGM.createMusicBtn = function () {
            this.musicBtn = wy.Tools.createBitmapByName(this.playImg);
            wy.Tools.center(this.musicBtn);
            this.musicBtn["state"] = 0;
            this.musicBtn.touchEnabled = true;
            egret.Tween.get(this.musicBtn, { loop: true }).to({ rotation: 360 }, 4000);
            egret.Tween.pauseTweens(this.musicBtn);
            this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMusicBtn, this);
        };
        BGM.onClickMusicBtn = function (event) {
            if (event === void 0) { event = null; }
            if (this.musicBtn["state"] == 1) {
                this.musicBtn["state"] = 0;
                this.musicBtn.texture = RES.getRes(this.stopImg);
                if (this.bgmSound) {
                    this.bgmChannel.stop();
                    egret.Tween.pauseTweens(this.musicBtn);
                    this.musicBtn.rotation = 0;
                }
            }
            else {
                this.musicBtn["state"] = 1;
                this.musicBtn.texture = RES.getRes(this.playImg);
                if (this.bgmSound) {
                    if (this.bgmChannel)
                        this.bgmChannel.stop();
                    this.bgmChannel = this.bgmSound.play(0, 10000);
                    this.musicBtn.rotation = 0;
                    egret.Tween.resumeTweens(this.musicBtn);
                }
            }
        };
        return BGM;
    }());
    BGM.needStart = true;
    wy.BGM = BGM;
    __reflect(BGM.prototype, "wy.BGM");
})(wy || (wy = {}));
//# sourceMappingURL=BGM.js.map