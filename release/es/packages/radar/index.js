import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts/lib/chart/radar';

import CommonChart from '../core';
import { radar } from './main';

var RadarChart = function (_CommonChart) {
  _inherits(RadarChart, _CommonChart);

  function RadarChart(props) {
    _classCallCheck(this, RadarChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { radar: radar },
      chartHandler: radar
    };
    return _this;
  }

  return RadarChart;
}(CommonChart);

export default RadarChart;