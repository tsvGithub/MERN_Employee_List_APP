const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Schema == blueprint that Object has to follow
const EmployeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});
//EmployeeSchema for Schema & Employee for Model (in routes emloyee.js)
module.exports = mongoose.model("Employee", EmployeeSchema);
