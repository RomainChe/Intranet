const bcrypt = require('bcrypt');

const password = 'test';

// Générer un sel et hacher le mot de passe
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      console.error('Erreur lors du hachage du mot de passe :', err);
    } else {
      console.log('Mot de passe haché :', hash);
    }
  });
});