const express = require("express");
const router = express.Router();
const UserController = require('../controllers/userControllers.js');
const authenticateToken = require("../middlewares/authenticateToken");

router.get('/profile', UserController.getUserProfile);
router.put('/update-profile', UserController.updateUserProfile);

module.exports = router;
