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
            validator: (v) => dosagePattern.test(v),
            message: (props) => `${props.value} is not a valid dosage format (e.g., "50mg")`,
        },
    },
    frequency: {
        type: String,
        required: true,
    },
    route: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    prescribingPhysician: {
        type: String,
    },
    notes: {
        type: String,
    },
});

// Create a model from the schema
const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
