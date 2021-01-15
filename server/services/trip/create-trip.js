const Trip = require('../../models/tables/trip');

const createTrip = async (req, res) => {
  const { uid: user_id, title, locationName: location_name } = req.body;
  try {
    const newTrip = await Trip.create({ user_id, title, location_name });
    if (newTrip) res.json(newTrip);
    else throw new Error();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = createTrip;
