const express = require('express');
const router = express.Router();
const { param } = require('express-validator');

const spotifyController = require('../controllers/spotifyController');
const authController = require('../controllers/authController');


router.get('/tracks/:id', async (req, res) => {

    param('id').notEmpty().withMessage('Track Id is required.'),
        spotifyController.getTracks
});

module.exports = router;