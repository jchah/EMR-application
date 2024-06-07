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
    conditions: [{
        type: Schema.Types.ObjectId,
        ref: 'Condition',
        required: false
    }]
});

const Patient = mongoose.model("Patient", patientSchema);

const conditionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    dateOfDiagnosis: {
        type: Date,
        required: true,
    },
    treatment: {
        type: Schema.Types.ObjectId,
        ref: 'Medicine'
    }
});

const Condition = mongoose.model("Condition", conditionSchema);

module.exports = { Patient, Condition };
