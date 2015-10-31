var test = require('tape');
var parse = require('../index.js');

test('minimal datetime with host', function (t) {
  var permatime = parse("http://permatime.com/Europe/Berlin/1989-11-09/00:01");
  t.equal(permatime.root, "http://permatime.com/");
  t.equal(permatime.zone, "Europe/Berlin");
  t.equal(permatime.dateString, "1989-11-09");
  t.equal(permatime.timeString, "00:01");
  t.end();
});

test('minimal datetime without host', function (t) {
  var permatime = parse("/Europe/Berlin/1989-11-09/00:01");
  t.equal(permatime.root, "/");
  t.equal(permatime.zone, "Europe/Berlin");
  t.equal(permatime.dateString, "1989-11-09");
  t.equal(permatime.timeString, "00:01");
  t.equal(permatime.timestamp, null);
  t.end();
});

test('minimal datetime with bare root', function (t) {
  var permatime = parse("Europe/Berlin/1989-11-09/00:01");
  t.equal(permatime.root, "/");
  t.equal(permatime.zone, "Europe/Berlin");
  t.equal(permatime.dateString, "1989-11-09");
  t.equal(permatime.timeString, "00:01");
  t.equal(permatime.timestamp, null);
  t.end();
});

test('minimal timestamp', function (t) {
  var permatime = parse("timestamp/1226183760");
  t.equal(permatime.root, "/");
  t.equal(permatime.zone, "timestamp");
  t.equal(permatime.dateString, null);
  t.equal(permatime.timeString, null);
  t.equal(permatime.timestamp, "1226183760");
  t.end();
});

test.skip("finds optional label");
test.skip("finds optional link");
test.skip("finds optional label and optional link");

test.skip("finds optional link even with other unsupported parameters");

test.skip("won't match with rubbish before root");
