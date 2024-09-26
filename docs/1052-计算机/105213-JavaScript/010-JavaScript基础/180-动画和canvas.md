---
id: d042e820-8deb-44fa-84c2-706fcb1555f9
---

# 动画和 Canvas

## 动画

### 早期动画

##### 机制

- 使用 setInterval() 控制动画;

##### 问题

- setInterval() 无法保证时间间隔精度;

### requestAnimationFrame

- 在浏览器重绘之前调用;
- 根据屏幕刷新率同步;

```typescript
function updateProgress() {
  var div = document.getElementById("status");
  div.style.width = parseInt(div.style.width, 10) + 5 + "%";
  if (div.style.left != "100%") {
    requestAnimationFrame(updateProgress);
  }
}
// 参数为重绘屏幕前调用的函数
// 返回一个 ID
let requestID = requestAnimationFrame(updateProgress);
```

### cancelAnimationFrame

```typescript
let requestID = window.requestAnimationFrame(() => {
  console.log("Repaint!");
});
// 取消重绘任务
window.cancelAnimationFrame(requestID);
```

## canvas

##### 创建 canvas 标签

```typescript
<canvas id="drawing" width="200" height="200">
  A drawing of something.
</canvas>
```

##### 获得 canvas 上下文

```typescript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 其他代码
}
```

##### 导出 canvas 图像

```typescript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  // 取得图像的数据 URI, 只能是相同域
  let imgURI = drawing.toDataURL("image/png");
  // 显示图片
  let image = document.createElement("img");
  image.src = imgURI;
  document.body.appendChild(image);
}
```

## 简单绘制

### 填充和描边

```typescript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  context.strokeStyle = "red"; // 描边样式
  context.fillStyle = "#0000ff"; // 填充样式
}
```

### 绘制矩形

##### 绘制填充矩形

```typescript
// fillRect 四个参数依次为 x, y, width, height
// fillStyle 设置填充颜色
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 绘制红色矩形
  context.fillStyle = "#ff0000";
  context.fillRect(10, 10, 50, 50);
  // 绘制半透明蓝色矩形
  context.fillStyle = "rgba(0,0,255,0.5)";
  context.fillRect(30, 30, 50, 50);
}
```

##### 绘制描边矩形

```typescript
// strokeRect 四个参数依次为 x, y, width, height
// strokeStyle 设置描边颜色
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 绘制红色轮廓的矩形
  context.strokeStyle = "#ff0000";
  context.strokeRect(10, 10, 50, 50);
  // 绘制半透明蓝色轮廓的矩形
  context.strokeStyle = "rgba(0,0,255,0.5)";
  context.strokeRect(30, 30, 50, 50);
}
```

##### 擦除矩形区域

```typescript
// clearRect 四个参数依次为 x, y, width, height
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 绘制红色矩形
  context.fillStyle = "#ff0000";
  context.fillRect(10, 10, 50, 50);
  // 绘制半透明蓝色矩形
  context.fillStyle = "rgba(0,0,255,0.5)";
  context.fillRect(30, 30, 50, 50);
  // 在前两个矩形重叠的区域擦除一个矩形区域
  context.clearRect(40, 40, 10, 10);
}
```

### 绘制路径

##### 绘制

```typescript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // 创建路径
  context.beginPath();
  // 绘制圆
  context.arc(100, 100, 99, 0, 2 * Math.PI, false); // 坐标(x, y)为圆心, 以 radius 为半径绘制一条弧线, 起始角度为 startAngle, 结束角度为 endAngle (弧度), false 表示顺序针计算角度
  // 绘制直线
  context.lineTo(100, 15); // 绘制上一点到 (100, 15) 的直线
  // 绘制矩形
  context.rect(100, 20, 20, 30); // 在 (100, 200) 绘制 20 * 30 的矩形
  // 移动至某一点, 绘制路径时最好提前移动至路径上, 防止多余绘制
  context.moveTo(194, 100); // 移动光标至 (194, 100)
  // 绘制一条返回起点的线
  context.closePath();
  // 绘制路径, 两者皆可
  context.stroke(); // 使用 strokeStyle 设置样式
  context.fill(); // 使用 fillStyle 设置样式
}
```

##### isPointInPath()

```typescript
// 判断 (100, 100) 是否在路径上, 在 context.closePath() 前使用
if (context.isPointInPath(100, 100)) {
  alert("Point (100, 100) is in the path.");
}
```

### 绘制文本

##### 绘制文本

```typescript
// 设置样式
context.font = "bold 14px Arial"; // 设置字体样式
context.textAlign = "center"; // 设置对齐方式
context.textBaseline = "middle"; // 设置文本基线
// 绘制文本
context.fillText("12", 100, 20, 10); // 在 (100, 20) 绘制 12, 最大宽度为 10, 使用 fillStyle 设置样式
context.strokeText("12", 100, 20, 10); // 在 (100, 20) 绘制 12, 最大宽度为 10, 使用 strokeStyle 设置样式
```

##### measureText()

```typescript
// 根据 font, textAlign 和 textBaseline 属性计算文本大小
context.measureText("Hello world!").width;
```

## 高级绘制

### 阴影

```typescript
let context = drawing.getContext("2d");
// 设置阴影
context.shadowOffsetX = 5; // 阴影 x 方向偏移
context.shadowOffsetY = 5; // 阴影 y 方向偏移
context.shadowBlur = 4; // 阴影模糊量
context.shadowColor = "rgba(0, 0, 0, 0.5)"; // 阴影颜色
// 绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);
// 绘制蓝色矩形
context.fillStyle = "rgba(0,0,255,1)";
context.fillRect(30, 30, 50, 50);
```

