const mongoose = require("mongoose");
const Patient = require("Patient")
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
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

const appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = appointment;
