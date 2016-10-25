var dht = require('node-dht-edison');

var last = dht.Read(31);

module.exports = last;