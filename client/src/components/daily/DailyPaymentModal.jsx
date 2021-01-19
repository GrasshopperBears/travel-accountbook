import React, { useState, useEffect } from 'react';
import { Modal, List, message } from 'antd';
import service from '@services/daily';
import PaymentInfo from '@components/payment/PaymentInfo';

const DailyPaymentModal = ({ info, onCancel }) => {
  const { visible, date } = info;
  const [payments, setPayments] = useState([]);

  const fetchDailyPayment = async () => {
    const { year, month, day } = date;
    const response = await service.getDailyPayment(year, month, day);
    if (response) setPayments(response);
    else message.warning('조회 중 오류가 발생했습니다');
  };
  const modifyHandler = () => {};
  const deleteHandler = (info) => {
    setPayments(
      payments.reduce((acc, payment) => {
        if (payment.id !== info.id) acc.push(payment);
        return acc;
      }, []),
    );
  };

  useEffect(() => {
    if (visible) fetchDailyPayment();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={date ? `${date.year}년 ${date.month + 1}월 ${date.day}일 지출 내역` : ''}
    >
      {payments && (
        <List
          dataSource={payments}
          locale={{ emptyText: '지출 내역이 없습니다' }}
          renderItem={(payment) => (
            <PaymentInfo
              key={payment.id}
              info={payment}
              onClickModify={modifyHandler}
              onDelete={deleteHandler}
            />
          )}
        />
      )}
    </Modal>
  );
};

export default DailyPaymentModal;
