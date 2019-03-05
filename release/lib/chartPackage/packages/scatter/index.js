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

require('echarts/lib/chart/scatter');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScatterChart = function (_CommonChart) {
  (0, _inherits3.default)(ScatterChart, _CommonChart);

  function ScatterChart(props) {
    (0, _classCallCheck3.default)(this, ScatterChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScatterChart.__proto__ || Object.getPrototypeOf(ScatterChart)).call(this, props));

    _this.state = {
      chartLib: { scatter: _main.scatter },
      chartHandler: _main.scatter
    };
    return _this;
  }

  return ScatterChart;
}(_core2.default);

var _default = ScatterChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ScatterChart, 'ScatterChart', 'src/chartPackage/packages/scatter/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/chartPackage/packages/scatter/index.js');
}();

;