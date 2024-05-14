const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
