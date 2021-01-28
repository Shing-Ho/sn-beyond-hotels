import React, { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Button } from 'antd';
import Page from 'components/Page/Page';
import adminActions from 'store/admin/actions';
import { getUsers } from 'store/admin/selectors';

import styles from './UserManagement.module.scss';

export default function UserListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminActions.getUsers());
  }, []);

  const users = useSelector(getUsers);

  const deleteUser = (user) => {
    dispatch(adminActions.deleteUser(user.id));
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'First name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/users/${record.id}`}>Edit</Link>
          <Button onClick={() => deleteUser(record)}>Delete</Button>
        </Space>
      ),
    },
  ];
  const dataSource = users?.results || [];

  return (
    <Page>
      <div className={styles.userListContainer}>
        <Link type="primary" className={styles.btnCreate} to="/users/create">
          Create
        </Link>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </Page>
  );
}
