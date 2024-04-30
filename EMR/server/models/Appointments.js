const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const patientSchema = require("EMR/models/Patient");

const patientSchema = new Schema({
    patient: patientSchema,
    startTime: {
        type: Number
    },
    endTime: {
        type : Number
    } 
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
