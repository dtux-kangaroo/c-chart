import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import CommonChart from '../core';
import 'echarts/lib/chart/gauge';

import { gauge } from './main';

var GaugeChart = function (_CommonChart) {
  _inherits(GaugeChart, _CommonChart);

  function GaugeChart(props) {
    _classCallCheck(this, GaugeChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { gauge: gauge },
      chartHandler: gauge
    };
    return _this;
  }

  return GaugeChart;
}(CommonChart);

export default GaugeChart;