const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoute.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Connect to MongoDB
mongoose
  .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    .then(() => console.log("Connexion établie !"))
    .catch((err) => console.log(err));
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Body parser middleware
app.use(bodyParser.json());

app.use('/api', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});