module wy {
	/**
     * 点击效果类
  	 * 
 	 * @example
 	 * <pre>
 	 *   TouchStyleEffects.touchStyleEffects(event.stageX,event.stageY);
 	 * </pre>
 	 * 
 	 * @version 0.0.4
	 * @platform egret3.0.2
 	 */
	export class TouchEffects {
		private static _size: number = 2;//星星大小
		private static _num: number = 10;//单次出现的个数
		private static _starDis: number = 10;//扩散距离

		/**
		 * 在对应点上触发点击效果：为了简便，没有将效果类单独分离开来
		 * 
		 * @param _x 效果触发点的x坐标
		 * @param _y 效果触发点的y坐标
		 * @param color 效果的颜色 可选，默认随机
		 */
		public static do(_x: number, _y: number, clor?: number): void {
			for (var i: number = 0; i < this._num; i++) {
				var angle: number = 2 * Math.PI * Math.random();
				var disx: number = Math.sin(angle) * this._starDis;
				var disy: number = Math.cos(angle) * this._starDis;
				var startX: number = _x + disx;
				var startY: number = _y + disy;
				var endX: number = _x + 4 * disx;
				var endY: number = _y + 4 * disy;
				var r: number = this._size + this._size * Math.random();
				var R: number = 2 * r;
				var m: egret.Shape = new egret.Shape();
				var radius: number = 5;
				var color: number;
				if (clor) { color = clor; } else { color = RandomUtils.limit(0, 0xffffff); }
				if (Math.random() > 0.5) { // 画星星
					m.graphics.lineStyle(1, color);
					m.graphics.moveTo(radius, 0);
					m.graphics.beginFill(color);
					m.x = startX; m.y = startY;
					for (var k: number = 1; k < 11; k++) {
						var radius2: number = radius;
						if (k % 2) { radius2 /= 2; }
						var angle: number = Math.PI * 2 / 10 * k;
						m.graphics.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
					}
				} else { //画月亮
					radius *= 1.2;
					m.graphics.lineStyle(1, color);
					m.graphics.moveTo(0, -radius);
					m.graphics.beginFill(color);
					m.x = startX; m.y = startY;

					m.graphics.drawArc(-radius * (Math.SQRT1_2), 0, radius, -Math.PI / 2, Math.PI / 2);
					m.graphics.drawArc(-radius * (Math.SQRT1_2 + 1), 0, Math.SQRT2 * radius, Math.PI / 4, -Math.PI / 4, true);
				}
				m.graphics.endFill();

				egret.MainContext.instance.stage.addChild(m);

				egret.Tween.get(m).to({ alpha: 1, x: endX, y: endY, scaleX: 0.1, scaleY: 0.1, rotation: 360 }, 500).call(this.removeStar, this, [m]);
			}
		}
		private static removeStar(star: egret.Shape) {
			egret.MainContext.instance.stage.removeChild(star);
		}
	}
}