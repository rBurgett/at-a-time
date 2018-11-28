# at-a-time
`at-a-time` allows you to do asynchronous operations simultaneously but with a max number of operations going at any one time.
## Why?
`Promise.all()` allows you to simultaneously do asynchronous operations and a `for` loop in an async function allows you to sequentially do asynchronous operations. But, sometimes you have more operations than you can handle at once and it would take too long to handle them sequentially. `at-a-time` allows you to do do asynchronous operations simultaneously but with a max number of operations going at any one time.

## Installation
```
$ npm install at-a-time
```

## Usage
```js
// import library
const atATime = require('at-a-time');

const endpoints = [
  'https://api.something.com/12345',
  'https://api.something.com/23451',
  'https://api.something.com/34512',
  'https://api.something.com/45123',
  'https://api.something.com/51234',
  'https://api.something.com/23456',
  'https://api.something.com/62345',
  'https://api.something.com/56234',
  'https://api.something.com/45623',
  'https://api.something.com/34562'
];

// create an array of Promise-returning functions
const operations = endpoints
  .map(e => () => request.get(e));

// Work through the operations keeping two
// simultaneous operations going at a time.

// Usage with manual Promise handling
atATime(2, operations)
  .then(res => {
    console.log(res); // array of responses in order
  })
  .catch(err => {
    // handle error
  });

// Usage within an sync function
async function() {
  try {
    const res = await atATime(2, operations);
    console.log(res); // array of responses in order
  } catch(err) {
    // handle error
  }
};

// Usage within a generator function
co(function*() {
  try {
    const res = yield atATime(2, operations);
    console.log(res); // array of responses in order
  } catch(err) {
    // handle error
  }
});
```

## Running Tests
```
$ npm install
$ npm test
```

## License
Apache License Version 2.0
