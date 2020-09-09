const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    id: Number,
    firstNameLastName: String,
    hour: String,
    department: String,
    classroom: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Data", DataSchema);
/*
// initialize an instance of Sequelize
const sequelize = new Sequelize({
  database: "./schoolbox.db",
  username: "",
  password: "",
  dialect: "sqlite",
});

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));
const User = sequelize.define(
  "user",
  {
    // attributes
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: Sequelize.STRING,
      unique:true
      // allowNull defaults to true
    },
  },
  {
    // options
  }
);
*/
