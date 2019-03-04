import 'echarts/lib/chart/bar'

import CommonChart from '../core'
import { waterfall } from './main'

class WaterfallChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { waterfall },
      chartHandler: waterfall
    }
  }
}
export default WaterfallChart