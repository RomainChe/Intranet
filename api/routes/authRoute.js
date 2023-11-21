const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { firstname, password } = req.body;
  
    try {
      const user = await User.findOne({ firstname });
  
      if (user && bcrypt.compareSync(password, user._doc.password)) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid login credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

module.exports = router;
