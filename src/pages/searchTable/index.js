import React, { Component } from "react";
import { Card, Select, message, Button, Input, Table, Modal } from "antd";
import moment from "moment";
import http from "../../utils/http";
import apis from "../../constants/apis";
import { cloneDeep } from 'lodash'
import './style.scss';
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;
moment.locale("zh-cn");

export default class SearchTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionData: [],/* 下拉框数据 */
            tableData: [],/* 表格数据 */
            name: undefined,/* 筛选条件 */
            age: undefined,/* 筛选条件 */
            editRecord: {},/* 编辑选中行 */
            tableLoading: true,
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
                render: (text, record, index) => this.renderColumns(text, record, 'name'),
            }, {
                title: '描述',
                dataIndex: 'desc',
                render: (text, record, index) => this.renderColumns(text, record, 'desc'),
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
        this.getSearchTableData();
        this.getOptionData();
        this.setState({
            columns: [
                ...this.state.columns,
                {
                    title: '操作',
                    render: (text, record, index) => {
                        return !record.editable ? <div>
                            <a href="javascript:void(0)" onClick={() => this.handleEdit(record)}>编辑</a>&nbsp;|&nbsp;
                            <a href="javascript:void(0)" onClick={() => this.handleDelete(record)}>删除</a>
                        </div> : <div>
                                <a href="javascript:void(0)" onClick={this.handleSave}>保存</a>&nbsp;|&nbsp;
                                <a href="javascript:void(0)" onClick={this.handleCancel}>取消</a>
                            </div>
                    }
                }
            ]
        })
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {

    }
    /* 保存 */
    handleSave = () => {
        let { editRecord, tableData } = this.state;
        for (let key in editRecord) {
            if (editRecord[key].toString() == '') {
                message.warning(`${key}不得为空`)
                return;
            }
        }
        this.setState({
            tableLoading: true,
        })
        http.get(apis.saveTabelData, editRecord).then((res) => {
            if (res.result) {
                message.success("编辑成功！");
                tableData = tableData.map((item) => {
                    if (item.id == editRecord.id) {
                        item = editRecord;
                        item.editable = false;
                    }
                    return item;
                })
                this.setState({
                    tableData,
                    editRecord: {},
                })
            } else {
                message.warning(res.message)
            }
            this.setState({
                tableLoading: false
            })
        })
    }
    /* 取消 */
    handleCancel = () => {
        this.setState({
            tableData: this.tableData,
            editRecord: {}
        })
    }
    /* 编辑 */
    handleEdit = (record) => {
        let { editRecord, tableData } = this.state;
        this.tableData = cloneDeep(tableData);/* 保存一个副本 */
        if (JSON.stringify(editRecord) == '{}') {
            tableData = tableData.map((item) => {
                if (item.id == record.id) {
                    item.editable = true
                    this.setState({
                        editRecord: item,
                    })
                }
                return item;
            })
            this.setState({
                tableData,
            })
        } else {
            message.warning("请先保存编辑行")
        }
    }
    /**
     * @param value-单元格值
     * @param columns-单元格的名称
      */
    handleChange = (value, columns) => {
        let { editRecord } = this.state;
        if (value == '' || value == undefined) {
            message.warning(`${columns}不得为空`)
        }
        editRecord[columns] = value;
        this.setState({
            editRecord,
        })
    }
    /* 删除 */
    handleDelete = (record) => {
        const _this = this;
        confirm({
            title: '确认删除当前项吗？',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let params = {
                    id: record.id
                }
                http.get(apis.saveTabelData, params).then((res) => {
                    if (res.result) {
                        message.success("删除成功！");
                        _this.setState({
                            tableLoading:true
                        },()=>{
                            _this.getSearchTableData();
                        })
                    } else {
                        message.warning(res.message);
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    /* 下拉框change事件 */
    handleSelectChange = (value) => {
        this.setState({
            name: value
        })
    }
    /* 输入框change事件 */
    handleInputChange = (value) => {
        this.setState({
            age: value
        })
    }
    /* 搜索 */
    handleSubmit = () => {
        this.setState({
            tableLoading: true,
            page: {
                ...this.state.page,
                pageNo: 1
            }
        }, () => {
            this.getSearchTableData();
        })
    }
    /* 表格选中回调 */
    handleRowSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }
    /* 分页 */
    handlePageChange = (page) => {
        this.setState({
            page: {
                ...this.state.page,
                pageNo: page,
            },
            tableLoading: true,
        }, () => {
            this.getSearchTableData();
        })
    }
    /* 获取表格数据 */
    getSearchTableData = () => {
        const { name, age, page } = this.state;
        let params = {
            pageNo: page.pageNo,
            pageSize: page.pageSize,
            name,
            age,
        }
        http.get(apis.getSearchTableData, params).then((res) => {
            if (res.result) {
                this.setState({
                    tableData: res.data.data,
                    total: res.data.total,
                    selectedRowKeys: [],/* 搜索置空已选 */
                    selectedRows: [],
                })
            } else {
                message.warning(res.message)
            }
            this.setState({
                tableLoading: false,
            })
        })
    }
    /* 获取select数据 */
    getOptionData = () => {
        http.get(apis.getOptionData).then((res) => {
            if (res.result) {
                this.setState({
                    optionData: res.data
                })
            } else {
                message.warning(res.message);
            }
        })
    }
    /* 渲染编辑单元格 */
    renderColumns = (text, record, columns) => {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, columns)}
            />
        )
    }
    render() {
        const { optionData, columns, tableData, total, page, tableLoading, selectedRowKeys } = this.state;
        const options = optionData && optionData.map((item, index) => {
            return <Option value={item.value} key={index}>{item.title}</Option>
        })
        const rowSelection = {
            onChange: this.handleRowSelectChange,
            type: 'radio',
            selectedRowKeys,
        };
        return (
            <div className="content searchTable">
                <Card
                    bordered={false}
                    hoverable={false}
                    title={
                        <div>
                            <Select
                                allowClear
                                style={{ width: 120, fontSize: 12, marginRight: 10 }}
                                placeholder="请选择xxx"
                                onChange={this.handleSelectChange}
                            >
                                {options}
                            </Select>
                            <Input
                                placeholder="请输入XXX"
                                onChange={(e) => this.handleInputChange(e.target.value)}
                                className="search" />
                            <Button type="primary" onClick={this.handleSubmit} style={{ fontSize: 12 }}>
                                搜索
                            </Button>
                        </div>
                    }
                    extra={
                        <Button type="primary" style={{ fontSize: 12 }}>新增</Button>
                    }>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        rowKey="id"
                        dataSource={tableData}
                        loading={tableLoading}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    this.handleRowSelectChange([record.id], [record])
                                },
                            };
                        }}
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
            </div>
        );
    }
}

/* 编辑行 */
class EditableCell extends Component {
    render() {
        const { editable, value, onChange } = this.props;
        return (
            <div>
                {
                    editable
                        ? (
                            <Input defaultValue={value} maxLength={50} onChange={(e) => onChange(e.target.value)} style={{ fontSize: 12, width: '100%' }} />
                        )
                        : value
                }
            </div>
        )
    }
}
