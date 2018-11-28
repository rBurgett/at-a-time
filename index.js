/**
 * @param {number} max
 * @param {Function[]} promiseFuncs
 * @returns {Promise<any[]>}
 */
const atATime = (max, promiseFuncs) => new Promise((resolve, reject) => {
  promiseFuncs = [...promiseFuncs];
  const resultsObj = {};
  const promises = [];
  for(let i = 0; i < max; i++) {
    promises.push((async function() {
      while(promiseFuncs.length > 0) {
        const idx = promiseFuncs.length - 1;
        const func = promiseFuncs.pop();
        const res = await func();
        resultsObj[idx] = res;
      }
    })());
  }
  Promise
    .all(promises)
    .then(() => {
      resolve(Object
        .keys(resultsObj)
        .sort((a, b) => {
          a = Number(a);
          b = Number(b);
          return a === b ? 0 : a > b ? 1 : -1;
        })
        .map(key => resultsObj[key])
      );
    })
    .catch(reject);
});

module.exports = atATime;
