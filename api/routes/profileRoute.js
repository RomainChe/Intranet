const express = require("express");
const router = express.Router();
const UserController = require('../controllers/userControllers.js');
const verifyToken = require("../middlewares/authenticateToken");

router.get('/profile', UserController.getUserProfile);
router.put('/update-profile', UserController.updateUserProfile);
router.post('/add-employee', UserController.addEmployee);
// router.put('/edit-employee/:employeeId', UserController.editEmployee);
// router.delete('/delete-employee/:employeeId', UserController.deleteEmployee);

module.exports = router;
