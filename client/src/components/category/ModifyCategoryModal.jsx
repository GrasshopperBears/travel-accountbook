import React from 'react';
import { Modal } from 'antd';

const ModifyCategoryModal = ({ visible, closeModal }) => {
  return <Modal visible={visible} onCancel={closeModal} title='카테고리 수정하기' footer={null}></Modal>;
};

export default ModifyCategoryModal;
