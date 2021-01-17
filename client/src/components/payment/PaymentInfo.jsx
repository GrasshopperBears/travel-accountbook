import React, { useEffect } from 'react';
import { Descriptions, Button, Space } from 'antd';
import { DollarOutlined, CopyOutlined, AimOutlined } from '@ant-design/icons';
import styled from 'styled-components';

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
    <PaymentDescriptions
      title={info.title}
      column={{ xxl: 2, xs: 1 }}
      extra={btns}
      size='small'
      colon={false}
      style={{ borderBottom: '1px solid #e8e8e8', paddingTop: '0.8rem' }}
    >
      <Descriptions.Item
        span={info.location_name ? 1 : 2}
        label={<DollarOutlined />}
      >{`${info.amount.toLocaleString()}원`}</Descriptions.Item>
      {info.location_name && (
        <Descriptions.Item label={<AimOutlined />}>{info.location_name}</Descriptions.Item>
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
