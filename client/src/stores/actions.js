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
