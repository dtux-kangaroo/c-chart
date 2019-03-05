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

require('echarts/lib/chart/line');

require('echarts/lib/chart/candlestick');

require('echarts/lib/component/visualMap');

require('echarts/lib/component/dataZoom');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CandleChart = function (_CommonChart) {
  (0, _inherits3.default)(CandleChart, _CommonChart);

  function CandleChart(props) {
    (0, _classCallCheck3.default)(this, CandleChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CandleChart.__proto__ || Object.getPrototypeOf(CandleChart)).call(this, props));

    _this.state = {
      chartLib: { candle: _main.candle },
      chartHandler: _main.candle
    };
    return _this;
  }

  return CandleChart;
}(_core2.default);

var _default = CandleChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CandleChart, 'CandleChart', 'src/chartPackage/packages/candle/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/chartPackage/packages/candle/index.js');
}();

;