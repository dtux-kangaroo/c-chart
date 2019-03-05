import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts/lib/chart/tree';

import CommonChart from '../core';
import { tree } from './main';

var TreeChart = function (_CommonChart) {
  _inherits(TreeChart, _CommonChart);

  function TreeChart(props) {
    _classCallCheck(this, TreeChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { tree: tree },
      chartHandler: tree
    };
    return _this;
  }

  return TreeChart;
}(CommonChart);

export default TreeChart;