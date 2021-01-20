/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { Select, Card, Typography } from 'antd';
import styled from 'styled-components';
import service from '@services/map';

const { Option } = Select;
const { Title } = Typography;

const Map = () => {
  const ref = useRef(undefined);
  const [map, setMap] = useState(undefined);
  const [currentPayment, setCurrentPayment] = useState(undefined);
  const { selectedTrip } = useSelector((state) => state.trips);
  const [paymentCount, setPaymentCount] = useState('30');
  const [payments, setpayments] = useState([]);
  const onSelectNumber = (value) => {
    setPaymentCount(value);
  };
  const fetchPayments = async () => {
    const response = await service.getMapPayments(selectedTrip.id, paymentCount);
    if (response) setpayments(response.payments.rows);
  };
  const clickMarkerHandler = (payment) => {
    setCurrentPayment(payment);
    console.log(payment);
  };

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 12,
    };
    setMap(new kakao.maps.Map(ref.current, options));
  }, []);
  useEffect(() => {
    if (selectedTrip) fetchPayments();
  }, [paymentCount, selectedTrip]);
  useEffect(() => {
    if (!payments) return;
    const markers = payments.reduce((acc, payment) => {
      const {
        location_latlng: {
          coordinates: [x, y],
        },
      } = payment;
      const position = new kakao.maps.LatLng(y, x);
      const marker = new kakao.maps.Marker({
        map,
        position,
        clickable: true,
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        clickMarkerHandler(payment);
      });
      acc.push(marker);
      return acc;
    }, []);
    return () => {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, [payments]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div ref={ref} style={{ width: '100%', height: '100%', position: 'absolute' }}></div>
      {currentPayment && (
        <InfoWindow>
          <Title level={3}>{currentPayment.title}</Title>
          <p style={{ margin: '0' }}>{currentPayment.amount.toLocaleString()}원</p>
          {currentPayment.location_name && <p>@{currentPayment.location_name}</p>}
        </InfoWindow>
      )}
      <CountCard>
        <p>표시할 내역 개수</p>
        <CountOptions defaultValue={paymentCount} onChangeNumber={onSelectNumber} />
      </CountCard>
    </div>
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
  right: ${isMobile ? '0' : '3rem'};

  .ant-card-body {
    padding: ${isMobile ? '20px' : '15px 50px'};
  }
`;
const InfoWindow = styled(Card)`
  position: fixed;
  z-index: 10;
  width: 100%;
  bottom: 0;
`;

export default Map;
