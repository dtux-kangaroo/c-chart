

# 开始使用

### 完整引入
-----

```js
import React, { Component } from 'react';
import { KoBar,... } from 'ko-charts';

class App extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const chartData = [...],chartSetting = [...];
    
    return(
      <KoBar name={'ve-line'} data={chartData} settings={chartSetting} legend-visible={false} tooltip-visible={false} />
    )
  }
}
```

### 按需引入
-----

v-charts的每种图表组件，都已经单独打包到lib文件夹下了
```
|- lib/package/
    |- line/index.js  -------------- 折线图
    |- bar/index.js  --------------- 条形图
    |- histogram/index.js  --------- 柱状图
    |- pie/index.js  --------------- 饼图
    |- ring/index.js  -------------- 环图
    |- funnel/index.js  ------------ 漏斗图
    |- waterfall/index.js  --------- 瀑布图
    |- radar/index.js  ------------- 雷达图
    |- map/index.js  --------------- 地图
    |- sankey/index.js  ------------ 桑基图
    |- heatmap/index.js  ----------- 热力图
    |- scatter/index.js  ----------- 散点图
    |- candle/index.js  ------------ k线图
    |- gauge/index.js  ------------- 仪表盘
    |- tree/index.js  -------------- 树图
    |- bmap/index.js  -------------- 百度地图
    |- amap/index.js  -------------- 高德地图
```
使用时，可以直接将单个图表引入到项目中
```js
import React, { Component } from 'react';
import KoLine from 'v-charts/lib/package/line';

class App extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const chartData = [...],chartSetting = [...];

    return(
      <KoLine name={'ve-line'} data={chartData} settings={chartSetting} legend-visible={false} tooltip-visible={false} />
    )
  }
}
```
