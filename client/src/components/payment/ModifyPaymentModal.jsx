import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, message } from 'antd';
import service from '@services/payment';
import { modifyPayment } from '@stores/actions';
import PaymentForm from './PaymentForm';

const ModifyPaymentModal = ({ visible, onCancel, modifyPayment, initialValues }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const modifyPaymentHandler = async (values) => {
    if (!hasDifferentValue(initialValues, values)) {
      message.warning('변경사항이 없습니다');
      onCancel();
      return;
    }
    setIsLoading(true);
    const modifiedData = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
    };
    const response = await service.modifyPayment(initialValues.id, modifiedData);
    if (response && response.success) {
      message.success('수정이 완료되었습니다');
      form.resetFields();
      onCancel();
      modifyPayment(initialValues, modifiedData);
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

const hasDifferentValue = (prevVal, newVal) => {
  if (prevVal.title !== newVal.title) return true;
  if (prevVal.amount !== newVal.amount) return true;
  if (!prevVal.date.isSame(newVal.date, 'day')) return true;
  if (prevVal.category_id !== newVal.category_id) return true;
  if (prevVal.location_name !== newVal.location_name) return true;
  if (prevVal.memo !== newVal.memo) return true;
  return false;
};

export default connect(null, { modifyPayment })(ModifyPaymentModal);
