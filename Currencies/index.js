const express = require('express');
const amqp = require('amqplib/callback_api');

const app = express();


app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Currencies Service");
    });



// receive message from Authentication queue using binded exchange
// amqp.connect('amqp://localhost:5672', (err, connection) => {
//     if (err) {
//         throw err;
//     }
//     connection.createChannel((err, channel) => {
//         if (err) {
//             throw err;
//         }
//         const QUEUE = 'test1';
//         const EXCHANGE = 'test1';

//         channel.assertExchange(EXCHANGE, 'direct', {

//             durable: true
//         });
//         channel.assertQueue(QUEUE);

//         channel.bindQueue(QUEUE, EXCHANGE, 'test1');

//         channel.consume(QUEUE, (message) => {
//             console.log(`Message received: ${message.content.toString()}`);
//         }, {
//             noAck: true
//         });
//     });

// });



app.listen(3002, () => {
    console.log("Currencies Service is Listening to Port 3002");
}
);