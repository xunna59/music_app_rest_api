const { PORT } = require('./src/config/config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./src/middleware/errorHandler');
const authRoutes = require('./src/routes/authRoutes');

const port = PORT;
const app = express();






app.use(cors());
app.use(express.json());
app.use(cookieParser());



// Endpoint for auth routes
app.use('/auth', authRoutes);


// Handles the error across our aplication
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Application is listening on port ${port}`);
});