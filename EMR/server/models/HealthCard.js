const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const healthCardSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
        match: [/^\d{4}-\d{2}-\d{2}$/, 'Please fill a valid date in YYYY-MM-DD format'],
    },
    sex: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    address: {
        type: String,
    },
    contact: {
        phone: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
    },
    emergencyContact: {
        name: String,
        relationship: String,
        phone: String,
    },
    cardNumber: {
        type: String,
    }
});

const HealthCard = mongoose.model("HealthCard", healthCardSchema);

module.exports = HealthCard;
