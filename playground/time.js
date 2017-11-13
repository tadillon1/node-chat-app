//Jan 1, 1970 00:00:00 am UTC UNIX Epoch
//each integer is MS
// 1000 equates to 1 second, 10,000 = 10 second
var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt = 1234;
var date = moment(createdAt);
// date.add(100, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'));
