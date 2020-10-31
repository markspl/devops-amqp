var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbit', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var exchange = "message";

        channel.assertExchange(exchange, "topic", {
          durable: false
        });

        channel.assertQueue("", {
          exclusive: true
        }, function(error2, q){
          if(error2){
            throw error2;
          }
          console.log(" [*] Waiting for messages. To exit press CTRL+C");

          channel.bindQueue(q.queue, exchange, "#");

          var now = new Date().toISOString();

          channel.consume(q.queue, function(msg){
            console.log("%s Topic: %s: %s",
              now,
              msg.fields.routingKey,
              msg.content.toString()
            );
          },{
            noAck: true
          });
        });
    });
});
