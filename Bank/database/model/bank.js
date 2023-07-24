// create a model for the database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bankSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }

});
const BankModel = mongoose.model("bank", bankSchema);
module.exports = BankModel;