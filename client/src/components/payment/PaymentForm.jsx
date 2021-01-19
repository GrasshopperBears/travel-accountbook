import React, { useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Select, Button, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import PlaceSearchResultModal from './PlaceSearchResultModal';

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
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const openPlaceModal = () => {
    if (form.getFieldValue('location_name')) setShowPlaceModal(true);
  };
  const closePlaceModal = () => {
    setShowPlaceModal(false);
  };
  const onSelectPlace = (place) => {
    const { place_name, x, y, place_url } = place;
    form.setFieldsValue({ location_name: place_name, x, y, place_url });
  };

  return (
    <>
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
            { type: 'integer', min: 1, message: '유효하지 않은 정보입니다' },
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
        <Form.Item label='장소 이름'>
          <Row>
            <Col flex='1'>
              <Form.Item name='location_name' style={{ margin: '0' }}>
                <Input />
              </Form.Item>
            </Col>
            <Col style={{ marginLeft: '10px' }}>
              <Button onClick={openPlaceModal}>검색</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label='메모' name='memo'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name='x' hidden></Form.Item>
        <Form.Item name='y' hidden></Form.Item>
        <Form.Item name='place_url' hidden></Form.Item>
      </Form>
      <PlaceSearchResultModal
        visible={showPlaceModal}
        onCancel={closePlaceModal}
        placeName={form.getFieldValue('location_name')}
        onSelect={onSelectPlace}
      />
    </>
  );
};

export default PaymentForm;
