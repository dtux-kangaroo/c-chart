import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import echartsLib from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import numerify from 'numerify';
import { getType, debounce, camelToKebab, isArray, isObject, cloneDeep, isEqual } from 'utils-lite';

import Loading from '../components/loading';
import DataEmpty from '../components/data-empty';
import { DEFAULT_COLORS, DEFAULT_THEME, STATIC_PROPS, ECHARTS_SETTINGS } from './constants';
import setExtend from '../utils/extend';
import setMark from '../utils/mark';
import setAnimation from '../utils/animation';

var BarChart = function (_Component) {
  _inherits(BarChart, _Component);

  function BarChart(props) {
    _classCallCheck(this, BarChart);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.dataHandler = function () {
      var chartHandler = _this.state.chartHandler;

      if (!chartHandler) return;
      var data = _this.props.data;
      var _this$state = _this.state,
          echarts = _this$state.echarts,
          _once = _this$state._once;
      var _this$props = _this.props,
          tooltipVisible = _this$props.tooltipVisible,
          legendVisible = _this$props.legendVisible,
          tooltipFormatter = _this$props.tooltipFormatter,
          beforeConfig = _this$props.beforeConfig,
          settings = _this$props.settings;
      var _data = data,
          _data$columns = _data.columns,
          columns = _data$columns === undefined ? [] : _data$columns,
          _data$rows = _data.rows,
          rows = _data$rows === undefined ? [] : _data$rows;

      var extra = {
        tooltipVisible: tooltipVisible,
        legendVisible: legendVisible,
        echarts: echarts,
        color: _this.chartColor(),
        tooltipFormatter: tooltipFormatter,
        _once: _once
      };
      if (beforeConfig) data = beforeConfig(data);

      var options = chartHandler(columns, rows, settings, extra);
      if (options) {
        if (typeof options.then === 'function') {
          options.then(_this.optionsHandler);
        } else {
          _this.optionsHandler(options);
        }
      }
    };

    _this.resize = function () {
      _this.echartsResize();
      // if (!this.cancelResizeCheck) {
      //   if (this.$el &&
      //     this.$el.clientWidth &&
      //     this.$el.clientHeight) {
      //     this.echartsResize()
      //   }
      // } else {
      //   this.echartsResize()
      // }
    };

    _this.optionsHandler = function (options) {
      var _this$state2 = _this.state,
          _store = _this$state2._store,
          echarts = _this$state2.echarts,
          _once = _this$state2._once;
      var _this$props2 = _this.props,
          legendPosition = _this$props2.legendPosition,
          animation = _this$props2.animation,
          markArea = _this$props2.markArea,
          markLine = _this$props2.markLine,
          markPoint = _this$props2.markPoint,
          extend = _this$props2.extend,
          afterConfig = _this$props2.afterConfig,
          settings = _this$props2.settings,
          notSetUnchange = _this$props2.notSetUnchange,
          log = _this$props2.log,
          judgeWidth = _this$props2.judgeWidth,
          afterSetOption = _this$props2.afterSetOption,
          afterSetOptionOnce = _this$props2.afterSetOptionOnce;

      var chartColor = _this.chartColor();
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
      ECHARTS_SETTINGS.forEach(function (setting) {
        if (_this[setting]) options[setting] = _this[setting];
      });
      // animation
      if (animation) setAnimation(options, animation);
      // marks
      if (markArea || markLine || markPoint) {
        var marks = {
          markArea: markArea,
          markLine: markLine,
          markPoint: markPoint
        };
        var series = options.series;
        if (isArray(series)) {
          series.forEach(function (item) {
            setMark(item, marks);
          });
        } else if (isObject(series)) {
          setMark(series, marks);
        }
      }
      // change inited echarts settings
      if (extend) setExtend(options, extend);
      if (afterConfig) options = afterConfig(options);
      var setOptionOpts = _this.props.setOptionOpts;
      // map chart not merge
      if ((settings.bmap || settings.amap) && !isObject(setOptionOpts)) {
        setOptionOpts = false;
      }
      // exclude unchange options
      if (notSetUnchange && notSetUnchange.length) {
        notSetUnchange.forEach(function (item) {
          var value = options[item];
          if (value) {
            if (isEqual(value, _store[item])) {
              options[item] = undefined;
            } else {
              _store[item] = cloneDeep(value);
            }
          }
        });
        if (isObject(setOptionOpts)) {
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
      if (judgeWidth) _this.judgeWidthHandler(options);
      if (afterSetOption) _this.afterSetOption(_this.echarts, options, echartsLib);
      if (afterSetOptionOnce && !_this._once['afterSetOptionOnce']) {
        var newOnce = Object.assign({}, _once, { afterSetOptionOnce: true });
        _this.setState({ _once: newOnce });
        _this.afterSetOptionOnce(echarts, options, echartsLib);
      }
    };

    _this.state = {
      echarts: null,
      registeredEvents: [],
      _once: {},
      _store: {}
    };
    return _this;
  }

  BarChart.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        resizeDelay = _props.resizeDelay,
        changeDelay = _props.changeDelay;


    this.setState({
      resizeHandler: debounce(this.resize, resizeDelay),
      changeHandler: debounce(this.dataHandler, changeDelay)
    });
    this.addWatchToProps();
  };

  BarChart.prototype.componentDidMount = function componentDidMount() {
    this.init();
  };

  BarChart.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
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
  };

  BarChart.prototype.componentWillUnmount = function componentWillUnmount() {
    this.clean();
  };

  BarChart.prototype.chartColor = function chartColor() {
    var _props3 = this.props,
        colors = _props3.colors,
        theme = _props3.theme;

    return colors || theme && theme.color || DEFAULT_COLORS;
  };

  BarChart.prototype.canvasStyle = function canvasStyle() {
    var _props4 = this.props,
        width = _props4.width,
        height = _props4.height;

    return {
      width: width,
      height: height,
      position: 'relative'
    };
  };

  BarChart.prototype.echartsResize = function echartsResize() {
    var echarts = this.state.echarts;

    echarts && echarts.resize();
  };

  BarChart.prototype.judgeWidthHandler = function judgeWidthHandler(options) {
    var _this2 = this;

    //????
    var widthChangeDelay = this.widthChangeDelay,
        resize = this.resize;

    if (this.$el.clientWidth || this.$el.clientHeight) {
      resize();
    } else {
      this.$nextTick(function (_) {
        if (_this2.$el.clientWidth || _this2.$el.clientHeight) {
          resize();
        } else {
          setTimeout(function (_) {
            resize();
            if (!_this2.$el.clientWidth || !_this2.$el.clientHeight) {
              console.warn(' Can\'t get dom width or height ');
            }
          }, widthChangeDelay);
        }
      });
    }
  };

  BarChart.prototype.resizeableHandler = function resizeableHandler(resizeable) {
    var _once = this.state._once;

    if (resizeable && !_once.onresize) this.addResizeListener();
    if (!resizeable && _once.onresize) this.removeResizeListener();
  };

  BarChart.prototype.init = function init() {
    var echarts = this.state.echarts;
    var _props5 = this.props,
        themeName = _props5.themeName,
        theme = _props5.theme,
        data = _props5.data,
        resizeable = _props5.resizeable,
        initOptions = _props5.initOptions;


    if (echarts) return;
    var endThemeName = themeName || theme || DEFAULT_THEME;
    this.setState({ echarts: echartsLib.init(this.refs.canvas, endThemeName, initOptions) });
    if (data) this.state.changeHandler();
    this.createEventProxy();
    if (resizeable) this.addResizeListener();
  };

  BarChart.prototype.addResizeListener = function addResizeListener() {
    var _once = this.state._once;

    window.addEventListener('resize', this.state.resizeHandler());
    var newOnce = Object.assign({}, _once, { onresize: true });
    this.setState({ _once: newOnce });
  };

  BarChart.prototype.removeResizeListener = function removeResizeListener() {
    window.removeEventListener('resize', this.state.resizeHandler());

    var newData = Object.assign({}, this.state._once, { onresize: false });
    this.setState({
      _once: newData
    });
  };

  BarChart.prototype.addWatchToProps = function addWatchToProps() {
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
  };

  BarChart.prototype.createEventProxy = function createEventProxy() {
    // 只要用户使用 on 方法绑定的事件都做一层代理，
    // 是否真正执行相应的事件方法取决于该方法是否仍然存在 events 中
    // 实现 events 的动态响应
    var self = this;
    var events = this.props.events;
    var _state = this.state,
        echarts = _state.echarts,
        registeredEvents = _state.registeredEvents;

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
  };

  BarChart.prototype.clean = function clean() {
    var resizeable = this.props.resizeable;
    var echarts = this.state.echarts;


    if (resizeable) this.removeResizeListener();
    echarts.dispose();
  };

  BarChart.prototype.themeChange = function themeChange(theme) {
    this.clean();
    this.setState({ echarts: null });
    this.init();
  };

  BarChart.prototype.render = function render() {
    var _props6 = this.props,
        name = _props6.name,
        is = _props6.is,
        dataEmpty = _props6.dataEmpty,
        loading = _props6.loading,
        width = _props6.width,
        height = _props6.height;

    var canvasStyle = this.canvasStyle();

    return React.createElement(
      'div',
      { className: camelToKebab(name || is) },
      React.createElement('div', { style: canvasStyle, className: dataEmpty || loading ? 'v-charts-mask-status' : '', ref: 'canvas' }),
      React.createElement(DataEmpty, { dataStyle: dataEmpty ? "" : "none" }),
      React.createElement(Loading, { loadingStyle: loading ? "" : "none" })
    );
  };

  return BarChart;
}(Component);

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
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  settings: PropTypes.object,
  width: PropTypes.string,
  height: PropTypes.string,
  beforeConfig: PropTypes.func,
  afterConfig: PropTypes.func,
  afterSetOption: PropTypes.func,
  afterSetOptionOnce: PropTypes.func,
  events: PropTypes.object,
  grid: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  colors: PropTypes.array,
  tooltipVisible: PropTypes.bool,
  legendVisible: PropTypes.bool,
  legendPosition: PropTypes.string,
  markLine: PropTypes.object,
  markArea: PropTypes.object,
  markPoint: PropTypes.object,
  visualMap: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dataZoom: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  toolbox: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  initOptions: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  legend: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  xAxis: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  yAxis: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  radar: PropTypes.object,
  tooltip: PropTypes.object,
  axisPointer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  brush: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  geo: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  timeline: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  graphic: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  series: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  backgroundColor: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  animation: PropTypes.object,
  theme: PropTypes.object,
  themeName: PropTypes.string,
  loading: PropTypes.bool,
  dataEmpty: PropTypes.bool,
  extend: PropTypes.object,
  judgeWidth: PropTypes.bool,
  widthChangeDelay: PropTypes.number,
  tooltipFormatter: PropTypes.func,
  resizeable: PropTypes.bool,
  resizeDelay: PropTypes.number,
  changeDelay: PropTypes.number,
  setOptionOpts: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  cancelResizeCheck: PropTypes.bool,
  notSetUnchange: PropTypes.array,
  log: PropTypes.bool
};
export default BarChart;