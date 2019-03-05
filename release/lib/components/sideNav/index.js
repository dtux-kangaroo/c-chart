'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _index = require('../../chartData/index');

var _index2 = _interopRequireDefault(_index);

var _lodash = require('lodash');

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SideNav = function (_Component) {
    (0, _inherits3.default)(SideNav, _Component);

    function SideNav(props) {
        (0, _classCallCheck3.default)(this, SideNav);
        return (0, _possibleConstructorReturn3.default)(this, (SideNav.__proto__ || Object.getPrototypeOf(SideNav)).call(this, props));
    }

    (0, _createClass3.default)(SideNav, [{
        key: 'render',
        value: function render() {
            var menus = Object.keys(_index2.default).map(function (key) {
                return {
                    name: _index2.default[key].name,
                    url: '/chart/' + _index2.default[key].type
                };
            });

            return _react2.default.createElement(
                'div',
                { className: 'component-sidebar' },
                _react2.default.createElement(
                    'div',
                    { className: 'main-section' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'sidebar-ul' },
                        menus.map(function (res, index) {
                            return _react2.default.createElement(
                                'li',
                                { className: 'sidebar-li', key: index },
                                _react2.default.createElement(
                                    _reactRouterDom.Link,
                                    { to: res.url },
                                    res.name
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);
    return SideNav;
}(_react.Component);

var _default = SideNav;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(SideNav, 'SideNav', 'src/components/sideNav/index.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/components/sideNav/index.js');
}();

;