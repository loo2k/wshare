## wshare 分享插件简介

wshare 是一个可以自定义网页分享内容的一个 jQuery 插件，可以方便的自定义分享按钮点击之后的分享内容/链接/图片/视频。

同时，wshare 仅保留少数的分享站点，对比起现有的一些分享插件更加简洁，更加轻便。

## 快速使用

### HTML

```wshare``` 插件依赖 ```jQuery``` 库，所以在使用之前需要先引用 ```jQuery``` 库，并加载 wshare 插件：

```html
<script src="path/jquery.min.js"></script>
<script src="path/wshare.js"></script>
```

指定好 ```data-toggle``` 和 ```data-type``` 属性即可直接使用。

```html
<a id="wshare-demo" data-toggole="wshare" data-type="weibo" href="javascript:;">分享到微博</a>
```

### JavaScript

在没有指定 ```data-type``` 属性的时候可以通过 JavaScript 绑定。

```javascript
$(function() {
	$('#wshare-demo').wshare();
})
```

### 默认分享

如果你是用以上的代码，默认的分享内容是网页的标题，默认的链接是当前页面的 URL，图片跟视频为空。

## 使用方法

### 通过 HTML 属性使用

给你需要绑定 wshare 插件的元素增加 ```data-toggle="wshare"``` 和 ```data-type="weibo"``` 属性即可。

（该样例的演示的是绑定 wshare 插件，分享方式使用的是新浪微博）

在默认的情况下你甚至不用编写 JavaScript 代码，就能指定需要分享的内容：

```html
<!-- 你需要先指定好绑定元素的 ID，这里是 wshare-demo -->
<a id="wshare-demo" data-toggle="wshare" data-type="weibo" href="javascript:;">分享到微博</a>
```

你可以根据下面的 HTML 代码指定这个按钮点击之后的分享内容，这是在没有使用 JavaScript 控制的时候优先级最高的方法：

```html
<!-- 根据绑定元素的 ID 可以指定该 ID 的分享内容，ID 设置为 ID_wsContent -->
<input id="wshare-demo_wsContent" type="hidden" value="wshare 是一个简洁轻便的网页分享插件">

<!-- 根据绑定元素的 ID 可以指定该 ID 的分享链接，ID 设置为 ID_wsUrl -->
<input id="wshare-demo_wsUrl" type="hidden" value="http://github.com/loo2k/wshare">

<!-- 根据绑定元素的 ID 可以指定该 ID 的分享图片，ID 设置为 ID_wsPic -->
<input id="wshare-demo_wsPic" type="hidden" value="http://placehold.it/150x150">

<!-- 根据绑定元素的 ID 可以指定该 ID 的分享视频，ID 设置为 ID_wsVideo -->
<input id="wshare-demo_wsVideo" type="hidden" value="http://v.youku.com/v_show/id_XMTA5MjI1Nzcy.html">
```

同时，你可以根据下面的 HTML 代码指定网页内所有分享按钮点击之后的分享内容：

```html
<!-- 指定全局的分享内容 -->
<input id="wsContent" type="hidden" value="wshare 是一个简洁轻便的网页分享插件">

<!-- 指定全局的分享链接 -->
<input id="wsUrl" type="hidden" value="http://github.com/loo2k/wshare">

<!-- 指定全局的分享图片 -->
<input id="wsPic" type="hidden" value="http://placehold.it/150x150">

<!-- 指定全局的分享视频 -->
<input id="wsVideo" type="hidden" value="http://v.youku.com/v_show/id_XMTA5MjI1Nzcy.html">
```

如果你给 ```#wshare-demo``` 元素指定了 ```data-target``` 属性的话，插件会优先调用以 ```data-target``` 属性指定的值来匹配 ID，如：

```html
<a id="wshare-demo" data-toggle="wshare" data-type="weibo" data-target="Weibo" href="javascript:;">分享到微博</a>
```

则会优先调用：

```html
<!-- 分享内容 -->
<input id="Weibo_wsContent" type="hidden" value="wshare 是一个简洁轻便的网页分享插件">

<!-- 分享链接/图片/视频同理... -->
```

### 通过 JavaScript 使用

通过 JavaScript 使用你也可以使用跟 HTML 一样的方法进行绑定，但是在这里的演示将尽量使用 JavaScript 操作。

首先，你有一个需要绑定的 HTML 元素：

```html
<a id="wshare-demo" href="javascirpt:;">分享到微博</a>
```

使用 JavaScript 对元素进行绑定：

```javascript
<!-- 默认的绑定方法 -->
$(function() {
	$('#wshare-demo').wshare();
})
```

这样绑定了的元素也会像 HTML 绑定一样，寻找指定的元素获得需要分享的内容，而且会根据网页中的 ```window``` 对象获得指定的分享内容。

```html
<!-- 根据绑定元素的 ID 可以指定该 ID 的分享内容，增加 window 子对象 ID_wsContent -->
window['wshare-demo_wsContent'] = 'wshare 是一个简洁轻便的网页分享插件';

<!-- 根据绑定元素的 ID 可以指定该 ID 的分享链接，增加 window 子对象 ID_wsUrl -->
window['wshare-demo_wsUrl'] = 'http://github.com/loo2k/wshare';

<!-- 图片/视频等同理... -->
```

你也可以用在 ```window``` 对象中设置全局的分享内容

```javascript
<!-- 指定全局的分享内容 -->
window['wsContent'] = 'wshare 是一个简洁轻便的网页分享插件';

<!-- 链接/图片/视频同理... -->
```

你也可以在绑定事件的时候指定 ```target```：

```javascript
$(function() {
	$('#wshare-demo').wshare({
		target: 'Weibo'
	})
})

// 按照以上方法绑定则会优先获取 window 对象中的 Weibo_wsContent 的内容
window['Weibo_wsContent'] = "wshare 是一个简洁轻便的网页分享插件";
```

### 选项

| *属性*	|*数据类型*	|*默认值*	|*说明*	|
|---|:---:|:---:|---|
| type	|String		|weibo	|分享方式，默认值是新浪微博，腾讯微博则为 "qq"，目前仅支持两种分享方式 |
| target	|String		|false	|如果指定了 target 插件会优先调用以 target 开头以 _wsContent 的元素或者 window 对象的属性为默认的分享内容 |
| wsContent	|String/Function	|false	|此处设置分享内容，优先级最高，如果 function 返回值是 false 则调用默认处理方式 |
| wsUrl		|String/Function	|false	|此处设置分享链接，优先级最高，如果 function 返回值是 false 则调用默认处理方式 |
| wsPic		|String/Function	|false	|此处设置分享图片，优先级最高，如果 function 返回值是 false 则调用默认处理方式 |
| wsVideo	|String/Function	|false	|此处设置分享视频，优先级最高，如果 function 返回值是 false 则调用默认处理方式 |

### 说明

wsVideo 暂时没有支持，后续版本会提供 wsVideo 支持