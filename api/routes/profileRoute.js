const express = require("express");
const router = express.Router();
const UserController = require('../controllers/userControllers.js');

router.get('/user/profile', UserController.getUserProfile);
router.put('/user/update-profile', UserController.updateUserProfile);

module.exports = router;
