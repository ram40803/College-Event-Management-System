const CircuitBreaker = require("opossum");

function createBreaker(fn) {
  const options = {
    timeout: 4000,        
    errorThresholdPercentage: 50,  
    resetTimeout: 10000,   // after 10 sec breaker will try again
  };

  return new CircuitBreaker(fn, options);
}

module.exports = createBreaker;
