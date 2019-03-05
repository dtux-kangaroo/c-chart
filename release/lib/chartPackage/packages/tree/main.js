'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tree = undefined;

var _utilsLite = require('utils-lite');

function getTreeLegend(args) {
  var dimension = args.dimension,
      rows = args.rows;

  var result = rows.map(function (row) {
    return row[dimension];
  });
  return { data: result };
}

function getTreeTooltip(args) {
  var tooltipFormatter = args.tooltipFormatter;


  return {
    trigger: 'item',
    triggerOn: 'mousemove',
    formatter: tooltipFormatter
  };
}

function getTreeSeries(args) {
  var dimension = args.dimension,
      metrics = args.metrics,
      rows = args.rows,
      seriesMap = args.seriesMap;


  var series = [];
  rows.forEach(function (row) {
    var label = row[dimension];
    var seriesItem = seriesMap[label];
    var result = {
      type: 'tree',
      name: row[dimension],
      data: row[metrics]
    };
    if (seriesMap[row[dimension]]) {
      Object.keys(seriesItem).forEach(function (key) {
        if ((0, _utilsLite.isObject)(result[key])) {
          Object.assign(result[key], seriesItem[key]);
        } else {
          result[key] = seriesItem[key];
        }
      });
    }
    series.push(result);
  });

  return series;
}

var tree = exports.tree = function tree(columns, rows, settings, extra) {
  var _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$metrics = settings.metrics,
      metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
      _settings$seriesMap = settings.seriesMap,
      seriesMap = _settings$seriesMap === undefined ? {} : _settings$seriesMap;
  var legendVisible = extra.legendVisible,
      tooltipFormatter = extra.tooltipFormatter,
      tooltipVisible = extra.tooltipVisible;


  var series = getTreeSeries({
    dimension: dimension,
    metrics: metrics,
    rows: rows,
    seriesMap: seriesMap
  });
  var legend = legendVisible && rows.length > 1 && getTreeLegend({
    dimension: dimension,
    rows: rows
  });
  var tooltip = tooltipVisible && getTreeTooltip({
    tooltipFormatter: tooltipFormatter
  });
  return { series: series, legend: legend, tooltip: tooltip };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getTreeLegend, 'getTreeLegend', 'src/chartPackage/packages/tree/main.js');

  __REACT_HOT_LOADER__.register(getTreeTooltip, 'getTreeTooltip', 'src/chartPackage/packages/tree/main.js');

  __REACT_HOT_LOADER__.register(getTreeSeries, 'getTreeSeries', 'src/chartPackage/packages/tree/main.js');

  __REACT_HOT_LOADER__.register(tree, 'tree', 'src/chartPackage/packages/tree/main.js');
}();

;