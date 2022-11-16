const path = require('path');

function indexRender (req, res) {
  res.render(path.join(__dirname, '../views/pages/index.ejs'));
};


module.exports = indexRender;