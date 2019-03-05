import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts/lib/chart/pie';
import { ring } from '../pie/main';
import CommonChart from '../core';

var RingChart = function (_CommonChart) {
  _inherits(RingChart, _CommonChart);

  function RingChart(props) {
    _classCallCheck(this, RingChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { ring: ring },
      chartHandler: ring
    };
    return _this;
  }

  return RingChart;
}(CommonChart);

export default RingChart;