import React, { Component } from 'react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import PageHeader from '../../components/pageHeader';
import './style.scss';
import { format } from 'upath';

export default class componentName extends Component {
    constructor(props){
        super(props);
        this.state={
            text:'文本编辑器'
        }
    }
    handleChange = (content, delta, source, editor) => { // 更改后使用编辑器的新内容调用。它将传递编辑器的HTML内容
        this.setState({
            text:content
        })
    }
    onFocus = (range, source, editor) => { //当编辑器获取焦点调用。它将获得新的选择范围
        this.setState({
            text:'悄悄的我来了~'
        })
    }
    onBlur = (previousRange, source, editor) => {
        this.setState({
            text:'轻轻的我走了~'
        })
    }
    onKeyPress = (event) => {  //按下并释放按键后调用
        // console.log(event)
    }
    onKeyDown = (event) => {  //按下按键后调用
        // console.log(event)
    }
    onKeyUp = (event) => {  //释放按键后调用
        // console.log(event)
    }
    onChangeSelection = (range, source, editor) => {
        console.log(range, source, editor)
    }
    render() {
        return (
            <div className="textEditor">
                <PageHeader 
                title="文本编辑器" 
                content="基于react-quill实现的文本富文本编辑功能，更改后使用编辑器的新内容调用。传递编辑器的HTML内容" 
                extra={<div></div>}
                />
                <div className="content">
                        <ReactQuill 
                            className="editor_wrap"
                            value={this.state.text}
                            onChange={this.handleChange}
                            onFocus ={this.onFocus}
                            onBlur={this.onBlur}
                            onKeyPress={this.onKeyPress}
                            onKeyDown={this.onKeyDown}
                            onKeyUp={this.onKeyUp}
                            onChangeSelection = {this.onChangeSelection}
                            theme="snow"
                            defaultValue=""
                            placeholder="请输入文本"
                            readOnly={false}
                            format={[
                                "header",
                                "font",
                                "size",
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                                "list",
                                "bullet",
                                "indent",
                                "link",
                                "image",
                                "color"
                              ]} 
                        />
                </div>
            </div>
        )
    }
}
