import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import Prism from 'prismjs';
import PropTypes from 'prop-types';
import 'prismjs/themes/prism.css';
import './style.scss';

var CodeView = function (_Component) {
    _inherits(CodeView, _Component);

    function CodeView(props) {
        _classCallCheck(this, CodeView);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.innerCode = function () {
            var content = _this.props.json ? JSON.stringify(_this.props.content, null, 2) : _this.props.content;
            return Prism.highlight(content, Prism.languages['javascript']);
        };

        _this.cls = function () {
            var _ref;

            var lang = _this.props.lang;

            return _ref = {}, _ref['language-' + lang] = true, _ref;
        };

        _this.state = {};
        return _this;
    }

    CodeView.prototype.render = function render() {
        var innerCode = this.innerCode();
        return React.createElement(
            'pre',
            { className: 'language-javascript' },
            React.createElement('code', { className: 'language-javascript', dangerouslySetInnerHTML: { __html: innerCode } })
        );
    };

    return CodeView;
}(Component);

CodeView.defaultProps = {
    content: '',
    lang: 'javascript',
    json: false
};
CodeView.propTypes = {
    lang: PropTypes.string,
    json: PropTypes.bool
};


export default CodeView;