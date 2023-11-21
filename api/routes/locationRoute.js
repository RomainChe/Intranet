const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/locationControllers");

router.get("/all-locations", LocationController.getAllLocations);

module.exports = router;
