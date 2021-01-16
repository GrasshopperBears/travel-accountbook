const Payment = require('../../models/tables/payment');

const getTotalAmount = async (req, res) => {
  const { uid: user_id } = req.body;
  try {
    const totalAmount = await Payment.sum('amount', { where: { user_id } });
    res.json({ totalAmount });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getTotalAmount;
