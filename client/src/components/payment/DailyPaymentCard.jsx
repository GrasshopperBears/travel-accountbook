import React, { useEffect, useState } from 'react';
import { Card, List, Row, Col } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import PaymentInfo from './PaymentInfo';
import 'moment/locale/ko';

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
    <DailyCard title={<DailyHeader date={paymentsInDay[0].date} totalAmount={dailyTotal} />} bordered={false}>
      <List
        dataSource={paymentsInDay}
        renderItem={(payment) => (
          <PaymentInfo key={payment.id} info={payment} onClickModify={onClickModify} />
        )}
      />
    </DailyCard>
  );
};

const DailyHeader = ({ date, totalAmount }) => {
  return (
    <CardHeaderRow>
      <CardHeaderCol flex='1' style={{ backgroundColor: '#41945B' }}>
        {moment(date).locale('ko').format('MM월 DD일(ddd)')}
      </CardHeaderCol>
      <CardHeaderCol flex='3' style={{ textAlign: 'right', backgroundColor: '#DEA3A2' }}>
        {totalAmount.toLocaleString()}원
      </CardHeaderCol>
    </CardHeaderRow>
  );
};

const DailyCard = styled(Card)`
  margin-bottom: 2rem;
  .ant-card-head {
    min-height: fit-content;
    padding: 0;
  }
  .ant-card-head-title {
    padding: 0;
  }
  .ant-card-body {
    padding-top: 9px;
  }
`;
const CardHeaderRow = styled(Row)`
  width: 100%;
`;
const CardHeaderCol = styled(Col)`
  padding: 10px 22px;
`;

export default DailyPaymentCard;
