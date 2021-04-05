//MODULES
const express = require('express');
const app = express();
const path = require('path');
const onloadRoute = require('./routes/onload');
const citynameRoute = require('./routes/cityname');

//____________CONFIG______________
const PORT = process.env.PORT || 8000;
// STATIC FILES
app.use(express.static('public'));
// SET VIEW ENGINE
app.set('view engine', 'ejs');
// PARSE INCOMING DATA AS JSON
app.use(express.json({limit: '1mb'}));



// ROUTES
app.get('/', (req, res) => {
  res.render(path.join(__dirname, '/views/index.ejs'))
});

app.use('/', onloadRoute);
app.use('/', citynameRoute);


// LISTEN ON PORT
app.listen(PORT, () => console.log(`Server is ON. Access http://localhost:${PORT}`))