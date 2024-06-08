const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Please fill a valid date in YYYY-MM-DD format'],
    },
    sex: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    address: {
        type: String,
    },
    contact: {
        phone: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
    },
    emergencyContact: {
        name: String,
        relationship: String,
        phone: String,
    },
    cardNumber: {
        type: String,
    },
    contactPreference: {
        type: String
    },
    treatments: [{
        type: Schema.Types.ObjectId,
        ref: 'Medicine',
        required: false
    }]
});

const medicineSchema = new mongoose.Schema({
    condition: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    dosage: {
        type: String,
        required: true,
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
        type: String,
    },
    endDate: {
        type: String,
    },
    prescribingPhysician: {
        type: String,
    },
    notes: {
        type: String,
    },
});

const Medicine = mongoose.model("Medicine", medicineSchema);
const Patient = mongoose.model("Patient", patientSchema);

module.exports = { Patient, Medicine };
