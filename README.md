# c3d

构建canvas的3d效果

```
var data = [
    [a,b,c],
    [b,a,c],
    [c,a,b]
]
var _c3d = new c3d(ctx);
_c3d.data(data);
_c3d.draw(data);
```

a,b,c为三个包含x,y,z的数组

data中的数据为某点与其相连的其他点的数组

.data:输入数据

.draw:绘制模型

绘制结束后得到一个正面朝着屏幕的模型

[demo](https://zhangsens.github.io/demo/canvas3D.html)