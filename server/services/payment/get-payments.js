const Payment = require('../../models/tables/payment');

const PAGE_SIZE = 15;

const getPayments = async (req, res) => {
  const { uid } = req.body;
  const { tripId: trip_id, page } = req.params;
  const parsedPage = parseInt(page);
  const offset = parsedPage ? PAGE_SIZE * (parsedPage - 1) : 0;
  try {
    const { count, rows: payments } = await Payment.findAndCountAll({
      where: { user_id: uid, trip_id },
      order: [
        ['date', 'DESC'],
        ['id', 'DESC'],
      ],
      limit: PAGE_SIZE,
      offset,
    });
    const isLast = count <= PAGE_SIZE * (parsedPage + 1);
    res.json({ payments, isLast });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getPayments;
