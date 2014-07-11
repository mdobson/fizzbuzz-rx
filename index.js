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
    //console.log(i);
  },
  function(e) {
    console.log(e);
  });


var g = new FizzBuzzStream();
var source = Rx.Observable.fromEvent(g, 'data');

var streamOne = source.filter(function(d) { return d.result === 'Fizz'; }).map(function(d) { return d.data; });
var streamTwo = source.filter(function(d) { return d.result === 'Buzz'; }).map(function(d) { return d.data; });

var finalSource = Rx.Observable.zip(streamOne, streamTwo, function(one, two) { return arguments; });

function cb(one, two){
  console.log(one, two);
}

finalSource
  .subscribe(function(args) {
    cb.apply(null, Array.prototype.slice.call(args));
  });
  

var h = new FizzBuzzStream();
var source = Rx.Observable.fromEvent(h, 'data');

source
  .map(function(d) {
    console.log('here');
    console.log(d);
    return d;
  })
  .subscribe(function(x) {
    console.log(x);
  });

h.write(3);
