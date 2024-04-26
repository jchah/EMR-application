// Importing Mongoose and the required schemas
const mongoose = require("mongoose");
const healthCardSchema = require("./HealthCard");
const conditionSchema = require("./Condition");

// Define the Patient schema with embedded HealthCard and Conditions
const patientSchema = new mongoose.Schema({
    healthCard: {
        type: healthCardSchema,
        required: true,
    },
    conditions: {
        type: [conditionSchema],
        required: false,
    },
});

// Create the Patient model
const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
