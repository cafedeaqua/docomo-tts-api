[![Build Status](https://travis-ci.org/cafedeaqua/docomo-tts-api.svg?branch=master)](https://travis-ci.org/cafedeaqua/docomo-tts-api)

# docomo-tts-api

docomo-tts-api is library to call docomo web api TextToSpeech(NTT IT version) and save speech file.

## Installation

```
$ npm install docomo-tts-api
```

## Usage

```
var docomottsapi = require("docomo-tts-api");

docomottsapi.save(apiKey, saveFile, speechText);
```

## See Also
[https://dev.smt.docomo.ne.jp/](https://dev.smt.docomo.ne.jp/)
