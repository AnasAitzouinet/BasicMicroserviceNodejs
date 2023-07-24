const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const ampq = require("amqplib/callback_api");
const app = express();

app.use(cors());
app.use(express.json());

// app.use("/customer", proxy("http://localhost:8001"));
app.use("/bank", proxy("http://localhost:3002"));
app.use("/", proxy("http://localhost:3001")); // products

ampq.connect("amqp://localhost:5672", (err, conn) => {
  conn.createChannel((err, channel) => {
    channel.assertQueue("Gateway", { durable: true });
    channel.consume("Gateway", (msg) => {
      // get rid of the repteated messages from the queue by acking them
      channel.ack(msg);
      console.log(msg.content.toString());
    });
  });
});

app.listen(8000, () => {
  console.log("Gateway is Listening to Port 8000");
});
