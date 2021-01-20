/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Select, Card } from 'antd';
import styled from 'styled-components';
import service from '@services/map';

const { Option } = Select;

const Map = () => {
  const ref = useRef(undefined);
  const { selectedTrip } = useSelector((state) => state.trips);
  const [paymentCount, setPaymentCount] = useState('30');
  const [payments, setpayments] = useState([]);
  const onSelectNumber = (value) => {
    setPaymentCount(value);
  };
  const fetchPayments = async () => {
    const response = await service.getMapPayments(selectedTrip.id, paymentCount);
    if (response) setpayments(response.payment);
  };

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
    };
    new kakao.maps.Map(ref.current, options);
  }, []);
  useEffect(() => {
    fetchPayments();
  }, [paymentCount, selectedTrip]);
  useEffect(() => {
    // 핀 그리기
  }, [payments]);

  return (
    <>
      <div ref={ref} style={{ width: '100%', height: '100%' }}></div>
      <CountCard>
        <p>표시할 내역 개수</p>
        <CountOptions defaultValue={paymentCount} onChangeNumber={onSelectNumber} />
      </CountCard>
    </>
  );
};

const CountOptions = ({ defaultValue = '10', onChangeNumber }) => {
  return (
    <Select defaultValue={defaultValue} onChange={onChangeNumber} style={{ width: '100%' }}>
      <Option value='10'>10</Option>
      <Option value='20'>20</Option>
      <Option value='30'>30</Option>
      <Option value='50'>50</Option>
      <Option value='80'>80</Option>
      <Option value='100'>100</Option>
      <Option value='null'>모두</Option>
    </Select>
  );
};

const CountCard = styled(Card)`
  position: fixed;
  z-index: 10;
  right: 3rem;

  .ant-card-body {
    padding: 15px 50px;
  }
`;

export default Map;
