import React, { Component, PropTypes } from "react";
import { Link } from "react-router-dom";
// import { ReactMarkdown } from 'react-markdown';
import moment from "moment";
moment.locale("zh-cn");

import './style.scss'
import { format } from "upath";

class Markdown extends Component{
    constructor(props){
        super(props)
        this.state = {
            markdown_input: '# This is a header\n\nAnd this is a paragraph'
        }
    }

    componentDidMount(){
    }

    render(){
        const { markdown_input } = this.state;
        return(
            <div>
            <p>dsaasdasdas</p>
            {/* <ReactMarkdown source={markdown_input} /> */}
            </div>
        )
    }
}

export default Markdown