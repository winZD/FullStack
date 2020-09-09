const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "../schoolbox.db",
  },
  useNullAsDefault: false,
});
let server_secret = "this is extremely secret!";

passport.use(
  new LocalStrategy(function (email, password, done) {
    return knex("register_users")
      .where({ email: email })
      .select()
      .then((user) => {
        if (user.length === 0) done(null, false, { message: "No user" });
        if (user.length === 1) {
          console.log(email);
          bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) console.log(err);

            if (result) {
              const token = jwt.sign({ user }, server_secret);
              console.log(("null", user, token));
              return done(null, user, token);
            } else {
              done(null, false, { message: "Password incorrect" });
            }
          });
        }
      })
      .catch((err) => console.log(err));
  })
);

passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  knex("register_users")
    .select()
    .where(` ${id}`, `=`, `users_id `, function (err, row) {
      return done(null, row);
    });
});

// ...

module.exports = {
  passport: passport,
  check: expressJwt({ secret: server_secret }),
  generateToken(user) {
    return jwt.sign(
      {
        user: user,
      },
      server_secret,
      {
        expiresIn: 120 * 60,
      }
    );
  },
};
