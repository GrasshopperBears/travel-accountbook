const Trip = require('../../models/tables/trip');

const deleteTrip = async (req, res) => {
  const { uid } = req.body;
  const { tripId: id } = req.params;
  try {
    const affectedRows = await Trip.destroy({ where: { user_id: uid, id } });
    console.log(affectedRows);
    if (affectedRows) res.json({ success: true });
    else res.json({ success: false });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = deleteTrip;
