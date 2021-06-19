//MODULES
const express = require('express');
const app = express();
const routes = require('./routes');

//____________CONFIG______________
const PORT = process.env.PORT || 8000;
// STATIC FILES
app.use(express.static('public'));
// SET VIEW ENGINE
app.set('view engine', 'ejs');
// PARSE INCOMING DATA AS JSON
app.use(express.json({limit: '1mb'}));

// ROUTES
app.use('/', routes);

// LISTEN ON PORT
app.listen(PORT, () => console.log(`Server is ON. Access http://localhost:${PORT}`))