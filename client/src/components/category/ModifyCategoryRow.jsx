import React, { useState } from 'react';
import { Col, Row, Form, Input, Button, Space } from 'antd';
import styled from 'styled-components';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ModifyCategoryRow = ({ category, onModify, onDelete }) => {
  const [modifying, setModifying] = useState(false);
  const modifyHandler = ({ title }) => {
    onModify(category.id, title);
    setModifying(false);
  };
  const deleteHandler = () => {
    if (!window.confirm('카테고리를 삭제하시겠습니까?')) return;
    onDelete(category.id);
  };

  return (
    <Wrapper>
      {modifying ? (
        <Form
          initialValues={{ title: category.title }}
          layout='inline'
          onFinish={modifyHandler}
          style={{ width: '100%' }}
        >
          <Form.Item
            name='title'
            style={{ flex: '1 0' }}
            rules={[
              { required: true, message: '이름을 입력해주세요' },
              { max: 10, message: '카테고리 이름은 최대 10글자로 지정 가능합니다' },
            ]}
          >
            <Input />
          </Form.Item>
          <Space>
            <Button
              onClick={() => {
                setModifying(false);
              }}
            >
              취소
            </Button>
            <Form.Item>
              <Button type='primary' htmlType='submit' style={{ margin: '0' }}>
                수정
              </Button>
            </Form.Item>
          </Space>
        </Form>
      ) : (
        <Row style={{ width: '100%' }}>
          <Col style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} flex='auto'>
            {category.title}
          </Col>
          <Col>
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setModifying(true);
                }}
              />
              <Button icon={<DeleteOutlined />} onClick={deleteHandler} />
            </Space>
          </Col>
        </Row>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  div,
  p {
    margin: 0;
  }
`;

export default ModifyCategoryRow;
