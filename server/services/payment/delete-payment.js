const Payment = require('../../models/tables/payment');

const deletePayment = async (req, res) => {
  const { uid } = req.body;
  const { paymentId: id } = req.params;
  try {
    const affectedRows = await Payment.destroy({ where: { user_id: uid, id } });
    if (affectedRows) res.json({ success: true });
    else res.json({ success: false });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = deletePayment;
