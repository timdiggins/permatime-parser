var test = require('tape');
var permatime = require('../index.js');
var Permatime = permatime.Permatime;
var moment = require('moment-timezone');

test('moment() with timestamp', function (t) {
  var p = new Permatime({timestamp: "12345"});
  var m = p.moment();
  t.ok(m, 'should be truthy');
  t.ok(moment.unix(12345).isSame(m), 'should be same moment as the timestamp');
  t.end();
});
test('moment() with zone & datetime', function (t) {
  var p = new Permatime({zone: "US/Central", date: '1963-11-22', time: '12:30'});
  var m = p.moment();
  t.ok(m, 'should be truthy');
  t.ok(moment.tz("1963-11-22 12:30", "US/Central").isSame(m), 'should be same moment as the timestamp');
  t.end();
});
test('toZone should be same if same Zone', function(t){
  var p = new Permatime({zone: "US/Central", date: '1963-11-22', time: '12:30'});
  var p2 = p.toZone('US/Central');
  t.ok(p===p2, 'should be same');
  t.end();
});
test('toZone should be generate new permatime if different Zone', function(t){
  var p = new Permatime({zone: "US/Central", date: '1963-11-22', time: '12:30'});
  var p2 = p.toZone('US/Eastern');
  t.ok(p!==p2, 'should be different');
  t.equal(p.zone, 'US/Central');
  t.equal(p2.zone, 'US/Eastern');
  t.equal(p2.time, '13:30');
  t.end();
});
