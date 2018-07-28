/**
 * 游戏场景
 * @author chenkai
 * @since 2017/6/22
 */
class GameScene extends eui.Component{
	private btnGroup:eui.Group;       //按钮容器
	private curExample:egret.Sprite;  //当前例子
	public demoList = ["Box","Ice","Interpolation","MouseJoint","Character","Platformer","RaycastingD","Rayreflect",
		"Buoyancy","Car"];

	public constructor() {
		super();
		this.skinName = "GameSceneSkin";
	}

	public childrenCreated(){
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}

	private onTouchTap(e:egret.TouchEvent){
		var len = this.btnGroup.numChildren;
		for(var i=0;i<len;i++){
			if(e.target == this.btnGroup.getChildAt(i)){
				if(this.curExample != null){
					this.curExample.parent && this.curExample.parent.removeChild(this.curExample);
				}
				var clz = egret.getDefinitionByName(this.demoList[i]);
				if(clz){
					this.curExample = new clz();
					this.addChild(this.curExample);
				}
			}
		}
	}
}