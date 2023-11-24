const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeControllers");

router.get("/employees", EmployeeController.getAllEmployees);
router.get("/employee", EmployeeController.getEmployee);
router.post('/add-employee', EmployeeController.addEmployee);
router.put('/edit-employee/:employeeId', EmployeeController.editEmployee);
router.delete('/delete-employee/:employeeId', EmployeeController.deleteEmployee);

module.exports = router;
