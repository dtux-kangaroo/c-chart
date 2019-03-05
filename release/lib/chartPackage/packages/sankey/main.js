'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sankey = undefined;

var _utils = require('../utils');

var _constants = require('../constants');

function getTooltip(args) {
  var itemDataType = args.itemDataType,
      linksDataType = args.linksDataType,
      digit = args.digit;

  return {
    trigger: 'item',
    formatter: function formatter(item) {
      var tpl = [];
      var name = item.name,
          data = item.data,
          value = item.value,
          color = item.color;

      tpl.push((0, _constants.itemPoint)(color));
      tpl.push(name + ' : ');
      if (data && data.source) {
        tpl.push((0, _utils.getFormated)(value, linksDataType, digit) + '<br />');
      } else {
        tpl.push((0, _utils.getFormated)(value, itemDataType, digit) + '<br />');
      }
      return tpl.join('');
    }
  };
}

function getSeries(args) {
  var rows = args.rows,
      dimension = args.dimension,
      metrics = args.metrics,
      links = args.links,
      valueFull = args.valueFull,
      useDataValue = args.useDataValue,
      label = args.label,
      itemStyle = args.itemStyle,
      lineStyle = args.lineStyle;

  var dataMap = {};
  var seriesData = rows.map(function (row) {
    dataMap[row[dimension]] = row[metrics];
    return { name: row[dimension], value: row[metrics] };
  });
  var innerLinks = null;
  if (useDataValue) {
    innerLinks = links.map(function (link) {
      return Object.assign({}, link, { value: dataMap[link.target] });
    });
  } else if (!valueFull) {
    innerLinks = links.map(function (link) {
      return link.value == null ? Object.assign({}, link, { value: dataMap[link.target] }) : link;
    });
  } else {
    innerLinks = links;
  }

  var result = {
    type: 'sankey',
    data: seriesData,
    links: innerLinks
  };
  if (label) result.label = label;
  if (itemStyle) result.itemStyle = itemStyle;
  if (lineStyle) result.lineStyle = lineStyle;
  return [result];
}

var sankey = exports.sankey = function sankey(columns, rows, settings, extra) {
  var links = settings.links,
      _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$metrics = settings.metrics,
      metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
      _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? ['normal', 'normal'] : _settings$dataType,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      _settings$valueFull = settings.valueFull,
      valueFull = _settings$valueFull === undefined ? false : _settings$valueFull,
      _settings$useDataValu = settings.useDataValue,
      useDataValue = _settings$useDataValu === undefined ? false : _settings$useDataValu,
      label = settings.label,
      itemStyle = settings.itemStyle,
      lineStyle = settings.lineStyle;


  if (!links) {
    console.warn('links is needed in settings!');
    return;
  }

  var itemDataType = dataType[0];
  var linksDataType = dataType[1];
  var tooltip = getTooltip({
    itemDataType: itemDataType,
    linksDataType: linksDataType,
    digit: digit
  });
  var series = getSeries({
    rows: rows,
    dimension: dimension,
    metrics: metrics,
    links: links,
    valueFull: valueFull,
    useDataValue: useDataValue,
    label: label,
    itemStyle: itemStyle,
    lineStyle: lineStyle
  });
  return { tooltip: tooltip, series: series };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getTooltip, 'getTooltip', 'src/chartPackage/packages/sankey/main.js');

  __REACT_HOT_LOADER__.register(getSeries, 'getSeries', 'src/chartPackage/packages/sankey/main.js');

  __REACT_HOT_LOADER__.register(sankey, 'sankey', 'src/chartPackage/packages/sankey/main.js');
}();

;