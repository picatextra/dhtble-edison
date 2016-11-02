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
    //var t = parseFloat(ret.t);
    //var h = parseFloat(ret.h);
    console.log("t="+t);
    var buf = new Buffer(16);
    buf.writeInt16(ret.t,0);
    //buf.writeInt16(ret.h,16);
    callback(this.RESULT_SUCCESS, buf);
  }
  else {
    callback(this.RESULT_FAIL);
  }
};

module.exports = TemperatureCharacteristic;