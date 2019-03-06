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

require('echarts/lib/chart/sankey');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SankeyChart = function (_CommonChart) {
    (0, _inherits3.default)(SankeyChart, _CommonChart);

    function SankeyChart(props) {
        (0, _classCallCheck3.default)(this, SankeyChart);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SankeyChart.__proto__ || Object.getPrototypeOf(SankeyChart)).call(this, props));

        _this.state = {
            chartLib: { sankey: _main.sankey },
            chartHandler: _main.sankey
        };
        return _this;
    }

    return SankeyChart;
}(_core2.default);

var _default = SankeyChart;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(SankeyChart, 'SankeyChart', 'src/packages/sankey/index.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/packages/sankey/index.js');
}();

;