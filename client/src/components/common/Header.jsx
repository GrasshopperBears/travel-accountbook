import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, Row, Col, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import NewTripModal from '@components/trip/NewTripModal';
import ModifyCategoryModal from '@components/category/ModifyCategoryModal';

const Header = ({ isMobile = false, onClickMenu }) => {
  const history = useHistory();
  const location = useLocation();
  const { selectedTrip } = useSelector((state) => state.trips);
  const [showModifyTripModal, setShowModifyTripModal] = useState(false);
  const [showModifyCategoryModal, setShowModifyCategoryModal] = useState(false);
  const openModifyTripModal = useCallback(() => {
    setShowModifyTripModal(true);
  }, []);
  const closeModifyTripModal = useCallback(() => {
    setShowModifyTripModal(false);
  }, []);
  const openModifyCategoryModal = useCallback(() => {
    setShowModifyCategoryModal(true);
  }, []);
  const closeModifyCategoryModal = useCallback(() => {
    setShowModifyCategoryModal(false);
  }, []);
  const selectMenu = ({ key }) => {
    if (key !== location.pathname && key.startsWith('/')) history.push(key);
  };

  return (
    <>
      <Row>
        <Col>
          <Menu
            theme='dark'
            mode='horizontal'
            defaultSelectedKeys={[location.pathname]}
            onSelect={selectMenu}
          >
            <HeaderItem key='/' isMobile>
              전체
            </HeaderItem>
            <Menu.Item key='/daily'>달력</Menu.Item>
            <Menu.Item key='/category'>카테고리</Menu.Item>
            <Menu.Item key='/map'>장소</Menu.Item>
            {isMobile && (
              <>
                <Menu.Item key='5' onClick={openModifyCategoryModal}>
                  카테고리 수정
                </Menu.Item>
                <Menu.Item key='6' onClick={openModifyTripModal}>
                  여행 수정/삭제
                </Menu.Item>
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
                <Menu.Item key='1' onClick={openModifyCategoryModal}>
                  카테고리 수정
                </Menu.Item>
                {selectedTrip && (
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
      <ModifyCategoryModal
        visible={showModifyCategoryModal}
        closeModal={closeModifyCategoryModal}
        isMobile={isMobile}
      />
    </>
  );
};

const HeaderItem = styled(Menu.Item)`
  .ant-menu-item {
    padding: ${(props) => props.isMobile && '0'} !important;
  }
`;

export default Header;
