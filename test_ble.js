var bleno = require('bleno');
var dht = require('node-dht-edison');



var BlenoPrimaryService = bleno.PrimaryService;
var DhtCharacteristic = require('./characteristic');
var myuuid = '9638690c99bc11e69f33a24fc0d9649c';

console.log('bleno - echo');

bleno.on('stateChange', function (state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('dht', [myuuid]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function (error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: myuuid,
        characteristics: [new DhtCharacteristic()]
      })
    ]);
  }
});

var util = require('util');
var BlenoCharacteristic = bleno.Characteristic;
var DhtCharacteristic = function () {
  DhtCharacteristic.super_.call(this, {
    uuid: myuuid,
    properties: ['read'],
    descriptors: [new Descriptor({
      uuid: '7aa116c4',
      value: 'Battery level in %'
    }),
    new Descriptor({
      uuid: '7aa11a98',
      value: "Temperature in C"
    }),
    new Descriptor({
      uuid: '7aa11cc8',
      value: "Humidity in %"
    })]
  });

  this._value = new Buffer(0);
  this._updateValueCallback = null;
};

util.inherits(DhtCharacteristic, BlenoCharacteristic);

DhtCharacteristic.prototype.onReadRequest = function (offset, callback) {
  console.log('DhtCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));

  var ret = dht.read(31);

  if (ret.valid) {
    console.log('T=' + ret.t + " H=" + ret.h);
    callback(this.RESULT_SUCCESS, new Buffer([100, ret.t, ret.h]));
  }
  else {
    console.log('error');
    callback(this.RESULT_SUCCESS, new Buffer(['error']));
  }
};
/*
DhtCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  this._value = data;
  console.log('DhtCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));

  if (this._updateValueCallback) {
    console.log('DhtCharacteristic - onWriteRequest: notifying');
    this._updateValueCallback(this._value);
  }

  callback(this.RESULT_SUCCESS);
};

DhtCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('DhtCharacteristic - onSubscribe');
  this._updateValueCallback = updateValueCallback;
};

DhtCharacteristic.prototype.onUnsubscribe = function() {
  console.log('DhtCharacteristic - onUnsubscribe');
  this._updateValueCallback = null;
};

*/