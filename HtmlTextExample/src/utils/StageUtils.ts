/**
 * 舞台工具类
 * @author rikimaru
 * @since 2017/3/15
 */
class StageUtils extends SingleClass{
	/**舞台*/
	public stage:egret.Stage;

	/**
	 * 初始化
	 * @param stage 传入的stage
	 */
	public init(stage:egret.Stage){
		this.stage = stage;
	}

	/**舞台宽度*/
	public get stageWidth(){
		return this.stage.stageWidth;
	}

	/**舞台高度 */
	public get stageHeight(){
		return this.stage.stageHeight;
	}
}