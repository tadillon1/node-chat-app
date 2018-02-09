var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;  //This retruns TRUE if the string passed in is a non empty string
};

module.exports = {isRealString};
