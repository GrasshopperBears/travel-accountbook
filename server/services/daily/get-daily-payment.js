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
    const selectedDate = new Date(year, month, date);

    const payments = await Payment.findAll({
      where: {
        user_id: uid,
        date: selectedDate,
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
