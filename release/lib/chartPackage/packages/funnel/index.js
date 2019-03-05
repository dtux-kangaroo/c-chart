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

require('echarts/lib/chart/funnel');

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FunnelChart = function (_CommonChart) {
  (0, _inherits3.default)(FunnelChart, _CommonChart);

  function FunnelChart(props) {
    (0, _classCallCheck3.default)(this, FunnelChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FunnelChart.__proto__ || Object.getPrototypeOf(FunnelChart)).call(this, props));

    _this.state = {
      chartLib: { funnel: _main.funnel },
      chartHandler: _main.funnel
    };
    return _this;
  }

  return FunnelChart;
}(_core2.default);

var _default = FunnelChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FunnelChart, 'FunnelChart', 'src/chartPackage/packages/funnel/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/chartPackage/packages/funnel/index.js');
}();

;