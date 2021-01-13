const mongoose = require("mongoose");
const {methods, statics} = require("./functions");

const locationSchema = new mongoose.Schema({
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

locationSchema.methods = {...methods};
locationSchema.statics = {...statics};

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;