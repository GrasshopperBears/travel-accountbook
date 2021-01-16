const Cateogory = require('../../models/tables/category');

const createCategory = async (req, res) => {
  const { uid: user_id, title } = req.body;
  try {
    const newCategory = await Cateogory.create({ user_id, title });
    if (newCategory) res.json(newCategory);
    else throw new Error();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = createCategory;
