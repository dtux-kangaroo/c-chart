import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { Layout, Menu, Breadcrumb } from "antd";
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss';
import * as smallCamel  from "./action"; 
const { Header, Content, Footer } = Layout;

@connect(
  state => ({ ...state.smallCamel }),
  dispatch => bindActionCreators({ ...smallCamel}, dispatch)
)
export default class bigCamel extends Component {
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
      <div className="content">
        <div
          style={{
            color: "blue",
            fontSize: "24px",
            marginTop: "230px",
            textAlign: "center"
          }}
        >
         恭喜，bigCamel主页新建成功 , DIY YOUE CODE !!!.   
        </div>
      </div>     
    )
  }
}
