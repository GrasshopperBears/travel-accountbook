import React, { useEffect, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { setCategories, addCategory, modifyCategory, deleteCategory } from '@stores/actions';
import service from '@services/category';
import { Modal, Form, Input, Button, Divider, Empty, List } from 'antd';
import ModifyCategoryRow from './ModifyCategoryRow';

const ModifyCategoryModal = ({
  visible,
  closeModal,
  isMobile,
  setCategories,
  addCategory,
  modifyCategory,
  deleteCategory,
}) => {
  const [form] = Form.useForm();
  const { init, categories } = useSelector((state) => state.categories);
  useEffect(() => {
    if (!init) initCategories();
  }, []);
  const initCategories = useCallback(async () => {
    const result = await service.getCategories();
    if (result) setCategories(result);
  }, [setCategories]);
  const addCategoryHandler = async ({ title }) => {
    const response = await service.createCategory(title);
    if (response) {
      addCategory(response);
      form.resetFields();
    } else alert('오류가 발생했습니다');
  };
  const modifyCategoryHandler = async (id, newTitle) => {
    const response = await service.modifyCategory(id, newTitle);
    if (response.success) modifyCategory(id, newTitle);
    else alert('오류가 발생했습니다');
  };
  const deleteCategoryHandler = async (id) => {
    const response = await service.deleteCategory(id);
    if (response.success) deleteCategory(id);
    else alert('오류가 발생했습니다');
  };

  return (
    <Modal visible={visible} onCancel={closeModal} title='카테고리 수정하기' footer={null}>
      <Form layout={isMobile ? '' : 'inline'} onFinish={addCategoryHandler} form={form}>
        <Form.Item
          name='title'
          label='이름'
          style={{ flex: '1' }}
          rules={[
            { required: true, message: '이름을 입력해주세요' },
            { max: 10, message: '카테고리 이름은 최대 10글자로 지정 가능합니다' },
          ]}
        >
          <Input placeholder='카테고리 이름을 입력하세요' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            추가하기
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      {init &&
        (categories.length ? (
          <List
            bordered
            dataSource={categories}
            renderItem={(category) =>
              !category.deleted && (
                <List.Item>
                  <ModifyCategoryRow
                    category={category}
                    onModify={modifyCategoryHandler}
                    onDelete={deleteCategoryHandler}
                  />
                </List.Item>
              )
            }
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='카테고리를 생성해주세요' />
        ))}
    </Modal>
  );
};

export default connect(null, { setCategories, addCategory, modifyCategory, deleteCategory })(
  ModifyCategoryModal,
);
