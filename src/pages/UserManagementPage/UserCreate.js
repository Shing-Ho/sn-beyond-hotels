import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Form, Button, Checkbox } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Page from 'components/Page/Page';
import adminActions from 'store/admin/actions';
import { getOneUser } from 'store/admin/selectors';
import { Link } from 'react-router-dom/cjs/react-router-dom';

import styles from './UserManagement.module.scss';

export default function UserCreatePage({
  match: {
    params: { id },
  },
}) {
  const user = useSelector(getOneUser);
  if (user) {
    delete user.password;
  }
  const form = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== 'create') {
      dispatch(adminActions.getOneUser(id));
    } else {
      dispatch(adminActions.setUser(null));
    }
  }, []);

  useEffect(() => {
    if (user) {
      form.current.setFieldsValue(user);
    } else {
      form.current.resetFields();
    }
  }, [user]);

  const onFinish = (values) => {
    if (id === 'create') {
      dispatch(adminActions.createUser({ ...values, is_staff: true }));
    } else {
      dispatch(adminActions.updateUser({ ...values, id: user.id, is_staff: true }));
    }
  };

  return (
    <Page>
      <div className={styles.userCreateContainer}>
        <Form ref={form} className={styles.createForm} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input Email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="first_name">
            <Input prefix={<UserOutlined />} placeholder="First name" />
          </Form.Item>
          <Form.Item name="last_name">
            <Input prefix={<UserOutlined />} placeholder="Last name" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input Password!',
              },
            ]}
          >
            <Input prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item name="is_superuser">
            <Checkbox prefix={<UserOutlined />}>Admin user</Checkbox>
          </Form.Item>

          <div className={styles.flexBox}>
            <Link to="/users">Back</Link>
            <Button type="primary" htmlType="submit">
              {id === 'create' ? 'Create' : 'Update'}
            </Button>
          </div>
        </Form>
      </div>
    </Page>
  );
}
