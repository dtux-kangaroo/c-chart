import { isArray } from 'utils-lite';
import { itemPoint } from '../constants';
import { getFormated } from '../utils';
import { line } from '../line/main';

function getScatterLegend(dataLabels, legendName) {
  return {
    data: dataLabels,
    formatter: function formatter(name) {
      return legendName[name] != null ? legendName[name] : name;
    }
  };
}

function getScatterTooltip(args) {
  var tooltipTrigger = args.tooltipTrigger;

  return {
    trigger: tooltipTrigger,
    formatter: function formatter(item) {
      if (isArray(item)) {
        return item.map(function (i) {
          return getTooltipContent(i, args);
        }).join('');
      } else {
        return getTooltipContent(item, args);
      }
    }
  };
}

function getTooltipContent(item, args) {
  var labelMap = args.labelMap,
      columns = args.columns,
      dataType = args.dataType,
      digit = args.digit;

  var tpl = [];
  var color = item.color,
      seriesName = item.seriesName,
      value = item.data.value;

  tpl.push(itemPoint(color) + ' ' + seriesName + '<br>');
  value.forEach(function (d, i) {
    var name = labelMap[columns[i]] || columns[i];
    var num = isNaN(d) ? d : getFormated(d, dataType[columns[i]], digit);
    tpl.push(name + ': ' + num + '<br>');
  });
  return tpl.join('');
}

function getScatterXAxis(args) {
  var xAxisName = args.xAxisName,
      axisVisible = args.axisVisible,
      xAxisType = args.xAxisType,
      rows = args.rows,
      dataLabels = args.dataLabels,
      dimension = args.dimension;

  var data = [];
  dataLabels.forEach(function (dataLabel) {
    var itemData = rows[dataLabel];
    itemData.forEach(function (item) {
      var name = item[dimension];
      if (name && !~data.indexOf(name)) data.push(name);
    });
  });

  return [{
    type: xAxisType,
    show: axisVisible,
    name: xAxisName,
    data: data
  }];
}

function getScatterYAxis(args) {
  var min = args.min,
      max = args.max,
      scale = args.scale,
      yAxisName = args.yAxisName,
      dataType = args.dataType,
      metrics = args.metrics,
      digit = args.digit,
      axisVisible = args.axisVisible;


  return {
    type: 'value',
    show: axisVisible,
    scale: scale,
    min: min,
    max: max,
    axisTick: { show: false },
    name: yAxisName,
    axisLabel: {
      formatter: function formatter(val) {
        return getFormated(val, dataType[metrics[0]], digit);
      }
    }
  };
}

function getScatterSeries(args) {
  var rows = args.rows,
      dataLabels = args.dataLabels,
      columns = args.columns,
      metrics = args.metrics,
      dimension = args.dimension,
      label = args.label,
      itemStyle = args.itemStyle,
      symbol = args.symbol,
      symbolSizeMax = args.symbolSizeMax,
      symbolSize = args.symbolSize,
      symbolRotate = args.symbolRotate,
      symbolOffset = args.symbolOffset,
      cursor = args.cursor;

  var extraMetrics = columns.filter(function (column) {
    return !~metrics.indexOf(column) && column !== dimension;
  });
  var numbers = [];
  dataLabels.forEach(function (dataLabel) {
    rows[dataLabel].forEach(function (row) {
      numbers.push(row[metrics[1]]);
    });
  });
  var maxNum = Math.max.apply(null, numbers);

  var series = [];
  dataLabels.forEach(function (dataLabel) {
    var result = [];
    var itemData = rows[dataLabel];
    itemData.forEach(function (item) {
      var itemResult = { value: [] };
      itemResult.value.push(item[dimension], item[metrics[0]], item[metrics[1]]);
      extraMetrics.forEach(function (ext) {
        itemResult.value.push(item[ext]);
      });
      itemResult.symbolSize = symbolSize || item[metrics[1]] / maxNum * symbolSizeMax;
      result.push(itemResult);
    });
    series.push({
      type: 'scatter',
      data: result,
      name: dataLabel,
      label: label,
      itemStyle: itemStyle,
      symbol: symbol,
      symbolRotate: symbolRotate,
      symbolOffset: symbolOffset,
      cursor: cursor
    });
  });
  return series;
}

