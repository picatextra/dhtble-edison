#!/bin/sh
/usr/sbin/rfkill block wifi
/usr/sbin/rfkill unblock bluetooth
/usr/bin/hciconfig hci0 up
cd /home/root/src/dhtble-edison
node test_ble.js