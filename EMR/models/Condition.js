const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
        type: String,
        dosage: String,
        frequency: String
    }
});

const Condition = mongoose.model("Condition", conditionSchema);

module.exports = Condition;
