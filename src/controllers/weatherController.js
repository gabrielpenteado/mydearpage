const weatherService = require('../services/weatherService');

const byGeolocation = async (req, res) => {
  try {
    const onloadData = await weatherService.byCoords(req);
    return res.send(onloadData);
  }
  catch (err) {
    console.log(err);
  }
  
}

const byCityName = async (req, res) => {
  try {
    const bycityData = await weatherService.byCity(req);
    return res.send(bycityData);
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  byGeolocation,
  byCityName
};