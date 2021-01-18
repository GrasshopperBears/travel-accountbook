const Sequelize = require('sequelize');
const Payment = require('../../models/tables/payment');

const { Op } = Sequelize;

const getDailyStat = async (req, res) => {
  const { uid } = req.body;
  const { year: yearParam, month: monthParm } = req.params;
  try {
    const year = parseInt(yearParam);
    const month = parseInt(monthParm);
    const from = new Date(year, month, 1);
    const to = new Date(year, month + 1, 1);

    const stat = await Payment.findAll({
      attributes: ['date', [Sequelize.fn('sum', Sequelize.col('amount')), 'amount_per_date']],
      where: {
        user_id: uid,
        date: {
          [Op.between]: [from, to],
        },
      },
      group: ['date'],
      raw: true,
    });
    res.json(stat);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getDailyStat;
