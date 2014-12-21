var https = require('https');
var fs = require('fs');

function save(apiKey, saveFile, speechText){
    var docomo_api_url  = "https://api.apigw.smt.docomo.ne.jp/virtualNarrator/v1/textToSpeech?APIKEY="

    var json = '{'+
        '  "Command": "AP_Synth",'+
        '  "SpeechRate": "1.15",'+
        '  "AudioFileFormat": "0",'+
        '  "TextData": "'+ speechText +'"'+
        '}';

    var options = {
        hostname: 'api.apigw.smt.docomo.ne.jp',
        path: '/virtualNarrator/v1/textToSpeech?APIKEY='+apiKey,
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        }
    };

    var req = https.request(options, function(res){
        res.setEncoding('binary')
        var contentLength = res.headers['x-content-length'];
        var responseData = '';
        res.on('data', function(chunk){
            responseData += chunk;
            process.stdout.write('.');
        });
        res.on('end', function(){
            var counter = fs.writeFile(saveFile, responseData, 'binary');
            console.log("DONE.");
            console.log("Save to "+saveFile);
        });
    });

    req.write(json);
    req.end();
}

module.exports = {
    save: save
}

