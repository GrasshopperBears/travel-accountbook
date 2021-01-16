import React, { useState, useCallback } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Layout, Drawer, Typography, Button } from 'antd';
import Sidebar from '@components/common/Sidebar';
import LayoutHeader from '@components/common/Header';
import AddPaymentModal from '@components/payment/AddPaymentModal';
import { PlusCircleOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const { selectedTrip } = useSelector((state) => state.trips);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const onShowSidebar = useCallback(() => {
    setShowSidebar(true);
  }, []);
  const onCloseSidebar = useCallback(() => {
    setShowSidebar(false);
  }, []);
  const onShowAddPaymentModal = useCallback(() => {
    setShowAddPaymentModal(true);
  }, []);
  const onCloseAddPaymentModal = useCallback(() => {
    setShowAddPaymentModal(false);
  }, []);

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
        <Drawer visible={showSidebar} onClose={onCloseSidebar} placement='left' closeIcon={''}>
          <Sidebar isMobile closeSidebar={onCloseSidebar} />
        </Drawer>
        <Layout>
          <Header>
            <LayoutHeader isMobile onClickMenu={onShowSidebar} />
          </Header>
          {selectedTrip && <Title>{selectedTrip.title}</Title>}
          <MainContent>{children}</MainContent>
        </Layout>
      </MobileView>
      <AddPaymentBtn
        type='primary'
        size='large'
        shape={isMobile ? 'circle' : 'round'}
        icon={<PlusCircleOutlined />}
        isMobile={isMobile}
        onClick={onShowAddPaymentModal}
      >
        {!isMobile && '지출 내역 추가하기'}
      </AddPaymentBtn>
      <AddPaymentModal visible={showAddPaymentModal} onCancel={onCloseAddPaymentModal} />
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
const AddPaymentBtn = styled(Button)`
  position: fixed;
  right: ${({ isMobile }) => (isMobile ? '2rem' : '5rem')};
  bottom: ${({ isMobile }) => (isMobile ? '2rem' : '3rem')};
`;

export default MainLayout;
