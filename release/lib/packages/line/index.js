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

require('echarts/lib/chart/line');

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LineChart = function (_CommonChart) {
  (0, _inherits3.default)(LineChart, _CommonChart);

  function LineChart(props) {
    (0, _classCallCheck3.default)(this, LineChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call(this, props));

    _this.state = {
      chartLib: { line: _main.line },
      chartHandler: _main.line
    };
    return _this;
  }

  return LineChart;
}(_core2.default);

var _default = LineChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(LineChart, 'LineChart', 'src/packages/line/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/packages/line/index.js');
}();

;