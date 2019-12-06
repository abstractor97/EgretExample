module wy {
	export class Tween {
		public constructor() {
		}

		public static switchPagePopType: string;

		public static init(): void {
			this.switchPagePopType = '';
		}

		public static do(obj: egret.DisplayObjectContainer): void {
			var i: number;
			var len: number;
			var name: string;
			var child: egret.DisplayObject;
			var dis: number = 100;
			var preTouchEnabled: boolean;
			for (i = 0, len = obj.numChildren; i < len; ++i) {
				child = obj.getChildAt(i);
				name = child.name;
				if (name != 'notween') {
					console.log('switch ' + this.switchPagePopType);
					preTouchEnabled = child.touchEnabled;
					child.touchEnabled = false;
					switch (this.switchPagePopType) {
						case wy.PopType.LEFTIN:
							child.x -= dis;
							egret.Tween.get(child).wait((Math.random() * 0.5 + 0.5) * wy.PageSwitch.durationIn).to({ x: child.x + dis }, wy.PageSwitch.durationIn + 500, egret.Ease.backOut).call((child, preTouchEnabled) => {
								child.touchEnabled = preTouchEnabled;
							}, this, [child, preTouchEnabled]);
							break;
						case wy.PopType.RIGHTIN:
							child.x += dis;
							egret.Tween.get(child).wait((Math.random() * 0.5 + 0.5) * wy.PageSwitch.durationIn).to({ x: child.x - dis }, wy.PageSwitch.durationIn + 500, egret.Ease.backOut).call((child, preTouchEnabled) => {
								child.touchEnabled = preTouchEnabled;
							}, this, [child, preTouchEnabled]);
							break;
						case wy.PopType.TOPIN:
							child.y -= dis;
							egret.Tween.get(child).wait((Math.random() * 0.5 + 0.5) * wy.PageSwitch.durationIn).to({ y: child.y + dis }, wy.PageSwitch.durationIn + 500, egret.Ease.backOut).call((child, preTouchEnabled) => {
								child.touchEnabled = preTouchEnabled;
							}, this, [child, preTouchEnabled]);
							break;
						case wy.PopType.BOTTOMIN:
							child.y += dis;
							egret.Tween.get(child).wait((Math.random() * 0.5 + 0.5) * wy.PageSwitch.durationIn).to({ y: child.y - dis }, wy.PageSwitch.durationIn + 500, egret.Ease.backOut).call((child, preTouchEnabled) => {
								child.touchEnabled = preTouchEnabled;
							}, this, [child, preTouchEnabled]);
							break;
						default:
							child.touchEnabled = preTouchEnabled;
							break;
					}
				}
			}
		}

	}
}