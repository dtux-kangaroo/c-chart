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

require('echarts/lib/chart/heatmap');

require('echarts/lib/component/visualMap');

require('echarts/extension/bmap/bmap');

require('echarts/lib/chart/map');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeatChart = function (_CommonChart) {
  (0, _inherits3.default)(HeatChart, _CommonChart);

  function HeatChart(props) {
    (0, _classCallCheck3.default)(this, HeatChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HeatChart.__proto__ || Object.getPrototypeOf(HeatChart)).call(this, props));

    _this.state = {
      chartLib: { heatmap: _main.heatmap },
      chartHandler: _main.heatmap
    };
    return _this;
  }

  return HeatChart;
}(_core2.default);

var _default = HeatChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(HeatChart, 'HeatChart', 'src/packages/heatmap/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/packages/heatmap/index.js');
}();

;