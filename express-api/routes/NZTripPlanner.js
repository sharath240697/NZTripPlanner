


const  Places = require("google-places-web").default;
//const  uploadToDrive =require('./uploadToDrive')
var express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
var router = express.Router();
const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');


Places.apiKey = "AIzaSyAvri8O_Xgk3dGV84-tyQ2KnSsCqhQmYJY";

router.get('/', function(req, res) {
    res.send({status: 'success', message: 'this works!'})
});

module.exports = router; 


router.post('/nearbyplaces', async function(req, res, ){  
    try {

        console.log(req.body);
        const parms = req.body;
        const response = await Places.nearbysearch({
          location: ""+parms.lat+","+parms.lng, // LatLon delimited by ,
           radius: "500",  // Radius cannot be used if rankBy set to DISTANCE
          type: parms.type, // Undefined type will return all types
          //rankby: "distance" // See google docs for different possible values
        });
        const { status, results, next_page_token, html_attributions } = response;
        
        const result_img = await Promise.all(results.map( async (obj) => {
         // console.log("obj")
          //console.log(obj)
         // console.log('obj.photos[0].photo_reference')
         // console.log(obj.photos[0].photo_reference)
         console.log('photo availabe? '+  (typeof obj.photos!=='undefined') )
         console.log(typeof obj.photos)
          if(typeof obj.photos!=='undefined')
          {
            const url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+obj.photos[0].photo_reference+'&key=AIzaSyAvri8O_Xgk3dGV84-tyQ2KnSsCqhQmYJY'
          const image_url = await fetch(url);
          obj.img_url = image_url.url; 
          obj.img_alt =  'available';
          }
          else
          {
            obj.image_alt =  'not_available';
          }
          return obj;
        }))
       // console.log(result_img)
        res.send(result_img)
      } catch (error) {
        console.log(error);
      }

    })
   

//saves the trip and oath details
router.post('/saveOathDetails', async function (req, res, ) {
  try {
    console.log('inside uploadToDrive.js saveoathdetails  API method')
    fs.readFile('./routes/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), CheckFileExists);
    });
  }
  catch (error) {
    console.log(error);
  }
})

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

//check if the file exists
function CheckFileExists(auth) {
  console.log('inside CheckFileExists')
  const drive = google.drive({ version: 'v3', auth });
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
        }
      }
      console.log('files length is ' + files.length)

      if (files.length == 0) {
        //no files in drive, upload it
        fs.readFile('./routes/credentials.json', (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          authorize(JSON.parse(content), storeFiles);
        });
      } else {
        //update the contets of the file
             const fileMetadata = {
          'name': 'NZTripPlanDetails.json',
          };
        var media = {
          mimeType: 'application/json',
          //Change to trip details that needs to be updated
          body: 'updated values'
        }
        var files = response.data.files;
        console.log('files length inside update is ' + files.length)
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          console.log('%s (%s)', file.name, file.id);
        }
        drive.files.update({
          fileId: file.id,
          resource: fileMetadata,
          media: media,
        }, (err, file) => {
          if (err) {
            // Handle error
            console.error(err);
          } else {
            console.log('updated File Id: ', file.id);
          }
        });
      }
    });
}

//to upload the trip details , for now dummy data is being stored
function storeFiles(auth) {
  console.log("inside store files");
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    'name': 'NZTripPlanDetails.json',
    parents: ['1zDamZRAyWaYyg5cvM5TNDm7YhFf5tsyC']//folder name in the drive, will change
  };
  //save trip related details here
  var jsonData = 
    [{
      "id": 28,
      "Title": "Sweden"
    }, {
      "id": 56,
      "Title": "USA"
    }, {
      "id": 89,
      "Title": "England"
    }]
  var jsonContent = JSON.stringify(jsonData);
  console.log('jsonContent is'+jsonContent);

  var media = {
    mimeType: 'application/json',
      body: jsonContent  
  };
  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      console.log('inside error  save files');
      console.error(err);
    } else {
      console.log('File Id: ', file.data.id);
    }
  });
}


/* end of save trip details */


  