const Trip = require('../../models/tables/trip');

const getTrips = async (req, res) => {
  const { uid } = req.body;
  try {
    const trips = await Trip.findAll({ where: { user_id: uid } });
    console.log(trips);
    res.json(trips);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getTrips;
