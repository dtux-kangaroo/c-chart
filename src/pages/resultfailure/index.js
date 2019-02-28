import React from 'react';
import {Card,Icon,Button} from 'antd';
import './style.scss';
class ResultFailure extends React.PureComponent{
  render(){
    return (
      <Card className="m-result-failure">
        <div className="m-content">
          <div className="text-center" style={{marginBottom: 24}}><Icon className="u-status-failure" type="close-circle" /></div>
          <div className="u-text-failure">提交失败</div>
          <div className="u-description">请核对并修改以下信息后，再重新提交。</div>
          <div className="m-extra">
            <h4 className="u-title">您提交的内容有如下错误：</h4>
            <div><Icon className="mr-10" style={{color: "rgb(245, 34, 45)"}} type="close-circle-o"/>您的账户已被冻结<a className="ml-20" href="javascript:void(0);">立即解冻 <Icon type="right"/></a></div>
            <div className="mt-20"><Icon className="mr-10" style={{color: "rgb(245, 34, 45)"}} type="close-circle-o"/>您的账户还不具备申请资格<a className="ml-20" href="javascript:void(0);">立即升级 <Icon type="right"/></a></div>
          </div>
          <div className="text-center mt-20">
            <Button type="primary">返回修改</Button>
          </div>
        </div>
      </Card>
    )
  }
}
export default ResultFailure;