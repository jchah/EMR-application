const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patient:{
        // type: Schema.Types.ObjectId,
        // ref:'Patient', change for later ;)
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    notes:{
        type:String
    },
    cardNum:{
        type: String
    }
})

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
