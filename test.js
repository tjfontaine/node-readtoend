var fs = require('fs');
var http = require('http');

var rte = require('./read');

http.get('http://nodejs.org', function(response) {
  var rs = new rte();
  response.pipe(rs).pipe(fs.createWriteStream('/tmp/foo'));
  rs.on('complete', function(err, body) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log(body);
    }
  });
});
