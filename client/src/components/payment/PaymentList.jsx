import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect, useSelector } from 'react-redux';
import { Empty, Spin } from 'antd';
import { loadPayments } from '@stores/actions';
import service from '@services/payment';
import DailyList from './DailyList';

const PaymentList = ({ loadPayments }) => {
  const [scrollPage, setScroolPage] = useState(1);
  const { init: initTrips, selectedTrip } = useSelector((state) => state.trips);
  const { init: initPayments, payments } = useSelector((state) => state.payments);
  const fetchPayments = async () => {
    const response = await service.getPayments(scrollPage, selectedTrip.id);
    if (!response) return alert('내역 조회 중 오류가 발생했습니다');
    const { payments, isLast } = response;
    loadPayments(payments);
    if (!isLast) setScroolPage(scrollPage + 1);
  };

  useEffect(() => {
    if (initTrips && selectedTrip && !initPayments) fetchPayments();
  }, [initTrips, initPayments]);

  return payments.length ? (
    <DailyList list={payments} />
  ) : (
    <Empty
      description={initPayments ? '지출 내역이 없습니다!' : <Spin />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      style={{ backgroundColor: 'white', height: '100%', margin: '0', paddingTop: '3rem' }}
    />
  );
};

export default connect(null, { loadPayments })(PaymentList);
