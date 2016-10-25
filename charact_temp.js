var util = require('util');
var dht = require('./dht');
var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;

var TemperatureCharacteristic = function () {
  BatteryLevelCharacteristic.super_.call(this, {
    uuid: '2A6E',
    properties: ['read']
  });
};

util.inherits(TemperatureCharacteristic, BlenoCharacteristic);

TemperatureCharacteristic.prototype.onReadRequest = function (offset, callback) {
  if (dht.last().valid) {
    var t = parseFloat(dht.last().t);
    callback(this.RESULT_SUCCESS, new Buffer([t]));
  }
  else {
    callback(this.RESULT_FAIL);
  }
};

module.exports = TemperatureCharacteristic;