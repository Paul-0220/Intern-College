const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    //unique: true,
    required: true,
    lowercase: true,
  },
  mobile: {
    type: Number,
    //unique: true,
    required: true,
  },
  collegeId: {
    type: ObjectId,
    ref: "College",
  },
});

module.exports = mongoose.model("pintern", internSchema);
