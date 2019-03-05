import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts/lib/chart/bar';

import CommonChart from '../core';
import { waterfall } from './main';

var WaterfallChart = function (_CommonChart) {
  _inherits(WaterfallChart, _CommonChart);

  function WaterfallChart(props) {
    _classCallCheck(this, WaterfallChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { waterfall: waterfall },
      chartHandler: waterfall
    };
    return _this;
  }

  return WaterfallChart;
}(CommonChart);

export default WaterfallChart;