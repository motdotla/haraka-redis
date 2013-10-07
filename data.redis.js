// data.redis.js
var fs            = require('fs');
var microtime     = require('microtime');
var redis         = require('redis');
var redisWStream  = require('redis-wstream');

var client        = redis.createClient();

exports.register = function () {
  this.register_hook('rcpt', 'solve_550_error');
  this.register_hook('queue', 'data_redis');
}

exports.data_redis = function (next, connection) {
  var transaction   = connection.transaction;
  var timestamp     = microtime.now();
  var redisKey      = timestamp + "|" + transaction.uuid;

  transaction.message_stream.pipe(redisWStream(client, redisKey));
};

/**
 ** Let's pretend we can deliver mail to these recipients.
 ** Solves: "550 I cannot deliver mail for {user@domain}"
 **/
exports.solve_550_error = function(next, connection) {
  return next(OK);
}
