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

require('echarts-wordcloud');

var _core = require('../core');

var _core2 = _interopRequireDefault(_core);

var _main = require('./main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WordcloudChart = function (_CommonChart) {
  (0, _inherits3.default)(WordcloudChart, _CommonChart);

  function WordcloudChart(props) {
    (0, _classCallCheck3.default)(this, WordcloudChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WordcloudChart.__proto__ || Object.getPrototypeOf(WordcloudChart)).call(this, props));

    _this.state = {
      chartLib: { wordcloud: _main.wordcloud },
      chartHandler: _main.wordcloud
    };
    return _this;
  }

  return WordcloudChart;
}(_core2.default);

var _default = WordcloudChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(WordcloudChart, 'WordcloudChart', 'src/packages/wordcloud/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/packages/wordcloud/index.js');
}();

;