var scatter = function scatter(columns, rows, settings, extra) {
  var _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$metrics = settings.metrics,
      metrics = _settings$metrics === undefined ? [columns[1], columns[2]] : _settings$metrics,
      _settings$dataType = settings.dataType,
      dataType = _settings$dataType === undefined ? {} : _settings$dataType,
      _settings$xAxisType = settings.xAxisType,
      xAxisType = _settings$xAxisType === undefined ? 'category' : _settings$xAxisType,
      xAxisName = settings.xAxisName,
      yAxisName = settings.yAxisName,
      _settings$digit = settings.digit,
      digit = _settings$digit === undefined ? 2 : _settings$digit,
      _settings$legendName = settings.legendName,
      legendName = _settings$legendName === undefined ? {} : _settings$legendName,
      _settings$labelMap = settings.labelMap,
      labelMap = _settings$labelMap === undefined ? {} : _settings$labelMap,
      _settings$tooltipTrig = settings.tooltipTrigger,
      tooltipTrigger = _settings$tooltipTrig === undefined ? 'item' : _settings$tooltipTrig,
      _settings$axisVisible = settings.axisVisible,
      axisVisible = _settings$axisVisible === undefined ? true : _settings$axisVisible,
      _settings$symbolSizeM = settings.symbolSizeMax,
      symbolSizeMax = _settings$symbolSizeM === undefined ? 50 : _settings$symbolSizeM,
      symbol = settings.symbol,
      symbolSize = settings.symbolSize,
      symbolRotate = settings.symbolRotate,
      symbolOffset = settings.symbolOffset,
      cursor = settings.cursor,
      min = settings.min,
      max = settings.max,
      scale = settings.scale,
      label = settings.label,
      itemStyle = settings.itemStyle;


  if (isArray(rows)) {
    var lineSettings = Object.assign({}, settings, {
      xAxisName: xAxisName ? [xAxisName] : undefined,
      yAxisName: yAxisName ? [yAxisName] : undefined,
      scale: scale ? [scale] : undefined,
      min: min ? [min] : undefined,
      max: max ? [max] : undefined,
      dimension: dimension ? [dimension] : undefined
    });
    var options = line(columns, rows, lineSettings, extra);
    if (!options || !options.series) return {};
    options.series.forEach(function (item) {
      Object.assign(item, {
        type: 'scatter',
        symbol: symbol,
        symbolSize: symbolSize || 10,
        symbolRotate: symbolRotate,
        symbolOffset: symbolOffset,
        cursor: cursor,
        label: label,
        itemStyle: itemStyle
      });
    });
    return options;
  }

  var tooltipVisible = extra.tooltipVisible,
      legendVisible = extra.legendVisible;

  var dataLabels = Object.keys(rows);

  var legend = legendVisible && getScatterLegend(dataLabels, legendName);
  var tooltip = tooltipVisible && getScatterTooltip({
    tooltipTrigger: tooltipTrigger,
    labelMap: labelMap,
    columns: columns,
    dataType: dataType,
    digit: digit
  });
  var xAxis = getScatterXAxis({
    xAxisName: xAxisName,
    axisVisible: axisVisible,
    xAxisType: xAxisType,
    dataLabels: dataLabels,
    dimension: dimension,
    rows: rows
  });
  var yAxis = getScatterYAxis({
    min: min,
    max: max,
    scale: scale,
    yAxisName: yAxisName,
    dataType: dataType,
    metrics: metrics,
    digit: digit,
    axisVisible: axisVisible
  });
  var series = getScatterSeries({
    rows: rows,
    dataLabels: dataLabels,
    columns: columns,
    metrics: metrics,
    dimension: dimension,
    label: label,
    itemStyle: itemStyle,
    symbol: symbol,
    symbolSizeMax: symbolSizeMax,
    symbolSize: symbolSize,
    symbolRotate: symbolRotate,
    symbolOffset: symbolOffset,
    cursor: cursor
  });
  return { legend: legend, tooltip: tooltip, xAxis: xAxis, yAxis: yAxis, series: series };
};

export { scatter };