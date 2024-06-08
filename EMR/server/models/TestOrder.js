const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    test: {
        type: Schema.Types.ObjectId,
        ref: 'Test',
        required: true,
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model("TestOrder", orderSchema);

module.exports = Order;