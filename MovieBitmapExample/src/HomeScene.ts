/**
 * 主页场景
 * @author chenkai
 * @since 2017/4/17
 */
class HomeScene extends eui.Component{
	public constructor() {
		super();
		this.skinName = "HomeSceneSkin";
	}

	public childrenCreated(){
		//创建自定义影片剪辑
		var boom:BitmapMovie = new BitmapMovie();

		//使用整张序列图初始化
		var bm:egret.Bitmap = new egret.Bitmap(RES.getRes("boom_png"));
		boom.initByBitmap(bm,4,5,0,18,192,192);

		//使用零散的多张序列图初始化
		//boom.initByTile("dragon", "jpg",18);

		//设置位置
		boom.x = (this.stage.stageWidth - boom.width)/2;
		boom.y = (this.stage.stageHeight - boom.height)/2;
		boom.delay = 1000/20;
		this.addChild(boom);

		//监听播放完成
		boom.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
		boom.addEventListener(egret.Event.LOOP_COMPLETE, this.onLoopComplete, this);

		//开始播放
		boom.play(999);
	}

	//所有播放完成
	private onComplete(){
		console.log("HomeScene >> Boom 播放完成");
	}

	//播放完一次
	private onLoopComplete(){
		console.log("HomeScene >> Boom 播放一次完成");
	}
}