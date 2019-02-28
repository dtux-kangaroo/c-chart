import React, { Component } from 'react';
import { Layout, Table, Input, Row, Col, Button } from 'antd';
import './style.scss';

const { Content } = Layout;

class FormSearch extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            pagination:{

            },
            dataSource: [
                {
                    code: '101',
                    name: '草莓',
                    price: '18',
                    type: 'type_one'
                },{
                    code: '102',
                    name: '橘子',
                    price: '25',
                    type: 'type_two'
                },{
                    code: '103',
                    name: '橙子',
                    price: '35',
                    type: 'type_three'
                },{
                    code: '104',
                    name: '金桔',
                    price: '9',
                    type: 'type_four'
                },{
                    code: '105',
                    name: '文旦',
                    price: '13',
                    type: 'type_one'
                },{
                    code: '106',
                    name: '红醋莓',
                    price: '98',
                    type: 'type_two'
                },{
                    code: '107',
                    name: '枣',
                    price: '109',
                    type: 'type_three'
                },{
                    code: '108',
                    name: '橄榄',
                    price: '36',
                    type: 'type_four'
                },{
                    code: '109',
                    name: '红醋莓',
                    price: '65',
                    type: 'type_one'
                },{
                    code: '110',
                    name: '荔枝',
                    price: '41',
                    type: 'type_two'
                },{
                    code: '111',
                    name: '枇杷',
                    price: '9',
                    type: 'type_three'
                },{
                    code: '112',
                    name: '苹果',
                    price: '112',
                    type: 'type_two'
                },{
                    code: '113',
                    name: '柿子',
                    price: '999',
                    type: 'type_four'
                },{
                    code: '114',
                    name: '哈密瓜',
                    price: '987',
                    type: 'type-one'
                }
            ],

        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log('pagination:' + pagination)
        console.log('filters:' + filters)
        console.log('sorter:' + sorter)
    }

    codeSearch = (e) => {
        console.log(e)
    }
    
    fruitSearch = (e) => {
        console.log(e)
    }

    render(){
        const { dataSource,loading,pagination } = this.state;

        const columns = [{
            title: '编号',
            dataIndex: 'code',
            // sorter: true,
            // render: name => `${name.first} ${name.last}`,
          }, {
            title: '水果类型',
            dataIndex: 'name',
            filters: [
              { text: '浆果', value: 'type_one' },
              { text: '瓜果', value: 'type_two' },
              { text: '橘果', value: 'type_three' },
              { text: '核果', value: 'type_four' }
            ],
            onFilter: (value, record) => {
                return record.type.includes(value)
            },
          }, {
            title: '价格',
            sorter: true,
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
          }];

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };
        return(
            <Layout className="search-form-bg">
                <Row gutter={16}>
                    <Col span={8}>
                        <Row>
                            <Col span={6} style={{fontSize: '14px',lineHeight: '32px'}}>编号搜索：</Col>
                            <Col span={16}><Input placeholder="请输入编号" onChange={this.codeSearch} /></Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={6} style={{fontSize: '14px',lineHeight: '32px'}}>水果搜索：</Col>
                            <Col span={16}><Input placeholder="请输入水果名称" onChange={this.fruitSearch} /></Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={6} style={{fontSize: '14px',lineHeight: '32px'}}>XXX搜索：</Col>
                            <Col span={16}><Input placeholder="请输入" onChange={this.fruitSearch} /></Col>
                        </Row>
                    </Col>
                </Row>
                <Content className="search-button-bg">
                    <Button type="primary">搜索</Button>
                    <Button type="primary">重置</Button>
                </Content>
                <Table
                    className="search_form"
                    rowKey={record => record.code} 
                    columns={columns}
                    dataSource={dataSource}
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                    rowSelection={rowSelection}
                    style={{
                        background: '#fff'
                    }}
                />
            </Layout>
        )
    }
}

export default FormSearch