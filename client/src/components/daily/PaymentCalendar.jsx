import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, message } from 'antd';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';
import service from '@services/daily';
import CenterDiv from '@components/common/CenterDiv';
import { CreditCardOutlined } from '@ant-design/icons';
import DailyPaymentModal from './DailyPaymentModal';

const PaymentCalendar = () => {
  const [paymentModal, setPaymentModal] = useState({ visible: false, date: undefined });
  const [dateInfo, setDateInfo] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const [dailyStat, setDailyStat] = useState({ entry: [], stat: [] });
  const { selectedTrip } = useSelector((state) => state.trips);

  const openDailyPaymentModal = useCallback((date) => {
    setPaymentModal({ visible: true, date });
  }, []);
  const closeDailyPaymentModal = useCallback(() => {
    setPaymentModal({ ...paymentModal, visible: false });
  }, [paymentModal]);
  const deleteHandler = (info) => {
    setDailyStat(deleteReducer(dailyStat, info));
  };
  const fetchStat = async () => {
    const response = await service.getDailyStat(selectedTrip.id, dateInfo.year, dateInfo.month);
    if (response) setDailyStat(fetchReducer(response));
  };
  const modifyHandler = (prevInfo, newInfo) => {
    setDailyStat(modifyReducer(dailyStat, prevInfo, newInfo));
  };
  const dateSelectHandler = (val) => {
    const date = momentToDateObj(val);
    if (date.year === dateInfo.year && date.month === dateInfo.month) openDailyPaymentModal(date);
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
        <DailyCell>{`${dailyStat.stat[statIdx].toLocaleString()}원`}</DailyCell>
      );
  };

  useEffect(() => {
    fetchStat();
  }, [dateInfo]);

  return (
    <>
      <Calendar
        onSelect={dateSelectHandler}
        onPanelChange={monthChangeHandler}
        dateCellRender={dateCellRenderer}
      />
      <DailyPaymentModal
        info={paymentModal}
        onCancel={closeDailyPaymentModal}
        onDelete={deleteHandler}
        onModify={modifyHandler}
      />
    </>
  );
};

const momentToDateObj = (date) => {
  const year = date.year();
  const month = date.month();
  const day = date.date();
  return { year, month, day };
};

const fetchReducer = (response) => {
  return response.reduce(
    (acc, dailyInfo) => {
      const { entry, stat } = acc;
      const { date, amount_per_date } = dailyInfo;
      entry.push(date);
      stat.push(parseInt(amount_per_date));
      return { entry, stat };
    },
    { entry: [], stat: [] },
  );
};
const deleteReducer = (dailyStat, info) => {
  return dailyStat.entry.reduce(
    (acc, date, idx) => {
      const { entry, stat } = acc;
      if (date === info.date) {
        const newAmount = dailyStat.stat[idx] - info.amount;
        if (!newAmount) return acc;
        entry.push(date);
        stat.push(newAmount);
      } else {
        entry.push(date);
        stat.push(dailyStat.stat[idx]);
      }
      return { entry, stat };
    },
    { entry: [], stat: [] },
  );
};
const modifyReducer = (dailyStat, prevInfo, newInfo) => {
  const { date: prevInfoDate, amount: prevAmount } = prevInfo;
  const { date: newInfoDate, amount: newAmount } = newInfo;
  const prevDate = moment(prevInfoDate);
  const newDate = moment(newInfoDate);
  return dailyStat.entry.reduce(
    (acc, date, idx) => {
      const { entry, stat } = acc;
      const wasToday = prevDate.isSame(date, 'day');
      const isToday = newDate.isSame(date, 'day');
      let amount = dailyStat.stat[idx];
      if (wasToday && isToday) amount = dailyStat.stat[idx] - prevAmount + newAmount;
      else if (wasToday) {
        amount = dailyStat.stat[idx] - prevAmount;
        if (!dailyStat.entry.find((el) => newDate.isSame(el, 'day'))) {
          entry.push(newDate.format('YYYY-MM-DD'));
          stat.push(newAmount);
        }
        if (!amount) return acc;
      } else if (isToday) amount = dailyStat.stat[idx] + newAmount;

      if (!amount) return acc;
      entry.push(date);
      stat.push(amount);
      return { entry, stat };
    },
    { entry: [], stat: [] },
  );
};

const DailyCell = styled(CenterDiv)`
  font-family: 'Noto Serif KR', serif;
`;

export default PaymentCalendar;
