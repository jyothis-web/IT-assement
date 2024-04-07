const express = require('express');
const router = express.Router();
const protectRoute = require('../helpers/protectedRoute')
const itemController = require('../controllers/itemController');







 router.get('/items',itemController. getAllItems);



module.exports = router;