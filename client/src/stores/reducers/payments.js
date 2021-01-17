import moment from 'moment';
import {
  SET_TOTAL_AMOUNT,
  LOAD_PAYMENTS,
  ADD_PAYMENT,
  MODIFY_PAYMENT,
  DELETE_PAYMENT,
  CLEAR_PAYMENT,
} from '../actionTypes';

const initialState = {
  init: false,
  payments: [],
  initTotalAmount: false,
  totalAmount: 0,
  todayAmount: 0,
};

const payments = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOTAL_AMOUNT:
      const { totalAmount, todayAmount } = action.payload;
      return { ...state, initTotalAmount: true, totalAmount, todayAmount };
    case LOAD_PAYMENTS:
      const { payments } = action.payload;
      return { ...state, init: true, payments: [...payments, ...state.payments] };
    case ADD_PAYMENT:
      const { newPayment } = action.payload;
      const { date: addedDate, amount: addedAmount } = newPayment;
      return {
        ...state,
        payments: [newPayment, ...state.payments],
        totalAmount: state.totalAmount + addedAmount,
        todayAmount: moment().isSame(addedDate, 'day') ? state.todayAmount + addedAmount : state.todayAmount,
      };
    case MODIFY_PAYMENT:
      const { prevInfo, newInfo } = action.payload;
      const { id, date: prevDate, amount: prevAmount } = prevInfo;
      const { date: newDate, amount: newAmount } = newInfo;
      const wasToday = moment().isSame(prevDate, 'day');
      const isToday = moment().isSame(newDate, 'day');
      return {
        ...state,
        payments: state.payments.reduce((acc, payment) => {
          if (payment.id === id) acc.push({ ...payment, ...newInfo });
          else acc.push(payment);
          return acc;
        }, []),
        totalAmount: state.totalAmount - prevAmount + newAmount,
        todayAmount: wasToday
          ? isToday
            ? state.todayAmount - prevAmount + newAmount
            : state.todayAmount - prevAmount
          : isToday
          ? state.todayAmount + newAmount
          : state.todayAmount,
      };
    case DELETE_PAYMENT:
      const {
        info: { id: deletedPaymentId, amount: deletedAmount, date: deletedDate },
      } = action.payload;

      return {
        ...state,
        payments: state.payments.reduce((acc, payment) => {
          if (payment.id !== deletedPaymentId) acc.push(payment);
          return acc;
        }, []),
        totalAmount: state.totalAmount - deletedAmount,
        todayAmount: moment().isSame(deletedDate, 'day')
          ? state.todayAmount - deletedAmount
          : state.todayAmount,
      };
    case CLEAR_PAYMENT:
      return initialState;
    default:
      return state;
  }
};

export default payments;
