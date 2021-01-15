import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { setTrips } from '@stores/actions';
import service from '@services/trip';
import { Menu, Layout, Button } from 'antd';
import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';
import NewTripModal from '@components/trip/NewTripModal';

const { Content, Footer } = Layout;

const Sidebar = (props) => {
  const { init, trips } = useSelector((state) => state.trips);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (!init) getTrips();
  }, []);

  const getTrips = async () => {
    const result = await service.getTrips();
    props.setTrips(result);
  };
  const logout = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  };
  const clickNewTripBtn = () => {
    setShowModal(true);
  };
  const closeNewTripModal = () => {
    setShowModal(false);
  };

  return (
    <Layout style={{ height: '100%' }}>
      <Content>
        <Menu mode='inline' defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
          {trips.map((trip) => (
            <Menu.Item key={trip.id}>{trip.title}</Menu.Item>
          ))}
          <NewTripBtn onClick={clickNewTripBtn} type='dashed' icon={<PlusCircleOutlined />}>
            여행 추가하기
          </NewTripBtn>
        </Menu>
      </Content>
      <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
      <NewTripModal visible={showModal} cancelHandler={closeNewTripModal} />
    </Layout>
  );
};

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

export default connect(null, { setTrips })(Sidebar);
