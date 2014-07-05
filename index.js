var Rx = require('rx');
var FizzBuzzStream = require('./fizzbuzzstream');

var f = new FizzBuzzStream();

f.on('data', function() {
  //console.log(arguments);
});

setInterval(function(){
  f.write(Math.floor(Math.random() * 100));
}, 2000);

var source = Rx.Observable.fromEvent(f, 'data');

source
  .filter(function(d) {
    return typeof d.result == 'string';
  })
  .merge(
    source.filter(function(d) {
      return d.result === 'FizzBuzz';
    }),
    source.filter(function(d) {
      return d.result === 'Fizz';
    }),
    source.filter(function(d) {
      return d.result === 'Buzz';
    })
  )
  .map(function(d) {
    return d.data + ':' + d.result;
  })
  .subscribe(function(i) {
    console.log(i);
  },
  function(e) {
    console.log(e);
  });

