var TransformStream = require('stream').Transform;
var util = require('util');

var FizzBuzzStream = module.exports = function() {
  TransformStream.call(this);
  this._writableState.objectMode = true;
  this._readableState.objectMode = true;
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



