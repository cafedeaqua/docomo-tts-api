(function () {
  'use strict';
  var DocomoTts = require('./index.js');
  var fs = require('fs');

  if (process.env.DOCOMO_API_KEY === undefined) {
    console.log('please set environment variable for DOCOMO_API_KEY');
    return;
  }
  var key = process.env.DOCOMO_API_KEY;
  var tts = new DocomoTts(key);
  tts.speak('いらっしゃいませ', function (binaryData) {
    var saveFile = 'welcome.wav';
    fs.writeFile(saveFile, binaryData, 'binary');
    console.log('DONE');
  });

})();
