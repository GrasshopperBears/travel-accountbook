import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Row, Col, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import NewTripModal from '@components/trip/NewTripModal';

const Header = ({ isMobile = false, onClickMenu }) => {
  const { selectedId } = useSelector((state) => state.trips);
  const [showModifyTripModal, setShowModifyTripModal] = useState(false);
  const openModifyTripModal = useCallback(() => {
    setShowModifyTripModal(true);
  }, []);
  const closeModifyTripModal = useCallback(() => {
    setShowModifyTripModal(false);
  }, []);

  return (
    <>
      <Row>
        <Col>
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
            <HeaderItem key='1' isMobile>
              전체
            </HeaderItem>
            <Menu.Item key='2'>달력</Menu.Item>
            <Menu.Item key='3'>카테고리</Menu.Item>
            <Menu.Item key='4'>장소</Menu.Item>
            {isMobile && (
              <>
                <Menu.Item key='5'>카테고리 수정</Menu.Item>
                <Menu.Item key='6'>여행 수정</Menu.Item>
              </>
            )}
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
                <Menu.Item key='1'>카테고리 수정</Menu.Item>
                {selectedId && (
                  <Menu.Item onClick={openModifyTripModal} key='2'>
                    여행 수정/삭제
                  </Menu.Item>
                )}
              </Menu>
            </Col>
          </>
        )}
      </Row>
      <NewTripModal visible={showModifyTripModal} closeModal={closeModifyTripModal} modifying />
    </>
  );
};

const HeaderItem = styled(Menu.Item)`
  .ant-menu-item {
    padding: ${(props) => props.isMobile && '0'} !important;
  }
`;

export default Header;
