const Payment = require('../../models/tables/payment');

const modifyPayment = async (req, res) => {
  const { uid: user_id, title, amount, date, category, placeName, memo } = req.body;
  const { paymentId: id } = req.params;
  try {
    const [affectedRows] = await Payment.update(
      { title, amount, date, category, placeName, memo },
      { where: { user_id, id } },
    );
    if (affectedRows) res.json({ success: true });
    else res.json({ success: false });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = modifyPayment;
