// const bcrypt = require('bcrypt');

// const password = 'test';

// // Générer un sel et hacher le mot de passe
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     if (err) {
//       console.error('Erreur lors du hachage du mot de passe :', err);
//     } else {
//       console.log('Mot de passe haché :', hash);
//     }
//   });
// });

const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key';

const payload = {
  userId: 1234567890,
  expirationTime: Date.now() + 1000 * 60 * 60 * 24,
};

const token = jwt.sign(payload, secretKey, {
  algorithm: 'HS256',
});


try {
  const decodedToken = jwt.verify(token, secretKey);

  const currentTime = Date.now();
  const expirationTime = decodedToken.exp * 1000;

  if (currentTime > expirationTime) {
    console.error('Token has expired');
  } else {
    console.log(decodedToken);
    console.log('Token is valid');
  }
} catch (error) {
  console.error('Invalid token:', error);
}