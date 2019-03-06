import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import CommonChart from '../core';
import 'echarts/lib/chart/map';

import { map } from './main';

var MapChart = function (_CommonChart) {
  _inherits(MapChart, _CommonChart);

  function MapChart(props) {
    _classCallCheck(this, MapChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { map: map },
      chartHandler: map
    };
    return _this;
  }

  return MapChart;
}(CommonChart);

export default MapChart;