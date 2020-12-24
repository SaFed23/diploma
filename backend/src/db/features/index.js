const mongoose = require("mongoose");
const {methods, statics} = require("./functions");

const featureSchema = new mongoose.Schema({
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