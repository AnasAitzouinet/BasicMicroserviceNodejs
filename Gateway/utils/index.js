const amqplib = require("amqplib/callback_api");

module.exports.CreateChannel = async (queueName) => {
  const connection = await amqplib.connect("amqp://localhost:5672");
  console.log("Connected to RabbitMQ");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  return channel;
};

module.exports.PublishToQueue = async (channel, queueName, msg) => {
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)));
};

module.exports.ConsumeFromQueue = async (channel, queueName, callback) => {
  await channel.consume(queueName, (msg) => {
    callback(msg);
  });
};

module.exports.CloseChannel = async (channel) => {
  await channel.close();
};
