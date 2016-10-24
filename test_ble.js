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
        characteristics: [new BatteryLevelCharacteristic()]
      })
    ]);
  }
});

