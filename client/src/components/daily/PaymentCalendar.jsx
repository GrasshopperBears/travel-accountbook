import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, message } from 'antd';
import styled from 'styled-components';

const PaymentCalendar = () => {
  const [dateInfo, setDateInfo] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [dailyStat, setDailyStat] = useState('hi');

  const selectDate = () => {};
  const fetchStat = async () => {};

  const dateSelectHandler = (val) => {
    const date = momentToDateObj(val);
    if (date.year === dateInfo.year && date.month === dateInfo.month) selectDate(date);
    else setDateInfo({ year: date.year, month: date.month });
  };
  const monthChangeHandler = useCallback((_, mode) => {
    if (mode === 'year') return message.warn('해당 서비스는 추후 지원 예정입니다');
  }, []);

  useEffect(() => {
    fetchStat();
  }, [dateInfo]);

  return (
    <Calendar
      onSelect={dateSelectHandler}
      onPanelChange={monthChangeHandler}
      dateCellRender={(date) => <DailyCell>{dailyStat}</DailyCell>}
    />
  );
};

const momentToDateObj = (date) => {
  const year = date.year();
  const month = date.month();
  const day = date.date();
  return { year, month, day };
};

const DailyCell = styled.div``;

export default PaymentCalendar;
