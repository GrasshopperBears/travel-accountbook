const express = require('express');
const service = require('../services/category');
const router = express.Router();

router.get('/', service.getCategories);
router.post('/', service.createCategory);
router.patch('/:categoryId', service.modifyCategory);
router.delete('/:categoryId', service.deleteCategory);

module.exports = router;
