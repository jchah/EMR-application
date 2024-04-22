const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conditionSchema = require("EMR/server/models/Condition");
const healthCardSchema = require("EMR/server/models/HealthCard");

const patientSchema = new Schema({
    healthCard: healthCardSchema,
    conditions: [conditionSchema],
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
