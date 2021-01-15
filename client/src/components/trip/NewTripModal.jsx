import React from 'react';
import { Modal, Form, Input } from 'antd';
import service from '@services/trip';

const NewTripModal = ({ visible, closeModal }) => {
  const [form] = Form.useForm();
  const createNewTrip = () => {
    form.submit();
  };
  const onFinish = async (values) => {
    const { title, locationName } = values;
    const response = await service.createTrip(title, locationName);
    if (response) {
      closeModal();
      form.resetFields();
    }
  };

  return (
    <Modal title='여행 추가하기' visible={visible} onCancel={closeModal} onOk={createNewTrip}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label='여행 이름'
          name='title'
          rules={[
            { required: true, message: '여행 이름을 입력해주세요' },
            { max: 10, message: '여행 이름은 최대 10글자로 지정 가능합니다' },
          ]}
        >
          <Input placeholder='최대 10글자' />
        </Form.Item>
        <Form.Item
          label='여행 장소'
          name='locationName'
          rules={[{ required: true, message: '여행 장소를 입력해주세요' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewTripModal;
