import CommonChart from '../core'
import 'echarts/lib/chart/pie'

import { pie } from './main'

class PieChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { pie },
      chartHandler: pie
    }
  }
}
export default PieChart