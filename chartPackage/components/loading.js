import React, { Component } from 'react';
import './loading.scss';

class LoadingCom extends Component{
    render(){
        return (
            <div className="v-charts-component-loading" style={{display: this.props.loadingStyle}}>
                <div className="loader">
                <div className="loading-spinner">
                    <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none"/>
                    </svg>
                </div>
                </div>
            </div>
        )
    }
}

export default LoadingCom;