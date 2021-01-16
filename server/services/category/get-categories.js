const Category = require('../../models/tables/category');

const getCategories = async (req, res) => {
  const { uid } = req.body;
  try {
    const trips = await Category.findAll({ where: { user_id: uid }, order: [['id', 'DESC']] });
    res.json(trips);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = getCategories;
