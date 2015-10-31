var test = require('tape');
var proxyquire = require('proxyquire');
var permatime = proxyquire('../index', { 'moment-timezone': null});

test('when no moment, permatime moment() raises error', function (t) {
  var p = new permatime.Permatime({timestamp: "12345"});
  t.throws(function(){p.moment()});
  t.end();
});


