import React, { Component, Fragment } from 'react'
import CommonChart from '../core'
import 'echarts/lib/chart/funnel'

import { funnel } from './main'

class FunnelChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { funnel },
      chartHandler: funnel
    }
  }
}
export default FunnelChart