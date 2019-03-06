import 'echarts/lib/chart/heatmap'
import 'echarts/lib/component/visualMap'
import 'echarts/extension/bmap/bmap'
import 'echarts/lib/chart/map'
import CommonChart from '../core'
import 'echarts/lib/chart/heatmap'

import { heatmap } from './main'

class HeatChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { heatmap },
      chartHandler: heatmap
    }
  }
}
export default HeatChart