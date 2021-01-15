import getTrips from './get-trips';
import createTrip from './create-trip';
import modifyTrip from './modify-trip';
import deleteTrip from './delete-trip';

const service = {
  getTrips,
  createTrip,
  modifyTrip,
  deleteTrip,
};

export default service;
