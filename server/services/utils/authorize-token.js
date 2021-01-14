import User from '../../models/tables/user';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  const result = await User.find();
};
