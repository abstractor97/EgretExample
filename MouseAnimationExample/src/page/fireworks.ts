/**
 *
 *@author
 *
 */
class fireworks extends fireworksUI {
	constructor() {
		super();
	}

	protected createChildren(): void {
		super.createChildren();
	}

	public show(data?): void {
		super.show(data);

		let bg = wy.Tools.createSprBtn(0, 0, 640, 1236, 0xffffff, 1);
		this.addChild(bg);

		var imageLoader = new egret.ImageLoader();
		imageLoader.load("./resource/assets/build.png");
		imageLoader.addEventListener(egret.Event.COMPLETE, this.loaderComplete, this);

		// wy.Tween.do(this);
	}

	private loaderComplete(e: egret.Event) {
		let imageLoader = <egret.ImageLoader>e.currentTarget;
		let imageData = imageLoader.data;

		let texture = new egret.Texture();
		texture._setBitmapData(imageData);

		let image = new egret.Bitmap(texture);
		this.addChild(image);

		console.log(imageData);
		console.log(imageData.width);
		console.log(imageData.height);

		let s_w = 10;	// 像素点的大小;
		let s_h = 10;	// 像素点的大小;
		let rows = Math.ceil(imageData.width / s_w);	// 行数
		let cols = Math.ceil(imageData.height / s_h);	// 列数
		let len = rows * cols;	// 总数量
		let pos = 0;	//当前位置
		let par_x = 0, par_y = 0;	// 粒子所在位置
		let textureArr: { _x: number, _y: number, _texture: egret.RenderTexture }[] = [];

		console.log(rows, cols);

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {

				par_x = j * s_w;
				par_y = i * s_h;

				let rect = new egret.Rectangle(par_x, par_y, s_w, s_h);

				let texture = new egret.RenderTexture();
				texture.drawToTexture(image, rect);

				// textureArr.push({ _x: par_x, _y: par_y, _texture: texture });
				let bitmap = new egret.Bitmap(texture);
				this.addChild(bitmap);
				bitmap.width = s_w;
				bitmap.height = s_h;
				bitmap.x = par_x;
				bitmap.y = par_y;

				pos++;
			}
		}
		console.log(pos);

		// console.log(textureArr);
		wy.Tools.removeFromParent(image);
		// for (){

		// }
	}

	public hide(): void {
		super.hide();

	}

	private onTouchTap(e: egret.TouchEvent): void {
		switch (e.currentTarget) {
			default:
				break;
		}
	}
}