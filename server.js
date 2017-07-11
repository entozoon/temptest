// Dependencies
const app = require('express')(),
  path = require('path'),
  open = require('open');

// Variables
const port = 3000;

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Create a simple http server using express
const server = app.listen(port, function(error) {
  if (error) {
    console.log(error);
  } else {
    let url = 'http://localhost:' + port;
    console.log('Listening at ' + url);

    // Open URL automagically, for convenience
    open(url);
  }
});

const io = require('socket.io')(server);

io.on('connection', function(client) {
  client.on('event', function(data) {
    console.log('in');
  });
  client.on('disconnect', function() {
    console.log('out');
  });
});
