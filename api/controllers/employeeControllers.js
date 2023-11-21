const Employee = require("../models/User");

const getAllEmployees = async (req, res) => {
  try {
    const { name, location, category } = req.query;
    let query = {};

    if (name) {
      query.firstname = { $regex: new RegExp(name, "i") };
    }

    if (location) {
      query.city = { $regex: new RegExp(location, "i") };
    }

    if (category) {
      query.category = { $regex: new RegExp(category, "i") };
    }

    const employees = await Employee.find(query);
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllEmployees,
};
