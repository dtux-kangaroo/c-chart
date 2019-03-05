import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, Fragment } from 'react';
import { Link, NavLink } from "react-router-dom";
import chartData from '../../chartData/index';
import { mapKeys } from 'lodash';
import './style.scss';

var SideNav = function (_Component) {
    _inherits(SideNav, _Component);

    function SideNav(props) {
        _classCallCheck(this, SideNav);

        return _possibleConstructorReturn(this, _Component.call(this, props));
    }

    SideNav.prototype.render = function render() {
        var menus = Object.keys(chartData).map(function (key) {
            return {
                name: chartData[key].name,
                url: '/chart/' + chartData[key].type
            };
        });

        return React.createElement(
            'div',
            { className: 'component-sidebar' },
            React.createElement(
                'div',
                { className: 'main-section' },
                React.createElement(
                    'ul',
                    { className: 'sidebar-ul' },
                    menus.map(function (res, index) {
                        return React.createElement(
                            'li',
                            { className: 'sidebar-li', key: index },
                            React.createElement(
                                Link,
                                { to: res.url },
                                res.name
                            )
                        );
                    })
                )
            )
        );
    };

    return SideNav;
}(Component);

export default SideNav;