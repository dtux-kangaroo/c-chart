'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _echarts = require('echarts/lib/echarts');

var _echarts2 = _interopRequireDefault(_echarts);

var _constants = require('../constants');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTooltip(dataType, digit, dataStore, metrics, color, labelMap) {
  return {
    formatter: function formatter(item) {
      var tpl = [];
      if (!item.name) return '';
      tpl.push(item.name + '<br>');
      metrics.forEach(function (label, index) {
        var title = labelMap[label] != null ? labelMap[label] : label;
        tpl.push((0, _constants.itemPoint)(color[index]) + ' ' + title + ' : ');
        if (dataStore[item.name]) {
          tpl.push((0, _utils.getFormated)(dataStore[item.name][label], dataType[label], digit));
        } else {
          tpl.push('-');
        }
        tpl.push('<br>');
      });
      return tpl.join(' ');
    }
  };
}

function getSeries(args) {
  var position = args.position,
      selectData = args.selectData,
      dimension = args.dimension,
      metrics = args.metrics,
      rows = args.rows,
      label = args.label,
      itemStyle = args.itemStyle,
      selectedMode = args.selectedMode,
      roam = args.roam,
      center = args.center,
      aspectScale = args.aspectScale,
      boundingCoords = args.boundingCoords,
      zoom = args.zoom,
      labelMap = args.labelMap,
      scaleLimit = args.scaleLimit,
      mapGrid = args.mapGrid;

  var result = [];
  var mapBase = {
    type: 'map',
    mapType: position
  };

  metrics.forEach(function (itemName) {
    var itemResult = Object.assign({
      name: labelMap[itemName] != null ? labelMap[itemName] : itemName,
      data: [],
      selectedMode: selectedMode,
      roam: roam,
      center: center,
      aspectScale: aspectScale,
      boundingCoords: boundingCoords,
      zoom: zoom,
      scaleLimit: scaleLimit
    }, mapBase);

    if (mapGrid) {
      Object.keys(mapGrid).forEach(function (key) {
        itemResult[key] = mapGrid[key];
      });
    }

    setGeoLabel(itemStyle, itemResult, 'itemStyle');
    setGeoLabel(label, itemResult, 'label');

    rows.forEach(function (row) {
      itemResult.data.push({
        name: row[dimension],
        value: row[itemName],
        selected: selectData
      });
    });
    result.push(itemResult);
  });

  return result;
}

function setGeoLabel(value, target, label) {
  if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
    target[label] = value;
  } else if (value) {
    target[label] = {
      normal: { show: true },
      emphasis: { show: true }
    };
  }
}

function getLegendMap(args) {
  var metrics = args.metrics,
      legendName = args.legendName,
      labelMap = args.labelMap;

  if (!legendName && !labelMap) return { data: metrics };
  var data = labelMap ? metrics.map(function (item) {
    return labelMap[item] == null ? item : labelMap[item];
  }) : metrics;
  return {
    data: data,
    formatter: function formatter(name) {
      return legendName[name] != null ? legendName[name] : name;
    }
  };
}

function registerMap(args, mapOrigin) {
  var _once = args._once,
      registerSign = args.registerSign,
      beforeRegisterMap = args.beforeRegisterMap,
      beforeRegisterMapOnce = args.beforeRegisterMapOnce,
      registerSignOnce = args.registerSignOnce,
      position = args.position,
      specialAreas = args.specialAreas;

  if (!_once[registerSign]) {
    if (beforeRegisterMap) mapOrigin = beforeRegisterMap(mapOrigin);
    if (beforeRegisterMapOnce && !_once[registerSignOnce]) {
      _once[registerSignOnce] = true;
      mapOrigin = beforeRegisterMapOnce(mapOrigin);
    }
    _once[registerSign] = true;
    _echarts2.default.registerMap(position, mapOrigin, specialAreas);
  }
}

