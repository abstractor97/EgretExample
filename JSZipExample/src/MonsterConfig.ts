/**
 *
 * @author 
 *
 */
class MonsterConfig {
    /**史莱姆*/
    public shiLaiMu = { name: "",hp: 0,attack: 0 };
    /**地精*/
    public diJing = { name: "",hp: 0,attack:0 };
    
    //读取数据
    public readData(data) {
        this.shiLaiMu = data.shiLaiMu;
        this.diJing = data.diJing;
    }
}
