var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TestShader = (function (_super) {
    __extends(TestShader, _super);
    function TestShader() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    TestShader.prototype.onAddToStage = function (e) {
        console.log("onAddToStage");
        // let bg = new egret.Bitmap(RES.getRes("bg_jpg"));
        // bg.width = this.stage.stageWidth;
        // bg.height = this.stage.stageHeight;
        // this.addChild(bg);
        this.poke1 = new egret.Bitmap(RES.getRes("poke0_png"));
        this.addChild(this.poke1);
        this.poke1.x = this.stage.stageWidth / 2 - this.poke1.width - 100;
        this.poke1.y = this.stage.stageHeight / 2 - this.poke1.height / 2;
        this.poke2 = new egret.Bitmap(RES.getRes("poke0_png"));
        this.addChild(this.poke2);
        this.poke2.x = this.stage.stageWidth / 2 - 100;
        this.poke2.y = this.stage.stageHeight / 2 - this.poke2.height / 2;
        this.addShader();
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    TestShader.prototype.update = function (e) {
        if (this.poke1.filters && this.poke1.filters.length > 0) {
            this.updateFilter(this.poke1, this.updateData1);
        }
        if (this.poke2.filters && this.poke2.filters.length > 0) {
            this.updateFilter(this.poke2, this.updateData2);
        }
    };
    TestShader.prototype.updateFilter = function (poke, updateData) {
        var filter = poke.filters[0];
        filter.uniforms.angle -= 2.0 * Math.PI / 180;
        if (filter.uniforms.angle < 0.0) {
            filter.uniforms.angle += Math.PI;
            updateData.changed = false;
        }
        if (filter.uniforms.angle >= Math.PI / 2.0) {
            filter.uniforms.scale = 0.2 * ((Math.PI - filter.uniforms.angle) * 2 / Math.PI);
        }
        else {
            if (!updateData.changed) {
                if (updateData.dir < 0) {
                    poke.texture = RES.getRes("poke13_png");
                }
                else if (updateData.dir > 0) {
                    poke.texture = RES.getRes("poke0_png");
                }
                updateData.dir = -updateData.dir;
                updateData.changed = true;
            }
            filter.uniforms.scale = 0.2 * filter.uniforms.angle * 2 / Math.PI;
        }
        if (filter.uniforms.angle >= Math.PI / 1.0) {
            filter.uniforms.angle = 0.0;
            if (updateData.dir < 0) {
                poke.texture = RES.getRes("poke13_png");
            }
            else {
                poke.texture = RES.getRes("poke0_png");
            }
            updateData.dir = -updateData.dir;
        }
    };
    TestShader.prototype.addShader = function () {
        var vertexSrc = "\n            attribute vec2 aVertexPosition;\n            attribute vec2 aTextureCoord;\n            attribute vec2 aColor;\n\n            uniform vec2 projectionVector;\n\n            varying vec2 vTextureCoord;\n            varying vec4 vColor;\n\n            const vec2 center = vec2(-1.0, 1.0);\n\n            void main(void) {\n                gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n                vTextureCoord = aTextureCoord;\n                vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n            }\n        ";
        var fragmentSrc1 = "\n            precision lowp float;\n            varying vec2 vTextureCoord;\n            varying vec4 vColor;\n            uniform sampler2D uSampler;\n\n            uniform float angle;\n            uniform float scale;\n\n            void main() {\n                vec2 uv = vTextureCoord.xy;\n                vec2 texCoord = uv;\n                float tx,ty,cosVal;\n                cosVal = cos(angle);\n                if(uv.x <= 0.5) {\n                    tx = 0.5 - (0.5-uv.x)/cosVal;\n                    if(tx < 0.0) {\n                        gl_FragColor = vec4(0,0,0,0);\n                    } else {\n                        if(cosVal < 0.0) {\n                            texCoord.x = 1.0 - tx;\n                        } else {\n                            texCoord.x = tx;\n                        }\n                        ty = 0.5 - tx;\n                        ty = 2.0*ty*scale;\n                        texCoord.y = (ty+uv.y)/(1.0+(2.0*ty));\n                        gl_FragColor = texture2D(uSampler, texCoord);\n                    }\n                } else {\n                    tx =(uv.x-0.5)/cosVal;\n                    if(tx > 0.5) {\n                        gl_FragColor = vec4(0,0,0,0);\n                    } else {\n                        if(cosVal < 0.0) {\n                            texCoord.x = 0.5-tx;\n                        } else {\n                            texCoord.x = 0.5+tx;\n                        }\n                        ty = tx;\n                        ty = 2.0 * ty *scale;\n                        texCoord.y = (uv.y - ty)/(1.0 -2.0*ty);\n                        gl_FragColor = texture2D(uSampler, texCoord);\n                    }\n                }\n            }\n        ";
        var fragmentSrc2 = "\n            precision lowp float;\n            varying vec2 vTextureCoord;\n            varying vec4 vColor;\n            uniform sampler2D uSampler;\n\n            uniform float angle;\n            uniform float scale;\n\n            void main() {\n                vec2 uv = vTextureCoord.xy;\n                vec2 texCoord = uv;\n                float tx,ty,cosVal;\n                cosVal = cos(angle);\n                if(uv.y <= 0.5) {\n                    ty = 0.5 - (0.5-uv.y)/cosVal;\n                    if(ty < 0.0) {\n                        gl_FragColor = vec4(0,0,0,0);\n                    } else {\n                        if(cosVal < 0.0) {\n                            texCoord.y = 1.0 - ty;\n                        } else {\n                            texCoord.y = ty;\n                        }\n                        tx = 0.5 - ty;\n                        tx = 2.0*tx*scale;\n                        texCoord.x = (tx+uv.x)/(1.0+(2.0*tx));\n                        gl_FragColor = texture2D(uSampler, texCoord);\n                    }\n                } else {\n                    ty =(uv.y-0.5)/cosVal;\n                    if(ty > 0.5) {\n                        gl_FragColor = vec4(0,0,0,0);\n                    } else {\n                        if(cosVal < 0.0) {\n                            texCoord.y = 0.5-ty;\n                        } else {\n                            texCoord.y = 0.5+ty;\n                        }\n                        tx = ty;\n                        tx = 2.0 * tx *scale;\n                        texCoord.x = (uv.x - tx)/(1.0 -2.0*tx);\n                        gl_FragColor = texture2D(uSampler, texCoord);\n                    }\n                }\n            }\n        ";
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
    };
    return TestShader;
}(egret.DisplayObjectContainer));
__reflect(TestShader.prototype, "TestShader");
//# sourceMappingURL=TestShader.js.map