module wy {
    /**
     * 缩放、旋转、平移手势库
	 * 
	 * @example 
	 * <pre>
	 *     var gesture:wy.Gesture = new wy.Gesture();
	 *     gesture.apply(obj).all();//应用缩放、旋转、平移手势
	 *     gesture.apply(obj).scale();//应用缩放手势
	 *     gesture.apply(obj).rot();//应用旋转手势
	 *     gesture.apply(obj).move();//应用平移手势
	 *     gesture.apply(obj).cancel();//取消所有应用的手势
	 * 
	 * </pre>
	 * 
	 * @version 0.0.3
	 * @platform egret3.0.3
     */
	export class Gesture {
		public constructor() {
		}

		/**
		 * 手势作用对象
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		private obj: egret.DisplayObject;

		/**
		 * 记录平移起始点
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		private startPoint: egret.Point;
		/**
		 * 记录缩放起始值
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		private startScaleValue: number;
		/**
		 * 记录旋转起始值
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		private startRotationValue: number;

		/**
		 * 缩放最大倍数
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		public MAX_SCALE: number = 3;

		/**
		 * 缩放最小倍数
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		public MIN_SCALE: number = 0;

		/**
		 * 缩放手势
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		private pinch: neoges.PinchGesture;
		/**
		 * 旋转手势
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		private rot: neoges.RotationGesture;
		/**
		 * 平移手势
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 */
		private pan: neoges.PanGesture;

		/**
		 * 设置手势作用对象
		 * @param obj 手势操作作用的对象
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 * @return 当前手势操作类实例
		 */
		public apply(obj: egret.DisplayObject): Gesture {
			if (obj == null || obj == undefined || this.obj == obj) return;

			this.cancel();

			this.obj = obj;
			//设置
			if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
				neoges.GestureManager.showTouchPoint = true;//PC端测试多点操作用，手机测试请设置false
			}
			return this;
		}

		/**
		 * 应用旋转 缩放 平移
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 * @return 当前手势操作类实例
		 */
		public all(): Gesture {
			if (!this.obj) return this;

			this.scale().rotate().move();

			return this;
		}

		/**
		 * 应用缩放
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 * @return 当前手势操作类实例
		 */
		public scale(): Gesture {
			if (!this.obj) return this;

			//Pinch(二指往內或往外拨动，平时经常用到的缩放)
			this.pinch = new neoges.PinchGesture(this.obj);
			this.pinch.addEventListener(neoges.GestureEvent.BEGAN, this.onPinchBegan, this);
			this.pinch.addEventListener(neoges.GestureEvent.UPDATE, this.onPinchUpdate, this);
			this.pinch.addEventListener(neoges.GestureEvent.ENDED, this.onPinchEnd, this);

			return this;
		}

		/**
		 * 应用旋转
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 * @return 当前手势操作类实例
		 */
		public rotate(): Gesture {
			if (!this.obj) return this;

			//Rotation(旋转)
			this.rot = new neoges.RotationGesture(this.obj);
			this.rot.addEventListener(neoges.GestureEvent.BEGAN, this.onRotationBegan, this);
			this.rot.addEventListener(neoges.GestureEvent.UPDATE, this.onRotationUpdate, this);
			this.rot.addEventListener(neoges.GestureEvent.ENDED, this.onRotationEnd, this);

			return this;
		}

		/**
		 * 应用平移
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 * @return 当前手势操作类实例
		 */
		public move(): Gesture {
			if (!this.obj) return this;

			//Pan (拖移，慢速移动)
			this.pan = new neoges.PanGesture(this.obj);
			this.pan.addEventListener(neoges.GestureEvent.BEGAN, this.onPanBegan, this);
			this.pan.addEventListener(neoges.GestureEvent.UPDATE, this.onPanUpdate, this);
			this.pan.addEventListener(neoges.GestureEvent.ENDED, this.onPanEnd, this);

			return this;
		}

