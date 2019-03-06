import React, { Component } from 'react';
import { 
    KoBar,
    KoCandle,
    KoFunnel,
    KoGuage,
    KoHeatmap,
    KoHistogram,
    KoLine,
    KoLiquidfill,
    KoMap,
    KoPie,
    KoRadar,
    KoRing,
    KoSankey,
    KoScatter,
    KoTree,
    KoWaterfall,
    KoWordcloud
 } from '../../../src/index';

import CodeView from '../../components/codeView';
import './style.scss';

import CHART_DATA from '../../mock';
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

    componentWillReceiveProps(newProps){
        console.log(newProps)
    }

    componentDidMount(){
        console.log(this.props)
    }

    render(){
        const len = window.location.href.split('/').length;
        const params = window.location.href.split('/')[len-1];
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
                                                    params=='line'?<KoLine is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='bar'?<KoBar is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='candle'?<KoCandle is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='funnel'?<KoFunnel is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='gauge'?<KoGuage is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='heatmap'?<KoHeatmap is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='histogram'?<KoHistogram is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='liquidfill'?<KoLiquidfill is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='map'?<KoMap is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='pie'?<KoPie is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='radar'?<KoRadar is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='ring'?<KoRing is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='sankey'?<KoSankey is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='scatter'?<KoScatter is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='tree'?<KoTree is={`ve-${innerType}`} data={res.data} settings={res.settings} />:params=='waterfall'?<KoWaterfall is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    params=='wordcloud'?<KoWordcloud is={`ve-${innerType}`} data={res.data} settings={res.settings} />:''
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