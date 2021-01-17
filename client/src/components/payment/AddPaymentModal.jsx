import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import moment from 'moment';
import { Modal, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import service from '@services/payment';
import { addPayment } from '@stores/actions';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const AddPaymentModal = ({ visible, onCancel, addPayment }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedTrip } = useSelector((state) => state.trips);
  const { init, categories } = useSelector((state) => state.categories);

  const addPaymentHandler = async (values) => {
    setIsLoading(true);
    const response = await service.createPayment({
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      tripId: selectedTrip.id,
    });
    if (response) {
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
      <Form {...layout} form={form} initialValues={{ date: moment() }} onFinish={addPaymentHandler}>
        <Form.Item
          label='지출 내역'
          name='title'
          rules={[{ required: true, message: '어떤 지출인지 알려주세요!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='금액'
          name='amount'
          rules={[{ required: true, message: '얼마를 사용했는지 알려주세요!' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label='날짜'
          name='date'
          rules={[{ required: true, message: '언제 사용했는지 알려주세요!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label='카테고리' name='category'>
          <Select placeholder='카테고리를 선택해주세요' allowClear>
            {init && categories.map((category) => <Option value={category.id}>{category.title}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item label='장소 이름' name='placeName'>
          <Input />
        </Form.Item>
        <Form.Item label='메모' name='memo'>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(null, { addPayment })(AddPaymentModal);
