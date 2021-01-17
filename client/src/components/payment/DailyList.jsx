import React from 'react';
import { Card, List } from 'antd';
import PaymentInfo from './PaymentInfo';

const DailyList = ({ list }) => {
  return (
    <Card title={list[0].date} bordered={false} style={{ height: '100%', overflowY: 'scroll' }}>
      <List dataSource={list} renderItem={(payment) => <PaymentInfo info={payment} />} />
    </Card>
  );
};

export default DailyList;
