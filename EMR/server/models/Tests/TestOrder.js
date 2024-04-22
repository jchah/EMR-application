const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TestResults = require('./TestResults')

const testOrderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    dateOrdered: {
        type: Date,
        required: true,
    },
    results: {
        type: TestResults
    }
});

const TestOrder = mongoose.model("Test", testOrderSchema);

module.exports = TestOrder;