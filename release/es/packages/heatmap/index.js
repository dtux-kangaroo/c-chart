import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts/lib/chart/heatmap';
import 'echarts/lib/component/visualMap';
import 'echarts/extension/bmap/bmap';
import 'echarts/lib/chart/map';
import CommonChart from '../core';
import 'echarts/lib/chart/heatmap';

import { heatmap } from './main';

var HeatChart = function (_CommonChart) {
  _inherits(HeatChart, _CommonChart);

  function HeatChart(props) {
    _classCallCheck(this, HeatChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { heatmap: heatmap },
      chartHandler: heatmap
    };
    return _this;
  }

  return HeatChart;
}(CommonChart);

export default HeatChart;