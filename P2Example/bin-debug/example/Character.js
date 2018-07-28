var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 键盘操作矩形移动，和其他刚体碰撞
 * 1. ContactMaterial材料的使用
 * 2. preSolve预处理，穿透实现。
 * 3. beginContact碰撞检测
 *
 * @author chenkai
 * @since 2017/6/26
 */
var Character = (function (_super) {
    __extends(Character, _super);
    function Character() {
        var _this = _super.call(this) || this;
        _this.platforms = []; //平台列表
        _this.boxes = []; //物体列表
        _this.buttons = { left: 0, right: 0, space: 0 }; //鼠标事件
        //创建测试类
        _this.debugDraw = new p2DebugDraw();
        _this.addChild(_this.debugDraw);
        //设置世界
        _this.world = _this.debugDraw.world;
        _this.world.defaultContactMaterial.friction = 0.1;
        _this.world.setGlobalStiffness(1e5);
        //初始化材料，决定两种刚体类型间的力(摩擦力等)作用
        _this.groundMaterial = new p2.Material(0);
        _this.characterMaterial = new p2.Material(0);
        _this.boxMaterial = new p2.Material(0);
        //创建角色矩形
        _this.characterBody = _this.debugDraw.createRect(50, 100);
        _this.characterBody.mass = 1; //质量
        _this.characterBody.position = [800, 500]; //位置
        _this.characterBody.fixedRotation = true; //固定旋转
        _this.characterBody.damping = 0.5; //阻尼(摩擦力)
        var characterShape = _this.characterBody.shapes[0];
        characterShape.material = _this.characterMaterial;
        //创建地板
        _this.planeBody = _this.debugDraw.createPlane();
        _this.planeBody.position = [0, 600];
        var planeShape = _this.planeBody.shapes[0];
        planeShape.material = _this.groundMaterial;
        //创建不可移动的平台
        var platformPositions = [[100, 450], [300, 450], [500, 450]];
        for (var i = 0; i < platformPositions.length; i++) {
            var platformBody = _this.debugDraw.createRect(100, 50);
            platformBody.mass = 0; //0，静止，不受重力影响
            platformBody.position = platformPositions[i];
            platformBody.type = p2.Body.KINEMATIC; //静止
            var platformShape = platformBody.shapes[0];
            platformShape.material = _this.groundMaterial;
            _this.platforms.push(platformBody);
        }
        //创建可移动物体
        var boxPositions = [[100, 400], [300, 400], [500, 400]];
        for (var i = 0; i < boxPositions.length; i++) {
            var boxBody = _this.debugDraw.createRect(50, 50);
            boxBody.mass = 1;
            boxBody.position = boxPositions[i];
            var boxShape = boxBody.shapes[0];
            boxShape.material = _this.boxMaterial;
            _this.boxes.push(boxBody);
        }
        //材料间的力作用
        var groundCharacterCM = new p2.ContactMaterial(_this.groundMaterial, _this.characterMaterial);
        groundCharacterCM.friction = 0;
        var boxCharacterCM = new p2.ContactMaterial(_this.boxMaterial, _this.characterMaterial);
        boxCharacterCM.friction = 0;
        var boxGroundCM = new p2.ContactMaterial(_this.boxMaterial, _this.groundMaterial);
        boxGroundCM.friction = 0.6; //摩擦力0.6  这样平台上的方块会跟随平台左右移动
        _this.world.addContactMaterial(groundCharacterCM);
        _this.world.addContactMaterial(boxCharacterCM);
        _this.world.addContactMaterial(boxGroundCM);
        //允许人物跳跃时，可以从平台底下穿透，跳到平台上面
        _this.world.on('beginContact', _this.beginContact, _this); //碰撞开始
        _this.world.on('preSolve', _this.preSolve, _this); //预处理(刚体间相互作用之前执行的函数???)
        _this.world.on('endContact', _this.endContact, _this); //碰撞结束
        //键盘事件
        window.document.onkeydown = _this.onKeyDown;
        window.document.onkeyup = _this.onKeyUp;
        window["Example4"] = _this; //在js函数代码中this不代表Example4，这里将Example4保存在window中，以便全局调用
        //世界更新事件?
        _this.world.on('postStep', function () {
            for (var i = 0; i < _this.platforms.length; i++) {
                _this.platforms[i].velocity[0] = 20 * Math.sin(_this.world.time);
            }
            _this.characterBody.velocity[0] = 100 * (_this.buttons.right - _this.buttons.left);
        }, _this);
        return _this;
    }
    Character.prototype.beginContact = function (evt) {
        //获取和角色碰撞的刚体
        if (evt.bodyA != this.characterBody && evt.bodyB != this.characterBody)
            return;
        var otherBody = evt.bodyA == this.characterBody ? evt.bodyB : evt.bodyA;
        //当碰撞刚体是平台，且平台位置在角色上方
        var platformIndex = this.platforms.indexOf(otherBody);
        if (platformIndex != -1 && otherBody.position[1] < this.characterBody.position[1]) {
            this.passThroughBody = otherBody;
        }
        else if (platformIndex != -1) {
            this.currentPlatform = this.platforms[platformIndex];
        }
    };
    Character.prototype.preSolve = function (evt) {
        //平台在角色下方，则角色跟随平台移动
        if (this.currentPlatform) {
            this.characterBody.velocity[0] += this.currentPlatform.velocity[0];
        }
        //碰撞是角色和平台，且满足穿透条件，则碰撞eq无效
        for (var i = 0; i < evt.contactEquations.length; i++) {
            var eq = evt.contactEquations[i];
            if ((eq.bodyA == this.characterBody && eq.bodyB == this.passThroughBody) || eq.bodyB == this.characterBody && eq.bodyA == this.passThroughBody) {
                eq.enabled = false;
            }
        }
        //碰撞是角色和平台，且满足穿透条件，则摩擦力无效
        for (var i = 0; i < evt.frictionEquations.length; i++) {
            var eq = evt.frictionEquations[i];
            if ((eq.bodyA == this.characterBody && eq.bodyB == this.passThroughBody) || eq.bodyB == this.characterBody && eq.bodyA == this.passThroughBody) {
                eq.enabled = false;
            }
        }
    };
    Character.prototype.endContact = function (evt) {
        //碰撞时角色和平台，且满足穿透条件，则重置穿透条件
        if ((evt.bodyA == this.characterBody && evt.bodyB == this.passThroughBody) || evt.bodyB == this.characterBody && evt.bodyA == this.passThroughBody) {
            this.passThroughBody = undefined;
        }
        //碰撞是角色和平台，且平台是当前平台，则重置当前平台
        if (evt.bodyA != this.characterBody && evt.bodyB != this.characterBody)
            return;
        var otherBody = evt.bodyA == this.characterBody ? evt.bodyB : evt.bodyA;
        var platformIndex = this.platforms.indexOf(otherBody);
        if (otherBody == this.currentPlatform) {
            this.currentPlatform = null;
        }
    };
    //键盘按下
    Character.prototype.onKeyDown = function (evt) {
        var buttons = window["Example4"].buttons;
        var characterBody = window["Example4"].characterBody;
        evt = (evt) ? evt : window.event;
        if (evt.keyCode) {
            if (evt.keyCode == 38) {
                if (buttons.space != 1) {
                    buttons.space = 1;
                    characterBody.velocity[1] = -500;
                }
            }
            else if (evt.keyCode == 37) {
                buttons.left = 1;
            }
            else if (evt.keyCode == 39) {
                buttons.right = 1;
            }
        }
    };
    //键盘释放
    Character.prototype.onKeyUp = function (evt) {
        var buttons = window["Example4"].buttons;
        evt = (evt) ? evt : window.event;
        if (evt.keyCode) {
            if (evt.keyCode == 38) {
                buttons.space = 0;
            }
            else if (evt.keyCode == 37) {
                buttons.left = 0;
            }
            else if (evt.keyCode == 39) {
                buttons.right = 0;
            }
        }
    };
    return Character;
}(egret.Sprite));
__reflect(Character.prototype, "Character");
//# sourceMappingURL=Character.js.map