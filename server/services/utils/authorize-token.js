const jwt = require('jsonwebtoken');
const User = require('../../models/tables/user');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  try {
    const { id } = jwt.decode(token);
    const result = await User.findOne({ where: { id } });
    if (result) req.body.uid = result.dataValues.id;
    else return res.sendStatus(401);
  } catch (e) {
    console.error(e);
  } finally {
    next();
  }
};
