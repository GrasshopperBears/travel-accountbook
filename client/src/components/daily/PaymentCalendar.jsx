import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, message } from 'antd';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import service from '@services/daily';
import CenterDiv from '@components/common/CenterDiv';
import { CreditCardOutlined } from '@ant-design/icons';

const PaymentCalendar = () => {
  const [dateInfo, setDateInfo] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [dailyStat, setDailyStat] = useState({ entry: [], stat: {} });

  const selectDate = () => {};
  const fetchStat = async () => {
    const response = await service.getDailyStat(dateInfo.year, dateInfo.month);
    if (response) {
      setDailyStat(
        response.reduce(
          (acc, dailyInfo) => {
            const { entry, stat } = acc;
            const { date, amount_per_date } = dailyInfo;
            entry.push(date);
            stat.push(amount_per_date);
            return { entry, stat };
          },
          { entry: [], stat: [] },
        ),
      );
    }
  };

  const dateSelectHandler = (val) => {
    const date = momentToDateObj(val);
    if (date.year === dateInfo.year && date.month === dateInfo.month) selectDate(date);
    else setDateInfo({ year: date.year, month: date.month });
  };
  const monthChangeHandler = useCallback((_, mode) => {
    if (mode === 'year') return message.warn('해당 서비스는 추후 지원 예정입니다');
  }, []);
  const dateCellRenderer = (date) => {
    if (!dailyStat.entry.length) return;
    const formattedDate = date.format('YYYY-MM-DD');
    const statIdx = dailyStat.entry.indexOf(formattedDate);
    if (statIdx >= 0)
      return isMobile ? (
        <DailyCell>
          <CreditCardOutlined />
        </DailyCell>
      ) : (
        <DailyCell>{`${parseInt(dailyStat.stat[statIdx]).toLocaleString()}원`}</DailyCell>
      );
  };

  useEffect(() => {
    fetchStat();
  }, [dateInfo]);

  return (
    <Calendar
      onSelect={dateSelectHandler}
      onPanelChange={monthChangeHandler}
      dateCellRender={dateCellRenderer}
    />
  );
};

const momentToDateObj = (date) => {
  const year = date.year();
  const month = date.month();
  const day = date.date();
  return { year, month, day };
};

const DailyCell = styled(CenterDiv)`
  font-family: 'Noto Serif KR', serif;
`;

export default PaymentCalendar;
