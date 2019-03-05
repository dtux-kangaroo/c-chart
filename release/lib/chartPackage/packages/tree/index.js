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

require('echarts/lib/chart/tree');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeChart = function (_CommonChart) {
  (0, _inherits3.default)(TreeChart, _CommonChart);

  function TreeChart(props) {
    (0, _classCallCheck3.default)(this, TreeChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TreeChart.__proto__ || Object.getPrototypeOf(TreeChart)).call(this, props));

    _this.state = {
      chartLib: { tree: _main.tree },
      chartHandler: _main.tree
    };
    return _this;
  }

  return TreeChart;
}(_core2.default);

var _default = TreeChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TreeChart, 'TreeChart', 'src/chartPackage/packages/tree/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/chartPackage/packages/tree/index.js');
}();

;