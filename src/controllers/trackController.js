const Track = require('../models/trackModel');
const trackModel = new Track();
const { validationResult } = require('express-validator');



const uploadTrack = async (req, res, next) => {
    // Validate Request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { title, artist, album, genre, file_path } = req.body;

    try {
        const track = await trackModel.uploadTrack(title, artist, album, genre, file_path);
        res.status(201).json({ success: true, message: "Music Track Uploaded successfully", track });
    } catch (error) {
        next(error);
    }
};


const getAllTracks = async (req, res, next) => {
    try {
        const tracks = await trackModel.getAllTracks();
        res.status(200).json(tracks);
    } catch (error) {
        next(error);
    }
};

const getTrackById = async (req, res, next) => {

    const { id } = req.params;

    try {

        const result = await trackModel.getTrackById(id);
        if (!result) {
            const error = new Error('Track not found.');
            error.statusCode = 404;
            throw error;
        }
        res.json(result);
    } catch (error) {

        next(error);
    }
};





module.exports = {
    uploadTrack,
    getAllTracks,
    getTrackById

};