// Importing Mongoose and the required schemas
const mongoose = require("mongoose");
const healthCardSchema = require("./HealthCard");
const conditionSchema = require("./Condition");
const Schema = mongoose.Schema;

// Define the Patient schema with embedded HealthCard and Conditions
const patientSchema = new Schema({
    healthCard: {
        type: Schema.Types.ObjectId,
        ref: 'healthCardSchema',
        required: true,
    },
    conditions: {
        type: Schema.Types.ObjectId,
        ref:'conditionSchema',
        required: false,
    },
});

// Create the Patient model
const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
