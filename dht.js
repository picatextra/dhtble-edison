var dht = require('node-dht-edison');

var last = dht.read(31);

module.exports = last;