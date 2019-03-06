'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gauge = undefined;

var _utils = require('../utils');

var _utilsLite = require('utils-lite');

function getTooltip(args) {
  var tooltipFormatter = args.tooltipFormatter,
      dataType = args.dataType,
      digit = args.digit;

  return {
    formatter: function formatter(options) {
      var seriesName = options.seriesName,
          _options$data = options.data,
          value = _options$data.value,
          name = _options$data.name;

      if (tooltipFormatter) {
        return tooltipFormatter.apply(null, arguments);
      }
      var tpl = [];
      tpl.push(seriesName + ': ');
      tpl.push((0, _utils.getFormated)(value, dataType[seriesName], digit) + ' ' + name);
      return tpl.join('');
    }
  };
}

function getSeries(args) {
  var rows = args.rows,
      dimension = args.dimension,
      metrics = args.metrics,
      digit = args.digit,
      dataType = args.dataType,
      labelMap = args.labelMap,
      seriesMap = args.seriesMap,
      dataName = args.dataName;


  var series = rows.map(function (row) {
    var label = row[dimension];
    var seriesItem = seriesMap[label];
    var result = {
      type: 'gauge',
      name: labelMap[label] != null ? labelMap[label] : label,
      data: [{
        name: dataName[label] || '',
        value: row[metrics]
      }],
      detail: {
        formatter: function formatter(v) {
          return (0, _utils.getFormated)(v, dataType[label], digit);
        }
      },
      axisLabel: {
        formatter: function formatter(v) {
          return (0, _utils.getFormated)(v, dataType[label], digit);
        }
      }
    };

    if (seriesItem) {
      Object.keys(seriesItem).forEach(function (key) {
        if ((0, _utilsLite.isObject)(result[key])) {
          Object.assign(result[key], seriesItem[key]);
        } else {
          result[key] = seriesItem[key];
        }
      });
    }

    return result;
  });

  return series;
}

var gauge = exports.gauge = function gauge(columns, rows, settings, extra) {
  var _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$metrics = settings.metrics,
      metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? {} : _settings$dataType,
      _settings$labelMap = settings.labelMap,
      labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
      _settings$seriesMap = settings.seriesMap,
      seriesMap = _settings$seriesMap === undefined ? {} : _settings$seriesMap,
      _settings$dataName = settings.dataName,
      dataName = _settings$dataName === undefined ? {} : _settings$dataName;
  var tooltipFormatter = extra.tooltipFormatter,
      tooltipVisible = extra.tooltipVisible;


  var tooltip = tooltipVisible && getTooltip({
    tooltipFormatter: tooltipFormatter,
    dataType: dataType
  });

  var series = getSeries({
    rows: rows,
    dimension: dimension,
    metrics: metrics,
    digit: digit,
    dataType: dataType,
    labelMap: labelMap,
    seriesMap: seriesMap,
    dataName: dataName
  });
  return { tooltip: tooltip, series: series };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getTooltip, 'getTooltip', 'src/packages/gauge/main.js');

  __REACT_HOT_LOADER__.register(getSeries, 'getSeries', 'src/packages/gauge/main.js');

  __REACT_HOT_LOADER__.register(gauge, 'gauge', 'src/packages/gauge/main.js');
}();

;