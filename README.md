# readtoend

Read a stream to completion and provide a single event or callback with the
contents of the stream when the source has ended.


## Example

```javascript
var http = require('http');

var rte = require('readtoend');

http.get('http://nodejs.org', function(response) {
  rte.readToEnd(response, function(err, body) {
    console.log(body);
  });
});
```

Or, use it as part of a stream pipeline

```javascript
var fs = require('fs');
var http = require('http');

var rte = require('readtoend');

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
```
