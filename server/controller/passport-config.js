const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../schoolbox.db",
  define: {
    timestamps: false,
  },
});

const User = sequelize.define("register_users", {
  // Model attributes are defined here
  users_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user
      User.findOne({ email: email })
        .then((user) => {
          if (!user)
            return done(null, false, {
              message: "That email is not registered",
            });
          //match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, user);
            } else {
              done(null, false, { msg: "password incorrect" });
            }
          });
        })
        .catch((err) => console.log(err));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findByPk(id, function (err, user) {
      done(err, user);
    });
  });
};
