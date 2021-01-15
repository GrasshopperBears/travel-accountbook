import React, { useCallback, useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Modal, Form, Input, Button } from 'antd';
import service from '@services/trip';
import { addTrip, modifyTrip, deleteTrip } from '@stores/actions';

const NewTripModal = ({ visible, closeModal, modifying = false, addTrip, modifyTrip, deleteTrip }) => {
  const { trips, selectedId } = useSelector((state) => state.trips);
  const [originalTrip, setOriginalTrip] = useState(undefined);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && modifying) {
      const currentTrip = trips.find((trip) => trip.id === selectedId);
      if (currentTrip) {
        const { title, location_name: locationName } = currentTrip;
        form.setFieldsValue({ title, locationName });
        setOriginalTrip(currentTrip);
      }
    }
  }, [visible, modifying, trips, selectedId, form]);

  const clickOkHandler = useCallback(() => {
    form.submit();
  }, [form]);
  const onFinish = (values) => {
    closeModal();
    const { title, locationName } = values;
    if (modifying) modifyTripHandler(title, locationName);
    else createTripHandler(title, locationName);
  };
  const createTripHandler = async (title, locationName) => {
    const response = await service.createTrip(title, locationName);
    if (response) {
      addTrip(response);
    } else alert('추가 중 오류가 발생했습니다');
  };
  const modifyTripHandler = async (title, locationName) => {
    const { id: tripId } = originalTrip;
    const response = await service.modifyTrip(tripId, title, locationName);
    if (response.success) modifyTrip(tripId, title, locationName);
  };
  const deleteTripHandler = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    closeModal();
    const { id: tripId } = originalTrip;
    const response = await service.deleteTrip(tripId);
    if (response.success) {
      deleteTrip(tripId);
    } else alert('삭제 중 오류가 발생했습니다');
  };
  const buttons = [
    <Button key='cancel' type='danger' onClick={deleteTripHandler} style={{ float: 'left' }}>
      삭제
    </Button>,
    <Button key='cancel' onClick={closeModal}>
      취소
    </Button>,
    <Button key='submit' type='primary' onClick={clickOkHandler}>
      확인
    </Button>,
  ];

  return (
    <Modal
      title={`여행 ${modifying ? '수정/삭제' : '추가'}하기`}
      visible={visible}
      onCancel={closeModal}
      footer={modifying ? buttons : buttons.slice(1)}
    >
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

const DELETE_LOADING = 'DELETE_LOADING';
const OK_LOADING = 'OK_LOADING';

export default connect(null, { addTrip, modifyTrip, deleteTrip })(NewTripModal);
