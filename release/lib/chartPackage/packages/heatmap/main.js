'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.heatmap = undefined;

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _constants = require('../constants');

var _utils = require('../utils');

var _echarts = require('echarts/lib/echarts');

var _echarts2 = _interopRequireDefault(_echarts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAxisList(rows, label) {
  var result = [];
  rows.forEach(function (row) {
    if (!~result.indexOf(row[label])) result.push(row[label]);
  });
  return result;
}

function getData(args) {
  var rows = args.rows,
      innerXAxisList = args.innerXAxisList,
      innerYAxisList = args.innerYAxisList,
      xDim = args.xDim,
      yDim = args.yDim,
      metrics = args.metrics,
      type = args.type,
      extraMetrics = args.extraMetrics;

  var result = null;
  if (type === 'cartesian') {
    result = rows.map(function (row) {
      var xIndex = innerXAxisList.indexOf(row[xDim]);
      var yIndex = innerYAxisList.indexOf(row[yDim]);
      var value = metrics ? row[metrics] : 1;
      var extraData = extraMetrics.map(function (m) {
        return row[m] || '-';
      });
      return { value: [xIndex, yIndex, value].concat(extraData) };
    });
  } else {
    result = rows.map(function (row) {
      var value = metrics ? row[metrics] : 1;
      return { value: [row[xDim], row[yDim], value] };
    });
  }
  return result;
}

function getAxis(list, name) {
  return {
    type: 'category',
    data: list,
    name: name,
    nameLocation: 'end',
    splitArea: { show: true }
  };
}

function getVisualMap(args) {
  var min = args.innerMin,
      max = args.innerMax,
      type = args.type,
      heatColor = args.heatColor,
      series = args.series;

  var result = {
    min: min,
    max: max,
    calculable: true
  };
  var extra = null;
  if (type === 'map') {
    extra = {
      orient: 'vertical',
      left: 0,
      bottom: 0,
      inRange: { color: heatColor || _constants.HEAT_MAP_COLOR }
    };
    if (!series[0].data.length) extra.show = false;
  } else if (type === 'bmap' || type === 'amap') {
    extra = {
      show: false,
      orient: 'vertical',
      left: 0,
      bottom: 0,
      inRange: { color: heatColor || _constants.HEAT_BMAP_COLOR }
    };
  } else {
    extra = {
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      dimension: 2,
      inRange: heatColor && { color: heatColor }
    };
  }

  return Object.assign(result, extra);
}

function getSeries(args) {
  var chartData = args.chartData;

  return [{
    type: 'heatmap',
    data: chartData
  }];
}

function getTooltip(args) {
  var dataType = args.dataType,
      innerXAxisList = args.innerXAxisList,
      innerYAxisList = args.innerYAxisList,
      digit = args.digit,
      extraMetrics = args.extraMetrics,
      metrics = args.metrics;


  return {
    trigger: 'item',
    formatter: function formatter(_ref) {
      var color = _ref.color,
          _ref$data$value = (0, _toArray3.default)(_ref.data.value),
          xDim = _ref$data$value[0],
          yDim = _ref$data$value[1],
          value = _ref$data$value[2],
          extraData = _ref$data$value.slice(3);

      var tpl = [];
      tpl.push(innerXAxisList[xDim] + ' ~ ' + innerYAxisList[yDim] + '<br>');
      extraMetrics.forEach(function (m, index) {
        tpl.push(m + ': ' + extraData[index] + '<br>');
      });
      tpl.push((0, _constants.itemPoint)(color) + ' ' + metrics + ': ' + (0, _utils.getFormated)(value, dataType, digit) + '<br>');
      return tpl.join('');
    }
  };
}

var heatmap = exports.heatmap = function heatmap(columns, rows, settings, status) {
  var _settings$type = settings.type,
      type = _settings$type === undefined ? 'cartesian' : _settings$type,
      xAxisList = settings.xAxisList,
      yAxisList = settings.yAxisList,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? [columns[0], columns[1]] : _settings$dimension,
      _settings$metrics = settings.metrics,
      metrics = _settings$metrics === undefined ? columns[2] : _settings$metrics,
      _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? 'normal' : _settings$dataType,
      min = settings.min,
      max = settings.max,
      digit = settings.digit,
      bmap = settings.bmap,
      amap = settings.amap,
      geo = settings.geo,
      key = settings.key,
      _settings$v = settings.v,
      v = _settings$v === undefined ? '2.0' : _settings$v,
      position = settings.position,
      positionJsonLink = settings.positionJsonLink,
      beforeRegisterMap = settings.beforeRegisterMap,
      _settings$pointSize = settings.pointSize,
      pointSize = _settings$pointSize === undefined ? 10 : _settings$pointSize,
      _settings$blurSize = settings.blurSize,
      blurSize = _settings$blurSize === undefined ? 5 : _settings$blurSize,
      heatColor = settings.heatColor,
      yAxisName = settings.yAxisName,
      xAxisName = settings.xAxisName,
      beforeRegisterMapOnce = settings.beforeRegisterMapOnce,
      _settings$mapURLProfi = settings.mapURLProfix,
      mapURLProfix = _settings$mapURLProfi === undefined ? 'https://unpkg.com/echarts@3.6.2/map/json/' : _settings$mapURLProfi,
      _settings$specialArea = settings.specialAreas,
      specialAreas = _settings$specialArea === undefined ? {} : _settings$specialArea;
  var tooltipVisible = status.tooltipVisible;

  var innerXAxisList = xAxisList;
  var innerYAxisList = yAxisList;
  var chartData = [];
  // add extraMetrics prop for data which only display in tooltip
  var extraMetrics = [];
  var mainColumn = dimension.concat([metrics]);
  columns.forEach(function (column) {
    if (!~mainColumn.indexOf(column)) extraMetrics.push(column);
  });

  if (type === 'cartesian') {
    if (!innerXAxisList || !innerXAxisList.length) {
      innerXAxisList = getAxisList(rows, dimension[0]);
    }
    if (!innerYAxisList || !innerYAxisList.length) {
      innerYAxisList = getAxisList(rows, dimension[1]);
    }
    chartData = getData({
      rows: rows,
      innerXAxisList: innerXAxisList,
      innerYAxisList: innerYAxisList,
      xDim: dimension[0],
      yDim: dimension[1],
      metrics: metrics,
      type: type,
      extraMetrics: extraMetrics
    });
  } else {
    chartData = getData({
      rows: rows,
      xDim: dimension[0],
      yDim: dimension[1],
      metrics: metrics,
      type: type,
      extraMetrics: extraMetrics
    });
  }
  var metricsList = metrics ? rows.map(function (row) {
    return row[metrics];
  }) : [0, 5];
  if (!metricsList.length) metricsList = [0];
  var innerMin = min || Math.min.apply(null, metricsList);
  var innerMax = max || Math.max.apply(null, metricsList);

  var xAxis = getAxis(innerXAxisList, xAxisName);
  var yAxis = getAxis(innerYAxisList, yAxisName);
  var series = getSeries({ chartData: chartData });
  var visualMap = getVisualMap({ innerMin: innerMin, innerMax: innerMax, type: type, heatColor: heatColor, series: series });
  var tooltip = tooltipVisible && getTooltip({
    dataType: dataType,
    innerXAxisList: innerXAxisList,
    innerYAxisList: innerYAxisList,
    digit: digit,
    extraMetrics: extraMetrics,
    metrics: metrics
  });

  var options = { visualMap: visualMap, series: series };
  if (type === 'bmap') {
    Object.assign(options.series[0], { coordinateSystem: 'bmap', pointSize: pointSize, blurSize: blurSize });

    return (0, _utils.getBmap)(key, v).then(function (_) {
      return Object.assign({ bmap: bmap }, options);
    });
  } else if (type === 'map') {
    options.series[0].coordinateSystem = 'geo';
    return (0, _utils.getMapJSON)({
      position: position,
      positionJsonLink: positionJsonLink,
      beforeRegisterMapOnce: beforeRegisterMapOnce,
      mapURLProfix: mapURLProfix
    }).then(function (json) {
      var geoAttr = Object.assign({ map: position }, geo);
      if (beforeRegisterMap) json = beforeRegisterMap(json);
      _echarts2.default.registerMap(position, json, specialAreas);
      return Object.assign({ geo: geoAttr }, options);
    });
  } else if (type === 'amap') {
    Object.assign(options.series[0], { coordinateSystem: 'amap', pointSize: pointSize, blurSize: blurSize });

    return (0, _utils.getAmap)(key, v).then(function (_) {
      return Object.assign({ amap: amap }, options);
    });
  } else {
    return Object.assign({ xAxis: xAxis, yAxis: yAxis, tooltip: tooltip }, options);
  }
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getAxisList, 'getAxisList', 'src/chartPackage/packages/heatmap/main.js');

  __REACT_HOT_LOADER__.register(getData, 'getData', 'src/chartPackage/packages/heatmap/main.js');

  __REACT_HOT_LOADER__.register(getAxis, 'getAxis', 'src/chartPackage/packages/heatmap/main.js');

  __REACT_HOT_LOADER__.register(getVisualMap, 'getVisualMap', 'src/chartPackage/packages/heatmap/main.js');

  __REACT_HOT_LOADER__.register(getSeries, 'getSeries', 'src/chartPackage/packages/heatmap/main.js');

  __REACT_HOT_LOADER__.register(getTooltip, 'getTooltip', 'src/chartPackage/packages/heatmap/main.js');

  __REACT_HOT_LOADER__.register(heatmap, 'heatmap', 'src/chartPackage/packages/heatmap/main.js');
}();

;