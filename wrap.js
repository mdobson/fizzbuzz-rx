var FizzBuzzStream = require('./fizzbuzzstream');

var f = new FizzBuzzStream();


f
  .filter(function(d) {
    return d.result == 'Fizz';
  })
  .merge(
    f.filter(function(d) {
      return d.result == 'Buzz';
    })
  )
  .map(function(d) {
    return d.result;
  })
  .subscribe(function(d) { 
    console.log(d); 
  });

f.write(3);
f.write(5);
