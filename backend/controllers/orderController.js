const path = require('path');
const fs = require('fs');

exports.getFoodOptions = (req, res) => {
  try {
    const dbPath = path.join(__dirname, '../db.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    res.json(data.food_options);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food options' });
  }
};

module.exports = getFoodOptions;