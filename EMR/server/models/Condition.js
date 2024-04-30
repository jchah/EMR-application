const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const medicineSchema = require("./MedecineSchema");

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
        type: [medicineSchema],
    }
});

const Condition = mongoose.model("Condition", conditionSchema);

module.exports = Condition;
