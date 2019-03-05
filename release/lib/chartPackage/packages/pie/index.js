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

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

require('echarts/lib/chart/pie');

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PieChart = function (_CommonChart) {
  (0, _inherits3.default)(PieChart, _CommonChart);

  function PieChart(props) {
    (0, _classCallCheck3.default)(this, PieChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).call(this, props));

    _this.state = {
      chartLib: { pie: _main.pie },
      chartHandler: _main.pie
    };
    return _this;
  }

  return PieChart;
}(_core2.default);

var _default = PieChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(PieChart, 'PieChart', 'src/chartPackage/packages/pie/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/chartPackage/packages/pie/index.js');
}();

;