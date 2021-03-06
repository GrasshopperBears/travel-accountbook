import React, { useState, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { setTrips, selectTrip, clearPayment } from '@stores/actions';
import { Menu, Layout, Button } from 'antd';
import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';
import NewTripModal from '@components/trip/NewTripModal';

const { Content, Footer } = Layout;

const Sidebar = ({ selectTrip, isMobile = false, closeSidebar, clearPayment }) => {
  const { init, trips, selectedTrip } = useSelector((state) => state.trips);
  const [showModal, setShowModal] = useState(false);

  const logout = useCallback(() => {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  }, []);
  const clickNewTripBtn = useCallback(() => {
    setShowModal(true);
  }, []);
  const closeNewTripModal = useCallback(() => {
    setShowModal(false);
  }, []);
  const onSelect = useCallback(
    ({ key }) => {
      selectTrip(key);
      clearPayment();
      if (isMobile) closeSidebar();
    },
    [selectTrip, isMobile, closeSidebar, clearPayment],
  );

  return (
    <Layout style={{ height: '100%' }}>
      <Title>여행 가계부</Title>
      <Content>
        {init && (
          <Menu
            mode='inline'
            selectedKeys={[trips.length ? `${selectedTrip.id}` : '']}
            style={{ height: '100%', borderRight: 0 }}
            onSelect={onSelect}
          >
            {trips.map((trip) => (
              <Menu.Item key={trip.id}>{trip.title}</Menu.Item>
            ))}
            <NewTripBtn onClick={clickNewTripBtn} type='dashed' icon={<PlusCircleOutlined />}>
              여행 추가하기
            </NewTripBtn>
          </Menu>
        )}
      </Content>
      <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
      <NewTripModal visible={showModal} closeModal={closeNewTripModal} />
    </Layout>
  );
};

const Title = styled.div`
  font-size: 1.5rem;
  padding: 1.1rem 0.8rem;
`;
const NewTripBtn = styled(Button)`
  margin: 0 5%;
  width: 90%;
  height: 3rem;
`;
const LogoutBtn = styled(Footer)`
  text-align: center;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

export default connect(null, { setTrips, selectTrip, clearPayment })(Sidebar);
