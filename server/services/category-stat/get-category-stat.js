const Sequelize = require('sequelize');
const Payment = require('../../models/tables/payment');

const getCategoryStat = async (req, res) => {
  const { uid } = req.body;
  const { tripId: trip_id } = req.params;

  try {
    const result = await Payment.findAll({
      attributes: ['category_id', [Sequelize.fn('sum', Sequelize.col('amount')), 'amount_per_category']],
      where: {
        user_id: uid,
        trip_id,
      },
      group: ['category_id'],
      raw: true,
    });
    const stat = result.reduce((acc, element) => {
      acc.push({ ...element, amount_per_category: parseInt(element.amount_per_category) });
      return acc;
    }, []);
    stat.sort((a, b) => b.amount_per_category - a.amount_per_category);
    res.json(stat);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getCategoryStat;
