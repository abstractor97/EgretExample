
/**
 * 摇一摇类
 * @example
 * <pre>
 *      Yaoyiyao.Ins.init();
 *      Yaoyiyao.Ins.start(succCallback,failCallback,thisObj);
 *      Yaoyiyao.Ins.end();
 * </pre>
 * 
 * @version 0.0.6
 * @platform egret3.0.3
 */
class Yaoyiyao {

    public static Ins: Yaoyiyao;
    public static getInstance(): Yaoyiyao {
        if (!this.Ins) {
            this.Ins = new Yaoyiyao;
        }
        return this.Ins;
    }

    private last_x: number;
    private last_y: number;
    private last_z: number;

    private SHAKE_THRESHOLD: number = 3000;
    private SHAKE_THRESHOLD2: number = 2000;

    private last_update: number = 0;
    private motion: egret.Motion = null;
    private shakeCount: number = 0;
    //是否正在摇一摇中
    private isYaoing: boolean;

    private interval: number;

    private diff_ratio: number;
    /**
     * 初始化摇一摇基础配置数据
     * @param threshold 摇成功的阈值
     * @param interval 监测摇状态的数据的间隔
     * @param diffratio 阈值调参 和阈值判定相关
     * @param threshold2 摇失败的阈值
     * 
     * @version 0.0.6
	 * @platform egret3.0.3
     */
    public init(threshold: number = 3000, interval: number = 100, diffratio: number = 12000, threshold2: number = 1000) {
        this.last_x = 0;
        this.last_y = 0;
        this.last_z = 0;
        this.isYaoing = false;
        this.motion = new egret.Motion();

        this.interval = interval;
        this.SHAKE_THRESHOLD = threshold;
        this.SHAKE_THRESHOLD2 = threshold2;
        this.diff_ratio = diffratio;
    }

    private succCallBack: Function = null;
    private failCallBack: Function = null;
    private thisObj: any;

    /**
     * 开始监测设备摇一摇运动状态的数据
     * @param succCallback? 摇一摇成功回调
     * @param failCallback? 摇一摇失败回调
     * @param thisObj? 回调this引用
     * 
     * @version 0.0.6
	 * @platform egret3.0.3
     */
    public start(succCallback?: Function, failCallback?: Function, thisObj?: any) {
        this.succCallBack = succCallback;
        this.failCallBack = failCallback;
        this.thisObj = thisObj;

        this.motion.addEventListener(egret.Event.CHANGE, this.deviceMotionHandler, this);
        this.motion.start();
    }
    /**
     * 取消读取设备运动状态数据
     * 
     * @version 0.0.3
	 * @platform egret3.0.3
     */
    public end() {
        this.motion.removeEventListener(egret.Event.CHANGE, this.deviceMotionHandler, this);
        this.isYaoing = true;
    }

    /**
     * 监听函数
     * @param e
     * 
     * @version 0.0.6
	 * @platform egret3.0.3
     */
    private deviceMotionHandler(e: egret.MotionEvent): void {
        var acceleration = e.accelerationIncludingGravity;

        var curTime = new Date().getTime();
        if ((curTime - this.last_update) > this.interval) {
            var diffTime = curTime - this.last_update;
            this.last_update = curTime;
            var nX = acceleration.x;
            var nY = acceleration.y;
            var nZ = acceleration.z;
            var speed = Math.abs(nX + nY + nZ - this.last_x - this.last_y - this.last_z) / diffTime * this.diff_ratio;
            if (speed > this.SHAKE_THRESHOLD) {
                console.log('yaoing');
                if (this.isYaoing == false) {
                    e.currentTarget.removeEventListener(egret.Event.CHANGE, this.deviceMotionHandler, this);
                    this.isYaoing = true;
                    this.last_x = nX;
                    this.last_y = nY;
                    this.last_z = nZ;

                    this.onYaoyiyaoSucc();
                }
            } else if (speed > this.SHAKE_THRESHOLD2) {
                this.last_x = nX;
                this.last_y = nY;
                this.last_z = nZ;
                if (this.failCallBack) {
                    if (this.thisObj) {
                        this.failCallBack.call(this.thisObj);
                    } else {
                        this.failCallBack();
                    }
                }
            }
        }
    }

    /**
     *  摇一摇成功回调
     * 
     * @version 0.0.6
	 * @platform egret3.0.3
     */
    private onYaoyiyaoSucc() {
        if (this.succCallBack) {
            if (this.thisObj) {
                this.succCallBack.call(this.thisObj);
            } else {
                this.succCallBack();
            }
        }
    }
}