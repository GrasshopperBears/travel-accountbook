const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/api/auth', require('./auth'));

module.exports = router;
