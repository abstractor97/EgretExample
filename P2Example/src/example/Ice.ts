/**
 *
 * 冰块+重力感应
 * @author chenkai
 * @since 2017/6/23
 * 
 */
class Ice extends egret.Sprite{
    
    private world: p2.World;
    private planeBody: p2.Body;
    private gX: number = 50;
    private gY: number = 50;
    private textField: egret.TextField;
    private isMobile: Boolean;
    
    private isDebug: Boolean = false;
    
	public constructor() {
        super();

        this.isMobile = egret.Capabilities.isMobile;
        
        //创建背景
        var bg: egret.Bitmap = new egret.Bitmap(RES.getRes("bg_png"));
        this.addChild(bg);
        
        //创建文本
        this.textField = new egret.TextField();
        this.textField.text = "点击屏幕生成一个冰块";
        this.addChild(this.textField);
        
        //创建物理世界
        this.createWorld();
        this.createGround();
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.addOneBox,this);
        
        //开启重力感应
        if(this.isMobile) { 
            var orientation = new egret.DeviceOrientation();
            orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
            orientation.start();
        }
	}
	
     //e.alpha   z轴角速度0~360   根据啥来算的，东南西北？，向右减少，向左增加
     //e.beta  x轴角速度-90-90 手机平放0度，手机头朝上增加，手机头朝下减少
    //e.gamma y轴角速度-90~270 手机平放0度，向右倾斜增加，向左倾斜减少
    private onOrientation(e: egret.OrientationEvent): void {
//        this.textField.text = e.alpha + "\n" + e.beta + "\n" + e.gamma + "\n" + this.world.gravity[0] + "\n" + this.world.gravity[1];
        if(this.isMobile) {
            this.world.gravity = [e.gamma/90*this.gX,e.beta / 90 * this.gY];
        }
       
    }
    
    //每帧更新刚体皮肤
    private onEnterFrame(): void {
        this.world.step(0.1);

        var len: number = this.world.bodies.length;
        for(var i: number = 0;i < len;i++) {
            var body: p2.Body = this.world.bodies[i];
            if(body.displays) {
                var display: egret.DisplayObject = body.displays[0];
                display.x = body.position[0];
                display.y = body.position[1];
                display.rotation = body.angle * 180 / Math.PI;
            }
        }
    }
    
    //点击增加一个冰块
    private addOneBox(e: egret.TouchEvent): void { 

        var rand: number = Math.floor(Math.random() * 7);   // 0-6
        var display: egret.Bitmap = new egret.Bitmap(RES.getRes("ice00" + rand));
        display.x = e.stageX;
        display.y = e.stageY;
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        display.cacheAsBitmap = true;
        this.addChild(display);
        var body: p2.Body = this.getOneRectBody(display.width,display.height);
        body.position = [e.stageX,e.stageY];
        body.displays = [display];
    }
	
    //创建世界
    private createWorld(): void {
        this.world = new p2.World();
        //this.world.sleepMode = p2.World.BODY_SLEEPING;   //睡眠后，物体落地则不会感应重力感应
        this.world.gravity = [0,30];
    }

    //创建上下左右地板
    private createGround(): void {
        var buttomBody: p2.Body = this.getOneRectBody(GameConst.stage.stageWidth,1);
        buttomBody.type = p2.Body.KINEMATIC;
        buttomBody.position = [GameConst.stage.stageWidth/2,GameConst.stage.stageHeight];
//        var buttomDisp: egret.Sprite = this.getOneRectSkin(GameConst.stage.stageWidth,10,0x0000ff);
//        buttomBody.displays = [buttomDisp];
//        this.addChild(buttomDisp);
        
        var topBody: p2.Body = this.getOneRectBody(GameConst.stage.stageWidth,1);
        topBody.type = p2.Body.KINEMATIC;
        topBody.position = [GameConst.stage.stageWidth/2,0];
//        var topDisp: egret.Sprite = this.getOneRectSkin(GameConst.stage.stageWidth,10,0x0000ff);
//        topBody.displays = [topDisp];
//        this.addChild(topDisp);
        
        var leftBody: p2.Body = this.getOneRectBody(1,GameConst.stage.stageHeight);
        leftBody.type = p2.Body.KINEMATIC;
        leftBody.position = [0,GameConst.stage.stageHeight / 2];
//        var leftDisp: egret.Sprite = this.getOneRectSkin(1,GameConst.stage.stageHeight,0x0000ff);
//        leftBody.displays = [leftDisp];
//        this.addChild(leftDisp);
        
        var rightBody: p2.Body = this.getOneRectBody(1,GameConst.stage.stageHeight);
        rightBody.type = p2.Body.KINEMATIC;
        rightBody.position = [GameConst.stage.stageWidth,GameConst.stage.stageHeight / 2];
//        var rightDisp: egret.Sprite = this.getOneRectSkin(1,GameConst.stage.stageHeight,0x0000ff);
//        rightBody.displays = [rightDisp];
//        this.addChild(rightDisp);
    }
    
    //获取一个方块刚体
    private getOneRectBody(w:number, h:number): p2.Body {
        var shape: p2.Box = new p2.Box({width:w,height:h});
        var body: p2.Body = new p2.Body({mass:100});
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    }
    
    //获取一个Plane刚体
    private getOnePlaneBody(): p2.Body {
        var shape: p2.Plane = new p2.Plane();
        var body: p2.Body = new p2.Body();
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    }
    
    //创建一个方块皮肤
    private getOneRectSkin(w: number,h: number,color:number=0xff0000): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(color);
        sp.graphics.drawRect(0,0,w,h);
        sp.graphics.endFill();
        sp.anchorOffsetX = sp.width / 2;
        sp.anchorOffsetY = sp.height / 2;
        return sp;
    }

}











