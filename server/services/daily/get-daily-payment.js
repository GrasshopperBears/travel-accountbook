const Sequelize = require('sequelize');
const Payment = require('../../models/tables/payment');

const { Op } = Sequelize;

const getDailyPayment = async (req, res) => {
  const { uid } = req.body;
  const { year: yearParam, month: monthParm, date: dateParam } = req.params;
  try {
    const year = parseInt(yearParam);
    const month = parseInt(monthParm);
    const date = parseInt(dateParam);
    const from = new Date(year, month, date);
    const to = new Date(year, month, date + 1);

    const payments = await Payment.findAll({
      // attributes: ['date', [Sequelize.fn('sum', Sequelize.col('amount')), 'amount_per_date']],
      where: {
        user_id: uid,
        date: {
          [Op.between]: [from, to],
        },
      },
      raw: true,
    });
    res.json(payments);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getDailyPayment;
