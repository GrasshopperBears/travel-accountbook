const Payment = require('../../models/tables/payment');

const getDailyPayment = async (req, res) => {
  const { uid } = req.body;
  const { tripId: trip_id, year: yearParam, month: monthParm, date: dateParam } = req.params;
  try {
    const year = parseInt(yearParam);
    const month = parseInt(monthParm);
    const date = parseInt(dateParam);
    const selectedDate = new Date(year, month, date);

    const payments = await Payment.findAll({
      where: {
        user_id: uid,
        date: selectedDate,
        trip_id,
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
