const express = require('express');
const router = express.Router();
const { getFoodOptions } = require('../controllers/foodController');

router.get('/food_options', getFoodOptions);

module.exports = router;