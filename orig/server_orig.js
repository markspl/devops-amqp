var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbit', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var msg = 'THIS IS FROM ORIG!';

        var exchange = "message";

        channel.assertExchange(exchange, "topic", {
          durable: false
        });

        channel.publish(exchange, "my.o", Buffer.from(msg));
        console.log("[x] Sent!");
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
