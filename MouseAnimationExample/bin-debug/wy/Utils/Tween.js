var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var wy;
(function (wy) {
    var Tween = (function () {
        function Tween() {
        }
        Tween.init = function () {
            this.switchPagePopType = '';
        };
        Tween.do = function (obj) {
            var i;
            var len;
            var name;
            var child;
            var dis = 100;
            var preTouchEnabled;
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
                            egret.Tween.get(child).wait((Math.random() * 0.5 + 0.5) * wy.PageSwitch.durationIn).to({ x: child.x + dis }, wy.PageSwitch.durationIn + 500, egret.Ease.backOut).call(function (child, preTouchEnabled) {
                                child.touchEnabled = preTouchEnabled;
                            }, this, [child, preTouchEnabled]);
                            break;
                        case wy.PopType.RIGHTIN:
                            child.x += dis;
                            egret.Tween.get(child).wait((Math.random() * 0.5 + 0.5) * wy.PageSwitch.durationIn).to({ x: child.x - dis }, wy.PageSwitch.durationIn + 500, egret.Ease.backOut).call(function (child, preTouchEnabled) {
                                child.touchEnabled = preTouchEnabled;
                            }, this, [child, preTouchEnabled]);
                            break;
                        case wy.PopType.TOPIN:
                            child.y -= dis;
                            egret.Tween.get(child).wait((Math.random() * 0.5 + 0.5) * wy.PageSwitch.durationIn).to({ y: child.y + dis }, wy.PageSwitch.durationIn + 500, egret.Ease.backOut).call(function (child, preTouchEnabled) {
                                child.touchEnabled = preTouchEnabled;
                            }, this, [child, preTouchEnabled]);
                            break;
                        case wy.PopType.BOTTOMIN:
                            child.y += dis;
                            egret.Tween.get(child).wait((Math.random() * 0.5 + 0.5) * wy.PageSwitch.durationIn).to({ y: child.y - dis }, wy.PageSwitch.durationIn + 500, egret.Ease.backOut).call(function (child, preTouchEnabled) {
                                child.touchEnabled = preTouchEnabled;
                            }, this, [child, preTouchEnabled]);
                            break;
                        default:
                            child.touchEnabled = preTouchEnabled;
                            break;
                    }
                }
            }
        };
        return Tween;
    }());
    wy.Tween = Tween;
    __reflect(Tween.prototype, "wy.Tween");
})(wy || (wy = {}));
//# sourceMappingURL=Tween.js.map