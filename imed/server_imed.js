var amqp = require("amqplib/callback_api");

amqp.connect("amqp://rabbit", function(error0, connection) {
  if (error0) throw error0;

  connection.createChannel(function(error1, channel) {
    if (error1) throw error1;

    const exchange = "message";

    channel.assertExchange(exchange, "topic", {
      durable: false
    });

    channel.assertQueue("", {
      exclusive: true
    }, function(error2, q){
      if(error2) throw error2;

      console.log(" [*] Waiting for messages in. To exit press CTRL+C");

      // Picking specific topic where to send the message
      channel.bindQueue(q.queue, exchange, "my.o");

      channel.consume(q.queue, function(msg){
        console.log(" [x] %s", msg.content.toString());

        // Construct message before sending
        let message = "Got " + msg.content.toString();

        // Send message after after one second wait.
        setTimeout(function(){
          channel.publish(exchange, "my.i", Buffer.from(message));
        }, 1000);

        console.log(" [x] Sent %s!", message);
      },{
        noAck: true
      });
    });
  });
});
