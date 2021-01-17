import React, { useEffect } from 'react';
import { Descriptions, Button, Space } from 'antd';

const PaymentInfo = ({ info }) => {
  useEffect(() => {
    console.log(info);
  });
  const btns = (
    <Space>
      <Button type='danger' size='small'>
        삭제
      </Button>
      <Button type='primary' size='small'>
        수정
      </Button>
    </Space>
  );

  return (
    <Descriptions
      title={info.title}
      column={{ xxl: 2, xs: 1 }}
      extra={btns}
      size='small'
      style={{ borderBottom: '1px solid #e8e8e8', paddingTop: '0.8rem' }}
    >
      <Descriptions.Item label='금액'>{`${info.amount.toLocaleString()}원`}</Descriptions.Item>
      {info.location_name && <Descriptions.Item label='장소'>{info.location_name}</Descriptions.Item>}
      {info.memo && (
        <Descriptions.Item label='메모' span={2}>
          {info.memo}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default PaymentInfo;
