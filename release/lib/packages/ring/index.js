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

require('echarts/lib/chart/pie');

var _main = require('../pie/main');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RingChart = function (_CommonChart) {
  (0, _inherits3.default)(RingChart, _CommonChart);

  function RingChart(props) {
    (0, _classCallCheck3.default)(this, RingChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RingChart.__proto__ || Object.getPrototypeOf(RingChart)).call(this, props));

    _this.state = {
      chartLib: { ring: _main.ring },
      chartHandler: _main.ring
    };
    return _this;
  }

  return RingChart;
}(_core2.default);

var _default = RingChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(RingChart, 'RingChart', 'src/packages/ring/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/packages/ring/index.js');
}();

;