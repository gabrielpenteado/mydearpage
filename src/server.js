//IMPORTS
const path = require('path');
const express = require('express');
const server = express();

const PORT = 8000;

// STATIC FILES
server.use(express.static('public'));

server.get('/', (req,res) => {
  console.log(req.query)
  res.sendFile(path.join(__dirname, '/views/index.html'))
});

// LISTEN ON PORT 8000
server.listen(PORT, () => console.info(`Listening on port ${PORT}`));

