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

const getEmployee = async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des détails de l\'employé' });
  }
}

const addEmployee = async (req, res) => {
  try {
    const { firstname, lastname, birthdate, city, country, email } = req.body;

    const newEmployee = new Employee({
      firstname,
      lastname,
      birthdate,
      city,
      country,
      email,
    });

    await newEmployee.save();

    res.status(201).json({ success: true, message: 'Collaborateur ajouté avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
  }
};

const editEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const { firstname, lastname, birthdate, city, country, email } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      {
        $set: {
          firstname,
          lastname,
          birthdate,
          city,
          country,
          email,
          isAdmin,
        },
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: 'Collaborateur non trouvé' });
    }

    res.json({
      success: true,
      message: 'Collaborateur mis à jour avec succès',
      employee: {
        firstname: updatedEmployee.firstname,
        lastname: updatedEmployee.lastname,
        birthdate: updatedEmployee.birthdate,
        city: updatedEmployee.city,
        country: updatedEmployee.country,
        email: updatedEmployee.email,
        isAdmin: updatedEmployee.isAdmin
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ success: false, message: 'Collaborateur non trouvé' });
    }

    res.json({
      success: true,
      message: 'Collaborateur supprimé avec succès',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  deleteEmployee
};
