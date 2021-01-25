import React from 'react';
import { useDispatch } from 'react-redux';
import { Input, Form } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Page from 'components/Page/Page';
import authActions from 'store/auth/actions';
import Button from 'components/Button/Button';

import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(authActions.login(values));
  };

  return (
    <Page>
      <div className={styles.loginContainer}>
        <Form className={styles.loginForm} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="submit" className={styles.btnLogin}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Page>
  );
}
