const mongoose = require("mongoose");
const {methods, statics} = require("./functions");

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: v4
    },
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    roleId: {
        type: String,
        required: true,
    },
    locationId: String,
    projectIds: Array,
}, {
    versionKey: false
});

userSchema.methods = {...methods};
userSchema.statics = {...statics};

const User = mongoose.model("User", userSchema);

module.exports = User;