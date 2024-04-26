const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    patientName:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    notes:{
        type:String
    },
    id:{
        type: Number
    }
})

const appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = appointment;

