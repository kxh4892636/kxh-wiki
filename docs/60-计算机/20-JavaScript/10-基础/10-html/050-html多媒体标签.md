---
id: adea75ae-854b-4e1c-ba5d-8387cbe0f7cb
---

# html 多媒体标签

## 图片

### img element

##### 语法格式

- src：图片 url；
- alt：图片描述信息；

```html
<a href="https://developer.mozilla.org">
  <img
    src="favicon144.png"
    alt="Visit the MDN site"
    width="100px"
    height="100px"
  />
</a>
```

##### 响应式图片

- 根据屏幕像素比选择不同分辨率的图片；
  - srcset：url + ddr；
- 根据设备屏幕宽度选择不同分辨率图片；
  - srcset：url + 图片固有宽度；
  - sizes：设置对应媒体查询；

```html
<img
  srcset="elva-fairy-320w.jpg, elva-fairy-480w.jpg 1.5x, elva-fairy-640w.jpg 2x"
  src="elva-fairy-640w.jpg"
  alt="Elva dressed as a fairy"
/>

<img
  srcset="elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w"
  sizes="(max-width: 600px) 480px,
            800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy"
/>
```

### picture element

##### 语法格式

- 嵌套 img\> 标签和多个 \<picture 标签；
- 浏览器不支持 picture\> 显示 \<img 标签；
- 常用于响应式图片；

```html
<picture>
  <source srcset="photo.avif" type="image/avif" />
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="photo" />
</picture>
```

##### 响应式图片

- 根据屏幕像素比选择不同分辨率的图片；
  - srcset：url + ddr；
- 根据设备屏幕宽度选择不同分辨率图片；
  - srcset：url + 图片固有宽度；
  - sizes：设置对应媒体查询；
- 根据图片类型选择虚着呢图片；
  - type：设置对应 MIME 类型；
- 根据媒体查询选择图片；
  - media 设置媒体查询；

```html
<picture>
  <source srcset="photo.avif" type="image/avif" />
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="photo" />
</picture>

<picture>
  <source srcset="mdn-logo-wide.png" media="(min-width: 1000px)" />
  <source srcset="mdn-logo.png" media="(min-width: 600px)" />
  <img src="mdn-logo-narrow.png" alt="MDN" />
</picture>

<picture>
  <source srcset="logo-768.png, logo-768-1.5x.png 1.5x" />
  <img src="logo-320.png" alt="logo" />
</picture>

<picture>
  <source srcset="elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w" />
  <img src="logo-320.png" alt="logo" />
</picture>
```

### figure element

- 嵌套 img\> 和 \<figcaption 标签；
- figcaption 标签作为图片标题；

```html
<figure>
  <img src="/media/cc0-images/elephant-660-480.jpg" alt="Elephant at sunset" />
  <figcaption>An elephant at sunset</figcaption>
</figure>
```

## 音频和视频

### audio element

- 音频标签；
- 内部使用 p 标签用于音频无法播放的情境下作为 feedback；
- src：表示音频 URL；
- control：表示是否启用自带控制组件；
- autoplay：表示是否自动播放；
- loop：是否默认循环播放；
- muted：表示是否默认静音；
- preload：表示是否默认缓冲；

```html
<audio src="AudioTest.ogg" controls autoplay loop muted preload>
  <p>Your browser does not support the <code>audio</code> element.</p>
</audio>
```

### video element

- 视频标签；
- 内部使用 p 标签用于音频无法播放的情境下作为 feedback；
- src：表示音频 URL；
- control：表示是否启用自带控制组件；
- autoplay：表示是否自动播放；
- loop：是否默认循环播放；
- muted：表示是否默认静音；
- preload：表示是否默认缓冲；
- poster：表示视频封面 URL；

```html
<video
  src="myVideo.mp4"
  width="100px"
  height="100px"
  controls
  autoplay
  loop
  muted
  preload
  poster="poster.mp4"
>
  <p>Your browser does not support the <code>video</code> element.</p>
</video>
```

### 响应式多媒体

- source\> 标签嵌套于 audio 和 \<video 标签内部，用于响应式多媒体；
- 具体使用参照 picture 标签响应式图片；

```html
<video controls>
  <source src="foo.webm" type="video/webm" />
  <source src="foo.ogg" type="video/ogg" />
  <source src="foo.mov" type="video/quicktime" />
  <p>I'm sorry; your browser doesn't support HTML5 video.</p>
</video>
```

## track element

##### 语法格式

- 字幕标签，内嵌于 audio\> 和 \<video 标签；
- 通过使用多个 track 标签表示多个字幕；
- default：表示默认字幕；
- src：表示字幕 URL；
- label：表示字幕用户界面显示文字；
- srclang：表示字幕语言类型，kind 属性为 subtitles 必须使用；
- kind：表示字幕类型；

```html
<video controls poster="/images/sample.gif">
  <source src="sample.mp4" type="video/mp4" />
  <source src="sample.ogv" type="video/ogv" />
  <track kind="captions" src="sampleCaptions.vtt" srclang="en" />
  <track kind="descriptions" src="sampleDescriptions.vtt" srclang="en" />
  <track kind="chapters" src="sampleChapters.vtt" srclang="en" />
  <track default kind="subtitles" src="sampleSubtitles_en.vtt" srclang="en" />
</video>
```

##### kind 属性值详解

- subtitles：表示用于非母语人群的字幕，默认值；
- caption：表示用于母语人群的字幕，一般用于听障人士或静音场合。
- descriptions：表示场景描述的字幕
- chapters：表示电影章节的字幕；
- metadata：表示电影元数据的字幕，不可见。
