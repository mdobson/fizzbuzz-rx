var Rx = require('rx');
var FizzBuzzStream = require('./fizzbuzzstream');

var f = new FizzBuzzStream();

f.on('data', function() {
  //console.log(arguments);
});

setInterval(function(){
  f.write(Math.floor(Math.random() * 100));
  //f.write(15);
}, 2000);

var source = Rx.Observable.fromEvent(f, 'data');

source
  .filter(function(d) {
    return typeof d.result == 'string';
  })
  .filter(function(d) {
    return d.result === 'FizzBuzz';
  })
  .map(function(d) {
    return d.data;
  })
  .subscribe(function(i) {
    console.log('FizzBuzz:'+i);
  },
  function(e) {
    console.log(e);
  });

