import { SET_TRIPS, ADD_TRIP, MODIFY_TRIP, SELECT_TRIP, DELETE_TRIP } from '../actionTypes';

const initialState = {
  init: false,
  trips: [],
  selectedId: undefined,
};

const trips = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRIPS:
      const { trips } = action.payload;
      return { init: true, trips, selectedId: trips.length ? trips[0].id : undefined };
    case ADD_TRIP:
      const { newTrip } = action.payload;
      return { ...state, trips: [newTrip, ...state.trips], selectedId: newTrip.id };
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
      return { ...state, selectedId: parseInt(selectedTripId) };
    case DELETE_TRIP:
      const { tripId: deletedTripId } = action.payload;
      const newTrips = state.trips.reduce((acc, trip) => {
        if (trip.id !== deletedTripId) acc.push(trip);
        return acc;
      }, []);
      return {
        ...state,
        trips: newTrips,
        selectedId: newTrips.length ? newTrips[0].id : undefined,
      };
    default:
      return state;
  }
};

export default trips;
