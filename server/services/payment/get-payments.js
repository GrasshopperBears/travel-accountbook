const Payment = require('../../models/tables/payment');

const getPayments = async (req, res) => {
  const { uid } = req.body;
  const { page } = req.params;
  try {
    const payments = await Payment.findAll({ where: { user_id: uid }, order: [['date', 'DESC']] });
    res.json(payments);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getPayments;
