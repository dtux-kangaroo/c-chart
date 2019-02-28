import React, { Component } from "react";
import { List, message, Modal, Card, Input, Button } from "antd";
import moment from "moment";
import http from "../../utils/http";
import apis from "../../constants/apis";
import './style.scss'
const confirm = Modal.confirm;
const Search = Input.Search;
moment.locale("zh-cn");

export default class Lists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: undefined,/* 搜索关键字 */
            total: 0,
            page: {
                pageSize: 10,
                pageNo: 1,
            },
            listLoading: true,
        };
    }

    componentWillMount() {
        this.getListData()
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {

    }
    /* 搜索 */
    handleSearch = (value) => {
        this.setState({
            search: value,
            listLoading: true,
        }, () => {
            this.getListData();
        })
    }
    /* 编辑 */
    handleEdit = (item) => {
        console.log('当前编辑的为', item)
    }
    /* 删除 */
    handleDelete = (item) => {
        const _this = this;
        confirm({
            title: '确认删除当前项吗？',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let params = {
                    id: item.id
                }
                http.delete(apis.deleteList, params).then((res) => {
                    if (res.result) {
                        message.success("删除成功！");
                        _this.getListData();
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
    /* 分页 */
    handlePageChange = (page) => {
        this.setState({
            page: {
                ...this.state.page,
                pageNo: page
            },
            listLoading: true
        }, () => {
            this.getListData();
        })
    }
    /* 获取list数据 */
    getListData = () => {
        const { page, search } = this.state;
        let params = {
            pageNo: page.pageNo,
            pageSize: page.pageSize,
            search,
        }
        http.get(apis.getListData, params).then((res) => {
            if (res.result) {
                this.setState({
                    listData: res.data.data,
                    total: res.data.total,
                })
            } else {
                message.warning(res.message);
            }
            this.setState({
                listLoading: false,
            })
        })
    }
    render() {
        const { listData, listLoading, total, page } = this.state;
        return (
            <div className="content lists">
                <Card
                    bordered={false}
                    hoverable={false}
                    title={
                        <div>
                            <Search className="search" placeholder="请输入搜索条件" onSearch={this.handleSearch} />
                        </div>
                    }
                    extra={
                        <Button type="primary" style={{ fontSize: 12 }}>新增</Button>
                    }
                >
                    <List
                        itemLayout="horizontal"
                        pagination={{
                            total: total,
                            pageSize: page.pageSize,
                            current: page.pageNo,
                            size: 'small',
                            onChange: this.handlePageChange,
                            showQuickJumper: true,
                            showTotal: (text) => <span style={{ paddingRight: 20, fontSize: 12, lineHeight: 12 + 'px' }}>总记录数:{total}条</span>,
                        }}
                        dataSource={listData}
                        loading={listLoading}
                        renderItem={(item) => (
                            <List.Item actions={[<a href="javascript:void(0)" onClick={() => this.handleEdit(item)}>编辑</a>, <a href="javascript:void(0)" onClick={() => this.handleDelete(item)}>删除</a>]}>
                                <List.Item.Meta
                                    title={<a href="javascript:void(0)">{item.title}</a>}
                                    description={<article>{item.description}</article>}
                                />
                                <div className="listContent">{item.content}</div>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        );
    }
}
