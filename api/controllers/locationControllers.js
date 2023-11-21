// locationController.js
const User = require('../models/User');

const getAllLocations = async (req, res) => {
  try {
    const locations = await User.distinct('city');
    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllLocations,
};
