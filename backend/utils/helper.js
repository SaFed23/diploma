async function getInfoForArray(arr) {
  return Promise.all(arr.map(val => val.getInfo()));
};

const getDate = (date) => {
  const offset = date.getTimezoneOffset();
  const newDate = new Date(date.getTime() - offset * 60 * 1000);
  return newDate.toISOString().split("T")[0];
};

module.exports = {
  getInfoForArray,
  getDate,
};