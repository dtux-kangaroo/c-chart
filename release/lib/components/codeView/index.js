'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _prismjs = require('prismjs');

var _prismjs2 = _interopRequireDefault(_prismjs);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('prismjs/themes/prism.css');

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeView = function (_Component) {
    (0, _inherits3.default)(CodeView, _Component);

    function CodeView(props) {
        (0, _classCallCheck3.default)(this, CodeView);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CodeView.__proto__ || Object.getPrototypeOf(CodeView)).call(this, props));

        _this.innerCode = function () {
            return _this.__innerCode__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.cls = function () {
            return _this.__cls__REACT_HOT_LOADER__.apply(_this, arguments);
        };

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(CodeView, [{
        key: '__cls__REACT_HOT_LOADER__',
        value: function __cls__REACT_HOT_LOADER__() {
            return this.__cls__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: '__innerCode__REACT_HOT_LOADER__',
        value: function __innerCode__REACT_HOT_LOADER__() {
            return this.__innerCode__REACT_HOT_LOADER__.apply(this, arguments);
        }
    }, {
        key: '__innerCode__REACT_HOT_LOADER__',
        value: function __innerCode__REACT_HOT_LOADER__() {
            var content = this.props.json ? JSON.stringify(this.props.content, null, 2) : this.props.content;
            return _prismjs2.default.highlight(content, _prismjs2.default.languages['javascript']);
        }
    }, {
        key: '__cls__REACT_HOT_LOADER__',
        value: function __cls__REACT_HOT_LOADER__() {
            var lang = this.props.lang;

            return (0, _defineProperty3.default)({}, 'language-' + lang, true);
        }
    }, {
        key: 'render',
        value: function render() {
            var innerCode = this.innerCode();
            return _react2.default.createElement(
                'pre',
                { className: 'language-javascript' },
                _react2.default.createElement('code', { className: 'language-javascript', dangerouslySetInnerHTML: { __html: innerCode } })
            );
        }
    }]);
    return CodeView;
}(_react.Component);

CodeView.defaultProps = {
    content: '',
    lang: 'javascript',
    json: false
};
CodeView.propTypes = {
    lang: _propTypes2.default.string,
    json: _propTypes2.default.bool
};
var _default = CodeView;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(CodeView, 'CodeView', 'src/components/codeView/index.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/components/codeView/index.js');
}();

;