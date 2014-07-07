var TransformStream = require('stream').Transform;
var util = require('util');
var Rx = require('rx');

var FizzBuzzStream = module.exports = function() {
  TransformStream.call(this);
  this._writableState.objectMode = true;
  this._readableState.objectMode = true;
  this.observable = Rx.Observable.fromEvent(this, 'data');
  this.subscribe = this.observable.subscribe.bind(this.observable);
  this.filter = this.observable.filter.bind(this.observable);
  this.merge = this.observable.merge.bind(this.observable);
  this.map = this.observable.map.bind(this.observable);
  this.zip = this.observable.zip.bind(this.observable);
};
util.inherits(FizzBuzzStream, TransformStream);

FizzBuzzStream.prototype._transform = function(chunk, encoding, callback) {
  var i = chunk;
  var result = "";
  if ( i % 3 === 0 ) {
    result += "Fizz";
  }

  if ( i % 5 === 0 ) {
    result += "Buzz";
  }

  if (result !== "") {
    this.push({data: chunk, result: result});
  } else {
    this.push({data: chunk, result: chunk});
  }
  callback();
};



