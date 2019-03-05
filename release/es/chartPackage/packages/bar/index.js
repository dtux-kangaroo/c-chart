import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, Fragment } from 'react';
import CommonChart from '../core';
import 'echarts/lib/chart/bar';

import { bar, histogram } from './main';

var BarChart = function (_CommonChart) {
  _inherits(BarChart, _CommonChart);

  function BarChart(props) {
    _classCallCheck(this, BarChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { bar: bar, histogram: histogram },
      chartHandler: bar
    };
    return _this;
  }

  return BarChart;
}(CommonChart);

export default BarChart;