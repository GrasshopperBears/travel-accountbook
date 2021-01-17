import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import moment from 'moment';
import { Modal, Form, message } from 'antd';
import service from '@services/payment';
import { addPayment } from '@stores/actions';
import PaymentForm from './PaymentForm';

const AddPaymentModal = ({ visible, onCancel, addPayment }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedTrip } = useSelector((state) => state.trips);

  const addPaymentHandler = async (values) => {
    setIsLoading(true);
    const response = await service.createPayment({
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      trip_id: selectedTrip.id,
    });
    if (response) {
      message.success('지출 내역이 추가되었습니다');
      form.resetFields();
      onCancel();
      addPayment(response);
      setIsLoading(false);
    } else alert('추가 중 오류가 발생했습니다');
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title='지출 내역 추가하기'
      cancelText='취소'
      okText='추가하기'
      onOk={() => {
        form.submit();
      }}
      okButtonProps={{ loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <PaymentForm form={form} initialValues={{ date: moment() }} onFinish={addPaymentHandler} />
    </Modal>
  );
};

export default connect(null, { addPayment })(AddPaymentModal);
