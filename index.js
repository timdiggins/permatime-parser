try {
  var moment = require('moment-timezone');
} catch(e){
  var moment = null;
}

var Permatime = function (parts) {
  //root, zone, date, time, timestamp
  this.root = parts.root || "/";
  this.zone = parts.zone || null;
  this.date = parts.date || null;
  this.time = parts.time || null;
  this.timestamp = parts.timestamp || null;
  this.label = parts.label || null;
  this.link = parts.link || null;
};

Permatime.prototype.moment = function(){
  if (!moment){throw "moment/moment-timezone is not installed";}
  if(this.timestamp) {
    return moment.unix(parseInt(this.timestamp));
  } else {
    return moment.tz(this.date + " "+ this.time, this.zone);
  }
};

var root = "^(https?://[^/]+/|/)?";
var zone = "((?:[^/]+/)*[^/]+)";
var dateTime = "/(\\d{4}-\\d{2}-\\d{2})/(\\d{2}:\\d{2})";
var timestamp = "(timestamp)/(\\d+)()";
var label = "(?:/([^/?]+))?";
var link = "(?:.*[?&]link=([^&]+))?";
var zMatcher = new RegExp(root + zone + dateTime + label + link);
var tsMatcher = new RegExp(root + timestamp + label + link);

var parseFunction = function (permatimeString) {
  var parts = zMatcher.exec(permatimeString);
  if(parts) {
    return new Permatime({root: parts[1], zone: parts[2], date: parts[3], time: parts[4], label: parts[5], link: parts[6]});
  }
  parts = tsMatcher.exec(permatimeString);
  if (parts) {
    return new Permatime({root: parts[1], timestamp: parts[3], label: parts[5], link: parts[6]});
  }
  return null;
};

module.exports = {parse: parseFunction, Permatime: Permatime};
