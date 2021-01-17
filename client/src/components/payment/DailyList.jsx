import React from 'react';
import { Card, List } from 'antd';
import PaymentInfo from './PaymentInfo';

const DailyList = ({ list, onClickModify }) => {
  return (
    <Card title={list[0].date} bordered={false} style={{ height: '100%', overflowY: 'scroll' }}>
      <List
        dataSource={list}
        renderItem={(payment) => (
          <PaymentInfo key={payment.id} info={payment} onClickModify={onClickModify} />
        )}
      />
    </Card>
  );
};

export default DailyList;
