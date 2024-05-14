const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultsSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        required: true
    },
    testDate: {
        type: Date,
        required: true
    },
    results: {
        type: Object,
        required: true
    },
    comments: String
});

const Results = mongoose.model("TestResults", resultsSchema);

module.exports = Results;