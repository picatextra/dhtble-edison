var util = require('util');
//var dht = require('./dht');
var dht = require('node-dht-edison');
var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;

var TemperatureCharacteristic = function () {
  TemperatureCharacteristic.super_.call(this, {
    uuid: 'FF01',
    properties: ['read']
  });
};

util.inherits(TemperatureCharacteristic, BlenoCharacteristic);

TemperatureCharacteristic.prototype.onReadRequest = function (offset, callback) {
  var ret=dht.read(31);
    if (ret.valid) {
    var buf = Buffer.alloc(72);
    buf.writeFloatLE(ret.t,0);
    buf.writeFloatLE(ret.h,32);
    buf.writeUInt8(,64)
    callback(this.RESULT_SUCCESS, buf);
  }
  else {
    callback(this.RESULT_FAIL);
  }
};

module.exports = TemperatureCharacteristic;