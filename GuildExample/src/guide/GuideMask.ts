/**
 * 新手指引的遮罩
 * @author chenkai
 * @since 2017/7/4
 * 
 * 在不需遮罩的矩形区域四周，创建4个半透明rect。
 * 
 * example:
 * 在(100,100)位置，显示200x50的可点击区域
 * GuideMask.getInstance().show(100,100,200, 50, this);
 * GuideMask.getInstance().hide();
 */
class GuideMask extends eui.Group{
	/**颜色 */
	public color:number = 0x000000;
	/**透明度 */
	public alpha:number = 0.5;

	public constructor() {
		super();
	}

	public childrenCreated(){
		this.touchEnabled = true;
		this.touchChildren = true;
	}

	//单例
	private static instance:GuideMask;
	public static getInstance():GuideMask{
		if(this.instance == null){
			this.instance = new GuideMask();
		}
		return this.instance;
	}

	/**
	 * 显示指引半透明遮罩
	 * @x 不需遮罩的矩形区域x
	 * @y 不需遮罩的矩形区域y
	 * @w 不需遮罩的矩形区域宽度
	 * @h 不需遮罩的矩形区域高度
	 * @doc GuildMask显示的容器
	 */
	public show(x:number, y:number, w:number, h:number, doc:egret.DisplayObjectContainer){
		var stage:egret.Stage = egret.lifecycle.stage;
		//上部遮罩
		var rectTop:eui.Rect = new eui.Rect(stage.stageWidth, y, this.color);
		rectTop.x = 0;
		rectTop.y = 0;
		this.addChild(rectTop);
		//下部遮罩
		var rectFoot:eui.Rect = new eui.Rect(stage.stageWidth, stage.stageHeight - y - h, this.color);
		rectFoot.x = 0;
		rectFoot.y = h+y;
		this.addChild(rectFoot);
		//左边遮罩
		var rectLeft:eui.Rect = new eui.Rect(x, h, this.color);
		rectLeft.x = 0;
		rectLeft.y = y;
		this.addChild(rectLeft);
		//右边遮罩
		var rectRight:eui.Rect = new eui.Rect(stage.stageWidth - x - w, h, this.color);
		rectRight.x = x + w;
		rectRight.y = y;
		this.addChild(rectRight);

		doc.addChild(this);
	}

	/**
	 * 隐藏
	 */
	public hide(){
		this.removeChildren();
		this.parent && this.parent.removeChild(this);
	}
}