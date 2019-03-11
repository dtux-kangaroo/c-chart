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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _echarts = require('echarts/lib/echarts');

var _echarts2 = _interopRequireDefault(_echarts);

require('echarts/lib/component/tooltip');

require('echarts/lib/component/legend');

var _numerify = require('numerify');

var _numerify2 = _interopRequireDefault(_numerify);

var _utilsLite = require('utils-lite');

var _loading = require('../components/loading');

var _loading2 = _interopRequireDefault(_loading);

var _dataEmpty = require('../components/data-empty');

var _dataEmpty2 = _interopRequireDefault(_dataEmpty);

var _constants = require('./constants');

var _extend = require('../utils/extend');

var _extend2 = _interopRequireDefault(_extend);

var _mark = require('../utils/mark');

var _mark2 = _interopRequireDefault(_mark);

var _animation = require('../utils/animation');

var _animation2 = _interopRequireDefault(_animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BarChart = function (_Component) {
  (0, _inherits3.default)(BarChart, _Component);

  function BarChart(props) {
    (0, _classCallCheck3.default)(this, BarChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this, props));

    _this.dataHandler = function () {
      return _this.__dataHandler__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.resize = function () {
      return _this.__resize__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.optionsHandler = function () {
      return _this.__optionsHandler__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.state = {
      echarts: null,
      registeredEvents: [],
      _once: {},
      _store: {}
    };
    return _this;
  }

  (0, _createClass3.default)(BarChart, [{
    key: '__optionsHandler__REACT_HOT_LOADER__',
    value: function __optionsHandler__REACT_HOT_LOADER__() {
      return this.__optionsHandler__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__resize__REACT_HOT_LOADER__',
    value: function __resize__REACT_HOT_LOADER__() {
      return this.__resize__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__dataHandler__REACT_HOT_LOADER__',
    value: function __dataHandler__REACT_HOT_LOADER__() {
      return this.__dataHandler__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          resizeDelay = _props.resizeDelay,
          changeDelay = _props.changeDelay;


      this.setState({
        resizeHandler: (0, _utilsLite.debounce)(this.resize, resizeDelay),
        changeHandler: (0, _utilsLite.debounce)(this.dataHandler, changeDelay)
      });
      this.addWatchToProps();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height,
          settings = _props2.settings,
          data = _props2.data,
          events = _props2.events,
          theme = _props2.theme,
          themeName = _props2.themeName,
          resizeable = _props2.resizeable;


      if (data != newProps.data) {
        if (newProps.data) {
          this.changeHandler();
        }
      }
      if (width != newProps.width) {
        this.resize();
      }
      if (height != newProps.height) {
        this.resize();
      }
      if (settings != newProps.settings) {
        if (newProps.settings.type && this.state.chartLib) this.state.chartHandler = this.state.chartLib[newProps.settings.type];
        this.changeHandler();
      }
      if (events != newProps.events) {
        this.createEventProxy();
      }
      if (theme != newProps.theme) {
        this.themeChange();
      }
      if (themeName != newProps.themeName) {
        this.themeChange();
      }
      if (resizeable != newProps.resizeable) {
        this.resizeableHandler();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clean();
    }
  }, {
    key: 'chartColor',
    value: function chartColor() {
      var _props3 = this.props,
          colors = _props3.colors,
          theme = _props3.theme;

      return colors || theme && theme.color || _constants.DEFAULT_COLORS;
    }
  }, {
    key: 'canvasStyle',
    value: function canvasStyle() {
      var _props4 = this.props,
          width = _props4.width,
          height = _props4.height;

      return {
        width: width,
        height: height,
        position: 'relative'
      };
    }
  }, {
    key: '__dataHandler__REACT_HOT_LOADER__',
    value: function __dataHandler__REACT_HOT_LOADER__() {
      var chartHandler = this.state.chartHandler;

      if (!chartHandler) return;
      var data = this.props.data;
      var _state = this.state,
          echarts = _state.echarts,
          _once = _state._once;
      var _props5 = this.props,
          tooltipVisible = _props5.tooltipVisible,
          legendVisible = _props5.legendVisible,
          tooltipFormatter = _props5.tooltipFormatter,
          beforeConfig = _props5.beforeConfig,
          settings = _props5.settings;
      var _data = data,
          _data$columns = _data.columns,
          columns = _data$columns === undefined ? [] : _data$columns,
          _data$rows = _data.rows,
          rows = _data$rows === undefined ? [] : _data$rows;

      var extra = {
        tooltipVisible: tooltipVisible,
        legendVisible: legendVisible,
        echarts: echarts,
        color: this.chartColor(),
        tooltipFormatter: tooltipFormatter,
        _once: _once
      };
      if (beforeConfig) data = beforeConfig(data);

      var options = chartHandler(columns, rows, settings, extra);
      if (options) {
        if (typeof options.then === 'function') {
          options.then(this.optionsHandler);
        } else {
          this.optionsHandler(options);
        }
      }
    }
  }, {
    key: '__resize__REACT_HOT_LOADER__',
    value: function __resize__REACT_HOT_LOADER__() {
      this.echartsResize();
      // if (!this.cancelResizeCheck) {
      //   if (this.$el &&
      //     this.$el.clientWidth &&
      //     this.$el.clientHeight) {
      //     this.echartsResize()
      //   }
      // } else {
      //   this.echartsResize()
      // }
    }
  }, {
    key: 'echartsResize',
    value: function echartsResize() {
      var echarts = this.state.echarts;

      echarts && echarts.resize();
    }
  }, {
    key: '__optionsHandler__REACT_HOT_LOADER__',
    value: function __optionsHandler__REACT_HOT_LOADER__(options) {
      var _this2 = this;

      var _state2 = this.state,
          _store = _state2._store,
          echarts = _state2.echarts,
          _once = _state2._once;
      var _props6 = this.props,
          legendPosition = _props6.legendPosition,
          animation = _props6.animation,
          markArea = _props6.markArea,
          markLine = _props6.markLine,
          markPoint = _props6.markPoint,
          extend = _props6.extend,
          afterConfig = _props6.afterConfig,
          settings = _props6.settings,
          notSetUnchange = _props6.notSetUnchange,
          log = _props6.log,
          judgeWidth = _props6.judgeWidth,
          afterSetOption = _props6.afterSetOption,
          afterSetOptionOnce = _props6.afterSetOptionOnce;

      var chartColor = this.chartColor();
      // legend
      if (legendPosition && options.legend) {
        options.legend[legendPosition] = 10;
        if (~['left', 'right'].indexOf(legendPosition)) {
          options.legend.top = 'middle';
          options.legend.orient = 'vertical';
        }
      }
      // color
      options.color = chartColor;
      // echarts self settings
      _constants.ECHARTS_SETTINGS.forEach(function (setting) {
        if (_this2[setting]) options[setting] = _this2[setting];
      });
      // animation
      if (animation) (0, _animation2.default)(options, animation);
      // marks
      if (markArea || markLine || markPoint) {
        var marks = {
          markArea: markArea,
          markLine: markLine,
          markPoint: markPoint
        };
        var series = options.series;
        if ((0, _utilsLite.isArray)(series)) {
          series.forEach(function (item) {
            (0, _mark2.default)(item, marks);
          });
        } else if ((0, _utilsLite.isObject)(series)) {
          (0, _mark2.default)(series, marks);
        }
      }
      // change inited echarts settings
      if (extend) (0, _extend2.default)(options, extend);
      if (afterConfig) options = afterConfig(options);
      var setOptionOpts = this.props.setOptionOpts;
      // map chart not merge
      if ((settings.bmap || settings.amap) && !(0, _utilsLite.isObject)(setOptionOpts)) {
        setOptionOpts = false;
      }
      // exclude unchange options
      if (notSetUnchange && notSetUnchange.length) {
        notSetUnchange.forEach(function (item) {
          var value = options[item];
          if (value) {
            if ((0, _utilsLite.isEqual)(value, _store[item])) {
              options[item] = undefined;
            } else {
              _store[item] = (0, _utilsLite.cloneDeep)(value);
            }
          }
        });
        if ((0, _utilsLite.isObject)(setOptionOpts)) {
          setOptionOpts.notMerge = false;
        } else {
          setOptionOpts = false;
        }
      }
      // if (this._isDestroyed) return ???
      if (log) console.log(options);
      echarts.setOption(options, setOptionOpts);
      // this.$emit('ready', this.echarts, options, echartsLib)
      // if (!this._once['ready-once']) {
      //   this._once['ready-once'] = true
      //   this.$emit('ready-once', this.echarts, options, echartsLib)
      // }
      if (judgeWidth) this.judgeWidthHandler(options);
      if (afterSetOption) this.afterSetOption(this.echarts, options, _echarts2.default);
      if (afterSetOptionOnce && !this._once['afterSetOptionOnce']) {
        var newOnce = Object.assign({}, _once, { afterSetOptionOnce: true });
        this.setState({ _once: newOnce });
        this.afterSetOptionOnce(echarts, options, _echarts2.default);
      }
    }
  }, {
    key: 'judgeWidthHandler',
    value: function judgeWidthHandler(options) {
      var _this3 = this;

      //????
      var widthChangeDelay = this.widthChangeDelay,
          resize = this.resize;

      if (this.$el.clientWidth || this.$el.clientHeight) {
        resize();
      } else {
        this.$nextTick(function (_) {
          if (_this3.$el.clientWidth || _this3.$el.clientHeight) {
            resize();
          } else {
            setTimeout(function (_) {
              resize();
              if (!_this3.$el.clientWidth || !_this3.$el.clientHeight) {
                console.warn(' Can\'t get dom width or height ');
              }
            }, widthChangeDelay);
          }
        });
      }
    }
  }, {
    key: 'resizeableHandler',
    value: function resizeableHandler(resizeable) {
      var _once = this.state._once;

      if (resizeable && !_once.onresize) this.addResizeListener();
      if (!resizeable && _once.onresize) this.removeResizeListener();
    }
  }, {
    key: 'init',
    value: function init() {
      var echarts = this.state.echarts;
      var _props7 = this.props,
          themeName = _props7.themeName,
          theme = _props7.theme,
          data = _props7.data,
          resizeable = _props7.resizeable,
          initOptions = _props7.initOptions;


      if (echarts) return;
      var endThemeName = themeName || theme || _constants.DEFAULT_THEME;
      this.setState({ echarts: _echarts2.default.init(this.refs.canvas, endThemeName, initOptions) });
      if (data) this.state.changeHandler();
      this.createEventProxy();
      if (resizeable) this.addResizeListener();
    }
  }, {
    key: 'addResizeListener',
    value: function addResizeListener() {
      var _once = this.state._once;

      window.addEventListener('resize', this.state.resizeHandler());
      var newOnce = Object.assign({}, _once, { onresize: true });
      this.setState({ _once: newOnce });
    }
  }, {
    key: 'removeResizeListener',
    value: function removeResizeListener() {
      window.removeEventListener('resize', this.state.resizeHandler());

      var newData = Object.assign({}, this.state._once, { onresize: false });
      this.setState({
        _once: newData
      });
    }
  }, {
    key: 'addWatchToProps',
    value: function addWatchToProps() {
      //不确定
      // const watchedVariable = this._watchers.map(watcher => watcher.expression)
      // Object.keys(this.$props).forEach(prop => {
      //   if (!~watchedVariable.indexOf(prop) && !~STATIC_PROPS.indexOf(prop)) {
      //     const opts = {}
      //     if (~['[object Object]', '[object Array]'].indexOf(getType(this.$props[prop]))) {
      //       opts.deep = true
      //     }
      //     this.$watch(prop, () => {
      //       this.changeHandler()
      //     }, opts)
      //   }
      // })
    }
  }, {
    key: 'createEventProxy',
    value: function createEventProxy() {
      // 只要用户使用 on 方法绑定的事件都做一层代理，
      // 是否真正执行相应的事件方法取决于该方法是否仍然存在 events 中
      // 实现 events 的动态响应
      var self = this;
      var events = this.props.events;
      var _state3 = this.state,
          echarts = _state3.echarts,
          registeredEvents = _state3.registeredEvents;

      var keys = Object.keys(events || {});
      keys.length && keys.forEach(function (ev) {
        if (registeredEvents.indexOf(ev) === -1) {
          registeredEvents.push(ev);
          echarts.on(ev, function (ev) {
            return function () {
              if (ev in self.events) {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                self.events[ev].apply(null, args);
              }
            };
          }(ev));
        }
      });
    }
  }, {
    key: 'clean',
    value: function clean() {
      var resizeable = this.props.resizeable;
      var echarts = this.state.echarts;


      if (resizeable) this.removeResizeListener();
      echarts.dispose();
    }
  }, {
    key: 'themeChange',
    value: function themeChange(theme) {
      this.clean();
      this.setState({ echarts: null });
      this.init();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props8 = this.props,
          name = _props8.name,
          is = _props8.is,
          dataEmpty = _props8.dataEmpty,
          loading = _props8.loading,
          width = _props8.width,
          height = _props8.height;

      var canvasStyle = this.canvasStyle();

      return _react2.default.createElement(
        'div',
        { className: (0, _utilsLite.camelToKebab)(name || is) },
        _react2.default.createElement('div', { style: canvasStyle, className: dataEmpty || loading ? 'v-charts-mask-status' : '', ref: 'canvas' }),
        _react2.default.createElement(_dataEmpty2.default, { dataStyle: dataEmpty ? "" : "none" }),
        _react2.default.createElement(_loading2.default, { loadingStyle: loading ? "" : "none" })
      );
    }
  }]);
  return BarChart;
}(_react.Component);

BarChart.defaultProps = {
  data: {},
  settings: {},
  width: 'auto',
  height: '400px',
  tooltipVisible: true,
  legendVisible: true,
  initOptions: {},
  judgeWidth: false,
  widthChangeDelay: 300,
  resizeable: true,
  resizeDelay: 200,
  changeDelay: 0,
  setOptionOpts: true
};
BarChart.propTypes = {
  data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  settings: _propTypes2.default.object,
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  beforeConfig: _propTypes2.default.func,
  afterConfig: _propTypes2.default.func,
  afterSetOption: _propTypes2.default.func,
  afterSetOptionOnce: _propTypes2.default.func,
  events: _propTypes2.default.object,
  grid: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  colors: _propTypes2.default.array,
  tooltipVisible: _propTypes2.default.bool,
  legendVisible: _propTypes2.default.bool,
  legendPosition: _propTypes2.default.string,
  markLine: _propTypes2.default.object,
  markArea: _propTypes2.default.object,
  markPoint: _propTypes2.default.object,
  visualMap: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  dataZoom: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  toolbox: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  initOptions: _propTypes2.default.object,
  title: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  legend: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  xAxis: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  yAxis: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  radar: _propTypes2.default.object,
  tooltip: _propTypes2.default.object,
  axisPointer: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  brush: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  geo: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  timeline: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  graphic: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  series: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  backgroundColor: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  textStyle: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]),
  animation: _propTypes2.default.object,
  theme: _propTypes2.default.object,
  themeName: _propTypes2.default.string,
  loading: _propTypes2.default.bool,
  dataEmpty: _propTypes2.default.bool,
  extend: _propTypes2.default.object,
  judgeWidth: _propTypes2.default.bool,
  widthChangeDelay: _propTypes2.default.number,
  tooltipFormatter: _propTypes2.default.func,
  resizeable: _propTypes2.default.bool,
  resizeDelay: _propTypes2.default.number,
  changeDelay: _propTypes2.default.number,
  setOptionOpts: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
  cancelResizeCheck: _propTypes2.default.bool,
  notSetUnchange: _propTypes2.default.array,
  log: _propTypes2.default.bool
};
var _default = BarChart;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(BarChart, 'BarChart', 'src/packages/core.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/packages/core.js');
}();

;