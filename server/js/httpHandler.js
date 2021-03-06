const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  res.writeHead(200, headers);

  if (req.method === 'GET') {
    var direction = '';
    var rand = Math.floor(4 * Math.random());
    if (rand === 0) {
      direction = 'up';
    } else if (rand === 1) {
      direction = 'right';
    } else if (rand === 2) {
      direction = 'down';
    } else {
      direction = 'left';
    }

    res.end(direction);
  } else {
    res.end(req._postData);
  }
  next(); // invoke next() at the end of a request to help with testing!
};
