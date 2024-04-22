const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conditionSchema = require("EMR/models/Condition");
const healthCardSchema = require("EMR/models/HealthCard");
const chartEntrySchema = require("./ChartEntry");

const patientSchema = new Schema({
    healthCard: healthCardSchema,
    conditions: [conditionSchema],
    chart: [chartEntrySchema]
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
