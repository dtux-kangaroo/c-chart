import React, { Component } from 'react';
import CeBar from '../../../chartPackage/packages/bar';
import CeLine from '../../../chartPackage/packages/line';
import CeCandle from '../../../chartPackage/packages/candle';
import CeFunnel from '../../../chartPackage/packages/funnel';
import CeGauge from '../../../chartPackage/packages/gauge';
import CeHeatMap from '../../../chartPackage/packages/heatmap';
import CeHistogram from '../../../chartPackage/packages/histogram';
import CeLiquidfill from '../../../chartPackage/packages/liquidfill';
import CeMap from '../../../chartPackage/packages/map';
import CePie from '../../../chartPackage/packages/pie';
import CeRadar from '../../../chartPackage/packages/radar';
import CeRing from '../../../chartPackage/packages/ring';
import CeSankey from '../../../chartPackage/packages/sankey';
import CeScatter from '../../../chartPackage/packages/scatter';
import CeTree from '../../../chartPackage/packages/tree';
import CeWaterfall from '../../../chartPackage/packages/waterfall';
import CeWordcloud from '../../../chartPackage/packages/wordcloud';
import './style.scss';

import CHART_DATA from '../../chartData';
import SideNav from '../../components/sideNav';

export default class homeCom extends Component{
    constructor(props){
        super(props)
        this.state = {
            chartData: [],
            type: null,
            innerType: null,
        }
    }

    componentWillMount(){
    }

    componentDidMount(){
    }

    render(){
        const { params } = this.props.match;
        const chartData = CHART_DATA[params.type].data;
        const innerType = CHART_DATA[params.type].type;
        
        return(
            <div className="main-container">
                <div className="left-section">
                    <SideNav />
                </div>
                <div className="right-section">
                    <div className="page-item-test">
                            {
                                chartData.map((res,index) => {
                                    return(
                                        <div className="chart-item" key={index}>
                                            {
                                                params.type=='line'?<CeLine is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params.type=='bar'?<CeBar is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                params.type=='candle'?<CeCandle is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params.type=='funnel'?<CeFunnel is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                params.type=='gauge'?<CeGauge is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params.type=='heatmap'?<CeHeatMap is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                params.type=='histogram'?<CeHistogram is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params.type=='liquidfill'?<CeLiquidfill is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                params.type=='map'?<CeMap is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params.type=='pie'?<CePie is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                params.type=='radar'?<CeRadar is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params.type=='ring'?<CeRing is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                params.type=='sankey'?<CeSankey is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params.type=='scatter'?<CeScatter is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                params.type=='tree'?<CeTree is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params.type=='waterfall'?<CeWaterfall is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                params.type=='wordcloud'?<CeWordcloud is={`ve-${innerType}`} data={res.data} settings={res.settings} />:''
                                            }
                                            
                                        </div>
                                    )
                                })
                            }
                    </div>
                </div>
            </div>
        )
    }
}