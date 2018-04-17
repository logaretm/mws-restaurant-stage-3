const fs = require('fs');
const path = require('path');

module.exports = {
  home (req, res) {
    const content = fs.readFileSync(path.resolve(__dirname, '../../views/index.html'));

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  },

  restaurant (req, res) {
    const content = fs.readFileSync(path.resolve(__dirname, '../../views/restaurant.html'));

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  }
}