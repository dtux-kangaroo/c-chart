import 'echarts/lib/chart/scatter'

import CommonChart from '../core'
import { scatter } from './main'

class ScatterChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { scatter },
      chartHandler: scatter
    }
  }
}
export default ScatterChart