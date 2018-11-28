/* global describe, it */

require('should');
const atATime = require('./');

describe('at-a-time', function() {

  this.timeout(5000);

  // max operations to run at a time
  const maxSimultaneousOperations = 20;

  // create an array of Promise-returning functions that will each resolve after different amounts of time
  const funcs = [];
  const totalOperations = 200;
  for(let i = 0; i < totalOperations; i++) {
    const timeout = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    funcs.push(() => new Promise(resolve => setTimeout(() => resolve(i), timeout)));
  }

  it('should return a promise', () => {
    atATime(maxSimultaneousOperations, []).should.be.a.Promise();
  });

  it('should process an array of Promise-returning functions and resolve with the results in the original order', async function() {
    const res = await atATime(maxSimultaneousOperations, funcs);
    res.should.be.an.Array();
    res.length.should.equal(totalOperations);
    res[0].should.equal(0);
    res[totalOperations - 1].should.equal(totalOperations - 1);
  });

});
