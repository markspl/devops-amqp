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

        var msg = "MSG_1";
        channel.publish(exchange, "my.o", Buffer.from(msg));
        console.log("[x] Sent %s!", msg);

        setTimeout(function() {
          var msg = "MSG_2";
          channel.publish(exchange, "my.o", Buffer.from(msg));
          console.log("[x] Sent %s!", msg);
        },3000);

        setTimeout(function() {
          var msg = "MSG_3";
          channel.publish(exchange, "my.o", Buffer.from(msg));
          console.log("[x] Sent %s!", msg);
        },6000);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 10000);
});
