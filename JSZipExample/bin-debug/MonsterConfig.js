/**
 *
 * @author
 *
 */
var MonsterConfig = (function () {
    function MonsterConfig() {
        /**史莱姆*/
        this.shiLaiMu = { name: "", hp: 0, attack: 0 };
        /**地精*/
        this.diJing = { name: "", hp: 0, attack: 0 };
    }
    var d = __define,c=MonsterConfig,p=c.prototype;
    //读取数据
    p.readData = function (data) {
        this.shiLaiMu = data.shiLaiMu;
        this.diJing = data.diJing;
    };
    return MonsterConfig;
}());
egret.registerClass(MonsterConfig,'MonsterConfig');
//# sourceMappingURL=MonsterConfig.js.map