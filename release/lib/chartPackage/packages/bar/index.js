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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

require('echarts/lib/chart/bar');

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BarChart = function (_CommonChart) {
  (0, _inherits3.default)(BarChart, _CommonChart);

  function BarChart(props) {
    (0, _classCallCheck3.default)(this, BarChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, props));

    _this.state = {
      chartLib: { bar: _main.bar, histogram: _main.histogram },
      chartHandler: _main.bar
    };
    return _this;
  }

  return BarChart;
}(_core2.default);

var _default = BarChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(BarChart, 'BarChart', 'src/chartPackage/packages/bar/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/chartPackage/packages/bar/index.js');
}();

;