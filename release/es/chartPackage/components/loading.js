import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import './loading.scss';

var LoadingCom = function (_Component) {
    _inherits(LoadingCom, _Component);

    function LoadingCom() {
        _classCallCheck(this, LoadingCom);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    LoadingCom.prototype.render = function render() {
        return React.createElement(
            'div',
            { className: 'v-charts-component-loading', style: { display: this.props.loadingStyle } },
            React.createElement(
                'div',
                { className: 'loader' },
                React.createElement(
                    'div',
                    { className: 'loading-spinner' },
                    React.createElement(
                        'svg',
                        { className: 'circular', viewBox: '25 25 50 50' },
                        React.createElement('circle', { className: 'path', cx: '50', cy: '50', r: '20', fill: 'none' })
                    )
                )
            )
        );
    };

    return LoadingCom;
}(Component);

export default LoadingCom;