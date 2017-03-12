(function (global) {
  'use strict';

  // Class ------------------------------------------------
  function DocomoTts(apiKey) {
    this.apiKey = apiKey;
  }

  // Header -----------------------------------------------
  DocomoTts.prototype.speak = speak; // DocomoTts#speak(speechText, callback):void
  DocomoTts.prototype.save = save; // DocomoTts#save(saveFile, speechText):void

  // Implementation ---------------------------------------
  function speak(speechText, callback) {
    var https = require('https');

    var json = '{' +
      '  "Command": "AP_Synth",' +
      '  "SpeechRate": "1.15",' +
      '  "AudioFileFormat": "0",' +
      '  "TextData": "' + speechText + '"' +
      '}';

    var options = {
      hostname: 'api.apigw.smt.docomo.ne.jp',
      /*jshint validthis: true */
      path: '/virtualNarrator/v1/textToSpeech?APIKEY=' + this.apiKey,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    var req = https.request(options, function (res) {
      res.setEncoding('binary');
      var responseData = '';
      res.on('data', function (chunk) {
        responseData += chunk;
      });
      res.on('end', function () {
        callback(responseData);
      });
    });

    req.write(json);
    req.end();

  }

  function save(saveFile, speechText) {
    var https = require('https');
    var fs = require('fs');

    var json = '{' +
      '  "Command": "AP_Synth",' +
      '  "SpeechRate": "1.15",' +
      '  "AudioFileFormat": "0",' +
      '  "TextData": "' + speechText + '"' +
      '}';

    var options = {
      hostname: 'api.apigw.smt.docomo.ne.jp',
      /*jshint validthis: true */
      path: '/virtualNarrator/v1/textToSpeech?APIKEY=' + this.apiKey,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    var req = https.request(options, function (res) {
      res.setEncoding('binary');
      var responseData = '';
      res.on('data', function (chunk) {
        responseData += chunk;
        process.stdout.write('.');
      });
      res.on('end', function () {
        fs.writeFile(saveFile, responseData, 'binary');
      });
    });

    req.write(json);
    req.end();

  }

  // Exports ----------------------------------------------
  if ("process" in global) {
    module.exports = DocomoTts;
  }
  global.docomoTts = DocomoTts;


})((this || 0).self || global);
