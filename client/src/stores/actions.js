import { SET_TRIPS, ADD_TRIP } from './actionTypes';

export const setTrips = (trips) => ({
  type: SET_TRIPS,
  payload: { trips },
});
export const addTrip = (newTrip) => ({
  type: ADD_TRIP,
  payload: { newTrip },
});
