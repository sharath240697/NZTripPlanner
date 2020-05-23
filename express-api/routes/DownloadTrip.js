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
    "access_token": "ya29.a0AfH6SMAyxRE7n3Dnp_jAB6O4iJ0OGcAaCwoa6IaMw6S4UfMdD1UsIFsglQgVDVhcFbDSUR0Gj6LgJgu26ReQ_L03rojLCWhB8qt466EnTOvFVP5iN0V52X7olP1QQnWfselXo0gy5dhffGUgYkfKj5SnfeSW1fOuSzzk",
     "scope": "https://www.googleapis.com/auth/drive",
      "token_type": "Bearer",
      //"expiry_date": req.body.expires_at},
      "expiry_date": "1590205325634"
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

/*router.post('/downloadTripDetails', async function (req, res, ) {
  try {
    console.log('inside uploadToDrive.js downloadTripDetails  API method')
   fs.readFile('./routes/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), downloadTripDetails);
    });
  }
  catch (error) {
    console.log(error);
  
})*/

function downloadTripDetails(auth) {
  const drive = google.drive({ version: 'v3', auth });
  console.log("inside download files");
  drive.files.list({
    spaces: 'drive',
  q:"mimeType='application/vnd.google-apps.folder' and name='NZTripDetails' and trashed:false",
}, function (err, response) {
if (err) {
  console.log('The API returned an error: ' + err);
  return;
}
   var files = response.data.files; 
    console.log('Files:');
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log('%s (%s)', file.name, file.id);
  }
    parents=file.id;
    console.log('parent folder inside download files is ',parents)
   folderId = parents,
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
           
       drive.files.get(
        { 
        fileId: fileId,
         alt: 'media'}, {responseType: 'application/json'},
        function(err, res) {
    
          console.log('response is'+res.data);        
    });
});


}
  );
    }


  