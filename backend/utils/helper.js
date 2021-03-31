async function getInfoForArray(arr) {
  return Promise.all(arr.map(val => val.getInfo()));
}

module.exports = {
  getInfoForArray
};