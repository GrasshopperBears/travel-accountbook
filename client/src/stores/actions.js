import { SET_TRIPS, ADD_TRIP, MODIFY_TRIP, SELECT_TRIP, DELETE_TRIP } from './actionTypes';

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
