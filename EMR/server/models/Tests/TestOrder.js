const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testOrderSchema = new Schema({
    test: {
        type: Object,
        required: true,
    },
    dateOrdered: {
        type: Date,
        required: true,
    },
    results: {
        type: Object
    }
});

const TestOrder = mongoose.model("TestOrder", testOrderSchema);

module.exports = TestOrder;