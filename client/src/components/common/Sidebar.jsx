import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { setTrips } from '@stores/actions';
import service from '@services/trip';
import { Menu, Layout } from 'antd';
import styled from 'styled-components';

const { Content, Footer } = Layout;

const Sidebar = (props) => {
  const { init, trips } = useSelector((state) => state.trips);
  useEffect(() => {
    if (!init) getTrips();
  }, []);

  const getTrips = async () => {
    const result = await service.getTrips();
    console.log(result);
    props.setTrips(result);
  };
  const logout = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Layout style={{ height: '100%' }}>
      <Content>
        <Menu mode='inline' defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
          {trips.map((trip) => (
            <Menu.Item key={trip.id}>{trip.title}</Menu.Item>
          ))}
        </Menu>
      </Content>
      <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
    </Layout>
  );
};

const LogoutBtn = styled(Footer)`
  text-align: center;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

export default connect(null, { setTrips })(Sidebar);
