const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
      gender: {
        type: String,
      },
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
      },
      birthdate: {
        type: Date,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      photo: {
        type: String,
      },
      category: {
        type: String,
      },
      isAdmin: {
        type: Boolean,
      },
    });

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.statics.findByToken = function (token) {
  const User = this;

  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      User.findOne({ _id: decoded.userId }, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
