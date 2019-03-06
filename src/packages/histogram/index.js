import 'echarts/lib/chart/bar'
import CommonChart from '../core'

import { histogram } from '../bar/main'

class HistogramChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { histogram },
      chartHandler: histogram
    }
  }
}
export default HistogramChart