const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, message: "Accès non autorisé" });
  }

  jwt.verify(token, "votre_clé_secrète", (err, user) => {
    if (err) {
      console.error("Erreur de vérification du jeton:", err);
      return res.status(403).json({ success: false, message: "Accès non autorisé" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
