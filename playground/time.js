// 0 = Jan 1, 1970 00:00:00 am

var moment = require('moment');


var someTimestamp = moment().valueOf();
console.log(someTimestamp);

createdAt = 1234;
var date = moment(createdAt);  // Creates a new object for the current time


//console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));