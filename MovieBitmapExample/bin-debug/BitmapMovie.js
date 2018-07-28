var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 自定义位图影片剪辑
 * @author chenkai
 * @since 2017/4/17
 */
var BitmapMovie = (function (_super) {
    __extends(BitmapMovie, _super);
    function BitmapMovie() {
        var _this = _super.call(this) || this;
        /**纹理列表 */
        _this.textureList = [];
        /**当前播放帧数 第一帧从1开始 */
        _this.curFrame = 0;
        /**播放延迟 */
        _this._delay = 1000 / 60;
        /**循环次数 */
        _this.loop = 0;
        return _this;
    }
    /**
     * 使用整张序列图初始化
     * @srcBm 源图
     * @maxRow 有几行
     * @maxCol 有几列
     * @startPos 从第几张位置开始切(包含该位置)
     * @pieceNum 切多少张
     * @width tile宽度
     * @height tile高度
     */
    BitmapMovie.prototype.initByBitmap = function (srcBm, maxRow, maxCol, startPos, pieceNum, width, height) {
        this.textureList = CutImgTool.cutTile(srcBm, maxRow, maxCol, startPos, pieceNum, width, height);
        if (this.textureList && this.textureList.length > 0) {
            this.texture = this.textureList[0];
            this.curFrame = 0;
            this.totalFrame = this.textureList.length;
        }
    };
    /**
     * 使用零散的序列图初始化
     * @imgName 图片名称  命名格式: "boom0_png","boom1_png",...
     * @imgType 图片后缀 "png"或者"jpg"
     * @pieceNum 有多少张
     */
    BitmapMovie.prototype.initByTile = function (imgName, imgType, pieceNum) {
        this.textureList.length = 0;
        for (var i = 0; i < pieceNum; i++) {
            this.textureList[i] = RES.getRes(imgName + i + "_" + imgType);
        }
        if (this.textureList.length > 0) {
            this.texture = this.textureList[0];
            this.curFrame = 0;
            this.totalFrame = this.textureList.length;
        }
    };
    /**
     * 播放
     * @loop 循环次数
     */
    BitmapMovie.prototype.play = function (loop) {
        if (loop === void 0) { loop = 0; }
        this.loop = loop;
        this.startTimer();
    };
    /**
     * 停止播放
     */
    BitmapMovie.prototype.stop = function () {
        this.stopTimer();
    };
    /**
     * 跳转播放
     * @frame 播放的起始帧
     * @loop 循环次数
     */
    BitmapMovie.prototype.gotoAndPlay = function (frame, loop) {
        if (loop === void 0) { loop = 0; }
        if (frame <= this.totalFrame) {
            this.loop = loop;
            this.curFrame = frame;
            this.texture = this.textureList[frame - 1];
            this.startTimer();
        }
        else {
            console.error("BitmapMovie >> frame超出范围");
        }
    };
    /**
     * 跳转停止
     * @frame 停止的帧
     */
    BitmapMovie.prototype.gotoAndStop = function (frame) {
        if (frame <= this.totalFrame) {
            this.stopTimer();
            this.curFrame = frame;
            this.texture = this.textureList[frame - 1];
        }
        else {
            console.error("BitmapMovie >> frame超出范围");
        }
    };
    //启动计时器
    BitmapMovie.prototype.startTimer = function () {
        this.timer || (this.timer = new egret.Timer(this.delay));
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.reset();
        this.timer.start();
    };
    //计时处理
    BitmapMovie.prototype.onTimerHandler = function () {
        this.curFrame++;
        if (this.curFrame <= this.totalFrame) {
            this.texture = this.textureList[this.curFrame - 1];
        }
        else {
            this.loop--;
            this.dispatchEvent(new egret.Event(egret.Event.LOOP_COMPLETE));
            if (this.loop > 0) {
                this.curFrame = 1;
                this.texture = this.textureList[this.curFrame - 1];
            }
            else {
                this.stopTimer();
                this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            }
        }
    };
    //停止计时
    BitmapMovie.prototype.stopTimer = function () {
        if (this.timer) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            this.timer.stop();
        }
    };
    Object.defineProperty(BitmapMovie.prototype, "delay", {
        //延迟
        get: function () {
            return this._delay;
        },
        //延迟
        set: function (value) {
            this._delay = value;
            if (this.timer) {
                this.timer.delay = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return BitmapMovie;
}(eui.Image));
__reflect(BitmapMovie.prototype, "BitmapMovie");
