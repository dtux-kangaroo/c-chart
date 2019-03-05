import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/component/visualMap';
import 'echarts/lib/component/dataZoom';
import CommonChart from '../core';

import { candle } from './main';

var CandleChart = function (_CommonChart) {
  _inherits(CandleChart, _CommonChart);

  function CandleChart(props) {
    _classCallCheck(this, CandleChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { candle: candle },
      chartHandler: candle
    };
    return _this;
  }

  return CandleChart;
}(CommonChart);

export default CandleChart;