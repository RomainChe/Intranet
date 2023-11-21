const User = require('../models/User');

exports.getRandomUser = async (req, res) => {
  try {
    const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);

    res.json(randomUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération du collaborateur aléatoire' });
  }
};
