import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { Button } from "antd";
import * as applicationConfig  from "./action"; 
import PageHeader from '../../components/pageHeader';
import './style.scss';
import DraggableContent from './components/draggableContent';

@connect(
  state => ({ ...state.draggable }),
  dispatch => bindActionCreators({ ...applicationConfig}, dispatch)
)
export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
  render() {
    return (  
      <div>
      <div>
          <PageHeader 
            title="拖拽排序" 
            content="基于react-dnd实现的拖拽排序功能，可在此基础上扩展" 
            extra={<div></div>}
              />
              <div className="content">
                <DraggableContent />
              </div>
          </div>
      </div>     
    )
  }
}
