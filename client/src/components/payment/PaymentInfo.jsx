import React from 'react';
import { Descriptions, Button, Space, message } from 'antd';
import { useSelector } from 'react-redux';
import { DollarOutlined, CopyOutlined, AimOutlined, FolderOpenOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import service from '@services/payment';

const PaymentInfo = ({ info, onClickModify, onDelete }) => {
  const { init, categories } = useSelector((state) => state.categories);
  const deleteHandler = async () => {
    if (!window.confirm('해당 내역을 삭제하시겠습니까?')) return;
    const response = await service.deletePayment(info.id);
    if (response) {
      const { success } = response;
      if (success) {
        message.success('결제 내역이 삭제되었습니다');
        onDelete(info);
      } else alert('삭제 중 오류가 발생했습니다');
    } else alert('삭제 중 오류가 발생했습니다');
  };

  const btns = (
    <Space>
      <Button type='danger' size='small' onClick={deleteHandler}>
        삭제
      </Button>
      <Button
        type='primary'
        size='small'
        onClick={() => {
          onClickModify(info);
        }}
      >
        수정
      </Button>
    </Space>
  );

  return (
    <PaymentDescriptions
      title={info.title}
      column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      extra={btns}
      size='small'
      colon={false}
      style={{ borderBottom: '1px solid #e8e8e8', paddingTop: '0.8rem' }}
    >
      <Descriptions.Item
        span={2}
        label={<DollarOutlined />}
      >{`${info.amount.toLocaleString()}원`}</Descriptions.Item>
      {info.location_name && (
        <Descriptions.Item label={<AimOutlined />} span={info.category_id ? 1 : 2}>
          {info.place_url ? (
            <a href={info.place_url} target='_blank' rel='noopener noreferrer'>
              {info.location_name}
            </a>
          ) : (
            info.location_name
          )}
        </Descriptions.Item>
      )}
      {init && info.category_id && (
        <Descriptions.Item label={<FolderOpenOutlined />} span={info.location_name ? 1 : 2}>
          {categories.find((category) => category.id === info.category_id).title}
        </Descriptions.Item>
      )}
      {info.memo && (
        <Descriptions.Item label={<CopyOutlined />} span={2}>
          {info.memo}
        </Descriptions.Item>
      )}
    </PaymentDescriptions>
  );
};

const PaymentDescriptions = styled(Descriptions)`
  border-bottom: '1px solid #e8e8e8';
  padding-top: '0.8rem';

  svg,
  .ant-descriptions-item-label > span {
    width: 100%;
    height: 100%;
  }
`;

export default PaymentInfo;
