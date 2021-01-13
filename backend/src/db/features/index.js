const mongoose = require("mongoose");
const { v4 } = require("uuid");
const {methods, statics} = require("./functions");

const featureSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    projectId: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

featureSchema.methods = {...methods};
featureSchema.statics = {...statics};

const Feature = mongoose.model("Feature", featureSchema);

module.exports = Feature;