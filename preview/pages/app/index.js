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
            urlHash: ''
        }
    }

    componentWillMount(){
        if(location.hash == ''){
            window.location.href = '#/bar';
        }

        window.addEventListener("hashchange", () => {
            window.scrollTo(0, 0);
      
            this.urlChange();
          }, false);
    }

    componentWillReceiveProps(newProps){
    }

    componentDidMount(){
    }

    urlChange(e){
        this.setState({urlHash: location.hash.split('#/')[1]}) 
    }

    render(){
        const { urlHash } = this.state;
        const chartData = CHART_DATA[urlHash?urlHash:'bar'].data;
        const innerType = CHART_DATA[urlHash?urlHash:'bar'].type;
        
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
                                                    urlHash=='line'?<KoLine is={`ve-${innerType}`} data={res.data} settings={res.settings} />:urlHash=='bar'?<KoBar is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    urlHash=='candle'?<KoCandle is={`ve-${innerType}`} data={res.data} settings={res.settings} />:urlHash=='funnel'?<KoFunnel is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    urlHash=='gauge'?<KoGuage is={`ve-${innerType}`} data={res.data} settings={res.settings} />:urlHash=='heatmap'?<KoHeatmap is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    urlHash=='histogram'?<KoHistogram is={`ve-${innerType}`} data={res.data} settings={res.settings} />:urlHash=='liquidfill'?<KoLiquidfill is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    urlHash=='map'?<KoMap is={`ve-${innerType}`} data={res.data} settings={res.settings} />:urlHash=='pie'?<KoPie is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    urlHash=='radar'?<KoRadar is={`ve-${innerType}`} data={res.data} settings={res.settings} />:urlHash=='ring'?<KoRing is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    urlHash=='sankey'?<KoSankey is={`ve-${innerType}`} data={res.data} settings={res.settings} />:urlHash=='scatter'?<KoScatter is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    urlHash=='tree'?<KoTree is={`ve-${innerType}`} data={res.data} settings={res.settings} />:urlHash=='waterfall'?<KoWaterfall is={`ve-${innerType}`} data={res.data} settings={res.settings} />:
                                                    urlHash=='wordcloud'?<KoWordcloud is={`ve-${innerType}`} data={res.data} settings={res.settings} />:<KoBar is={`ve-${innerType}`} data={res.data} settings={res.settings} />
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