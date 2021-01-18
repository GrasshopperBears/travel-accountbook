import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { List } from 'antd';
import DailyPaymentCard from './DailyPaymentCard';

const DailyList = ({ payments, onClickModify }) => {
  const [paymentsByDate, setPaymentsByDate] = useState([]);
  useEffect(() => {
    const newPaymentsByDate = [];
    let date = undefined;
    let paymentsInDay = [];
    payments.forEach((payment, idx) => {
      if (!date || !date.isSame(payment.date, 'day')) {
        if (paymentsInDay.length) newPaymentsByDate.push(paymentsInDay);
        paymentsInDay = [payment];
        date = moment(payment.date);
      } else paymentsInDay.push(payment);

      if (idx === payments.length - 1 && paymentsInDay.length) {
        newPaymentsByDate.push(paymentsInDay);
        setPaymentsByDate(newPaymentsByDate);
      }
    });
  }, [payments]);

  return (
    <List
      dataSource={paymentsByDate}
      renderItem={(paymentsInDay) => (
        <DailyPaymentCard paymentsInDay={paymentsInDay} onClickModify={onClickModify} />
      )}
    />
  );
};

export default DailyList;
