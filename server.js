// Dependencies
const server = require('http').createServer(),
  io = require('socket.io')(server),
  path = require('path'),
  open = require('open');

// Variables
const port = 3000;

// Create a simple http server. No need to use express for such a simple SPA.
server
  .createServer((req, res) => {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), uri);
    fs.exists(filename, exists => {
      if (!exists) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found\n');
        res.end();
        return;
      }
      var mimeType = mimeTypes[path.extname(filename).split('.')[1]];
      res.writeHead(200, { 'Content-Type': mimeType });

      var fileStream = fs.createReadStream(filename);
      fileStream.pipe(res);
    });
  })
  .listen(port, () => {
    let url = 'http://localhost:' + port;
    console.log('Listening at ' + url);

    // Open URL automatically, for convenience
    open(url);
  });

io.on('connection', function(client) {
  client.on('event', function(data) {
    console.log('in');
  });
  client.on('disconnect', function() {
    console.log('out');
  });
});