### 渐变

##### 线性渐变

```typescript
// 创建线性渐变实例
let gradient = context.createLinearGradient(30, 30, 70, 70); // 起始坐标 (30, 30), 终止坐标 (70, 70)
// 指定渐变色标
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");
// 绘制渐变矩形
context.fillStyle = gradient;
context.fillRect(30, 30, 50, 50);
```

##### 径向渐变

```typescript
// 创建线性渐变实例
let gradient = context.createRadialGradient(55, 55, 10, 55, 55, 30); // 起始圆心位置 (55, 55), 半径为 10, 终止圆心位置 (55, 55), 半径为 30
// 指定渐变色标
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");
// 绘制渐变矩形
context.fillStyle = gradient;
context.fillRect(30, 30, 50, 50);
```

### 绘制图像

##### 绘制图像

```typescript
// 绘制图像
let image = document.images[0];
context.drawImage(image, 10, 10); // 在 (10, 10) 绘制 image
context.drawImage(image, 50, 10, 20, 30); // 在 (50, 10) 绘制 image, 并缩放至 20 * 30
context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60); // 在 image 的 (0, 10) 为原点取 50 * 50 的图像, 并在画布 (0, 100) 绘制, 缩放为 40 * 60
```

### 图案

```typescript
let image = document.images[0];
// 创建图案实例
let pattern = context.createPattern(image, "repeat"); // 图案为 image, repeat 指定重复方式 (同 background-repeat)
// 绘制矩形
context.fillStyle = pattern;
context.fillRect(10, 10, 150, 150);
```

### 图像数据

##### 获取图像数据

```typescript
let imageData = context.getImageData(10, 5, 50, 50); // 获取 context 起点 (10, 5), 大小 50 * 50 的图像数据
let data = imageData.data; // ImageData 实例
let red = data[0]; // R 波段
let green = data[1]; // G 波段
let blue = data[2]; // B 波段
let alpha = data[3]; // A 波段
```

##### 设置图像数据

```typescript
imageData.data = data;
context.putImageData(imageData, 0, 0); // 从 (0, 0) 使用 imageData 填充 context
```

## 图形变换

### 合成

##### 透明度

```typescript
// 修改全局透明度
context.globalAlpha = 0.5;
```

##### 合成

- source-over: 默认值, 新图形覆盖原图形;
- source-in: 新图形覆盖原图形, 新图形和原图形取交集;
- source-out: 新图形覆盖原图形, 新图形和原图形取空集;
- source-atop: 新图形覆盖原图形, 新图形和原图形取交集,原图形不受影响;
- destination-over: 原图形覆盖新图形;
- destination-in: 原图形覆盖新图形, 新图形和原图形取交集;
- destination-out: 原图形覆盖新图形, 新图形和原图形取空集;
- destination-atop: 新图形覆盖原图形, 新图形和原图形取交集, 新图形不受影响;
- lighter: 新图形与原图形重叠部分的像素值相加, 该部分变亮;
- copy: 新图形将擦除并完全取代原图形;
- xor: 新图形与原图形重叠部分像素执行 "异或" 计算;

```typescript
// 绘制红色矩形
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);
// 设置合成方式
context.globalCompositeOperation = "destination-over";
// 绘制蓝色矩形
context.fillStyle = "rgba(0,0,255,1)";
context.fillRect(30, 30, 50, 50);
```

### 变换

##### 矩阵变化

```typescript
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas>
if (drawing.getContext) {
  let context = drawing.getContext("2d");
  // ...
  // 旋转
  context.rotate(1); // 围绕原点旋转 1 弧度
  context.scale(2, 0.5); // x 方向乘 2, y 方向乘 0.5
  context.translate(10, 20); // 移动原点至 (10, 20)
  // 进行矩阵变化
  context.transform(1, 2, 1, 2, 1, 1); // 依次为 m1_1, m1_2, m2_1, m2_2, dx, dy
  // 矩阵重置, 在调用 transform()
  context.setTransform(1, 2, 1, 2, 1, 1); // m1_1, m1_2, m2_1, m2_2, dx, dy
}
```

##### 保存

```typescript
// save() 保存设置至一个暂存栈
// restore() 从暂存栈中取出并恢复设置
context.fillStyle = "#ff0000";
context.save();
context.fillStyle = "#00ff00";
context.translate(100, 100);
context.save();
context.fillStyle = "#0000ff";
context.fillRect(0, 0, 100, 200); // 在(100, 100)绘制蓝色矩形
context.restore();
context.fillRect(10, 10, 100, 200); // 在(100, 100)绘制绿色矩形
context.restore();
context.fillRect(0, 0, 100, 200); // 在(0, 0)绘制红色矩形
```

## 最佳实践

### canvas 转 png

```typescript
if (isPosition) {
  const urlData = map?.getCanvas().toDataURL()!;
  let base = window.atob(urlData.substring(urlData.indexOf(",") + 1));
  let length = base.length;
  let url = new Uint8Array(length);
  while (length--) {
    url[length] = base.charCodeAt(length);
  }
  let file = new File([url], `logo.png`, {
    type: "image/png",
  });

  let param = new FormData();
  param.append("datasetID", "assets");
  param.append("file", file);
  result = await axios.request({
    url: serverHost + "/api/data/upload",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: param,
  });
} else;
```
