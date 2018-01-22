// Modules
const path = require('path');
const express = require('express');

// App
const app = express();

// Run the app with static files from the /dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back /dist/index.html
// This passes routing to the Angular app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Set port
const port = process.env.PORT || '8080';
app.set('port', port);

// Start the app
app.listen(port, () => console.log(`Angular app deployed at localhost:${port}`));
