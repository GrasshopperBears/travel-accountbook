import React from 'react';
import { Modal } from 'antd';

const NewTripModal = ({ visible, cancelHandler }) => {
  return <Modal title='여행 추가하기' visible={visible} onCancel={cancelHandler}></Modal>;
};

export default NewTripModal;
