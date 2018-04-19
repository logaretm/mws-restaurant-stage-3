const path = require('path');
const imagemin = require('imagemin');
const webp = require('imagemin-webp');

const output = path.resolve(__dirname, '../public/img');
const jpgs = path.resolve(__dirname, '../assets/img/*.jpg');


imagemin([jpgs], output, {
  plugins: [webp({
    quality: 70 // Quality setting from 0 to 100
  })]
});


imagemin([jpgs], output, {
  plugins: [webp({
    lossless: true
  })]
});
