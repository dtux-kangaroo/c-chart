import 'echarts/lib/chart/radar'

import CommonChart from '../core'
import { radar } from './main'

class RadarChart extends CommonChart{
    constructor(props){
      super(props)
      this.state = {
        chartLib: { radar },
        chartHandler: radar
      }
    }
  }
  export default RadarChart