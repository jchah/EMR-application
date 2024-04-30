const mongoose = require("mongoose");
const Patient = require("Patient")
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patient:{
        type: Patient,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    notes:{
        type:String
    },
})

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
