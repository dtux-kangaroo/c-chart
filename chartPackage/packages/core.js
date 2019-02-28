import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import echartsLib from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import numerify from 'numerify'
import {
  getType,
  debounce,
  camelToKebab,
  isArray,
  isObject,
  cloneDeep,
  isEqual
} from 'utils-lite'

import Loading from '../components/loading'
import DataEmpty from '../components/data-empty'
import {
    DEFAULT_COLORS,
    DEFAULT_THEME,
    STATIC_PROPS,
    ECHARTS_SETTINGS
  } from './constants'
import setExtend from '../modules/extend'
import setMark from '../modules/mark'
import setAnimation from '../modules/animation'

export default class BarChart extends Component{
    static defaultProps = {
		    data: {} ,
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
        setOptionOpts: true,
    }
    
    static propTypes = {
        data: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        settings: PropTypes.object,
        width: PropTypes.string,
        height: PropTypes.string,
        beforeConfig: PropTypes.func,
        afterConfig: PropTypes.func,
        afterSetOption: PropTypes.func,
        afterSetOptionOnce: PropTypes.func,
        events: PropTypes.object,
        grid: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        colors: PropTypes.array,
        tooltipVisible: PropTypes.bool,
        legendVisible: PropTypes.bool,
        legendPosition: PropTypes.string,
        markLine: PropTypes.object,
        markArea: PropTypes.object,
        markPoint: PropTypes.object,
        visualMap: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        dataZoom: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        toolbox: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        initOptions: PropTypes.object,
        title: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        legend: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        xAxis: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        yAxis: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        radar: PropTypes.object,
        tooltip: PropTypes.object,
        axisPointer: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        brush: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        geo: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        timeline: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        graphic: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        series: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        backgroundColor: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        textStyle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
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
        setOptionOpts: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.object
        ]),
        cancelResizeCheck: PropTypes.bool,
        notSetUnchange: PropTypes.array,
        log: PropTypes.bool
	}
    constructor(props){
        super(props)
        this.state = {
            echarts: null,
            registeredEvents: [],
            _once: {},
            _store: {},
        }
    }

    componentWillMount(){
      const { resizeDelay, changeDelay } = this.props;

      this.setState({
        resizeHandler: debounce(this.resize, resizeDelay),
        changeHandler: debounce(this.dataHandler, changeDelay)
      })
      this.addWatchToProps()
    }

    componentDidMount(){
        console.log()
        this.init();
        
    }

    componentWillReceiveProps(newProps){
      const { width, height, settings, data, events, theme, themeName, resizeable } = this.props;

      if(data != newProps.data){
        if(newProps.data){
          this.changeHandler()
        }
      }
      if(width != newProps.width){
        this.resize()
      }
      if(height != newProps.height){
        this.resize()
      }
      if(settings != newProps.settings){
        if (newProps.settings.type && this.chartLib) this.state.chartHandler = this.chartLib[newProps.settings.type]
        this.changeHandler()
      }
      if(events != newProps.events){
        this.createEventProxy()
      }
      if(theme != newProps.theme){
        this.themeChange()
      }
      if(themeName != newProps.themeName){
        this.themeChange()
      }
      if(resizeable != newProps.resizeable){
        this.resizeableHandler()
      }
    }

    componentWillUnmount(){
        this.clean();
    }

    chartColor () {
        const { colors, theme } = this.props;
        return colors || (theme && theme.color) || DEFAULT_COLORS
    }

    canvasStyle () {
      const { width, height } = this.props;
      return {
          width: 1200,
          height,
          position: 'relative'
      }
    }

    dataHandler = () => {
        const {chartHandler } = this.state;
        if (!chartHandler) return
        let data = this.props.data;
        const { echarts, _once } = this.state;
        const { tooltipVisible, legendVisible, tooltipFormatter, beforeConfig, settings } = this.props;
        const { columns = [], rows = [] } = data
        const extra = {
          tooltipVisible,
          legendVisible,
          echarts,
          color: this.chartColor(),
          tooltipFormatter,
          _once
        }
        if (beforeConfig) data = beforeConfig(data)
  
        let options = chartHandler(columns, rows, settings, extra)
        if (options) {
          if (typeof options.then === 'function') {
            options.then(this.optionsHandler)
          } else {
            this.optionsHandler(options)
          }
        }
    }

    resize = () => {
        this.echartsResize()
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

    echartsResize () { 
        const { echarts } = this.state;
        echarts && echarts.resize() 
    }

    optionsHandler = (options) => {
        const { _store, echarts, _once } = this.state;
        const { legendPosition, animation, markArea, markLine, markPoint,
             extend, afterConfig, settings, notSetUnchange, log, judgeWidth, afterSetOption, afterSetOptionOnce } = this.props;
        let chartColor = this.chartColor();
        // legend
        if (legendPosition && options.legend) {
          options.legend[legendPosition] = 10
          if (~['left', 'right'].indexOf(legendPosition)) {
            options.legend.top = 'middle'
            options.legend.orient = 'vertical'
          }
        }
        // color
        options.color = chartColor
        // echarts self settings
        ECHARTS_SETTINGS.forEach(setting => {
          if (this[setting]) options[setting] = this[setting]
        })
        // animation
        if (animation) setAnimation(options, animation)
        // marks
        if (markArea || markLine || markPoint) {
          const marks = {
            markArea,
            markLine,
            markPoint
          }
          const series = options.series
          if (isArray(series)) {
            series.forEach(item => { setMark(item, marks) })
          } else if (isObject(series)) {
            setMark(series, marks)
          }
        }
        // change inited echarts settings
        if (extend) setExtend(options, extend)
        if (afterConfig) options = afterConfig(options)
        let setOptionOpts = this.props.setOptionOpts;
        // map chart not merge
        if ((settings.bmap || settings.amap) &&
          !isObject(setOptionOpts)) {
          setOptionOpts = false
        }
        // exclude unchange options
        if (notSetUnchange && notSetUnchange.length) {
          notSetUnchange.forEach(item => {
            const value = options[item]
            if (value) {
              if (isEqual(value, _store[item])) {
                options[item] = undefined
              } else {
                _store[item] = cloneDeep(value)
              }
            }
          })
          if (isObject(setOptionOpts)) {
            setOptionOpts.notMerge = false
          } else {
            setOptionOpts = false
          }
        }
        // if (this._isDestroyed) return ???
        if (log) console.log(options)
        echarts.setOption(options, setOptionOpts)
        // this.$emit('ready', this.echarts, options, echartsLib)
        // if (!this._once['ready-once']) {
        //   this._once['ready-once'] = true
        //   this.$emit('ready-once', this.echarts, options, echartsLib)
        // }
        if (judgeWidth) this.judgeWidthHandler(options)
        if (afterSetOption) this.afterSetOption(this.echarts, options, echartsLib)
        if (afterSetOptionOnce && !this._once['afterSetOptionOnce']) {
            let newOnce = Object.assign({}, _once, { afterSetOptionOnce: true })
            this.setState({ _once: newOnce })
            this.afterSetOptionOnce(echarts, options, echartsLib)
        }
    }

    judgeWidthHandler (options) {//????
        const { widthChangeDelay, resize } = this
        if (this.$el.clientWidth || this.$el.clientHeight) {
          resize()
        } else {
          this.$nextTick(_ => {
            if (this.$el.clientWidth || this.$el.clientHeight) {
              resize()
            } else {
              setTimeout(_ => {
                resize()
                if (!this.$el.clientWidth || !this.$el.clientHeight) {
                  console.warn(' Can\'t get dom width or height ')
                }
              }, widthChangeDelay)
            }
          })
        }
    }

    resizeableHandler (resizeable) {
        const { _once } = this.state;
        if (resizeable && !_once.onresize) this.addResizeListener()
        if (!resizeable && _once.onresize) this.removeResizeListener()
    }

    init () {
        const { echarts } = this.state;
        const { themeName, theme, data, resizeable, initOptions } = this.props;

        if (echarts) return
        const endThemeName = themeName || theme || DEFAULT_THEME
        this.setState({echarts:echartsLib.init(this.refs.canvas, endThemeName, initOptions)})
        if (data) this.state.changeHandler()
        this.createEventProxy()
        if (resizeable) this.addResizeListener()
    }

    addResizeListener () {
        const { _once} = this.state;
        window.addEventListener('resize', this.state.resizeHandler())
        let newOnce = Object.assign({}, _once, { onresize: true })
        this.setState({ _once: newOnce })
    }

    removeResizeListener () {
        window.removeEventListener('resize', this.state.resizeHandler())

        let newData = Object.assign({}, this.state._once, { onresize: false })
        this.setState({
            _once: newData
        })
    }

    addWatchToProps () {
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

    createEventProxy () {
        // 只要用户使用 on 方法绑定的事件都做一层代理，
        // 是否真正执行相应的事件方法取决于该方法是否仍然存在 events 中
        // 实现 events 的动态响应
        const self = this;
        const { events } = this.props;
        const { echarts, registeredEvents } = this.state;
        const keys = Object.keys(events || {});
        keys.length && keys.forEach(ev => {
          if (registeredEvents.indexOf(ev) === -1) {
            registeredEvents.push(ev)
            echarts.on(ev, (function (ev) {
              return function (...args) {
                if (ev in self.events) {
                  self.events[ev].apply(null, args)
                }
              }
            })(ev))
          }
        })
    }

    clean () {
        const { resizeable } = this.props;
        const { echarts } = this.state;

        if (resizeable) this.removeResizeListener()
        echarts.dispose()
    }

    themeChange (theme) {
        this.clean()
        this.setState({echarts: null})
        this.init()
    }

    render(){
        const { name, is, dataEmpty, loading, width, height } = this.props;
        const canvasStyle = this.canvasStyle();

        return(
            <div className={camelToKebab(name || is)}>
                <div style={canvasStyle} className={(dataEmpty || loading)?'v-charts-mask-status':''} ref="canvas"></div>
                <DataEmpty dataStyle={dataEmpty?"":"none"} />
                <Loading loadingStyle={loading?"":"none"} /> 
            </div>
        )
    }
}