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
        if(location.pathname == '/'){
            window.location.href = '/chart/bar';
        }
    }

    componentDidMount(){
    }

    render(){
        const params = (window.location.pathname.split('/'))[2];
        const chartData = CHART_DATA[params].data;
        const innerType = CHART_DATA[params].type;
        
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
                                                    params=='line'?<CeLine is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='bar'?<CeBar is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='candle'?<CeCandle is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='funnel'?<CeFunnel is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='gauge'?<CeGauge is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='heatmap'?<CeHeatMap is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='histogram'?<CeHistogram is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='liquidfill'?<CeLiquidfill is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='map'?<CeMap is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='pie'?<CePie is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='radar'?<CeRadar is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='ring'?<CeRing is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='sankey'?<CeSankey is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='scatter'?<CeScatter is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='tree'?<CeTree is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='waterfall'?<CeWaterfall is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='wordcloud'?<CeWordcloud is={`ve-${innerType}`} data={res.data} settings={res.settings} />:''
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