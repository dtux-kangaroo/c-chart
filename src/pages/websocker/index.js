import React from 'react';
import moment from 'moment';
import {Button,message as Message,Row,Col} from 'antd';
// import Stomp from 'stompjs'
// import SockJS from 'sockjs';
import './style.scss';
class Websocker extends React.PureComponent{
  state={
    messageList:[],
    actorList:["苍井空","吉泽明步","小泽玛利亚","松岛枫","麻仓优","泷泽萝拉","波多野结衣","大桥未久","樱井莉亚","雾岛奈津美"],
    isContinue:true
  }
  handleConnectWebsocket=()=>{
    Message.success('建立Websocket成功');
    //演示
    this.demoDemonstration();
    //真实的
    // this.createWebsocketConnection();
  }
  demoDemonstration=()=>{
    setInterval(()=>{
      const {messageList,isContinue,actorList}= this.state;
      if(isContinue){
        messageList.push({
          time:moment(new Date()).format('YYYY-MM-DD HH:mm:SS'),
          message:actorList[Math.floor(Math.random()*10)]
        });
        this.setState({
          messageList:[].concat(messageList)
        },()=>{
          this.Receiver.scrollTop= this.Receiver.scrollHeight-this.Receiver.clientHeight;
        });
      }
    },300);
  }
  createWebsocketConnection=()=>{
    const socket=new SockJS('建立连接的地址');
    //自定义头部
    const headers={};
    this.stompClient= Stomp.over(socket);
    this.stompClient.connect(headers,()=>{
      this.stompClient.subscribe('监听事件名',(respnose)=>{
        //写你的业务代码
      });
    });
  }
  handleContinue=()=>{
    this.setState({
      isContinue:!this.state.isContinue
    });
  }
  handleClear=()=>{
    this.setState({
      messageList:[]
    });
  }
  render(){
    const {messageList,isContinue} = this.state;
    return (<div className="m-websocker">
      <Button type="primary" onClick={this.handleConnectWebsocket}>建立连接</Button>
      <Button className="ml-10" type={isContinue?'danger':'default'} onClick={this.handleContinue}>{isContinue?'暂停':'开始'}</Button>
      <Button className="ml-10" type="dashed" onClick={this.handleClear}>清空</Button>
      <div ref={dom=>this.Receiver=dom} className="m-receiver">
        {
          messageList.map((message,index)=>{
            return (<Row className="m-message" key={index}>
              <Col span={2}>{index+1}</Col>
              <Col span={4}>{message.time}</Col>
              <Col span={16}>{message.message}</Col>
            </Row>)
          })
        }
      </div>
    </div>);
  }
}
export default Websocker;