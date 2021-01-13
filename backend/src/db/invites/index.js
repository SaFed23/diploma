const mongoose = require("mongoose");
const {methods, statics} = require("./functions");

const inviteSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
    },
}, {
    versionKey: false
});

inviteSchema.methods = {...methods};
inviteSchema.statics = {...statics};

const Invite = mongoose.model("Invite", inviteSchema);

module.exports = Invite;