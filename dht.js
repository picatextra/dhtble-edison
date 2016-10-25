var dht = require('node-dht-edison');

var _lastread=null;
var _lasttime=new Date();

var last = function() {
    if((_lasttime-new Date())>2000 && _lastread!=null) {    
        _lastread=dht.read(31);
    }
    
    return _lastread;
}

module.exports = last;