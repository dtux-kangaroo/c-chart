'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordcloud = undefined;

var _utilsLite = require('utils-lite');

function getSeries(args) {
  var dimension = args.dimension,
      metrics = args.metrics,
      rows = args.rows,
      color = args.color,
      sizeMax = args.sizeMax,
      sizeMin = args.sizeMin,
      shape = args.shape;


  var baseType = {
    type: 'wordCloud',
    textStyle: {
      normal: {
        color: !(0, _utilsLite.isArray)(color) && !!color ? color : function () {
          return 'rgb(' + [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',') + ')';
        }
      }
    },
    shape: shape,
    sizeRange: [sizeMin, sizeMax]
  };

  var len = (0, _utilsLite.isArray)(color) ? color.length : 0;
  var data = rows.slice().map(function (row) {
    var text = {
      name: row[dimension],
      value: row[metrics]
    };

    if (len > 0) {
      text.textStyle = {
        normal: {
          color: color[Math.floor(Math.random() * len)]
        }
      };
    }
    return text;
  });

  baseType.data = data;

  return [baseType];
}

function getTooltip(args) {
  var tooltipFormatter = args.tooltipFormatter;


  return {
    show: true,
    formatter: function formatter(params) {
      var _params$data = params.data,
          name = _params$data.name,
          value = _params$data.value;


      if (tooltipFormatter) {
        return tooltipFormatter.apply(null, params);
      }

      return name + ': ' + value;
    }
  };
}

var wordcloud = exports.wordcloud = function wordcloud(columns, rows, settings, extra) {
  var _settings$dimension = settings.dimension,
      dimension = _settings$dimension === undefined ? columns[0] : _settings$dimension,
      _settings$metrics = settings.metrics,
      metrics = _settings$metrics === undefined ? columns[1] : _settings$metrics,
      _settings$color = settings.color,
      color = _settings$color === undefined ? '' : _settings$color,
      _settings$sizeMax = settings.sizeMax,
      sizeMax = _settings$sizeMax === undefined ? 60 : _settings$sizeMax,
      _settings$sizeMin = settings.sizeMin,
      sizeMin = _settings$sizeMin === undefined ? 12 : _settings$sizeMin,
      _settings$shape = settings.shape,
      shape = _settings$shape === undefined ? 'circle' : _settings$shape;
  var tooltipVisible = extra.tooltipVisible,
      tooltipFormatter = extra.tooltipFormatter;


  var series = getSeries({ dimension: dimension, metrics: metrics, rows: rows, color: color, sizeMax: sizeMax, sizeMin: sizeMin, shape: shape });
  var tooltip = tooltipVisible && getTooltip({ tooltipFormatter: tooltipFormatter });

  return {
    series: series,
    tooltip: tooltip
  };
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getSeries, 'getSeries', 'src/chartPackage/packages/wordcloud/main.js');

  __REACT_HOT_LOADER__.register(getTooltip, 'getTooltip', 'src/chartPackage/packages/wordcloud/main.js');

  __REACT_HOT_LOADER__.register(wordcloud, 'wordcloud', 'src/chartPackage/packages/wordcloud/main.js');
}();

;