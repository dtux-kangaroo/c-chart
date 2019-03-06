'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

require('echarts/lib/chart/bar');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

var _main = require('../bar/main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HistogramChart = function (_CommonChart) {
  (0, _inherits3.default)(HistogramChart, _CommonChart);

  function HistogramChart(props) {
    (0, _classCallCheck3.default)(this, HistogramChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HistogramChart.__proto__ || Object.getPrototypeOf(HistogramChart)).call(this, props));

    _this.state = {
      chartLib: { histogram: _main.histogram },
      chartHandler: _main.histogram
    };
    return _this;
  }

  return HistogramChart;
}(_core2.default);

var _default = HistogramChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(HistogramChart, 'HistogramChart', 'src/packages/histogram/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/packages/histogram/index.js');
}();

;