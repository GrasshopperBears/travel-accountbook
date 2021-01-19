import React, { useState, useEffect } from 'react';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import { connect, useSelector } from 'react-redux';
import { Empty, Spin } from 'antd';
import { loadPayments, modifyPayment } from '@stores/actions';
import service from '@services/payment';
import DailyList from './DailyList';
import ModifyPaymentModal from './ModifyPaymentModal';

const PaymentList = ({ loadPayments, modifyPayment }) => {
  const [hasMore, setHasMore] = useState(true);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modifyModalInitialValues, setModifyModalInitialValues] = useState({});
  const { init: initTrips, selectedTrip } = useSelector((state) => state.trips);
  const { init: initPayments, payments } = useSelector((state) => state.payments);
  const fetchPayments = async (page) => {
    const response = await service.getPayments(page, selectedTrip.id);
    if (!response) return alert('내역 조회 중 오류가 발생했습니다');
    const { payments, isLast } = response;
    loadPayments(payments);
    if (isLast) setHasMore(false);
  };
  const modifyModalHanlder = (info) => {
    setShowModifyModal(true);
    const { id, title, amount, date, category_id, location_name, memo } = info;
    const initialValues = { id, title, amount, date: moment(date), category_id, location_name, memo };
    setModifyModalInitialValues(initialValues);
  };

  useEffect(() => {
    if (initTrips && selectedTrip && !initPayments) fetchPayments(0);
  }, [initTrips, initPayments]);

  return payments.length ? (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <InfiniteScroll
        loadMore={fetchPayments}
        initialLoad={false}
        pageStart={0}
        hasMore={hasMore}
        useWindow={false}
        loader={<Spin />}
      >
        <DailyList payments={payments} onClickModify={modifyModalHanlder} />
      </InfiniteScroll>
      <ModifyPaymentModal
        visible={showModifyModal}
        initialValues={modifyModalInitialValues}
        onCancel={() => {
          setShowModifyModal(false);
        }}
        modifyHandler={modifyPayment}
      />
    </div>
  ) : (
    <Empty
      description={initPayments ? '지출 내역이 없습니다!' : <Spin />}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      style={{ backgroundColor: 'white', height: '100%', margin: '0', paddingTop: '3rem' }}
    />
  );
};

export default connect(null, { loadPayments, modifyPayment })(PaymentList);
