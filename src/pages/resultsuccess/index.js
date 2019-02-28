import React from 'react';
import {Card,Icon,Button,Row,Col,Steps} from 'antd';
import './style.scss';
const Step = Steps.Step;
const StepDesc=(props)=>{
  const {creator,createdTime}=props;
  const handleUrge=()=>{
    Message.success('已催');
  }
  return (
    <div>
      <div className="text-center">{creator}{createdTime&&<Icon className="ml-10" type="dingding-o" />}</div>
      {createdTime?<div className="text-center">{createdTime}</div>:<div className="text-center" style={{color: "rgb(0, 160, 233)"}}><a href="javascript:void(0);" onClick={handleUrge}>催一下<Icon className="ml-10" type="dingding-o" /></a></div>}
    </div>
  );
}
class ResultSuccess extends React.PureComponent{
  render(){
    return (
      <Card className="m-result-success">
        <div className="m-content">
          <div className="text-center" style={{marginBottom: 24}}><Icon className="u-status-success" type="check-circle" /></div>
          <div className="u-text-success">提交成功</div>
          <div className="u-description">提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。</div>
          <div className="m-extra">
            <h4 className="u-title">项目名称</h4>
            <Row className="m-info">
              <Col className="m-info-item" span={8}><span className="u-label">项目 ID：</span>23421</Col>
              <Col className="m-info-item" span={8}><span className="u-label">负责人：</span>曲丽丽</Col>
              <Col className="m-info-item" span={8}><span className="u-label">生效时间：</span>2016-12-12 ~ 2017-12-12</Col>
            </Row>
            <Steps style={{marginTop:20}} progressDot current={1}>
                <Step title="创建项目" description={StepDesc({creator:'曲丽丽',createdTime:'2016-12-12 12:32'})}/>
                <Step title="部门初审" description={StepDesc({creator:'周毛毛'})} />
                <Step title="财务复核" description="" />
                <Step title="完成" description="" />
              </Steps>
          </div>
          <div className="text-center mt-20">
            <Button type="primary">返回列表</Button>
            <Button className="ml-10">查看项目</Button>
            <Button className="ml-10">打印</Button>
          </div>
        </div>
      </Card>
    )
  }
}
export default ResultSuccess;