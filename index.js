var Permatime = function (root, zone, dateString, timeString, timestampZone, timestamp) {
  this.root = root || "/";
  this.zone = zone || timestampZone;
  this.dateString = dateString || null;
  this.timeString = timeString || null;
  this.timestamp = timestamp || null;
};

var rootMatcher = "(https?://[^/]+/|/)?";
var zoneMatcher = "(.+)";
var dateTimeMatcher = "/(\\d{4}-\\d{2}-\\d{2})/(\\d{2}:\\d{2})";
var timestampMatcher = "(timestamp)/(\\d+)()";
var matcher = new RegExp(rootMatcher + "(?:" + zoneMatcher + dateTimeMatcher + "|" + timestampMatcher + ")");

var parseFunction = function (permatimeString) {
  var parts = matcher.exec(permatimeString);
  return new Permatime(parts[1], parts[2], parts[3], parts[4], parts[5], parts[6]);
};

module.exports = parseFunction;
