const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dosagePattern = /^\d+mg$/;

const medicineSchema = new mongoose.Schema({
    condition: {
        type: Schema.Types.ObjectId,
        ref: 'Condition'
    },
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

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
