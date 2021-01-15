import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import Sidebar from '@components/common/Sidebar';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Wrapper>
      <BrowserView style={{ width: '100%', height: '100%' }}>
        <Layout style={{ width: '100%', height: '100%' }}>
          <Sider>
            <Sidebar />
          </Sider>
          <Layout>
            <Header>Header</Header>
            <Content>{children}</Content>
          </Layout>
        </Layout>
      </BrowserView>
      <MobileView>
        <b> This is rendered only on mobile </b>
        {children}
      </MobileView>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export default MainLayout;
