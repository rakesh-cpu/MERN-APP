import React from 'react';
import { Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import AddToCart from './AddToCart';

const { Content } = Layout;

function Profile() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <UserOutlined style={{ fontSize: '64px', marginBottom: '16px' }} />
          <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>User Dashboard</h1>
          <p style={{ fontSize: '16px', color: '#888' }}>Welcome to your profile page!</p>
          <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Your Orders</h2>
          <AddToCart/>
        </div>
      </Content>
    </Layout>
  );
}

export default Profile;
