const Sequelize = require('sequelize');
const Payment = require('../../models/tables/payment');

const { Op } = Sequelize;

const getMapPayments = async (req, res) => {
  const { uid } = req.body;
  const { tripId: trip_id } = req.params;
  const { count } = req.query;
  let parsedCount = undefined;
  try {
    parsedCount = count === 'null' ? 0 : parseInt(count);
  } catch (e) {
    throw new Error();
  }

  try {
    const payments = await Payment.findAndCountAll({
      attributes: ['id', 'title', 'amount', 'location_latlng', 'place_url', 'location_name'],
      where: { user_id: uid, trip_id, location_latlng: { [Op.ne]: null } },
      limit: parsedCount,
    });
    res.json({ payments });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getMapPayments;
