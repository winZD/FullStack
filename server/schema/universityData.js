const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UniversityDataSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    universityName: String,
    department: String,
    courseType: String,

    professor: {
      type: Schema.Types.ObjectId,
      ref: "ProfessorData",
    },
  }
  //{ timestamps: true }
);

module.exports = mongoose.model("UniversityData", UniversityDataSchema);
