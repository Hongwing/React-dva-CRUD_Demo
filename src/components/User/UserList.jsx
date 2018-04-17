import React, { PropTypes } from 'react'

// 导入antd UI组件 table展示
import { Table, message, Popconfirm, Modal, Card, Input, Icon } from 'antd';
import index from 'dva';

// stateless component
const UserList = ({
    // 传入props
    total,
    current,
    loading,
    dataSource,
    dispatch,
    currentActiveObject: currentEditObject
}) => {

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        // 渲染
        render: (text) => <a href="#">{text}</a>,
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        // 渲染
        render: (text) => <a href="#">{text}</a>,
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    }, {
        // operarion column
        title: '操作',
        key: 'operation',
        render: (text, { id }) =>
            <p>
                <a onClick={handleEdit.bind(null, id)}>编辑</a>
                &nbsp;
                <Popconfirm title="你确定要删除吗" onConfirm={handleConfirmYes.bind(null, id)} onCancel={(e) => { message.success('已取消') }} okText="删除" cancelText="取消">
                    <a href="#">删除</a>
                </Popconfirm>
            </p>
        ,
    }]

    // 定义分页对象
    const pagination = {
        total,
        // current,
        // defaultCurrent: 5,
        pageSize: 5,
        showQuickJumper: true,
        // onChange: (e) => { console.log('pagination', e) },
    }

    const handleConfirmYes = (e) => {
        dispatch({ type: 'user/showLoading'})
        dispatch({
            type: 'user/delete',
            payload: {
                id: e
            }
        })
    }


    const handleEdit = (e) => {
        console.log('edit', e)
        dispatch({
            type: 'user/update',
            payload: { id: e }
        })
        console.log('dispatch return', currentEditObject)
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={pagination}
            />
        </div>
    )

}

export default UserList;