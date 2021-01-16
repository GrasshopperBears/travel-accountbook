const Category = require('../../models/tables/category');

const deleteCategory = async (req, res) => {
  const { uid } = req.body;
  const { categoryId: id } = req.params;
  try {
    const affectedRows = await Category.destroy({ where: { user_id: uid, id } });
    if (affectedRows) res.json({ success: true });
    else res.json({ success: false });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

module.exports = deleteCategory;
