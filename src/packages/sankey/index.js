import 'echarts/lib/chart/sankey'

import CommonChart from '../core'
import { sankey } from './main'

class SankeyChart extends CommonChart{
    constructor(props){
        super(props)
        this.state = {
            chartLib: { sankey },
            chartHandler: sankey
        }
    }
}
export default SankeyChart