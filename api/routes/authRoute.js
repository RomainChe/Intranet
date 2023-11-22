const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { firstname, password } = req.body;
  let isAdmin = false;

  try {
    const user = await User.findOne({ firstname });
    const payload = {
      userId: 1234567890
    };

    if (user && bcrypt.compareSync(password, user._doc.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET , {
        algorithm: 'HS256',
      });
      if (user.isAdmin === true) {
        isAdmin = true;
      }

      res.json({ success: true, message: "Login successful", token, isAdmin });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid login credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json("Erreur lors de la déconnexion");
    } else {
      res.status(200).json("Déconnexion réussie");
    }
  });
});

module.exports = router;
