


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
router.post('/saveOathDetails', async function(req, res, ){
  try{
  console.log('inside uploadToDrive.js saveoathdetails  API method')

const auth=
  {  
"_events":{},
"_eventsCount":0,
"transporter":{},
"credentials":{"access_token":req.body.access_token,
"scope":"https://www.googleapis.com/auth/drive",
"token_type":"Bearer",
"expiry_date": req.body.expires_at},
"certificateCache":null,
"certificateExpiry":null,
"refreshTokenPromises":{},
"_clientId":"820264989222-v06oobtj8drmgfcgn3hoklu2amna5crc.apps.googleusercontent.com",
"_clientSecret":"RxK3BLqs17Fgtdz_HleK3RKW",
"redirectUri":"http://localhost:9000",
"eagerRefreshThresholdMillis":300000
  }

//to create a token file , which is uer specific

fs.readFile('./routes/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content),  storeFiles );
 // authorize(JSON.parse(content),  downloadFile );  
});
 
//authorising the access of the user using the token
function authorize(credentials, callback) {
  //assigning  the application related data
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

      //assigning user specific data
      var jsonData = '{"access_token":"' + auth.credentials.access_token + '","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":' + auth.credentials.expiry_date + '}' 
      // parse json
      var jsonObj = JSON.parse(jsonData);      
      // stringify JSON Object
      var jsonContent = JSON.stringify(jsonObj);
           oAuth2Client.setCredentials(JSON.parse(jsonContent));
           //call the call back function being passed storefiles/downloadfile
    callback(oAuth2Client);  
}


//to upload the trip details , for now dummy data is being
function storeFiles(auth) {
console.log("inside store files" );
const drive = google.drive({version: 'v3', auth});
var fileMetadata = {
      'name': 'TripDetails.json'
};
var media = {
      mimeType: 'application/json',
      //Change to project file path
      body: fs.createReadStream('D:/University/NOtes/SOFTENG_750/Project_NZ_Trip/Group-23-Azure-Ant/express-api/routes/TripDetails.json')
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
}catch (error) {
  console.log(error);
}
})


//to download the json file from drive, not completely implemented as not sure when to call
function downloadFile(auth)
{
 const drive = google.drive({version: 'v3', auth});
 //fileId keeps changing
var fileId = '1VY8NqDhaEpmkEN5hQO45vobKkEFrp-oY'
var dest = fs.createWriteStream('./DownLoadedTripDetails.json');
drive.files.get({fileId: fileId, alt: 'media'}, {responseType: 'stream'},
function(err, res){
  res.data
  .on('end', () => {
     console.log('Done');
  })
  .on('error', err => {
     console.log('Error', err);
  })
  .pipe(dest);
});
}

