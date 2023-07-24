const User = require("../service/user-service");
const amqp = require("amqplib/callback_api")
module.exports = (app) => {
  const user = new User();
  app.post("/signup", async (req, res) => {
    const { username, password, email, role } = req.body;
    const newUser = await user.SignUp({ username, password, email, role });

    return res.status(201).json(newUser);
  });

  app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await user.SignIn({ email, password });

    // Check if _id is valid
    if (existingUser && existingUser.data.id) {
    
      amqp.connect("amqp://localhost:5672", (err, conn) => {
        if (err) {
          console.error("Error connecting to RabbitMQ:", err);
          return;
        }
        conn.createChannel((err, channel) => {
          if (err) {
            console.error("Error creating channel:", err);
            return;
          }
  
          channel.assertQueue("authBank", { durable: false });
    
          // Convert _id to a Buffer (assuming _id is a string)
          // const user = [
          //   {
          //     id:existingUser.data.id,
          //     email: existingUser.data.email
          //   }
          // ]
          // const userIdBuffer = Buffer.from(JSON.stringify(user));
          const userIdBuffer = Buffer.from(existingUser.data.id);
    
          channel.sendToQueue("authBank", userIdBuffer);
          console.log(" [x] Sent : %s", userIdBuffer);
        });
      });
    } else {
      console.error("Error: existingUser._id is undefined or null.");
    } 

    return res.status(200).json(existingUser);
  });

    app.get("/user/:id", async (req, res) => {
        const { id } = req.params;
        const existingUser = await user.GetUser(id);
        return res.status(200).json(existingUser);
        }
    );
};
