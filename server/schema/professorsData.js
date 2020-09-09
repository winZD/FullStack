const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfessorDataSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    status: String,
    university: {
      type: Schema.Types.ObjectId,
      ref: "UniversityData",
    },
  }
  //{ timestamps: true }
);

module.exports = mongoose.model("ProfessorData", ProfessorDataSchema);
