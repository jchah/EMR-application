const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    test: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model("Test", orderSchema);

module.exports = Order;