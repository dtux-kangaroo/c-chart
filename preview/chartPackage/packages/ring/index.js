import 'echarts/lib/chart/pie'
import { ring } from '../pie/main'
import CommonChart from '../core'

class RingChart extends CommonChart{
    constructor(props){
      super(props)
      this.state = {
        chartLib: { ring },
        chartHandler: ring
      }
    }
  }
  export default RingChart
