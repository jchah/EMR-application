const mongoose = require("mongoose");

const dosagePattern = /^\d+mg$/;

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dosage: {
        type: String,
        required: true,
        validate: {
            validator: (v) => dosagePattern.test(v), // Ensure dosage matches the pattern
            message: (props) => `${props.value} is not a valid dosage format (e.g., "50mg")`,
        },
    },
    frequency: {
        type: String, // Frequency of administration (e.g., "Once a day")
        required: true,
    },
    route: {
        type: String, // Route of administration (e.g., "Oral", "Intravenous")
        required: true,
    },
    startDate: {
        type: Date, // When the medication was prescribed
    },
    endDate: {
        type: Date, // If there's a defined end date for the medication
    },
    prescribingPhysician: {
        type: String, // Name of the prescribing doctor
    },
    notes: {
        type: String, // Additional information or special instructions
    },
});

// Create a model from the schema
const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
