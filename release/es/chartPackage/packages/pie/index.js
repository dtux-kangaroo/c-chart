import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import CommonChart from '../core';
import 'echarts/lib/chart/pie';

import { pie } from './main';

var PieChart = function (_CommonChart) {
  _inherits(PieChart, _CommonChart);

  function PieChart(props) {
    _classCallCheck(this, PieChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { pie: pie },
      chartHandler: pie
    };
    return _this;
  }

  return PieChart;
}(CommonChart);

export default PieChart;