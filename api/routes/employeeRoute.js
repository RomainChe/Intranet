const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeControllers");

router.get("/employees", EmployeeController.getAllEmployees);

module.exports = router;
