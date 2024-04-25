const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conditionSchema = require("./Condition");
const healthCardSchema = require("./HealthCard");

const patientSchema = new Schema({
    healthCard: healthCardSchema,
    conditions: [conditionSchema]
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
