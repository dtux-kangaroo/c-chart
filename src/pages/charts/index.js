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
                                                params.type=='map'?<CeMap is={`ve-${innerType}`} data={res.data} settings={res.settings} />:''
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