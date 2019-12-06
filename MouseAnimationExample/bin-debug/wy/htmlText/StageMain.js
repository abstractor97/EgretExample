var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wy;
(function (wy) {
    /**
     *舞台工具主类
     *
     *@version 0.0.1
     *@since 2017/4/21
     *
     */
    var StageMain = (function (_super) {
        __extends(StageMain, _super);
        function StageMain() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(StageMain, "StageUtils", {
            /**
             *舞台工具类
             */
            get: function () {
                return StageUtils.getInstance();
            },
            enumerable: true,
            configurable: true
        });
        return StageMain;
    }(SingleClass));
    wy.StageMain = StageMain;
    __reflect(StageMain.prototype, "wy.StageMain");
})(wy || (wy = {}));
//# sourceMappingURL=StageMain.js.map