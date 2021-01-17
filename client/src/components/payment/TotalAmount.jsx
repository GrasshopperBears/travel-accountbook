import React, { useEffect } from 'react';
import { Card, Statistic, Space } from 'antd';
import { connect, useSelector } from 'react-redux';
import { setTotalAmount } from '@stores/actions';
import service from '@services/payment';

const TotalAmount = ({ setTotalAmount }) => {
  const { initTotalAmount, totalAmount, todayAmount } = useSelector((state) => state.payments);
  const updateTotalAmount = async () => {
    const response = await service.getTotalAmount();
    if (response) setTotalAmount(response.totalAmount, response.todayAmount);
    else alert('현재 서버에 문제가 있습니다. 나중에 다시 시도해주세요.');
  };

  useEffect(() => {
    if (!initTotalAmount) updateTotalAmount();
  }, []);

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Card title='여행에서 쓴 돈' headStyle={{ fontSize: '1.3rem' }}>
        <Statistic
          loading={!initTotalAmount}
          value={totalAmount || 0}
          suffix='원'
          style={{ textAlign: 'right' }}
        />
      </Card>
      <Card title='오늘 쓴 돈' size='small'>
        <Statistic
          loading={!initTotalAmount}
          value={todayAmount || 0}
          suffix='원'
          style={{ textAlign: 'right' }}
        />
      </Card>
    </Space>
  );
};

export default connect(null, { setTotalAmount })(TotalAmount);
