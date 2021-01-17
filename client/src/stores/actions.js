import {
  SET_TRIPS,
  ADD_TRIP,
  MODIFY_TRIP,
  SELECT_TRIP,
  DELETE_TRIP,
  SET_CATEGORIES,
  ADD_CATEGORY,
  MODIFY_CATEGORY,
  DELETE_CATEGORY,
  SET_TOTAL_AMOUNT,
  LOAD_PAYMENTS,
  ADD_PAYMENT,
  MODIFY_PAYMENT,
  DELETE_PAYMENT,
} from './actionTypes';

// 여행 관련
export const setTrips = (trips) => ({
  type: SET_TRIPS,
  payload: { trips },
});
export const addTrip = (newTrip) => ({
  type: ADD_TRIP,
  payload: { newTrip },
});
export const modifyTrip = (id, title, locationName) => ({
  type: MODIFY_TRIP,
  payload: { id, title, locationName },
});
export const selectTrip = (tripId) => ({
  type: SELECT_TRIP,
  payload: { tripId },
});
export const deleteTrip = (tripId) => ({
  type: DELETE_TRIP,
  payload: { tripId },
});

// 카테고리 관련
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: { categories },
});
export const addCategory = (newCategory) => ({
  type: ADD_CATEGORY,
  payload: { newCategory },
});
export const modifyCategory = (id, title) => ({
  type: MODIFY_CATEGORY,
  payload: { id, title },
});
export const deleteCategory = (categoryId) => ({
  type: DELETE_CATEGORY,
  payload: { categoryId },
});

// 지출 내역 관련
export const setTotalAmount = (totalAmount, todayAmount) => ({
  type: SET_TOTAL_AMOUNT,
  payload: { totalAmount, todayAmount },
});
export const loadPayments = (payments) => ({
  type: LOAD_PAYMENTS,
  payload: { payments },
});
export const addPayment = (newPayment) => ({
  type: ADD_PAYMENT,
  payload: { newPayment },
});
export const modifyPayment = (id, info) => ({
  type: MODIFY_PAYMENT,
  payload: { id, info },
});
export const deletePayment = (paymentId) => ({
  type: DELETE_PAYMENT,
  payload: { paymentId },
});
