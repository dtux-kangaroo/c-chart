import React from 'react';
import {Breadcrumb,Row,Col,Button,Icon,Dropdown,Menu,Card,Steps,message as Message,Divider,Tabs,Tooltip} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TabOne from './components/TabOne';
import TabTwo from './components/TabTwo';
import TabThree from './components/TabThree';
import * as actions from './actions';
import './style.scss';


const ButtonGroup = Button.Group;
const Step = Steps.Step;
const TabPane = Tabs.TabPane;
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
@connect(
  state => ({ detail:state.detail }),
  dispatch=>bindActionCreators(actions,dispatch)
)
class Detail extends React.PureComponent{
  constructor(props){
    super(props);
    const {getDetailData} =props;
    getDetailData();
  }
  render(){
    const {detail} = this.props;
    const {detailData,loading} =detail;
    const {operationLogs={},recordList=[]} =detailData;
    const menu = (
      <Menu>
        <Menu.Item>选项一</Menu.Item>
        <Menu.Item>选项二</Menu.Item>
        <Menu.Item>选项三</Menu.Item>  
      </Menu>
    );
    return (
      <div className="m-detail">
        <Card loading={loading} className="m-basicInfo">
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>详情</Breadcrumb.Item>
          </Breadcrumb>
          <Row className="mt-20">
            <Col span={1}><img className="u-detail-icon" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"/></Col>
            <Col span={15}><h4 className="u-detail-orderno pl-10">单号：234231029431</h4></Col>
            <Col span={8} className="text-right">
              <ButtonGroup>
                <Button>操作</Button>
                <Button>操作</Button>
                <Dropdown overlay={menu}>
                  <Button><Icon type="ellipsis" /></Button>
                </Dropdown>
              </ButtonGroup>
              <Button style={{marginLeft:10}} type="primary">主操作</Button>
            </Col>
          </Row>
          <Row>
            <Col className="m-detail-first" style={{paddingLeft:10}} span={14} offset={1}>
              <Row >
                <Col className="m-detail-item" span={12}><span className="u-label">创建人：</span>隔壁老王</Col>
                <Col className="m-detail-item" span={12}><span className="u-label">订购产品：</span>五包辣条</Col>
              </Row>
              <Row>
                <Col className="m-detail-item" span={12}><span className="u-label">创建时间：</span>2017-07-07</Col>
                <Col className="m-detail-item" span={12}><span className="u-label">关联单据：</span>8888</Col>
              </Row>
              <Row>
                <Col className="m-detail-item" span={12}><span className="u-label">生效日期：</span>2017-07-07 ~ 2017-08-08</Col>
                <Col className="m-detail-item" span={12}><span className="u-label">备注：</span>珍爱生命，远离辣条</Col>
              </Row>
            </Col>
            <Col className="m-detail-second" span={9}>
              <Row>
                <Col className="m-detail-item" span={8} push={8}>
                  <div className="u-label">状态</div>
                  <div>待审批</div>
                </Col>
                <Col className="m-detail-item" span={8} push={8}>
                  <div className="u-label">订单金额</div>
                  <div>￥888.88</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card 
          title="流程进度" 
          loading={loading} 
          bordered={false} 
          style={{margin:'20px'}}>
          <Steps progressDot current={1}>
            <Step title="创建项目" description={StepDesc({creator:'曲丽丽',createdTime:'2016-12-12 12:32'})}/>
            <Step title="部门初审" description={StepDesc({creator:'周毛毛'})} />
            <Step title="财务复核" description="" />
            <Step title="完成" description="" />
          </Steps>
        </Card>
        <Card 
          className="m-user-info" 
          loading={loading} 
          title="用户信息" 
          bordered={false} 
          style={{margin:'20px'}}>
          <Row>
            <Col className="info-item" span={8}>用户姓名：<span className="u-content">付小小</span></Col>
            <Col className="info-item" span={8}>会员卡号：<span className="u-content">32943898021309809423</span></Col>
            <Col className="info-item" span={8}>身份证：<span className="u-content">3321944288191034921</span></Col>
          </Row>
          <Row>
            <Col className="info-item" span={8}>联系方式：<span className="u-content">18112345678</span></Col>
            <Col className="info-item" span={8}>联系地址：<span className="u-content">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</span></Col>
          </Row>
          <h4>信息组</h4>
          <Row>
            <Col className="info-item" span={8}>某某数据：<span className="u-content">725</span></Col>
            <Col className="info-item" span={8}>该数据更新时间：<span className="u-content">2017-08-08</span></Col>
          </Row>
          <Row>
            <Col className="info-item" span={8}>某某数据 <Tooltip placement="top" title="数据说明"><Icon style={{fontSize:16,lineHeight:'22px',marginLeft:6}} type="info-circle-o" /></Tooltip>：<span className="u-content">725</span></Col>
            <Col className="info-item" span={8}>该数据更新时间：<span className="u-content">2017-08-08</span></Col>
          </Row>
          <h4>信息组</h4>
          <Card
            loading={loading}
            type="inner"
            title="多层级信息组">
            <h4>信息组</h4>
            <Row>
              <Col className="info-item" span={8}>负责人：<span className="u-content">林东东</span></Col>
              <Col className="info-item" span={8}>角色码：<span className="u-content">1234567</span></Col>
              <Col className="info-item" span={8}>所属部门：<span className="u-content">XX公司 - YY部</span></Col>
            </Row>
            <Row>
              <Col className="info-item" span={8}>过期时间：<span className="u-content">2017-08-08</span></Col>
              <Col className="info-item" span={8}>描述：<span className="u-content">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</span></Col>
            </Row>
            <Divider />
            <h4>信息组</h4>
            <Row>
              <Col className="info-item" span={16}>学名：<span className="u-content">Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..</span></Col>
            </Row>
            <Divider />
            <h4>信息组</h4>
            <Row>
              <Col className="info-item" span={8}>负责人：<span className="u-content">付小小</span></Col>
              <Col className="info-item" span={8}>角色码：<span className="u-content">1234568</span></Col>
            </Row>
          </Card>
        </Card>
        <Card className="m-user-record" title="用户近半年来电记录" bordered={false} style={{margin:'20px'}}>
          {recordList.length===0&&<div className="m-no-data"><Icon type="frown-o" /><span className="ml-10" style={{fontSize:16}}>暂无数据</span></div>}
        </Card>
        <Card style={{margin:'20px'}}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="操作日志一" key="1"><TabOne loading={loading} dataSource={operationLogs.tab1}/></TabPane>
            <TabPane tab="操作日志二" key="2"><TabTwo loading={loading}  dataSource={operationLogs.tab2}/></TabPane>
            <TabPane tab="操作日志三" key="3"><TabThree loading={loading}  dataSource={operationLogs.tab3}/></TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}
export default Detail;