const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chartEntrySchema = new Schema({
    dateOfVisit: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    },
    actions: {
        type: String
    }
});

const ChartEntry = mongoose.model("Condition", chartEntrySchema);

module.exports = ChartEntry;