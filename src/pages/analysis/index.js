import React, { Component } from "react";
import { Card, Col, Row, Icon, Tooltip, Tabs, Radio, message, Table } from "antd";
import moment from "moment";
import {BarChart,LineChart,PieChart} from 'components/charts';
import { barOption, lineOption, mapOption, scatterOption, pieOption } from 'constants/option';
import './style.scss'
import http from "utils/http";
import apis from "constants/apis";
moment.locale("zh-cn");

const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barOption: barOption,
            config: {height:'20px'},
            radioData: [],
            tableLoading: true,
            tableData: [],
            total: 0,
            page: {
                pageSize: 10,
                pageNo: 1,
            },
            columns: [{
                title: '序号',
                dataIndex: 'id',
                render: (text, record, index) => <span>{index + 1}</span>,
            }, {
                title: '名字',
                dataIndex: 'name',
            }, {
                title: '描述',
                dataIndex: 'desc',
            }, {
                title: '是否为主要语言',
                dataIndex: 'mainLanguage',
                render: (text, record, index) => {
                    if (record.mainLanguage) {
                        return <span>是</span>
                    } else {
                        return <span>否</span>
                    }
                }
            }]
        };
    }

    componentWillMount() {
        this.getRadioData();
        this.getSearchTableData();
    }

    componentDidMount() {
        this.setChart(200);
    }
    componentWillReceiveProps(nextProps) {

    }
    /* 图片点击函数 */
    handleClickBar = (data) => {
        console.log(data)
    }
    /* 单选按钮change事件 */
    handleRadioChange = (e) => {
        console.log(`选择的是${e.target.value}`)
    }
    /* 分页 */
    handlePageChange = (page) => {
        this.setState({
            page: {
                ...this.state.page,
                pageNo: page
            },
            tableLoading: true,
        }, () => {
            this.getSearchTableData();
        })
    }
    /**
     * 设置图表配置
     * @param {Number} height-图表高度 
     */
    setChart = (height) => {
        this.setState({
            barOption,
            config: {
                height: height + 'px',
                handle: this.handleClickBar
            }
        })
    }
    /* 获取radio数据 */
    getRadioData = () => {
        http.get(apis.getHomeData).then((res) => {
            if (res.result) {
                this.setState({
                    radioData: [{
                        id: 1,
                        value: 'a',
                        title: 'python'
                    }, {
                        id: 2,
                        value: 'b',
                        title: 'javascript'
                    }]
                })
            } else {
                message.warning(res.message);
            }
        })
    }
    /* 获取表格数据 */
    getSearchTableData = () => {
        const { page } = this.state;
        let params = {
            pageNo: page.pageNo,
            pageSize: page.pageSize,
        }
        http.get(apis.getSearchTableData, params).then((res) => {
            if (res.result) {
                this.setState({
                    tableData: res.data.data,
                    total: res.data.total,
                })
            } else {
                message.warning(res.message)
            }
            this.setState({
                tableLoading: false,
            })
        })
    }
    render() {
        const { barOption, config, radioData, columns, tableData, tableLoading, total, page } = this.state;
        return (
            <div className="content analysis">
                <Row className="topLines" gutter={16}>
                    <Col span={6}>
                        <Card
                            hoverable={true}
                            title={
                                <span style={{color:'red'}}>今天周会</span>
                            }
                            extra={
                                <Tooltip title="解释文字">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            }>
                            <div>
                                {`1.工作汇报
                                2.模版文件进度
                                3.问题反馈
                                3.ice，electron 脑洞`}
                            </div>
                        </Card>
                    </Col>
                   <Col span={6}>
                        <Card
                            hoverable={true}
                            title={
                                <span>今天周会</span>
                            }
                            extra={
                                <Icon type="question-circle-o" />
                            }>
                            <div>
                                <BarChart option={barOption} config={config} />
                            </div>
                        </Card>
                    </Col>
                      
                    <Col span={6}>
                        <Card
                            hoverable={true}
                            title={
                                <span>今天周会</span>
                            }
                            extra={
                                <Icon type="question-circle-o" />
                            }>
                            <div>
                                <LineChart option={lineOption} config={config} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            hoverable={true}
                            title={
                                <span>今天周会</span>
                            }
                            extra={
                                <Icon type="question-circle-o" />
                            }>
                            <div>
                                <PieChart option={pieOption} conifg={config} />
                            </div>
                        </Card>
                    </Col>
                </Row>
                <div style={{ background: '#fff', margin: '10px 0', }}>
                    <Tabs
                        defaultActiveKey="1"
                        tabBarExtraContent={
                            <div style={{ marginRight: 20 }}>
                                <RadioGroup onChange={this.handleRadioChange}>
                                    {
                                        radioData.map((item, index) => {
                                            return <RadioButton value={item.value} key={index}>{item.title}</RadioButton>
                                        })
                                    }
                                </RadioGroup>
                            </div>
                        }
                    >
                        <TabPane tab="销售量" key="1">
                            <BarChart option={barOption} config={config} />
                        </TabPane>
                        <TabPane tab="访问量" key="2">
                            <BarChart option={barOption} config={config} />
                        </TabPane>
                        <TabPane tab="使用量" key="3">
                            <BarChart option={barOption} config={config} />
                        </TabPane>
                    </Tabs>
                </div>
                <Row className="topLines" gutter={16}> 
                    <Col span={14}>
                        <Card
                            title={
                                <span>表格</span>
                            }>
                            <Table
                                columns={columns}
                                rowKey="id"
                                size="small"
                                dataSource={tableData}
                                loading={tableLoading}
                                pagination={{
                                    total: total,
                                    pageSize: page.pageSize,
                                    current: page.pageNo,
                                    size: 'small',
                                    onChange: this.handlePageChange,
                                    showQuickJumper: true,
                                    showTotal: (text) => <span style={{ paddingRight: 20, fontSize: 12, lineHeight: 12 + 'px' }}>总记录数:{total}条</span>,
                                }} />
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Card
                            title={
                                <span>表格</span>
                            }>
                            <Table
                                columns={columns}
                                rowKey="id"
                                size="small"
                                dataSource={tableData}
                                loading={tableLoading}
                                pagination={{
                                    total: total,
                                    pageSize: page.pageSize,
                                    current: page.pageNo,
                                    size: 'small',
                                    onChange: this.handlePageChange,
                                    showQuickJumper: true,
                                    showTotal: (text) => <span style={{ paddingRight: 20, fontSize: 12, lineHeight: 12 + 'px' }}>总记录数:{total}条</span>,
                                }} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