var map = exports.map = function map(columns, rows, settings, extra) {
  var _settings$position = settings.position,
      position = _settings$position === undefined ? 'china' : _settings$position,
      _settings$selectData = settings.selectData,
      selectData = _settings$selectData === undefined ? false : _settings$selectData,
      selectedMode = settings.selectedMode,
      _settings$label = settings.label,
      label = _settings$label === undefined ? true : _settings$label,
      _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? {} : _settings$dataType,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      roam = settings.roam,
      center = settings.center,
      aspectScale = settings.aspectScale,
      boundingCoords = settings.boundingCoords,
      zoom = settings.zoom,
      scaleLimit = settings.scaleLimit,
      _settings$legendName = settings.legendName,
      legendName = _settings$legendName === undefined ? {} : _settings$legendName,
      _settings$labelMap = settings.labelMap,
      labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
      mapGrid = settings.mapGrid,
      itemStyle = settings.itemStyle,
      positionJsonLink = settings.positionJsonLink,
      beforeRegisterMap = settings.beforeRegisterMap,
      beforeRegisterMapOnce = settings.beforeRegisterMapOnce,
      _settings$mapURLProfi = settings.mapURLProfix,
      mapURLProfix = _settings$mapURLProfi === undefined ? 'https://unpkg.com/echarts@3.6.2/map/json/' : _settings$mapURLProfi,
      _settings$specialArea = settings.specialAreas,
      specialAreas = _settings$specialArea === undefined ? {} : _settings$specialArea;

  var mapOrigin = settings.mapOrigin;
  var metrics = columns.slice();
  if (settings.metrics) {
    metrics = settings.metrics;
  } else {
    metrics.splice(columns.indexOf(dimension), 1);
  }
  var tooltipVisible = extra.tooltipVisible,
      legendVisible = extra.legendVisible,
      color = extra.color,
      _once = extra._once;

  var dataStore = {};
  rows.forEach(function (row) {
    dataStore[row[dimension]] = row;
  });
  var tooltip = tooltipVisible && getTooltip(dataType, digit, dataStore, metrics, color, labelMap);
  var legend = legendVisible && getLegendMap({ metrics: metrics, legendName: legendName, labelMap: labelMap });
  var seriesParams = {
    position: position,
    selectData: selectData,
    label: label,
    itemStyle: itemStyle,
    dimension: dimension,
    metrics: metrics,
    rows: rows,
    selectedMode: selectedMode,
    roam: roam,
    center: center,
    aspectScale: aspectScale,
    boundingCoords: boundingCoords,
    zoom: zoom,
    labelMap: labelMap,
    scaleLimit: scaleLimit,
    mapGrid: mapGrid
  };
  var series = getSeries(seriesParams);
  var registerOptions = {
    _once: _once,
    beforeRegisterMap: beforeRegisterMap,
    beforeRegisterMapOnce: beforeRegisterMapOnce,
    registerSign: 'MAP_REGISTER_' + position,
    registerSignOnce: 'ONCE_MAP_REGISTER_' + position,
    position: position,
    specialAreas: specialAreas
  };
  if (mapOrigin) {
    registerMap(registerOptions, mapOrigin);
    return { series: series, tooltip: tooltip, legend: legend };
  } else {
    return (0, _utils.getMapJSON)({
      position: position,
      positionJsonLink: positionJsonLink,
      beforeRegisterMapOnce: beforeRegisterMapOnce,
      mapURLProfix: mapURLProfix
    }).then(function (json) {
      registerMap(registerOptions, json);
      return { series: series, tooltip: tooltip, legend: legend };
    });
  }
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getTooltip, 'getTooltip', 'src/packages/map/main.js');

  __REACT_HOT_LOADER__.register(getSeries, 'getSeries', 'src/packages/map/main.js');

  __REACT_HOT_LOADER__.register(setGeoLabel, 'setGeoLabel', 'src/packages/map/main.js');

  __REACT_HOT_LOADER__.register(getLegendMap, 'getLegendMap', 'src/packages/map/main.js');

  __REACT_HOT_LOADER__.register(registerMap, 'registerMap', 'src/packages/map/main.js');

  __REACT_HOT_LOADER__.register(map, 'map', 'src/packages/map/main.js');
}();

;