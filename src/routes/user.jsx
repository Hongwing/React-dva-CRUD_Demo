import React, { Component, PropTypes } from 'react';
import { connect } from "dva";

// 设计 user 导入 component
import UserList from '../components/User/UserList'
import UserSearch from '../components/User/UserSearch'
import UserModal from '../components/User/UserModal'

// 导入
// import './user.css'
import styles from "./user.css";

// user
const Users = ({ location, dispatch, user}) => {

    const { loading, list, total, current, currentItem, modalState, currentActiveObject } = user

    const userSearchProps = {}
    // 静态数据填充
    const userListProps = {
        total,
        loading,
        current,
        dataSource: list,
        dispatch,
        currentActiveObject,
    }
    const userModalProps = {
        modalState,
        dispatch,
        currentActiveObject,
    }

    return (
        <div className={styles.container}>
            {/* 用户筛选搜索框 */}
            {/* <UserSearch {...userSearchProps} /> */}
            {/* 用户信息展示列表 */}
            <UserList {...userListProps} />
            {/* 用户操作modal浮层 */}
            <UserModal {...userModalProps} />
        </div>
    )
}

Users.propTypes = {
}

// 指定订阅数据
function mapStateToProps({ user }) {
    return {user}
}

// 建立数据联系
export default connect(mapStateToProps)(Users);