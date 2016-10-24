var util = require('util');
var exec = require('child_process').exec;
var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var BlenoCharacteristic = bleno.Characteristic;

var BatteryLevelCharacteristic = function () {
  BatteryLevelCharacteristic.super_.call(this, {
    uuid: '2A19',
    properties: ['read']
  });
};

util.inherits(BatteryLevelCharacteristic, BlenoCharacteristic);

BatteryLevelCharacteristic.prototype.onReadRequest = function (offset, callback) {
  console.log('DhtCharacteristic - onReadRequest');

  exec("battery-voltage",function (error, stdout, stderr) {
    //Battery Voltage = 3460 mV
    //Battery level = 5%
    var percent = stdout.split('=')[3].split('%')[0];
    callback(this.RESULT_SUCCESS, new Buffer([percent]));
  });
};

module.exports = BatteryLevelCharacteristic;