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
 * @since 2017/4/17
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "HomeSceneSkin";
        return _this;
    }
    HomeScene.prototype.childrenCreated = function () {
        //创建爆炸特效
        var boom = new BitmapMovie();
        //使用整张序列图初始化
        var bm = new egret.Bitmap(RES.getRes("boom_png"));
        boom.initByBitmap(bm, 4, 5, 0, 18, 192, 192);
        //使用零散的多张序列图初始化
        //boom.initByTile("dragon", "jpg",18);
        //设置位置
        boom.x = (this.stage.stageWidth - boom.width) / 2;
        boom.y = (this.stage.stageHeight - boom.height) / 2;
        boom.delay = 1000 / 20;
        this.addChild(boom);
        //监听播放完成
        boom.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        boom.addEventListener(egret.Event.LOOP_COMPLETE, this.onLoopComplete, this);
        //开始播放
        boom.play(999);
    };
    //所有播放完成
    HomeScene.prototype.onComplete = function () {
        console.log("HomeScene >> Boom 播放完成");
    };
    //播放完一次
    HomeScene.prototype.onLoopComplete = function () {
        console.log("HomeScene >> Boom 播放一次完成");
    };
    return HomeScene;
}(eui.Component));
__reflect(HomeScene.prototype, "HomeScene");
