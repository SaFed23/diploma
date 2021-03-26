const mongoose = require("mongoose");
const { v4 } = require("uuid");
const crypto = require('crypto');
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
    salt: String,
}, {
    versionKey: false
});

userSchema.methods = {...methods};
userSchema.statics = {...statics};

userSchema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function () {
        return this._plainPassword;
    });

const User = mongoose.model("User", userSchema);

module.exports = User;