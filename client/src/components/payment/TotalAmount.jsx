import React, { useEffect } from 'react';
import { Card, Statistic } from 'antd';
import { connect, useSelector } from 'react-redux';
import { setTotalAmount } from '@stores/actions';
import service from '@services/payment';

const TotalAmount = ({ setTotalAmount }) => {
  const { initTotalAmount, totalAmount } = useSelector((state) => state.payments);
  const updateTotalAmount = async () => {
    const response = await service.getTotalAmount();
    if (response) setTotalAmount(response.totalAmount);
    else alert('현재 서버에 문제가 있습니다. 나중에 다시 시도해주세요.');
  };

  useEffect(() => {
    if (!initTotalAmount) updateTotalAmount();
  }, []);

  return (
    <Card title='여행에서 쓴 돈' headStyle={{ fontSize: '1.3rem' }}>
      <Statistic loading={!initTotalAmount} value={totalAmount} suffix='원' style={{ textAlign: 'right' }} />
    </Card>
  );
};

export default connect(null, { setTotalAmount })(TotalAmount);
