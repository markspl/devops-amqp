var amqp = require("amqplib/callback_api");

amqp.connect("amqp://rabbit", function(error0, connection) {
  if (error0) throw error0;

  connection.createChannel(function(error1, channel) {
    if (error1) throw error1;

    const exchange = "message";
    const topic = "my.o";

    channel.assertExchange(exchange, "topic", {
      durable: false
    });

    // Send 1st message
    let msg = "MSG_1";
    channel.publish(exchange, topic, Buffer.from(msg));
    console.log("[x] Sent %s!", msg);

    // Send 2nd message after 3 seconds
    setTimeout(function() {
      msg = "MSG_2";
      channel.publish(exchange, topic, Buffer.from(msg));
      console.log("[x] Sent %s!", msg);
    },3000);

    // Send 3rd message after 6 seconds
    setTimeout(function() {
      msg = "MSG_3";
      channel.publish(exchange, topic, Buffer.from(msg));
      console.log("[x] Sent %s!", msg);
    },6000);
  });

  // Exit process after successful work (10 seconds)
  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 10000);
});
