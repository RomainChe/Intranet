const User = require('../models/User');

const getRandomUser = async (req, res) => {
  try {
    const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);

    res.json(randomUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du collaborateur aléatoire' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    console.log(req.session);
    const userId = req.session.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    res.json({
      success: true,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        birthdate: user.birthdate,
        city: user.city,
        country: user.country,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          birthdate: req.body.birthdate,
          city: req.body.city,
          country: req.body.country,
          email: req.body.email,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: {
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        birthdate: updatedUser.birthdate,
        city: updatedUser.city,
        country: updatedUser.country,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { firstname, lastname, birthdate, city, country, email } = req.body;

    const newEmployee = new User({
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

    const updatedEmployee = await User.findByIdAndUpdate(
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

module.exports = { getRandomUser, getUserProfile, updateUserProfile, addEmployee, editEmployee };