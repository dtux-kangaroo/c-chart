import React, { Component, Fragment } from 'react'
import CommonChart from '../core'
import 'echarts/lib/chart/line'

import { line } from './main'

class LineChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { line },
      chartHandler: line
    }
  }
}
export default LineChart