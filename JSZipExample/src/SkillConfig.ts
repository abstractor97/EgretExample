/**
 * 技能配置
 * @author 
 *
 */
class SkillConfig {
    /**顺劈斩*/
    public shunPiZhan = {name:"",hurt:[],cd:[]};
    /**暗影箭*/
    public anYingJian = {name:"",hurt:[],cd:[]};
    
    //读取数据
    public readData(data){
        this.shunPiZhan = data.shunPiZhan;
        this.anYingJian = data.anYingJian;
    }
}
