var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
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
    var TouchEffects = (function () {
        function TouchEffects() {
        }
        /**
         * 在对应点上触发点击效果：为了简便，没有将效果类单独分离开来
         *
         * @param _x 效果触发点的x坐标
         * @param _y 效果触发点的y坐标
         * @param color 效果的颜色 可选，默认随机
         */
        TouchEffects.do = function (_x, _y, clor) {
            for (var i = 0; i < this._num; i++) {
                var angle = 2 * Math.PI * Math.random();
                var disx = Math.sin(angle) * this._starDis;
                var disy = Math.cos(angle) * this._starDis;
                var startX = _x + disx;
                var startY = _y + disy;
                var endX = _x + 4 * disx;
                var endY = _y + 4 * disy;
                var r = this._size + this._size * Math.random();
                var R = 2 * r;
                var m = new egret.Shape();
                var radius = 5;
                var color;
                if (clor) {
                    color = clor;
                }
                else {
                    color = RandomUtils.limit(0, 0xffffff);
                }
                if (Math.random() > 0.5) {
                    m.graphics.lineStyle(1, color);
                    m.graphics.moveTo(radius, 0);
                    m.graphics.beginFill(color);
                    m.x = startX;
                    m.y = startY;
                    for (var k = 1; k < 11; k++) {
                        var radius2 = radius;
                        if (k % 2) {
                            radius2 /= 2;
                        }
                        var angle = Math.PI * 2 / 10 * k;
                        m.graphics.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
                    }
                }
                else {
                    radius *= 1.2;
                    m.graphics.lineStyle(1, color);
                    m.graphics.moveTo(0, -radius);
                    m.graphics.beginFill(color);
                    m.x = startX;
                    m.y = startY;
                    m.graphics.drawArc(-radius * (Math.SQRT1_2), 0, radius, -Math.PI / 2, Math.PI / 2);
                    m.graphics.drawArc(-radius * (Math.SQRT1_2 + 1), 0, Math.SQRT2 * radius, Math.PI / 4, -Math.PI / 4, true);
                }
                m.graphics.endFill();
                egret.MainContext.instance.stage.addChild(m);
                egret.Tween.get(m).to({ alpha: 1, x: endX, y: endY, scaleX: 0.1, scaleY: 0.1, rotation: 360 }, 500).call(this.removeStar, this, [m]);
            }
        };
        TouchEffects.removeStar = function (star) {
            egret.MainContext.instance.stage.removeChild(star);
        };
        return TouchEffects;
    }());
    TouchEffects._size = 2; //星星大小
    TouchEffects._num = 10; //单次出现的个数
    TouchEffects._starDis = 10; //扩散距离
    wy.TouchEffects = TouchEffects;
    __reflect(TouchEffects.prototype, "wy.TouchEffects");
})(wy || (wy = {}));
//# sourceMappingURL=TouchEffects.js.map