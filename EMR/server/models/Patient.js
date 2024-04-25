const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    healthCard: Object,
    conditions: [Object]
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
