var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;
var BatteryLevelCharacteristic = require('./charact_battery');
var TemperatureCharacteristic = require('./charact_temp')
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
        characteristics: [
          new BatteryLevelCharacteristic(),
          new TemperatureCharacteristic()
        ]
      })
    ]);
  }
});

