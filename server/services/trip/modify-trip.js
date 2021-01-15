const Trip = require('../../models/tables/trip');

const modifyTrip = async (req, res) => {
  const { uid, title, locationName: location_name } = req.body;
  const { tripId: id } = req.params;
  try {
    const [affectedRows] = await Trip.update({ title, location_name }, { where: { user_id: uid, id } });
    if (affectedRows) res.json({ success: true });
    else res.json({ success: false });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = modifyTrip;
