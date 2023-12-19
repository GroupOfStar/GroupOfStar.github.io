interface IFontString {
  fontSize: number;
  fontFamily?: string;
  italic?: string;
  bold?: string;
}

let measureTextContext: CanvasRenderingContext2D | null = null;

// 拼接font字符串
function joinFontStr(fontStr: IFontString) {
  const italic = fontStr.italic ? "italic" : "";
  const bold = fontStr.bold ? "bold" : "";
  return `${italic} ${bold} ${fontStr.fontSize}px ${fontStr.fontFamily} `;
}

// 计算节点的文本长宽
function measureText(
  text: string,
  fontStr: IFontString = {
    fontSize: 16,
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif"
  }
) {
  const font = joinFontStr(fontStr);
  if (!measureTextContext) {
    const canvas = document.createElement("canvas");
    measureTextContext = canvas.getContext("2d");
  }

  const textSize = { width: 0, height: 0 };
  if (measureTextContext) {
    measureTextContext.save();
    measureTextContext.font = font;
    const textMetrics = measureTextContext.measureText(text);
    textSize.width = textMetrics.width;
    textSize.height =
      textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent;
    measureTextContext.restore();
  }
  return textSize;
}
