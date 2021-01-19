// const Sequelize = require('sequelize');
const Payment = require('../../models/tables/payment');

const getCategoryPayment = async (req, res) => {
  const { uid } = req.body;
  const { tripId: trip_id, categoryId: category_id } = req.params;

  try {
    const payments = await Payment.findAll({
      // attributes: ['category_id', [Sequelize.fn('sum', Sequelize.col('amount')), 'amount_per_category']],
      where: {
        user_id: uid,
        category_id,
        trip_id,
      },
      // raw: true,
    });
    res.json(payments);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getCategoryPayment;
