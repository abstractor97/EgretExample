module wy {
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
	export class BGM {
		public constructor() {
		}

		/**
		 * 背景音乐
		 *
		 * @version 0.0.2
		 * @platform egret.3.0.3
		 */
		public static bgmSound: egret.Sound;

		/**
		 * 背景音乐声道 
		 * 
		 * @version 0.0.2
		 * @platform egret.3.0.3
		 */
		public static bgmChannel: egret.SoundChannel;

		private static needStart: boolean = true;

		private static playImg: string;
		private static stopImg: string;

		private static posX: number;
		private static posY: number;

		/**
		 * 是否要显示背景音乐控制按钮 true为显示 false为 不显示
		 * 
		 * @version 0.0.2
		 * @platform egret.3.0.3
		 */
		public static btnNeedParent: boolean;


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
		public static init(bgm: string, needStart: boolean, playImg: string, stopImg?: string, posX: number = 50, posY: number = 50): void {
			this.posX = posX;
			this.posY = posY;

			this.playImg = playImg;
			if (stopImg) {
				this.stopImg = stopImg;
			} else {
				this.stopImg = this.playImg;
			}
			this.createMusicBtn();

			this.btnNeedParent = true;

			this.loadMusic(bgm, needStart);
		}

		private static loadMusic(bgm: string, needStart: boolean = true): void {
			// RES.getResByUrl("resource/assets/" + bgm + ".mp3", this.onSoundLoadOK1, this);
			this.bgmSound = new egret.Sound();
			this.bgmSound.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            this.bgmSound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
			this.bgmSound.load("resource/assets/" + bgm + ".mp3");
			this.needStart = needStart;
		}

		private static onLoadFinish(e) {
			this.bgmSound = e.target;

			if (this.needStart) {
				if (window['wx'] && window['is_weixin']()) {
					window['wx'].getNetworkType({
						success: function (res) {
							var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
							wy.BGM.startMusic();
						}
					});
				} else {
					this.startMusic();
				}
			}
		}
		private static onLoadError(e) {
			egret.warn('音频加载出错');
		}

		/**
		 * 开始播放音乐
		 * 
		 * @version 0.0.2
		 * @platform egret3.0.3
		 */
		public static startMusic(): void {
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
		}
		/**
		 * 停止播放音乐
		 * 
		 * @version 0.0.2
		 * @platform egret3.0.3
		 */
		public static endMusic(): void {
			if (this.musicBtn && this.musicBtn['state'] == 1) {
				this.onClickMusicBtn();
			}
		}

		/**
		 *设置播放按钮的位置
	
		 * @param x
		 * @param y
		 * 
		 * @version 0.0.2
		 * @platform egret3.0.3
		 */
		public static setXY(x: number, y: number): void {
			if (this.musicBtn) {
				this.posX = x;
				this.posY = y;
				this.musicBtn.x = x;
				this.musicBtn.y = y;
			}
		}
		/**
		 * 音乐播放控制按钮
		 * 
		 * @version 0.0.2
	 	 * @platform egret3.0.3
		 */
		public static musicBtn: egret.Bitmap;


		private static createMusicBtn(): void {
			this.musicBtn = wy.Tools.createBitmapByName(this.playImg);
			wy.Tools.center(this.musicBtn);
			this.musicBtn["state"] = 0;

			this.musicBtn.touchEnabled = true;
			egret.Tween.get(this.musicBtn, { loop: true }).to({ rotation: 360 }, 4000);
			egret.Tween.pauseTweens(this.musicBtn);
			this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMusicBtn, this);
		}
		private static onClickMusicBtn(event: egret.TouchEvent = null): void {
			if (this.musicBtn["state"] == 1) {
				this.musicBtn["state"] = 0;
				this.musicBtn.texture = RES.getRes(this.stopImg);
				if (this.bgmSound) {
					this.bgmChannel.stop();
					egret.Tween.pauseTweens(this.musicBtn);
					this.musicBtn.rotation = 0;
				}
			} else {
				this.musicBtn["state"] = 1;
				this.musicBtn.texture = RES.getRes(this.playImg);
				if (this.bgmSound) {
					if (this.bgmChannel) this.bgmChannel.stop();
					this.bgmChannel = this.bgmSound.play(0, 10000);
					this.musicBtn.rotation = 0;
					egret.Tween.resumeTweens(this.musicBtn);
				}
			}
		}
	}
}