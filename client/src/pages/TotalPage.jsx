import React from 'react';
import { Row, Col } from 'antd';
import MainLayout from '@layouts/MainLayout';
import TotalAmount from '@components/payment/TotalAmount';
import PaymentList from '@components/payment/PaymentList';

const TotalPage = () => {
  return (
    <MainLayout>
      <Row style={{ width: '80%' }}>
        <Col span={8}>
          <TotalAmount />
        </Col>
        <Col span={16}>
          <PaymentList />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default TotalPage;
