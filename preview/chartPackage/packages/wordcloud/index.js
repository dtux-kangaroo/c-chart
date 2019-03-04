import 'echarts-wordcloud'

import CommonChart from '../core'
import { wordcloud } from './main'

class WordcloudChart extends CommonChart{
  constructor(props){
    super(props)
    this.state = {
      chartLib: { wordcloud },
      chartHandler: wordcloud
    }
  }
}
export default WordcloudChart