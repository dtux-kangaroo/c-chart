import React, { Component } from 'react'
import Prism from 'prismjs'
import PropTypes from 'prop-types'
import 'prismjs/themes/prism.css'
import './style.scss'

class CodeView extends Component{

    static defaultProps = {
        content: '',
        lang: 'javascript',
        json: false,
    }

    static propTypes = {
        lang: PropTypes.string,
        json: PropTypes.bool
    }

    constructor(props){
        super(props)
        this.state = {

        }
    }

    innerCode = () => {
        const content = this.props.json
          ? JSON.stringify(this.props.content, null, 2)
          : this.props.content
        return Prism.highlight(content, Prism.languages[this.props.lang])
    }

    cls = () => {
        const { lang } = this.props;
        return { [`language-${lang}`]: true }
    }

    render(){
        const innerCode = this.innerCode;
        const cls = this.cls;
        return(
            <pre className={cls}>
                <code className={cls} v-html={innerCode}></code>
            </pre>
        )
    }
}