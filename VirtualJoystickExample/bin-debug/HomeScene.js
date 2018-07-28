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
 * @since 2017/5/4
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.vj = new VirtualJoystick(); //虚拟摇杆
        _this.speedX = 0; //人物移动速度
        _this.speedY = 0;
        _this.speed = 10;
        _this.skinName = "HomeSceneSkin";
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        //开启虚拟摇杆
        this.vj.start();
        this.vj.addEventListener("vj_start", this.onStart, this);
        this.vj.addEventListener("vj_move", this.onChange, this);
        this.vj.addEventListener("vj_end", this.onEnd, this);
    };
    //摇杆启动，人物开始根据摇杆移动
    HomeScene.prototype.onStart = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    //触摸摇杆的角度改变，人物的移动速度方向也随之改变
    HomeScene.prototype.onChange = function (e) {
        var angle = e.data;
        this.speedX = Math.cos(angle) * this.speed;
        this.speedY = Math.sin(angle) * this.speed;
    };
    //停止摇杆，人物停止移动
    HomeScene.prototype.onEnd = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    //每帧更新，人物移动
    HomeScene.prototype.onEnterFrame = function () {
        this.player.x += this.speedX;
        this.player.y += this.speedY;
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
