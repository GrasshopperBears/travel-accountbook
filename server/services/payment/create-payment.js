const Payment = require('../../models/tables/payment');

const createPayment = async (req, res) => {
  const { uid: user_id, title, amount, date, category, placeName, memo } = req.body;
  try {
    const newPayment = await Payment.create({ user_id, title, amount, date, category, placeName, memo });
    if (newPayment) res.json(newPayment);
    else throw new Error();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = createPayment;
