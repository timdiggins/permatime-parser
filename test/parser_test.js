var test = require('tape');
var permatime = require('../index.js');
var parse = permatime.parse;

test('minimal datetime with host', function (t) {
  var permatime = parse("http://permatime.com/Europe/Berlin/1989-11-09/00:01");
  t.equal(permatime.root, "http://permatime.com/");
  t.equal(permatime.zone, "Europe/Berlin");
  t.equal(permatime.date, "1989-11-09");
  t.equal(permatime.time, "00:01");
  t.end();
});

test('minimal datetime without host', function (t) {
  var permatime = parse("/Europe/Berlin/1989-11-09/00:01");
  t.equal(permatime.root, "/");
  t.equal(permatime.zone, "Europe/Berlin");
  t.equal(permatime.date, "1989-11-09");
  t.equal(permatime.time, "00:01");
  t.equal(permatime.timestamp, null);
  t.end();
});

test('minimal datetime with bare root', function (t) {
  var permatime = parse("Europe/Berlin/1989-11-09/00:01");
  t.equal(permatime.zone, "Europe/Berlin");
  t.end();
});

test('minimal timestamp', function (t) {
  var permatime = parse("/timestamp/1226183760");
  t.equal(permatime.root, "/");
  t.equal(permatime.zone, null);
  t.equal(permatime.date, null);
  t.equal(permatime.time, null);
  t.equal(permatime.timestamp, "1226183760");
  t.end();
});

test("finds optional label", function (t) {
  var permatime = parse("/Europe/Berlin/1989-11-09/00:01/Berlin_Wall");
  t.equal(permatime.zone, "Europe/Berlin");
  t.equal(permatime.label, "Berlin_Wall");
  t.equal(permatime.link, null);
  t.end();
});
test("finds optional link", function (t) {
  var permatime = parse("/Europe/Berlin/1989-11-09/00:01?link=http://myblog.com");
  t.equal(permatime.zone, "Europe/Berlin");
  t.equal(permatime.label, null);
  t.equal(permatime.link, "http://myblog.com");
  t.end();
});
test("maximal datetime", function (t) {
  var permatime = parse("/Europe/Berlin/1989-11-09/00:01/Berlin_Wall?link=http://myblog.com");
  t.equal(permatime.zone, "Europe/Berlin");
  t.equal(permatime.label, "Berlin_Wall");
  t.equal(permatime.link, "http://myblog.com");
  t.end();
});
test("maximal timestamp", function (t) {
  var permatime = parse("/timestamp/1226183760/Berlin_Wall?link=http://myblog.com");
  t.equal(permatime.timestamp, "1226183760");
  t.equal(permatime.label, "Berlin_Wall");
  t.equal(permatime.link, "http://myblog.com");
  t.end();
});

test("finds optional link even with other unsupported parameters", function (t) {
  var permatime = parse("/Europe/Berlin/1989-11-09/00:01/Berlin_Wall?some=other&link=http://myblog.com&else=rubbish");
  t.equal(permatime.zone, "Europe/Berlin");
  t.equal(permatime.label, "Berlin_Wall");
  t.equal(permatime.link, "http://myblog.com");
  t.end();
});

test("erroneous permatime", function(t){
  var permatime = parse("/Europe/Berlin/1989-11-09");
  t.equal(permatime, null);
  t.end();
});

test("won't match with rubbish before root", function(t){
  var permatime = parse("rubbishhttp://permatime.com/Europe/Berlin/1989-11-09/00:01");
  t.equal(permatime, null);
  t.end();
});
