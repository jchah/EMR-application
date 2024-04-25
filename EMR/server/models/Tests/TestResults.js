const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testResultsSchema = new Schema({
    orderID: {
        type: String,
        required: true,
    },
    testDate: {
        type: Date,
        required: true,
    },
    results: {
        values: {
            type: Object
        },
        notes: {
            type: String
        }
    }
});

const TestResults = mongoose.model("TestReults", testResultsSchema);

module.exports = TestResults;