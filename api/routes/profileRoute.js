const express = require("express");
const router = express.Router();
const UserController = require('../controllers/userControllers.js');
const verifyToken = require('../middlewares/authenticateToken.js')

router.get('/profile', verifyToken, UserController.getUserProfile);
router.put('/update-profile', verifyToken, UserController.updateUserProfile);

module.exports = router;
