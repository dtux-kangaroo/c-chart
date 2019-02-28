import CommonChart from '../core'
import 'echarts-liquidfill'

import { liquidfill } from './main'

class LiquidfillChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { liquidfill },
      chartHandler: liquidfill
    }
  }
}
export default LiquidfillChart