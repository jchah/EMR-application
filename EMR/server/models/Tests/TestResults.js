const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require('./TestOrder');

const testResultsSchema = new Schema({
    order: {
        type: Order,
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
        },
        required: true
    }
});

const TestResults = mongoose.model("TestReults", testResultsSchema);

module.exports = TestResults;