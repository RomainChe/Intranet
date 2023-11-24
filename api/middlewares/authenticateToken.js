const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, 'gtest');
    const userId = decodedToken.userId;

    req.user = await User.findById(userId);

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = verifyToken;