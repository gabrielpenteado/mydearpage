const path = require('path');

function indexRender (req, res) {
  res.render(path.join(__dirname, '../views/index.ejs'));
};


module.exports = indexRender;