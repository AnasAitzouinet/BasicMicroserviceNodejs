// create a model for the user
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    date: {
        type: String,
        default: Date.now(),
    },
});

module.exports = mongoose.model("User", userSchema);
