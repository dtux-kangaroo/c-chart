import React from 'react';
import {Table} from 'antd';
class TabTwo extends React.PureComponent{
  render(){
    const {dataSource=[],loading=true}=this.props;
    const columns=[
      {
        title: '操作类型',
        dataIndex: 'operationType',
        key: 'operationType'
      },
      {
        title: '操作人',
        dataIndex: 'operator',
        key: 'operator'
      },
      {
        title: '执行结果',
        dataIndex: 'result',
        key: 'result',
        render:(value)=>{
          return (<span>
            <span className={`u-badge-status-dot ${value==='成功'?'u-badge-status-success':'u-badge-status-error'}`}></span>
            <span className="ml-10">{value}</span>
          </span>);
        }
      },
      {
        title: '操作时间',
        dataIndex: 'operationTime',
        key: 'operationTime'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        render:(value)=>{
          return value?value:'-';
        }
      }
    ]
    return (
      <Table 
        rowKey={row=>row.id} 
        loading={loading} 
        dataSource={dataSource} 
        columns={columns} 
        pagination={false}/>
    )
  }
}
export default TabTwo;