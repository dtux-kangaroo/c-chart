import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, Fragment } from 'react';
import CommonChart from '../core';
import 'echarts/lib/chart/funnel';

import { funnel } from './main';

var FunnelChart = function (_CommonChart) {
  _inherits(FunnelChart, _CommonChart);

  function FunnelChart(props) {
    _classCallCheck(this, FunnelChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { funnel: funnel },
      chartHandler: funnel
    };
    return _this;
  }

  return FunnelChart;
}(CommonChart);

export default FunnelChart;