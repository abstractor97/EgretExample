/**
*  文 件 名： GesturePinch.ts
*  功    能： 二指滑动，收缩和拉伸
*  内    容： 
*  作    者： Rikimaru
*  生成日期： 2016/3/14
*  修改日期： 
*  修改日志：
* 
* Example:
* var ges:GesturePinch = new GesturePinch(this.bm);
* ges.start();
* ges.stop();
* ges.destroy();
*/
class GesturePinch extends egret.EventDispatcher{
    private target: egret.DisplayObject; //目标对象
    private touchIDList: Array<number> = new Array<number>();  //触点ID
    private initTouchPos = {};  //触点初始位置
    private curTouchPos = {};   //触点当前位置
    private initDist: number;   //触点初始距离
    private startScale: number; //目标初始scale
    
	public setTarget(target){
    	this.target = target;
	}
	
	public start(){
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        StageUtils.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
	}
	
	public stop(){
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
	}
	
	private touchIDLen:number;
    private onTouchBegin(e: egret.TouchEvent) {
        this.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_BEGIN));
        this.touchIDLen = this.touchIDList.length;
        if(this.touchIDLen < 2) {
            this.touchIDList.push(e.touchPointID);
            this.initTouchPos[e.touchPointID] = new egret.Point(e.stageX,e.stageY);
            this.curTouchPos[e.touchPointID] = this.initTouchPos[e.touchPointID];
            this.touchIDLen = this.touchIDList.length;
        }
        if(this.touchIDLen == 2) {
            this.target.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.initDist = egret.Point.distance(this.initTouchPos[this.touchIDList[0]],this.initTouchPos[this.touchIDList[1]]);
            this.startScale = this.target.scaleX;
            egret.log("two fingers");
        }
    }

    private curPot:egret.Point;
    private onTouchMove(e: egret.TouchEvent) {
        this.curPot = this.curTouchPos[e.touchPointID];
        var a: egret.Point = this.curTouchPos[this.touchIDList[0]];
        var b:egret.Point = this.curTouchPos[this.touchIDList[1]];
        if(this.curPot) {
            this.curPot.x = e.stageX;
            this.curPot.y = e.stageY;
            var dist = egret.Point.distance(this.curTouchPos[this.touchIDList[0]],this.curTouchPos[this.touchIDList[1]]);
            var scale = (dist / this.initDist);
            this.target.scaleX = scale * this.startScale;
            this.target.scaleY = this.target.scaleX;
        }
    }

    private onTouchEnd(e: egret.TouchEvent) {
        var index = this.touchIDList.indexOf(e.touchPointID);
        if(index != -1) {
            this.touchIDList.splice(index,1);
        }
        if(this.touchIDList.length < 2) {
            this.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_END));
            this.target.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        }
    }
    
    public destroy(){
        this.stop();
        this.target = null;
    }
}
