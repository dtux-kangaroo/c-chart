import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, Fragment } from 'react';
import CommonChart from '../core';
import 'echarts/lib/chart/line';

import { line } from './main';

var LineChart = function (_CommonChart) {
  _inherits(LineChart, _CommonChart);

  function LineChart(props) {
    _classCallCheck(this, LineChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { line: line },
      chartHandler: line
    };
    return _this;
  }

  return LineChart;
}(CommonChart);

export default LineChart;