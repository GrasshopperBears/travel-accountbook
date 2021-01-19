import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, List, message } from 'antd';
import moment from 'moment';
import service from '@services/daily';
import PaymentInfo from '@components/payment/PaymentInfo';
import ModifyPaymentModal from '@components/payment/ModifyPaymentModal';

const DailyPaymentModal = ({ info, onCancel, onDelete, onModify }) => {
  const { visible, date } = info;
  const [payments, setPayments] = useState([]);
  const [modifyModalInfo, setModifyModalInfo] = useState({ visible: false, info: undefined });
  const { selectedTrip } = useSelector((state) => state.trips);

  const closeModifyModal = () => {
    setModifyModalInfo({ ...modifyModalInfo, visible: false });
  };

  const fetchDailyPayment = async () => {
    const { year, month, day } = date;
    const response = await service.getDailyPayment(selectedTrip.id, year, month, day);
    if (response) setPayments(response);
    else message.warning('조회 중 오류가 발생했습니다');
  };
  const modifyModalHandler = (info) => {
    const { id, title, amount, date, category_id, location_name, memo } = info;
    const initialValues = { id, title, amount, date: moment(date), category_id, location_name, memo };
    setModifyModalInfo({ visible: true, info: initialValues });
  };
  const deleteHandler = (info) => {
    setPayments(
      payments.reduce((acc, payment) => {
        if (payment.id !== info.id) acc.push(payment);
        return acc;
      }, []),
      onDelete(info),
    );
  };
  const modifyHandler = (prevInfo, newInfo) => {
    const isToday = moment(newInfo.date).isSame(prevInfo.date, 'day');
    setPayments(
      payments.reduce((acc, payment) => {
        if (payment.id === prevInfo.id) {
          if (isToday) acc.push({ ...prevInfo, ...newInfo });
        } else acc.push(payment);
        return acc;
      }, []),
    );
    onModify(prevInfo, newInfo);
  };

  useEffect(() => {
    if (visible) fetchDailyPayment();
  }, [visible]);

  return (
    <>
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
                onClickModify={modifyModalHandler}
                onDelete={deleteHandler}
              />
            )}
          />
        )}
      </Modal>
      <ModifyPaymentModal
        visible={modifyModalInfo.visible}
        onCancel={closeModifyModal}
        modifyHandler={modifyHandler}
        initialValues={modifyModalInfo.info}
      />
    </>
  );
};

export default DailyPaymentModal;
