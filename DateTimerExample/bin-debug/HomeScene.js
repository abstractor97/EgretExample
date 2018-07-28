var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 主页场景
 * @author chenkai
 * @since 2017/4/19
 *
 * 创建多张运动图片，降低帧频，然后测试enter_frame、timer、datetimer在fps过低的情况下的计数。
 * 测试结果：
 * enter_frame、timer在帧频过低的情况下，计数变少
 * datetimer无论帧频如何，计数不会变少
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        //计数
        _this.count0 = 0;
        _this.count1 = 0;
        _this.count2 = 0;
        //创建很多的bitmap来降低帧频
        _this.bmNum = 200;
        _this.skinName = "HomeSceneSkin";
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        //enter_frame
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        //timer
        var timer = new egret.Timer(1000 / 30);
        timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        timer.start();
        //dateTimer
        var dateTimer = new DateTimer(1000 / 30);
        dateTimer.addEventListener(egret.TimerEvent.TIMER, this.onDateTimerHandler, this);
        dateTimer.start();
        //创建多张运动图片，降低帧频
        this.createManyBitmap();
    };
    HomeScene.prototype.onEnterFrame = function () {
        this.count0++;
        this.enterFrameLabel.text = "EnterFrame:" + this.count0;
    };
    HomeScene.prototype.onTimerHandler = function () {
        this.count1++;
        this.timerLabel.text = "Timer:" + this.count1;
    };
    HomeScene.prototype.onDateTimerHandler = function () {
        this.count2++;
        this.dateTimerLabel.text = "DateTimer:" + this.count2;
    };
    HomeScene.prototype.createManyBitmap = function () {
        for (var i = 0; i < this.bmNum; i++) {
            var bm = new egret.Bitmap();
            bm.texture = RES.getRes("bg_jpg");
            this.bmGroup.addChild(bm);
            egret.Tween.get(bm, { loop: true }).to({ x: 100 * Math.random(), y: Math.random() * 500 }, 1000).to({ x: 0, y: 0 }, 1000);
        }
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
