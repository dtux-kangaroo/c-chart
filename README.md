<h3 align="center">c-charts</h3>

<p align="center">
  <a href="https://travis-ci.org/ElemeFE/v-charts">
    <img src="https://travis-ci.org/ElemeFE/v-charts.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://npmjs.org/package/v-charts">
    <img src="http://img.shields.io/npm/dm/v-charts.svg" alt="NPM downloads">
  </a>
  <a href="https://www.npmjs.org/package/v-charts">
    <img src="https://img.shields.io/npm/v/v-charts.svg" alt="Npm package">
  </a>
  <a>
    <img src="https://img.shields.io/badge/language-javascript-yellow.svg" alt="Language">
  </a>
  <a>
    <img src="https://img.shields.io/badge/license-MIT-000000.svg" alt="License">
  </a>
  <a href="https://gitter.im/ElemeFE/v-charts?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge">
    <img src="https://badges.gitter.im/ElemeFE/v-charts.svg" alt="Join the chat">
  </a>
</p>

<p align="center">
  <a href="https://v-charts.js.org">
    文档
  </a>
  <span> | </span>
  <a href="https://codesandbox.io/s/z69myovqzx">
    示例项目
  </a>
  <span> | </span>
  <a href="./README.md">
    English
  </a>
  <span> | </span>
  <a>
    中文
  </a>
</p>

> 基于 v-charts 封装的 Echarts 图表组件的react版本

## 特性

- **统一的数据格式：** 使用对前后端都友好的数据格式，方便生成和修改。
- **简化的配置项：** 通过简化的配置项，可以轻松实现复杂需求。
- **定制简单：** 提供多种自定义 Echarts 方式，可以方便的设置图表配置项。

## 支持性

支持所有现代浏览器及 IE10+ ，包括 pc 端和移动端。

## 安装

```

```

## 快速上手

```
import { CeBar } from '../../../chartPackage/packages';


export default class CommonPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            chartData: {
              columns: ['date', 'PV'],
              rows: [
                { 'date': '01-01', 'PV': 1231 },
                { 'date': '01-02', 'PV': 1223 },
                { 'date': '01-03', 'PV': 2123 },
                { 'date': '01-04', 'PV': 4123 },
                { 'date': '01-05', 'PV': 3123 },
                { 'date': '01-06', 'PV': 7123 }
              ]
            },
            settings: {
              "metrics": [
                "年龄"
              ],
              "dataOrder": {
                "label": "年龄",
                "order": "desc"
              }
            }
        }
    }

    render(){
      const { chartData, settings } = this.state;
      return(
        <div>
          <CeBar data={ chartData } settings={ settings } />
        </div>
      )
    }
}
```

## 更新日志

每个版本的详细修改可以参考 [release notes](https://github.com/ElemeFE/v-charts/releases) 或者 [ChangeLog](./CHANGELOG_CN.md)。

## 贡献

在发起一个 pull request 之前，请先阅读[贡献指南](./CONTRIBUTING_CN.md)。

## License

[MIT](http://opensource.org/licenses/MIT)
