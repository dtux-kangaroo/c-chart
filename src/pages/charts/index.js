import React, { Component } from 'react';
import { 
    CeBar,
    CeLine,
    CeCandle,
    CeFunnel,
    CeGauge,
    CeHeatMap,
    CeHistogram,
    CeLiquidfill,
    CeMap,
    CePie,
    CeRadar,
    CeRing,
    CeSankey,
    CeScatter,
    CeTree,
    CeWaterfall,
    CeWordcloud
 } from '../../chartPackage/packages';

import CodeView from '../../components/codeView';
import './style.scss';

import CHART_DATA from '../../chartData';
import SideNav from '../../components/sideNav';
import { from } from 'rxjs';

export default class homeCom extends Component{
    constructor(props){
        super(props)
        this.state = {
            chartData: {},
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
                                            <div className="chart-part">
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
                                            <div className="code-view">
                                                <p>数据格式</p>
                                                <div className="data-code">
                                                    <CodeView content={res.data} json />
                                                </div>
                                                <p>配置项</p>
                                                <div className="setting-code">
                                                    <CodeView content={res.settings} json />
                                                </div>
                                            </div>
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