		/**
		 * 取消所有手势应用
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 * @return 当前手势操作类实例
		 */
		public cancel(): Gesture {
			if (this.pinch) {
				this.clearGesture(this.pinch);
				this.pinch.removeEventListener(neoges.GestureEvent.BEGAN, this.onPinchBegan, this);
				this.pinch.removeEventListener(neoges.GestureEvent.UPDATE, this.onPinchUpdate, this);
				this.pinch.removeEventListener(neoges.GestureEvent.ENDED, this.onPinchEnd, this);
			}
			if (this.rot) {
				this.clearGesture(this.rot);
				this.rot.removeEventListener(neoges.GestureEvent.BEGAN, this.onRotationBegan, this);
				this.rot.removeEventListener(neoges.GestureEvent.UPDATE, this.onRotationUpdate, this);
				this.rot.removeEventListener(neoges.GestureEvent.ENDED, this.onRotationEnd, this);
			}
			if (this.pan) {
				this.clearGesture(this.pan);
				this.pan.removeEventListener(neoges.GestureEvent.BEGAN, this.onPanBegan, this);
				this.pan.removeEventListener(neoges.GestureEvent.UPDATE, this.onPanUpdate, this);
				this.pan.removeEventListener(neoges.GestureEvent.ENDED, this.onPanEnd, this);
			}
			return this;
		}

		/**on tap*/

		/**
		 * pinch 缩放开始
		 * 
		 * @param event
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 */
		private onPinchBegan(event: neoges.GestureEvent): void {
			if (this.obj) {
				this.startScaleValue = this.obj.scaleX;
			}
		}
		/**
		 * pinch 缩放改变
		 * 
		 * @param event
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 */
		private onPinchUpdate(event: neoges.GestureEvent): void {
			if (this.obj && event.value != Infinity && Math.abs(event.value) <= 5) {
				var scale = this.startScaleValue * event.value;
				if (scale > this.MAX_SCALE || scale < this.MIN_SCALE) return;
				this.obj.scaleX = scale;
				this.obj.scaleY = this.obj.scaleX;
			}
		}
		/**
		 * pinch 缩放结束
		 * 
		 * @param event
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 */
		private onPinchEnd(event: neoges.GestureEvent): void {
		}


		/**
		 * rot 旋转开始
		 * 
		 * @param event
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 */
		private onRotationBegan(event: neoges.GestureEvent): void {
			if (this.obj) {
				this.startRotationValue = this.obj.rotation;
			}
		}
		/**
		 * rot 旋转改变
		 * 
		 * @param event
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 */
		private onRotationUpdate(event: neoges.GestureEvent): void {
			if (this.obj && event.value != Infinity && Math.abs(event.value) <= 180) {
				this.obj.rotation = this.startRotationValue + event.value;
			}
		}
		/**
		 * rot 旋转手势操作结束
		 * 
		 * @param event
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 */
		private onRotationEnd(event: neoges.GestureEvent): void {
		}


		/**
		 * pan 平移开始
		 * 
		 * @param event
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 */
		private onPanBegan(event: neoges.GestureEvent): void {
			this.startPoint = new egret.Point(event.host.x, event.host.y);
		}
		/**
		 * pan 平移改变
		 * 
		 * @param event
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 */
		private onPanUpdate(event: neoges.GestureEvent): void {
			if (Math.abs(event.offsetX) <= 1000) {
				event.host.x = this.startPoint.x + event.offsetX;
				if (this.obj) {
					this.obj.x = event.host.x;
				}
			}
			if (Math.abs(event.offsetY) <= 1000) {
				event.host.y = this.startPoint.y + event.offsetY;
				if (this.obj) {
					this.obj.y = event.host.y;
				}
			}
		}
		/**
		 * pan 平移结束
		 * 
		 * @param event
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 */
		private onPanEnd(event: neoges.GestureEvent): void {
		}
		/**
		 * 不需要手势的时候，可以清理手势
		 * 
		 * @param event
		 * 
		 * @version 0.0.3
		 * @platform egret3.0.3
		 * 
		 */
		private clearGesture(gestureInstance: neoges.IGesture): void {
			gestureInstance.dispose();
		}
	}
}