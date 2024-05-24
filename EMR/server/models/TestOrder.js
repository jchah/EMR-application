const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    test: {
        type: String,
        required: true,
    },
    patient: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model("Test", orderSchema);

module.exports = Order;