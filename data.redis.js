// data.redis.js
var fs            = require('fs');
var microtime     = require('microtime');
var redis         = require('redis');
var redisWStream  = require('redis-wstream');

var client        = redis.createClient();

exports.register = function () {
  this.register_hook('queue', 'data_redis');
}

exports.data_redis = function (next, connection) {
  var transaction   = connection.transaction;
  var timestamp     = microtime.now();
  var redisKey      = transaction.uuid + "|" + timestamp;

  transaction.message_stream.pipe(redisWStream(client, redisKey), { line_endings: '\n' });
};
