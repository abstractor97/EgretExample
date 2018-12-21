
interface UpdateData {
    dir: number;//当前牌面
    changed: boolean;//是否切换了牌面
}

class TestShader extends egret.DisplayObjectContainer {

    constructor() {
        super();

        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private poke1: egret.Bitmap;
    private poke2: egret.Bitmap;

    private onAddToStage(e: egret.Event) {
        console.log("onAddToStage");
        // let bg = new egret.Bitmap(RES.getRes("bg_jpg"));
        // bg.width = this.stage.stageWidth;
        // bg.height = this.stage.stageHeight;
        // this.addChild(bg);

        this.poke1 = new egret.Bitmap(RES.getRes("poke0_png"))
        this.addChild(this.poke1);

        this.poke1.x = this.stage.stageWidth / 2 - this.poke1.width - 100;
        this.poke1.y = this.stage.stageHeight / 2 - this.poke1.height / 2;

        this.poke2 = new egret.Bitmap(RES.getRes("poke0_png"))
        this.addChild(this.poke2);

        this.poke2.x = this.stage.stageWidth / 2 - 100;
        this.poke2.y = this.stage.stageHeight / 2 - this.poke2.height / 2;

        this.addShader();

        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    }

    private updateData1: UpdateData;
    private updateData2: UpdateData;

    update(e: egret.Event) {

        if (this.poke1.filters && this.poke1.filters.length > 0) {
            this.updateFilter(this.poke1, this.updateData1);
        }
        if (this.poke2.filters && this.poke2.filters.length > 0) {
            this.updateFilter(this.poke2, this.updateData2);
        }
    }

    private updateFilter(poke: egret.Bitmap, updateData: UpdateData): void {
        let filter: egret.CustomFilter = <egret.CustomFilter>poke.filters[0];
        
        filter.uniforms.angle -= 2.0 * Math.PI / 180;
        if (filter.uniforms.angle < 0.0) {
            filter.uniforms.angle += Math.PI;
            updateData.changed = false;
        }
        if (filter.uniforms.angle >= Math.PI / 2.0) {
            filter.uniforms.scale = 0.2 * ((Math.PI - filter.uniforms.angle) * 2 / Math.PI);
        } else {
            if (!updateData.changed) {
                if (updateData.dir < 0) {
                    poke.texture = RES.getRes("poke13_png");
                } else if (updateData.dir > 0) {
                    poke.texture = RES.getRes("poke0_png");
                }
                updateData.dir = -updateData.dir;
                updateData.changed = true;
            }
            filter.uniforms.scale = 0.2 * filter.uniforms.angle * 2 / Math.PI;
        }
        if (filter.uniforms.angle >= Math.PI / 1.0) {//翻转
            filter.uniforms.angle = 0.0;
            if (updateData.dir < 0) {
                poke.texture = RES.getRes("poke13_png");
            } else {
                poke.texture = RES.getRes("poke0_png");
            }
            updateData.dir = -updateData.dir;
        }
    }

    private addShader() {
        let vertexSrc = `
            attribute vec2 aVertexPosition;
            attribute vec2 aTextureCoord;
            attribute vec2 aColor;

            uniform vec2 projectionVector;

            varying vec2 vTextureCoord;
            varying vec4 vColor;

            const vec2 center = vec2(-1.0, 1.0);

            void main(void) {
                gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);
                vTextureCoord = aTextureCoord;
                vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);
            }
        `;

        let fragmentSrc1 = `
            precision lowp float;
            varying vec2 vTextureCoord;
            varying vec4 vColor;
            uniform sampler2D uSampler;

            uniform float angle;
            uniform float scale;

            void main() {
                vec2 uv = vTextureCoord.xy;
                vec2 texCoord = uv;
                float tx,ty,cosVal;
                cosVal = cos(angle);
                if(uv.x <= 0.5) {
                    tx = 0.5 - (0.5-uv.x)/cosVal;
                    if(tx < 0.0) {
                        gl_FragColor = vec4(0,0,0,0);
                    } else {
                        if(cosVal < 0.0) {
                            texCoord.x = 1.0 - tx;
                        } else {
                            texCoord.x = tx;
                        }
                        ty = 0.5 - tx;
                        ty = 2.0*ty*scale;
                        texCoord.y = (ty+uv.y)/(1.0+(2.0*ty));
                        gl_FragColor = texture2D(uSampler, texCoord);
                    }
                } else {
                    tx =(uv.x-0.5)/cosVal;
                    if(tx > 0.5) {
                        gl_FragColor = vec4(0,0,0,0);
                    } else {
                        if(cosVal < 0.0) {
                            texCoord.x = 0.5-tx;
                        } else {
                            texCoord.x = 0.5+tx;
                        }
                        ty = tx;
                        ty = 2.0 * ty *scale;
                        texCoord.y = (uv.y - ty)/(1.0 -2.0*ty);
                        gl_FragColor = texture2D(uSampler, texCoord);
                    }
                }
            }
        `;
        let fragmentSrc2 = `
            precision lowp float;
            varying vec2 vTextureCoord;
            varying vec4 vColor;
            uniform sampler2D uSampler;

            uniform float angle;
            uniform float scale;

            void main() {
                vec2 uv = vTextureCoord.xy;
                vec2 texCoord = uv;
                float tx,ty,cosVal;
                cosVal = cos(angle);
                if(uv.y <= 0.5) {
                    ty = 0.5 - (0.5-uv.y)/cosVal;
                    if(ty < 0.0) {
                        gl_FragColor = vec4(0,0,0,0);
                    } else {
                        if(cosVal < 0.0) {
                            texCoord.y = 1.0 - ty;
                        } else {
                            texCoord.y = ty;
                        }
                        tx = 0.5 - ty;
                        tx = 2.0*tx*scale;
                        texCoord.x = (tx+uv.x)/(1.0+(2.0*tx));
                        gl_FragColor = texture2D(uSampler, texCoord);
                    }
                } else {
                    ty =(uv.y-0.5)/cosVal;
                    if(ty > 0.5) {
                        gl_FragColor = vec4(0,0,0,0);
                    } else {
                        if(cosVal < 0.0) {
                            texCoord.y = 0.5-ty;
                        } else {
                            texCoord.y = 0.5+ty;
                        }
                        tx = ty;
                        tx = 2.0 * tx *scale;
                        texCoord.x = (uv.x - tx)/(1.0 -2.0*tx);
                        gl_FragColor = texture2D(uSampler, texCoord);
                    }
                }
            }
        `;
        //水平翻转
        this.hFilter = new egret.CustomFilter(vertexSrc, fragmentSrc1, {
            angle: 0 * Math.PI / 180,
            scale: 0.0
        });
        //垂直翻转
        this.vFilter = new egret.CustomFilter(vertexSrc, fragmentSrc2, {
            angle: 0 * Math.PI / 180,
            scale: 0.0
        });
        this.updateData1 = { dir: -1, changed: false };
        this.updateData2 = { dir: -1, changed: false };

        this.poke1.filters = [this.hFilter];
        this.poke2.filters = [this.vFilter];
    }

    private hFilter: egret.CustomFilter;
    private vFilter: egret.CustomFilter;
}