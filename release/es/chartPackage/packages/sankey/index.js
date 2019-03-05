import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import 'echarts/lib/chart/sankey';

import CommonChart from '../core';
import { sankey } from './main';

var SankeyChart = function (_CommonChart) {
    _inherits(SankeyChart, _CommonChart);

    function SankeyChart(props) {
        _classCallCheck(this, SankeyChart);

        var _this = _possibleConstructorReturn(this, _CommonChart.call(this, props));

        _this.state = {
            chartLib: { sankey: sankey },
            chartHandler: sankey
        };
        return _this;
    }

    return SankeyChart;
}(CommonChart);

export default SankeyChart;