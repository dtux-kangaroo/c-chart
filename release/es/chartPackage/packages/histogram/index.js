import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts/lib/chart/bar';
import CommonChart from '../core';

import { histogram } from '../bar/main';

var HistogramChart = function (_CommonChart) {
  _inherits(HistogramChart, _CommonChart);

  function HistogramChart(props) {
    _classCallCheck(this, HistogramChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { histogram: histogram },
      chartHandler: histogram
    };
    return _this;
  }

  return HistogramChart;
}(CommonChart);

export default HistogramChart;