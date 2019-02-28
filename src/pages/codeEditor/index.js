import React from 'react';
import './style.scss';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import {Select, Button,Modal} from 'antd';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/xq-dark.css';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/monokai.css';

require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/css/css');
require('codemirror/mode/javascript/javascript');
const Option=Select.Option;
class CodeEditor extends React.PureComponent{
  state={
      themeList:[{
        label:'material',
        value:'material'
      },
      {
        label:'xq-dark',
        value:'xq-dark'
      },{
        label:'xq-light',
        value:'xq-light'
      },{
        label:'monokai',
        value:'monokai'
      }],
      languageList:[{
        label:'html',
        value:'htmlmixed'
      },{
        label:'css',
        value:'css'
      },{
        label:'javascript',
        value:'javascript'
      }],
      currentTheme:'material',
      currentContent:`console.log("hello World")`,
      currentLanguage:'javascript',
  }
  //主题改变
  handleThemeChange=(value)=>{
    this.setState({
      currentTheme:value
    });
  }
  //语言改变改变
  handleLanguageChange=(value)=>{
    let currentContent="";
    switch(value){
      case 'javascript' :
        currentContent=`console.log("hello World")`;
        break;
      case 'htmlmixed':
        currentContent=`<h1>hello World</h1>)`;
        break;
      case 'css':
        currentContent=`div{color:#324532}`;
        break;
      default:
        currentContent='无该语言文本'

    }
    this.setState({
      currentLanguage:value,
      currentContent
    });

  }
  //响应文本发生变化
  handeleEditorChange=(editor, data, value) => {
    this.setState({
      currentContent:value
    });
  }
  //获取内容
  handleGetContent=()=>{
    Modal.success({
      content:this.state.currentContent
    });
  }
  render(){
    const {themeList,languageList,currentTheme,currentContent,currentLanguage} = this.state;
    return (
      <div className="m-code-editor">
        <div className="text-center"  style={{marginBottom:20}}>
          <Select style={{width:160,marginLeft:10}} placeholder="请选择主题" value={currentTheme} onChange={this.handleThemeChange}>
            {
              themeList.map(theme=><Option key={theme.value} value={theme.value}>{theme.label}</Option>)
            }
          </Select>
          <Select style={{width:160,marginLeft:10}} placeholder="请选择语言" value={currentLanguage} onChange={this.handleLanguageChange}>
            {
              languageList.map(language=><Option key={language.value} value={language.value}>{language.label}</Option>)
            }
          </Select>
          <Button style={{marginLeft:10}} type="primary" onClick={this.handleGetContent}>获取内容</Button>
        </div>
        <CodeMirror
          value={currentContent}
          options={{
            mode: currentLanguage,
            theme: currentTheme,
            lineNumbers: true
          }}
          onChange={this.handeleEditorChange}/>
      </div>
    )
  }
}

export default CodeEditor;
