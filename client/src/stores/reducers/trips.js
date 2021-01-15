import { SET_TRIPS, ADD_TRIP } from '../actionTypes';

const initialState = {
  init: false,
  trips: [],
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRIPS:
      const { trips } = action.payload;
      return { init: true, trips };
    case ADD_TRIP:
      const { newTrip } = action.payload;
      return { ...state, trips: [newTrip, ...state.trips] };
    default:
      return state;
  }
};

export default trips;
