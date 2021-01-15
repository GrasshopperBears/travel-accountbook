import { SET_TRIPS } from './actionTypes';

export const setTrips = (trips) => ({
  type: SET_TRIPS,
  payload: { trips },
});
