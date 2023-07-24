// connect to database using mongoose and create a connection
"use strict"
const mongoose = require("mongoose");
module.exports   = async() => {
  mongoose.set('strictQuery', false);

  mongoose.connect("mongodb+srv://anas:123@cluster0.slvhdp5.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection
    .once("open", () => {
      console.log("Database connected successfully");
    })
    .on("error", (err) => {
      console.log("Error", err);
    });
};


