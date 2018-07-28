/**
 * 骨骼极速格式
 */
class BoneFast extends egret.DisplayObjectContainer{
	public movie:dragonBones.Movie;

	public constructor() {
		super();
		dragonBones.addMovieGroup(RES.getRes("Dragon_ske_dbmv"), RES.getRes("Dragon_tex2_png")); // 添加动画数据和贴图
		this.movie = dragonBones.buildMovie("Dragon");     // 创建 白鹭极速格式 的动画
		this.movie.scaleX = 0.2;
		this.movie.scaleY = 0.2;
		this.movie.play("walk");
		this.addChild(this.movie);
	}

	public destoryMe(){
		this.movie.stop();
		this.movie.dispose();
		this.movie.parent && this.movie.parent.removeChild(this.movie);
	}
}