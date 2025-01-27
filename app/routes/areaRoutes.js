// routes/areaRoutes.js
const express = require('express');
const areaController = require('../controllers/areaController');

const router = express.Router();

// Search API for any area and its neighbors
router.get('/search/:areaName', areaController.searchArea);

module.exports = router;
