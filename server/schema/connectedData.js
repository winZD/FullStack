const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConnectedDataSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    connectorProf: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProfessorData",
      },
    ],
    connectorUniv: [{ type: Schema.Types.ObjectId, ref: "UniversityData" }],
  }
  //{ timestamps: true }
);

module.exports = mongoose.model("ConnectedData", ConnectedDataSchema);
