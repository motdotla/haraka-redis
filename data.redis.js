// data.redis.js
var microtime = require('microtime');
var redis     = require("redis");
var client    = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

exports.hook_queue = function (next, connection) {
  var transaction     = connection.transaction;
  var receivedDate  = transaction.header.headers.date;
  var subjectLine   = transaction.header.headers.subject;
  var message       = transaction.data_lines;
  var timestamp     = microtime.now();
  var redisKey        = recipient + "|" + timestamp;

  client.set(redisKey, message, redis.print);
  // passes control over to the next plugin within Haraka.                                                                                                       
  next();
}
