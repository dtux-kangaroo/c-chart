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

require('echarts/lib/chart/map');

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapChart = function (_CommonChart) {
  (0, _inherits3.default)(MapChart, _CommonChart);

  function MapChart(props) {
    (0, _classCallCheck3.default)(this, MapChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MapChart.__proto__ || Object.getPrototypeOf(MapChart)).call(this, props));

    _this.state = {
      chartLib: { map: _main.map },
      chartHandler: _main.map
    };
    return _this;
  }

  return MapChart;
}(_core2.default);

var _default = MapChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MapChart, 'MapChart', 'src/packages/map/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/packages/map/index.js');
}();

;