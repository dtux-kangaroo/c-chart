import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/candlestick'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataZoom'
import CommonChart from '../core'

import { candle } from './main'

class CandleChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { candle },
      chartHandler: candle
    }
  }
}
export default CandleChart