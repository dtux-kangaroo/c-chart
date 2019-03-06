import 'echarts/lib/chart/tree'

import CommonChart from '../core'
import { tree } from './main'

class TreeChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { tree },
      chartHandler: tree
    }
  }
}
export default TreeChart