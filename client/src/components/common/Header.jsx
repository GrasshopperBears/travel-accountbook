import React from 'react';
import { Menu, Row, Col, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Header = ({ isMobile, onClickMenu }) => {
  return (
    <Row>
      <Col>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
          <HeaderItem key='1' isMobile>
            전체
          </HeaderItem>
          <Menu.Item key='2'>달력</Menu.Item>
          <Menu.Item key='3'>카테고리</Menu.Item>
          <Menu.Item key='4'>장소</Menu.Item>
          {isMobile && <Menu.Item key='5'>카테고리 수정</Menu.Item>}
        </Menu>
      </Col>
      {isMobile ? (
        <Col flex='0 0'>
          <Button onClick={onClickMenu} shape='circle' icon={<MenuOutlined />} />
        </Col>
      ) : (
        <>
          <Col flex='auto'></Col>
          <Col>
            <Menu theme='dark' mode='horizontal' selectable={false}>
              <Menu.Item>카테고리 수정</Menu.Item>
            </Menu>
          </Col>
        </>
      )}
    </Row>
  );
};

Header.defaultProps = {
  isMobile: false,
};

const HeaderItem = styled(Menu.Item)`
  .ant-menu-item {
    padding: ${(props) => props.isMobile && '0'} !important;
  }
`;

export default Header;
