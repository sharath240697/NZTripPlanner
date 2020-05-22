const  Places = require("google-places-web").default;
//const  uploadToDrive =require('./uploadToDrive')
var express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
var router = express.Router();
const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');
module.exports = router; 


function getAuthDetails() {
  const auth =
  {
    "_events": {},
    "_eventsCount": 0,
    "transporter": {},
    //"credentials":{"access_token":req.body.access_token,
    "credentials": {
    "access_token": "ya29.a0AfH6SMAVORRbvrWQcKeFozNV6GPhpOriHRItV__FsC9ajnPjdSUCuSDRGS5_hbkqJBMAVOJ4X14vjnh-OW7VXJNhTKSeU4Qb6_UESzLWAV6ruf5-G7iNBNq96g39xXP2zldIzolenqFBrflew5gSduFeNItZ-bjBgek_",
     "scope": "https://www.googleapis.com/auth/drive",
      "token_type": "Bearer",
      //"expiry_date": req.body.expires_at},
      "expiry_date": "1590131771281"
    },
    "certificateCache": null,
    "certificateExpiry": null,
    "refreshTokenPromises": {},
    "_clientId": "820264989222-v06oobtj8drmgfcgn3hoklu2amna5crc.apps.googleusercontent.com",
    "_clientSecret": "RxK3BLqs17Fgtdz_HleK3RKW",
    "redirectUri": "http://localhost:9000",
    "eagerRefreshThresholdMillis": 300000
  }
  return auth;
}

//authorising the access of the user using the token
function authorize(credentials, callback) {
  //assigning  the application related data
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
  const auth = getAuthDetails();
  //assigning user specific data
  var jsonData = '{"access_token":"' + auth.credentials.access_token + '","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":' + auth.credentials.expiry_date + '}'
  // parse json
  var jsonObj = JSON.parse(jsonData);
  // stringify JSON Object
  var jsonContent = JSON.stringify(jsonObj);
  oAuth2Client.setCredentials(JSON.parse(jsonContent));
  callback(oAuth2Client);
}

/* end of save trip details */

/* start of download details */

router.post('/downloadTripDetails', async function (req, res, ) {
  try {
    console.log('inside uploadToDrive.js downloadTripDetails  API method')
    fs.readFile('./routes/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), downloadTripDetails);
    });
  }
  catch (error) {
    console.log(error);
  }
})

function downloadTripDetails(auth) {
  
  var fileId;
  const drive = google.drive({ version: 'v3', auth });
  //var fileId = '1IQlTW_sB1_ZpFwlatETxKWBUuQ_7r7ne';
  //project specific, needs to change
  folderId = '1zDamZRAyWaYyg5cvM5TNDm7YhFf5tsyC',
    drive.files.list({
          trashed: false,
      q: `'${folderId}' in parents and trashed:false`,

    }, function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var files = response.data.files;
      console.log("Files: " + files);
      if (files.length == 0) {
        console.log('No files found.');
      } else {
        console.log('Files:');
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log('%s (%s)', file.name, file.id);
          fileId=file.id;
        }
      }
      console.log('files length is ' + files.length)
       var dest = 'DownLoaded.json';    
       
       drive.files.get(
        { 
        fileId: fileId,
         alt: 'media'}, {responseType: 'application/json'},
        function(err, res) {
    
          console.log('response is'+res.data);        
    });
});
    }


  