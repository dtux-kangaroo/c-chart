import React, { Component } from 'react';
import './data-empty.scss';

class DataEmpty extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="v-charts-data-empty" style={{display: this.props.dataStyle}}>
                暂无数据
            </div>
        )
    }
}

export default DataEmpty;