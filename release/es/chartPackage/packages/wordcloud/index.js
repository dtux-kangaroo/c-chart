import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts-wordcloud';

import CommonChart from '../core';
import { wordcloud } from './main';

var WordcloudChart = function (_CommonChart) {
  _inherits(WordcloudChart, _CommonChart);

  function WordcloudChart(props) {
    _classCallCheck(this, WordcloudChart);

    var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

    _this.state = {
      chartLib: { wordcloud: wordcloud },
      chartHandler: wordcloud
    };
    return _this;
  }

  return WordcloudChart;
}(CommonChart);

export default WordcloudChart;