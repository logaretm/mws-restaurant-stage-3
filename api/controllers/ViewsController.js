const fs = require('fs');
const path = require('path');

module.exports = {
  app (req, res) {
    const content = fs.readFileSync(path.resolve(__dirname, '../../views/index.html'));

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  }
}