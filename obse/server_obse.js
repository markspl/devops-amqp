var amqp = require("amqplib/callback_api");
var fs = require("fs");

amqp.connect("amqp://rabbit", function(error0, connection) {
  if (error0) throw error0;

  connection.createChannel(function(error1, channel) {
    if (error1) throw error1;

    const path = "/output_data/output"

    try{
      if(fs.existsSync(path)){
        fs.unlinkSync(path)
        fs.writeFile(path, "", function(err){
          if(err) throw err;
        });
      }
    } catch(err) console.error(err);

    const exchange = "message";

    channel.assertExchange(exchange, "topic", {
      durable: false
    });

    channel.assertQueue("", {
      exclusive: true
    }, function(error2, q){
      if(error2) throw error2;

      console.log(" [*] Waiting for messages. To exit press CTRL+C");

      // Listen all topics "#"
      channel.bindQueue(q.queue, exchange, "#");

      channel.consume(q.queue, function(msg){
        let now = new Date().toISOString();

        // Construct the message before writing
        let text = now + " Topic: " + msg.fields.routingKey + " " + msg.content.toString();
        console.log(text);

        // WRITE with extra line end
        fs.appendFileSync(path, text + "\n");
      },{
        noAck: true
      });
    });
  });
});
