const mongoose = require("mongoose");
const {methods, statics} = require("./functions");

const roleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

roleSchema.methods = {...methods};
roleSchema.statics = {...statics};

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;