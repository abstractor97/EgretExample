var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 切图工具类
 * @author chenkai
 * @since 2017/4/17
 */
var CutImgTool = (function () {
    function CutImgTool() {
    }
    /**
     * 切图
     * @srcBm 源图
     * @maxRow 有几行
     * @maxCol 有几列
     * @startPos 从第几张位置开始切(包含该位置)
     * @pieceNum 切多少张
     * @width tile宽度
     * @height tile高度
     * @returns 返回切割的纹理列表
     */
    CutImgTool.cutTile = function (srcBm, maxRow, maxCol, startPos, pieceNum, width, height) {
        var rect = new egret.Rectangle(); //切割矩形区域
        var cutCount = 0; //当前已切割多少块
        var textureList = []; //保存切割的纹理
        for (var i = 0; i < maxRow; i++) {
            for (var j = 0; j < maxCol; j++) {
                //>=起始位置，并且<=切割数量
                if ((i * maxCol + j >= startPos) && cutCount <= pieceNum) {
                    var renderTexture = new egret.RenderTexture();
                    rect.x = j * width;
                    rect.y = i * height;
                    rect.width = width;
                    rect.height = height;
                    if (renderTexture.drawToTexture(srcBm, rect) == false) {
                        console.error("CutImgTool >> cut error");
                        return null;
                    }
                    else {
                        textureList.push(renderTexture);
                        cutCount++;
                    }
                }
                else {
                    return textureList;
                }
            }
        }
        return textureList;
    };
    return CutImgTool;
}());
__reflect(CutImgTool.prototype, "CutImgTool");
