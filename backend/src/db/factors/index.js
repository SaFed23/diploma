const mongoose = require("mongoose");
const { v4 } = require("uuid");
const {methods, statics} = require("./functions");

const factorSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    title: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

factorSchema.methods = {...methods};
factorSchema.statics = {...statics};

const Factor = mongoose.model("Factor", factorSchema);

module.exports = Factor;