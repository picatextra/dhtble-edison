var util = require('util');
var deasync = require('deasync');
var cp = require('child_process');
var exec = deasync(cp.exec);

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
  var out = exec("battery-voltage");
  //Battery Voltage = 3460 mV
  //Battery level = 5%

  const regex = /([\d]*)%/;

  if ((m = regex.exec(out)) !== null) {
    console.log(m);
    var percent = parseInt(m[1], 10);
    callback(this.RESULT_SUCCESS, new Buffer([percent]));
  }
  else {
    callback(this.RESULT_FAIL);
  }

};

module.exports = BatteryLevelCharacteristic;