'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.radar = undefined;

var _constants = require('../constants');

var _utils = require('../utils');

function getRadarLegend(rows, dimension, legendName) {
  var legendData = rows.map(function (row) {
    return row[dimension];
  });

  return {
    data: legendData,
    formatter: function formatter(name) {
      return legendName[name] != null ? legendName[name] : name;
    }
  };
}

function getRadarTooltip(dataType, radar, digit) {
  var typeTemp = [];
  var nameTemp = [];
  radar.indicator.map(function (item, index) {
    typeTemp[index] = dataType[item.name];
    nameTemp[index] = item.name;
  });
  return {
    formatter: function formatter(item) {
      var tpl = [];
      tpl.push((0, _constants.itemPoint)(item.color));
      tpl.push(item.name + '<br />');
      item.data.value.forEach(function (val, index) {
        tpl.push(nameTemp[index] + ': ');
        tpl.push((0, _utils.getFormated)(val, typeTemp[index], digit) + '<br />');
      });
      return tpl.join('');
    }
  };
}

function getRadarSetting(rows, metrics, labelMap) {
  var settingBase = {
    indicator: [],
    shape: 'circle',
    splitNumber: 5
  };
  var indicatorTemp = {};
  rows.forEach(function (items) {
    metrics.forEach(function (item) {
      var key = labelMap[item] != null ? labelMap[item] : item;
      if (!indicatorTemp[key]) {
        indicatorTemp[key] = [items[item]];
      } else {
        indicatorTemp[key].push(items[item]);
      }
    });
  });
  settingBase.indicator = Object.keys(indicatorTemp).map(function (key) {
    return {
      name: key,
      max: Math.max.apply(null, indicatorTemp[key])
    };
  });
  return settingBase;
}

function getRadarSeries(args) {
  var rows = args.rows,
      dimension = args.dimension,
      metrics = args.metrics,
      radar = args.radar,
      label = args.label,
      itemStyle = args.itemStyle,
      lineStyle = args.lineStyle,
      labelMap = args.labelMap,
      areaStyle = args.areaStyle;

  var radarIndexObj = {};
  radar.indicator.forEach(function (item, index) {
    var name = item.name;
    radarIndexObj[name] = index;
  });

  var seriesData = rows.map(function (row) {
    var serieData = {
      value: [],
      name: row[dimension]
    };
    Object.keys(row).forEach(function (key) {
      if (~metrics.indexOf(key)) {
        var k = labelMap[key] != null ? radarIndexObj[labelMap[key]] : radarIndexObj[key];
        serieData.value[k] = row[key];
      }
    });
    return serieData;
  });
  var result = {
    name: dimension,
    type: 'radar',
    data: seriesData
  };
  if (label) result.label = label;
  if (itemStyle) result.itemStyle = itemStyle;
  if (lineStyle) result.lineStyle = lineStyle;
  if (areaStyle) result.areaStyle = areaStyle;
  return [result];
}

var radar = exports.radar = function radar(columns, rows, settings, extra) {
  var _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? {} : _settings$dataType,
      _settings$legendName = settings.legendName,
      legendName = _settings$legendName === undefined ? {} : _settings$legendName,
      _settings$labelMap = settings.labelMap,
      labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      label = settings.label,
      itemStyle = settings.itemStyle,
      lineStyle = settings.lineStyle,
      areaStyle = settings.areaStyle;
  var tooltipVisible = extra.tooltipVisible,
      legendVisible = extra.legendVisible;

  var metrics = columns.slice();
  if (settings.metrics) {
    metrics = settings.metrics;
  } else {
    metrics.splice(columns.indexOf(dimension), 1);
  }
  var legend = legendVisible && getRadarLegend(rows, dimension, legendName);
  var radar = getRadarSetting(rows, metrics, labelMap);
  var tooltip = tooltipVisible && getRadarTooltip(dataType, radar, digit);
  var series = getRadarSeries({
    rows: rows,
    dimension: dimension,
    metrics: metrics,
    radar: radar,
    label: label,
    itemStyle: itemStyle,
    lineStyle: lineStyle,
    labelMap: labelMap,
    areaStyle: areaStyle
  });
  var options = { legend: legend, tooltip: tooltip, radar: radar, series: series };
  return options;
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getRadarLegend, 'getRadarLegend', 'src/chartPackage/packages/radar/main.js');

  __REACT_HOT_LOADER__.register(getRadarTooltip, 'getRadarTooltip', 'src/chartPackage/packages/radar/main.js');

  __REACT_HOT_LOADER__.register(getRadarSetting, 'getRadarSetting', 'src/chartPackage/packages/radar/main.js');

  __REACT_HOT_LOADER__.register(getRadarSeries, 'getRadarSeries', 'src/chartPackage/packages/radar/main.js');

  __REACT_HOT_LOADER__.register(radar, 'radar', 'src/chartPackage/packages/radar/main.js');
}();

;