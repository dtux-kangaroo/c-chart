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

require('echarts/lib/chart/radar');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadarChart = function (_CommonChart) {
  (0, _inherits3.default)(RadarChart, _CommonChart);

  function RadarChart(props) {
    (0, _classCallCheck3.default)(this, RadarChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RadarChart.__proto__ || Object.getPrototypeOf(RadarChart)).call(this, props));

    _this.state = {
      chartLib: { radar: _main.radar },
      chartHandler: _main.radar
    };
    return _this;
  }

  return RadarChart;
}(_core2.default);

var _default = RadarChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(RadarChart, 'RadarChart', 'src/chartPackage/packages/radar/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/chartPackage/packages/radar/index.js');
}();

;