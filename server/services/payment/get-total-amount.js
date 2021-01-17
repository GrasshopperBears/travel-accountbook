const Payment = require('../../models/tables/payment');

const getTotalAmount = async (req, res) => {
  const { uid: user_id } = req.body;
  const { tripId: trip_id, date } = req.query;
  try {
    const totalAmount = await Payment.sum('amount', { where: { trip_id, user_id } });
    const todayAmount = await Payment.sum('amount', { where: { trip_id, user_id, date } });
    res.json({ totalAmount, todayAmount });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getTotalAmount;
