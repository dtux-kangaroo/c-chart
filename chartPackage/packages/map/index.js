import CommonChart from '../core'
import 'echarts/lib/chart/map'

import { map } from './main'

class MapChart extends CommonChart{
    constructor(props){
      super(props)
      this.state = {
        chartLib: { map },
        chartHandler: map
      }
    }
  }
  export default MapChart

