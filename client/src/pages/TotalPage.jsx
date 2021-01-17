import React from 'react';
import { Row, Col } from 'antd';
import { isMobile } from 'react-device-detect';
import MainLayout from '@layouts/MainLayout';
import TotalAmount from '@components/payment/TotalAmount';
import PaymentList from '@components/payment/PaymentList';

const TotalPage = () => {
  return (
    <MainLayout>
      <Row align='top' style={{ width: isMobile ? '100%' : '70%', margin: 0 }}>
        <Col xl={8} md={16} style={{ height: 'max-content', width: '100%' }}>
          <TotalAmount />
        </Col>
        {!isMobile && <Col xl={1} md={0} />}
        <Col xl={15} md={16} style={{ width: '100%', height: '100%' }}>
          <PaymentList />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default TotalPage;
