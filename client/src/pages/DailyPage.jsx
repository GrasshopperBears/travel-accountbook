import React from 'react';
import MainLayout from '@layouts/MainLayout';
import PaymentCalendar from '@components/daily/PaymentCalendar';

const DailyPage = () => {
  return (
    <MainLayout>
      <PaymentCalendar></PaymentCalendar>
    </MainLayout>
  );
};

export default DailyPage;
