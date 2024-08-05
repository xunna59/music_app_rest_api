const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const authController = require('../controllers/authController');
const trackController = require('../controllers/trackController');



router.get('/get-tracks', authController.authenticateToken, trackController.getAllTracks);

router.get('/:id',
    param('id').isInt().withMessage('ID must be an integer'),
    authController.authenticateToken, trackController.getTrackById
);

router.post('/upload-track',

    body('title').notEmpty().withMessage('Track Title is required'),
    body('artist').notEmpty().withMessage('Artist is required'),
    body('album').notEmpty().withMessage('Album is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('file_path').notEmpty().withMessage('File Path is required'),

    authController.authenticateToken,
    trackController.uploadTrack,
);






module.exports = router;