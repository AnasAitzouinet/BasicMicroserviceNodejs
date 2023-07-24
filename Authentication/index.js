// Code: Authentication\index.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/Connection");
const user = require("./api/user");

const StartServer = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // connect to database using mongoose and create a connection
  await connectDB();
  user(app);

  // listen to channel bank and check if the message is NewBank then send user id to bank service 


  app.get("/", (req, res) => {
    res.send("Authentication Service is running");
  });
  app.listen(3001, () => {
    console.log("Authentication Service is running on port 3001");
  });
};

StartServer();
