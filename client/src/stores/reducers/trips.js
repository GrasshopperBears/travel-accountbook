import { SET_TRIPS, ADD_TRIP, MODIFY_TRIP, SELECT_TRIP, DELETE_TRIP } from '../actionTypes';

const initialState = {
  init: false,
  trips: [],
  selectedTrip: undefined,
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRIPS:
      const { trips } = action.payload;
      return { init: true, trips, selectedTrip: trips.length ? trips[0] : undefined };
    case ADD_TRIP:
      const { newTrip } = action.payload;
      return { ...state, trips: [newTrip, ...state.trips], selectedTrip: newTrip };
    case MODIFY_TRIP:
      const { id, title, locationName } = action.payload;
      return {
        ...state,
        trips: state.trips.reduce((acc, trip) => {
          if (trip.id === id) acc.push({ ...trip, title, locationName });
          else acc.push(trip);
          return acc;
        }, []),
      };
    case SELECT_TRIP:
      const { tripId: selectedTripId } = action.payload;
      return { ...state, selectedTrip: state.trips.find((trip) => trip.id === parseInt(selectedTripId)) };
    case DELETE_TRIP:
      const { tripId: deletedTripId } = action.payload;
      const newTrips = state.trips.reduce((acc, trip) => {
        if (trip.id !== deletedTripId) acc.push(trip);
        return acc;
      }, []);
      return {
        ...state,
        trips: newTrips,
        selectedTrip: newTrips.length ? newTrips[0] : undefined,
      };
    default:
      return state;
  }
};

export default trips;
