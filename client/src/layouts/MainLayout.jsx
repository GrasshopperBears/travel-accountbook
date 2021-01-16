import React, { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Layout, Drawer, Typography } from 'antd';
import Sidebar from '@components/common/Sidebar';
import LayoutHeader from '@components/common/Header';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const { selectedTrip } = useSelector((state) => state.trips);
  const [showSidebar, setShowSidebar] = useState(false);
  const onShow = () => {
    setShowSidebar(true);
  };
  const onClose = () => {
    setShowSidebar(false);
  };

  return (
    <Wrapper>
      <BrowserView style={{ width: '100%', height: '100%' }}>
        <Layout style={{ width: '100%', height: '100%' }}>
          <Sider>
            <Sidebar />
          </Sider>
          <Layout>
            <Header>
              <LayoutHeader />
            </Header>
            <Content>{children}</Content>
          </Layout>
        </Layout>
      </BrowserView>
      <MobileView>
        <Drawer visible={showSidebar} onClose={onClose} placement='left' closeIcon={''}>
          <Sidebar isMobile closeSidebar={onClose} />
        </Drawer>
        <Layout>
          <Header>
            <LayoutHeader isMobile onClickMenu={onShow} />
          </Header>
          {selectedTrip && <Title>{selectedTrip.title}</Title>}
          <MainContent>{children}</MainContent>
        </Layout>
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
const Title = styled(Typography.Title)`
  margin: 1rem 1.4rem 0 1.4rem !important;
`;
const MainContent = styled(Content)`
  padding: 1rem 1.4rem;
`;

export default MainLayout;
