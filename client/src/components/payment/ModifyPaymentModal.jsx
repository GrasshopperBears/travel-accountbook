import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Form } from 'antd';
import service from '@services/payment';
import { modifyPayment } from '@stores/actions';
import PaymentForm from './PaymentForm';

const ModifyPaymentModal = ({ visible, onCancel, modifyPayment, initialValues }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const modifyPaymentHandler = async (values) => {
    setIsLoading(true);
    const modifiedData = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };
    const response = await service.modifyPayment(initialValues.id, modifiedData);
    if (response && response.success) {
      form.resetFields();
      onCancel();
      modifyPayment(initialValues.id, modifiedData);
      setIsLoading(false);
    } else alert('수정 중 오류가 발생했습니다');
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title='지출 내역 수정하기'
      cancelText='취소'
      okText='수정하기'
      onOk={() => {
        form.submit();
      }}
      okButtonProps={{ loading: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
    >
      <PaymentForm form={form} initialValues={initialValues} onFinish={modifyPaymentHandler} />
    </Modal>
  );
};

export default connect(null, { modifyPayment })(ModifyPaymentModal);
