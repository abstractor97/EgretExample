/**
 * 技能配置
 * @author
 *
 */
var SkillConfig = (function () {
    function SkillConfig() {
        /**顺劈斩*/
        this.shunPiZhan = { name: "", hurt: [], cd: [] };
        /**暗影箭*/
        this.anYingJian = { name: "", hurt: [], cd: [] };
    }
    var d = __define,c=SkillConfig,p=c.prototype;
    //读取数据
    p.readData = function (data) {
        this.shunPiZhan = data.shunPiZhan;
        this.anYingJian = data.anYingJian;
    };
    return SkillConfig;
}());
egret.registerClass(SkillConfig,'SkillConfig');
//# sourceMappingURL=SkillConfig.js.map