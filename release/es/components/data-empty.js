import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import './data-empty.scss';

var DataEmpty = function (_Component) {
    _inherits(DataEmpty, _Component);

    function DataEmpty(props) {
        _classCallCheck(this, DataEmpty);

        return _possibleConstructorReturn(this, _Component.call(this, props));
    }

    DataEmpty.prototype.render = function render() {
        return React.createElement(
            'div',
            { className: 'v-charts-data-empty', style: { display: this.props.dataStyle } },
            '\u6682\u65E0\u6570\u636E'
        );
    };

    return DataEmpty;
}(Component);

export default DataEmpty;