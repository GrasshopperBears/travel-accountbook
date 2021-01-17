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
      return { ...state, payments: [newPayment, ...state.payments] };
    case MODIFY_PAYMENT:
      const { id, info } = action.payload;
      return {
        ...state,
        payments: state.payments.reduce((acc, payment) => {
          if (payment.id === id) acc.push({ ...payment, ...info });
          else acc.push(payment);
          return acc;
        }, []),
      };
    case DELETE_PAYMENT:
      const {
        info: { id: deletedPaymentId, amount, date },
      } = action.payload;

      return {
        ...state,
        payments: state.payments.reduce((acc, payment) => {
          if (payment.id !== deletedPaymentId) acc.push(payment);
          return acc;
        }, []),
        totalAmount: state.totalAmount - amount,
        todayAmount: moment().isSame(date, 'day') ? state.todayAmount - amount : state.todayAmount,
      };
    case CLEAR_PAYMENT:
      return initialState;
    default:
      return state;
  }
};

export default payments;