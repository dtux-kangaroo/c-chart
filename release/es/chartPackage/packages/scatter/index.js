import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts/lib/chart/scatter';

import CommonChart from '../core';
import { scatter } from './main';

var ScatterChart = function (_CommonChart) {
  _inherits(ScatterChart, _CommonChart);

  function ScatterChart(props) {
    _classCallCheck(this, ScatterChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { scatter: scatter },
      chartHandler: scatter
    };
    return _this;
  }

  return ScatterChart;
}(CommonChart);

export default ScatterChart;