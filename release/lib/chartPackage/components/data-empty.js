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

require('./data-empty.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataEmpty = function (_Component) {
    (0, _inherits3.default)(DataEmpty, _Component);

    function DataEmpty(props) {
        (0, _classCallCheck3.default)(this, DataEmpty);
        return (0, _possibleConstructorReturn3.default)(this, (DataEmpty.__proto__ || Object.getPrototypeOf(DataEmpty)).call(this, props));
    }

    (0, _createClass3.default)(DataEmpty, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'v-charts-data-empty', style: { display: this.props.dataStyle } },
                '\u6682\u65E0\u6570\u636E'
            );
        }
    }]);
    return DataEmpty;
}(_react.Component);

var _default = DataEmpty;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(DataEmpty, 'DataEmpty', 'src/chartPackage/components/data-empty.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/chartPackage/components/data-empty.js');
}();

;