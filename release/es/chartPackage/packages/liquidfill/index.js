import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts-liquidfill';

import CommonChart from '../core';
import { liquidfill } from './main';

var LiquidfillChart = function (_CommonChart) {
  _inherits(LiquidfillChart, _CommonChart);

  function LiquidfillChart(props) {
    _classCallCheck(this, LiquidfillChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { liquidfill: liquidfill },
      chartHandler: liquidfill
    };
    return _this;
  }

  return LiquidfillChart;
}(CommonChart);

export default LiquidfillChart;