// Code: Authentication\index.js
const express = require("express");
const cors = require("cors");
const Bank = require("./api/bank-api");
const { connectDB } = require("./database");
const ampq = require("amqplib/callback_api");
const StartServer = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  connectDB();
  Bank(app);

  app.get("/", (req, res) => {
    res.send("bank Service is running");
  });

  app.listen(3002, () => {
    console.log("bank Service is running on port 3002");
    ampq.connect("amqp://localhost:5672", (err, conn) => {
      conn.createChannel((err, channel) => {
        channel.assertQueue("Gateway", { durable: true });
        channel.sendToQueue("Gateway", Buffer.from("bank service is running"));
      });
    });
  });
  app.on("Error", (err) => {
    console.error(err);
    // send error message to queue
    ampq.connect("amqp://localhost:5672", (err, conn) => {
      conn.createChannel((err, channel) => {
        channel.assertQueue("Gateway", { durable: true });
        channel.sendToQueue(
          "Gateway",
          Buffer.from(`Bank Server error: ${err.message}`)
        );
      });
    });
  });
};

StartServer();
