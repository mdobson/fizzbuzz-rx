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
  }, 500);
});
var ends = Rx.Observable.create(function(observer) {
  var a = [1, 2, 3];
  a.forEach(function(i) {
    observer.onNext(i);
  });
  observer.onCompleted();
});

var source = Rx.Observable.merge(fizzbuzz, generic, created, ends);

var sub = source.subscribe(function(x) {
  console.log(x);
});

f.write(3);
e.emit('test', 5);


