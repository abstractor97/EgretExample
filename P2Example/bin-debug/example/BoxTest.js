var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Box测试
 * @author chenkai
 * @since 2017/6/30
 */
var BoxTest = (function (_super) {
    __extends(BoxTest, _super);
    function BoxTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    BoxTest.prototype.init = function () {
        //创建物理世界
        this.world = new p2.World();
        this.world.gravity = [0, -500];
        //创建地面
        var planeSp = new egret.Sprite();
        for (var i = 0; i < 20; i++) {
            var bm = new egret.Bitmap(RES.getRes("tile0_png"));
            bm.x = i * 60;
            bm.y = 0;
            planeSp.addChild(bm);
        }
        var planeShape = new p2.Plane();
        var planeBody = new p2.Body();
        planeBody.position = [0, 60];
        planeBody.addShape(planeShape);
        planeBody.displays = [planeSp];
        this.world.addBody(planeBody);
        this.addChild(planeSp);
        //创建Box
        var player = new p2.Box({ width: 95, height: 104 });
        var playerBody = new p2.Body({ mass: 1, position: [300, 300] });
        playerBody.addShape(player);
        this.world.addBody(playerBody);
        var playerBm = new egret.Bitmap(RES.getRes("player0_png"));
        playerBm.anchorOffsetX = playerBm.width / 2;
        playerBm.anchorOffsetY = playerBm.height / 2;
        playerBody.displays = [playerBm];
        this.addChild(playerBm);
        //每帧更新
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    BoxTest.prototype.onEnterFrame = function () {
        this.world.step(16 / 1000);
        var len = this.world.bodies.length;
        for (var i = 0; i < len; i++) {
            var body = this.world.bodies[i];
            var display = body.displays[0];
            display.x = body.position[0];
            display.y = this.stage.stageHeight - body.position[1];
            display.rotation = 360 - body.angle * 180 / Math.PI;
        }
    };
    return BoxTest;
}(egret.Sprite));
__reflect(BoxTest.prototype, "BoxTest");
//# sourceMappingURL=BoxTest.js.map