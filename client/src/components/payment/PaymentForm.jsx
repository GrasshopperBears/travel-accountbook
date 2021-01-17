import React from 'react';
import { Form, Input, InputNumber, DatePicker, Select } from 'antd';
import { useSelector } from 'react-redux';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

const PaymentForm = ({ form, initialValues, onFinish }) => {
  const { init, categories } = useSelector((state) => state.categories);

  return (
    <Form {...layout} form={form} initialValues={initialValues} onFinish={onFinish}>
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
        rules={[
          { required: true, message: '얼마를 사용했는지 알려주세요!' },
          { type: 'integer', min: 0, message: '유효하지 않은 정보입니다' },
        ]}
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
      <Form.Item label='카테고리' name='category_id'>
        <Select placeholder='카테고리를 선택해주세요' allowClear>
          {init &&
            categories
              .filter((category) => !category.deleted)
              .map((category) => <Option value={category.id}>{category.title}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item label='장소 이름' name='location_name'>
        <Input />
      </Form.Item>
      <Form.Item label='메모' name='memo'>
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

export default PaymentForm;
