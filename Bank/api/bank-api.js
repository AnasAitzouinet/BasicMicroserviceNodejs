const BankService = require("../services/Bank-service");
const amqp = require("amqplib/callback_api");

module.exports = (app) => {
  const bankService = new BankService();

  app.post("/newBank", async (req, res) => {
    const { name, accountNumber, balance } = req.body;
    let userId;
    const conn = amqp.connect("amqp://localhost:5672", (err, conn) => {
      conn.createChannel((err, channel) => {
        channel.assertQueue("authBank", { durable: false });
        channel.consume(
          "authBank",
          (msg) => {
            userId = msg.content.toString();
            console.log("from the func",userId);
          },
          { noAck: true }
        )
      });
    }
    );
})
  app.post("/NewBank", async (req, res) => {
    const { name, accountNumber, balance } = req.body;
    let userId;
    console.log("working");
    amqp.connect("amqp://localhost:5672", function (error0, connection) {
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var queue = "authBank";
  
        channel.assertQueue(queue, {
          durable: false,
        });
  
        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          queue
        );
          
        channel.consume(
          queue,
         async function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            const data = msg.content.toString();
            userId = data;
              if (!userId) {
              return res
                .status(400)
                .json({ message: "You must be logged in to create a bank account" });
            } else {
              const newBank = await bankService.CreateBank({
                name,
                accountNumber,
                balance,
                userId,
              });
              // const sid = bankService.SaveUserId(userId)
              // console.log(sid)
              return res.status(201).json(newBank);
            }
          },
          {
            noAck: true,
          }
        );
      });
    });
    // return res.status(201).json(newBank);
  });
  
  app.get("/test-error", (req, res) => {
    throw new Error("Test error");
  });

  app.get("/GetBankById/:id", async (req, res) => {
    const { id } = req.params;
    const existingBank = await bankService.GetBankById(id);
    return res.status(200).json(existingBank);
  });

  app.get("/GetBalanceById/:id", async (req, res) => {
    const { id } = req.params;
    const bankService = new BankService();
    const existingBank = await bankService.GetBalanceById(id);
    return res.status(200).json(existingBank);
  });

  app.get("/getBankUserByAccountNumber/:accountNumber", async (req, res) => {
    const { accountNumber } = req.params;
    const bankService = new BankService();
    const existingBank = await bankService.getBankUserByAccountNumber(
      accountNumber
    );
    return res.status(200).json(existingBank);
  });
};
