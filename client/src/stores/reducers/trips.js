import { SET_TRIPS } from '../actionTypes';

const initialState = {
  init: false,
  trips: [],
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRIPS: {
      const { trips } = action.payload;
      return { init: true, trips };
    }
    default:
      return state;
  }
};

export default trips;
