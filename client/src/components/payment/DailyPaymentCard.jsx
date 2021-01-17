import React, { useEffect, useState } from 'react';
import { Card, List, Row, Col } from 'antd';
import moment from 'moment';
import PaymentInfo from './PaymentInfo';

const DailyPaymentCard = ({ paymentsInDay, onClickModify }) => {
  const [dailyTotal, setDailyTotal] = useState(0);
  useEffect(() => {
    setDailyTotal(
      paymentsInDay.reduce((acc, payment) => {
        return acc + payment.amount;
      }, 0),
    );
  }, [paymentsInDay]);

  return (
    <Card
      title={<DailyHeader date={paymentsInDay[0].date} totalAmount={dailyTotal} />}
      bordered={false}
      style={{ marginBottom: '2rem' }}
    >
      <List
        dataSource={paymentsInDay}
        renderItem={(payment) => (
          <PaymentInfo key={payment.id} info={payment} onClickModify={onClickModify} />
        )}
      />
    </Card>
  );
};

const DailyHeader = ({ date, totalAmount }) => {
  return (
    <Row style={{ width: '100%' }}>
      <Col span={12}>{moment(date).format('MM월 DD일')}</Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        {totalAmount.toLocaleString()}원
      </Col>
    </Row>
  );
};

export default DailyPaymentCard;
