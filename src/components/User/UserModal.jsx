import React, { PropTypes } from 'react'

// 导入antd UI组件 table展示
import { message, Popconfirm, Modal, Card, Input, Icon } from 'antd';

const UserModal = ({ dispatch, currentActiveObject: currentEditObject, modalState }) => {

    const { modalVisible, modalLoading } = modalState

    const hanldeModalOK = (e) => {
        dispatch({
            type: 'user/updateUser',
            payload: { currentEditObject }
        })
    }

    const handleModalCancel = (e) => {
        dispatch({ type: 'user/hideModal' })
    }    


    return (
        <Modal visible={modalVisible} confirmLoading={modalLoading} title="Edit User Profile" onOk={hanldeModalOK} onCancel={handleModalCancel}>
            <Card style={{ width: 300 }}>
                <Input prefix={<Icon type="user" />} onChange={(e) => currentEditObject.name = e.target.value} placeholder={currentEditObject.name} />
            </Card>
            <Card style={{ width: 300 }}>
                <Input type="number" prefix={<Icon type="man" />} onChange={(e) => currentEditObject.age = e.target.value} placeholder={currentEditObject.age} />
            </Card>
            <Card style={{ width: 300 }}>
                <Input prefix={<Icon type="profile" />} onChange={(e) => currentEditObject.address = e.target.value} placeholder={currentEditObject.address} />
            </Card>
        </Modal>
    )
}


export default UserModal
