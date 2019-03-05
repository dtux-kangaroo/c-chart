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

require('./loading.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingCom = function (_Component) {
    (0, _inherits3.default)(LoadingCom, _Component);

    function LoadingCom() {
        (0, _classCallCheck3.default)(this, LoadingCom);
        return (0, _possibleConstructorReturn3.default)(this, (LoadingCom.__proto__ || Object.getPrototypeOf(LoadingCom)).apply(this, arguments));
    }

    (0, _createClass3.default)(LoadingCom, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'v-charts-component-loading', style: { display: this.props.loadingStyle } },
                _react2.default.createElement(
                    'div',
                    { className: 'loader' },
                    _react2.default.createElement(
                        'div',
                        { className: 'loading-spinner' },
                        _react2.default.createElement(
                            'svg',
                            { className: 'circular', viewBox: '25 25 50 50' },
                            _react2.default.createElement('circle', { className: 'path', cx: '50', cy: '50', r: '20', fill: 'none' })
                        )
                    )
                )
            );
        }
    }]);
    return LoadingCom;
}(_react.Component);

var _default = LoadingCom;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(LoadingCom, 'LoadingCom', 'src/chartPackage/components/loading.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/chartPackage/components/loading.js');
}();

;