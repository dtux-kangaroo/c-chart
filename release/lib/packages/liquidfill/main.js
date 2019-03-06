'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.liquidfill = undefined;

var _utilsLite = require('utils-lite');

var _utils = require('../utils');

function getTooltip(args) {
  var tooltipFormatter = args.tooltipFormatter,
      dataType = args.dataType,
      digit = args.digit;


  return {
    show: true,
    formatter: function formatter(options) {
      var seriesName = options.seriesName,
          value = options.value;

      if (tooltipFormatter) {
        return tooltipFormatter.apply(null, arguments);
      }

      return [seriesName + ': ', (0, _utils.getFormated)(value, dataType, digit)].join('');
    }
  };
}

function getSeries(args) {
  var dimension = args.dimension,
      metrics = args.metrics,
      seriesMap = args.seriesMap,
      rows = args.rows,
      wave = args.wave;


  var itemWave = wave;
  var len = (0, _utilsLite.isArray)(seriesMap) ? seriesMap.length : 0;

  return rows.slice().map(function (item, index) {
    var data = [];
    var result = {
      type: 'liquidFill'
    };

    var name = item[dimension];
    var val = Number(item[metrics]);
    var itemMap = {};

    if ((0, _utilsLite.isArray)(seriesMap)) {
      itemMap = !seriesMap[index] ? seriesMap[len - 1] : seriesMap[index];
    } else if ((0, _utilsLite.isObject)(seriesMap[name])) {
      itemMap = seriesMap[name];
    }

    if ((0, _utilsLite.isArray)(wave) && (0, _utilsLite.isArray)(wave[0])) {
      itemWave = (0, _utilsLite.isArray)(wave[index]) ? wave[index] : wave[wave.length - 1];
    }

    // 根据传入的数据(rows)和额外配置(seriesMap)的数据组合data
    data.push({ value: val });
    if (itemWave && itemWave.length) {
      data = data.concat(itemWave.map(function (val) {
        return { value: val };
      }));
    }

    result = Object.assign(result, { data: data, name: name }, itemMap);
    return result;
  });
}

var liquidfill = exports.liquidfill = function liquidfill(columns, rows, settings, extra) {
  var _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$metrics = settings.metrics,
      metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
      _settings$seriesMap = settings.seriesMap,
      seriesMap = _settings$seriesMap === undefined ? {} : _settings$seriesMap,
      _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? 'percent' : _settings$dataType,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      _settings$wave = settings.wave,
      wave = _settings$wave === undefined ? [] : _settings$wave;
  var tooltipVisible = extra.tooltipVisible,
      tooltipFormatter = extra.tooltipFormatter;


  var tooltip = tooltipVisible && getTooltip({
    tooltipFormatter: tooltipFormatter,
    dataType: dataType,
    digit: digit
  });
  var series = getSeries({
    rows: rows,
    columns: columns,
    dimension: dimension,
    metrics: metrics,
    seriesMap: seriesMap,
    wave: wave
  });

  return {
    tooltip: tooltip,
    series: series
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getTooltip, 'getTooltip', 'src/packages/liquidfill/main.js');

  __REACT_HOT_LOADER__.register(getSeries, 'getSeries', 'src/packages/liquidfill/main.js');

  __REACT_HOT_LOADER__.register(liquidfill, 'liquidfill', 'src/packages/liquidfill/main.js');
}();

;