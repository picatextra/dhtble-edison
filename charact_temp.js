var util = require('util');
//var dht = require('./dht');
var dht = require('node-dht-edison');
var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;

var TemperatureCharacteristic = function () {
  TemperatureCharacteristic.super_.call(this, {
    uuid: '2A6E',
    properties: ['read']
  });
};

util.inherits(TemperatureCharacteristic, BlenoCharacteristic);

TemperatureCharacteristic.prototype.onReadRequest = function (offset, callback) {
  var ret=dht.read(31);
  if (ret.valid) {
    var t = parseFloat(ret.t);
    console.log("t="+t);
    callback(this.RESULT_SUCCESS, new Buffer([t]));
  }
  else {
    callback(this.RESULT_FAIL);
  }
};

module.exports = TemperatureCharacteristic;