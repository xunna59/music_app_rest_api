const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { JWT_SECRET } = require('../config/config');
const UserModel = require('../models/userModel');
const userModel = new UserModel();


// This function handles creating a new user
const register = async (req, res, next) => {
    // Validate Request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { username, email, password, dob, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await userModel.createUser(username, email, hashedPassword, dob, gender);
        res.status(201).json({ success: true, message: 'User created successfully', user });
    } catch (error) {
        next(error);
    }
};


// This function handles User Login
const login = async (req, res, next) => {
    // Validate Request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation

    const { email, password } = req.body;

    try {
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        // Set the token as an HTTP-Only cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json({ message: 'Login successful', token: token });



    } catch (error) {
        next(error);
    }
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. Authentication Failed.' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. Authentication Failed.' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Authentication Failed' });
    }
};


const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get the token from Authorization header

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }
        req.userId = decoded.id; // Attach userId to the request object
        next();
    });
};




















module.exports = {
    register,
    login,
    authenticateToken,
};
