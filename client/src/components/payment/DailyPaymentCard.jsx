import React from 'react';
import { Card, List } from 'antd';
import PaymentInfo from './PaymentInfo';

const DailyPaymentCard = ({ paymentsInDay, onClickModify }) => {
  return (
    <Card title={paymentsInDay[0].date} bordered={false} style={{ marginBottom: '2rem' }}>
      <List
        dataSource={paymentsInDay}
        renderItem={(payment) => (
          <PaymentInfo key={payment.id} info={payment} onClickModify={onClickModify} />
        )}
      />
    </Card>
  );
};

export default DailyPaymentCard;
