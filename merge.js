var Rx = require('rx');
var FizzBuzzStream = require('./fizzbuzzstream');
var EventEmitter = require('events').EventEmitter;

var e = new EventEmitter();
var f = new FizzBuzzStream();

var fizzbuzz = Rx.Observable.fromEvent(f, 'data');
var generic = Rx.Observable.fromEvent(e, 'test');
var created = Rx.Observable.create(function(observer) {
  setInterval(function() {
    observer.onNext(42);
  }, 2000);
});


var source = Rx.Observable.merge(fizzbuzz, generic, created);

var sub = source.subscribe(function(x) {
  console.log(x);
});

f.write(3);
e.emit('test', 5);


