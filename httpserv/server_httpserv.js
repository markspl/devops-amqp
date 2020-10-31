var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res){
  fs.readFile("/output_data/output", (err, data) =>{
    if (err) throw err;

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write(data);
    res.end();
  })
});

server.listen(8080);

console.log("Server running!");
