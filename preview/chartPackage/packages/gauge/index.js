import CommonChart from '../core'
import 'echarts/lib/chart/gauge'

import { gauge } from './main'

class GaugeChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { gauge },
      chartHandler: gauge
    }
  }
}
export default GaugeChart