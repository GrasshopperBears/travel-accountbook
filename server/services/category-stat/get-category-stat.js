const Sequelize = require('sequelize');
const Payment = require('../../models/tables/payment');

const getCategoryStat = async (req, res) => {
  const { uid } = req.body;

  try {
    const stat = await Payment.findAll({
      attributes: ['category_id', [Sequelize.fn('sum', Sequelize.col('amount')), 'amount_per_category']],
      where: {
        user_id: uid,
      },
      group: ['category_id'],
      raw: true,
    });
    res.json(stat);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getCategoryStat;
