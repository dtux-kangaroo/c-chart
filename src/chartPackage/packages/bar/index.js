import React, { Component, Fragment } from 'react'
import CommonChart from '../core'
import 'echarts/lib/chart/bar'

import { bar, histogram } from './main'

class BarChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { bar, histogram },
      chartHandler: bar
    }
  }
}
export default BarChart