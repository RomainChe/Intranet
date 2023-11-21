const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers.js');

router.get('/random-user', UserController.getRandomUser);

module.exports = router;
