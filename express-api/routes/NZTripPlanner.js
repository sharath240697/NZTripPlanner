const  Places = require("google-places-web").default;
//const  uploadToDrive =require('./uploadToDrive')
var express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
var router = express.Router();
const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');
var downloaded_trip;
var updated_trips;
var update_status;


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
router.post('/saveTripDetails', async function (req, res, ) {
  try {
    downloaded_trip=undefined;
    //console.log(req.body)
    console.log('inside uploadToDrive.js saveoathdetails  API method')
    fs.readFile('./routes/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), CheckFileExists, req.body);
    });
    setTimeout(function(){
      console.log('after calling authorize method')
      console.log(update_status)
      res.send({status: update_status})
     
    }, 4000); 
  }
  catch (error) { 
    console.log({status: update_status});
    res.send({status: update_status})
  }
})




/* end of save trip details */


router.post('/downloadTripDetails', async function (req, res, ) {
  try {
    downloaded_trip=undefined;
    console.log(req.body)
    console.log('inside uploadToDrive.js downloadTripDetails  API method')
    fs.readFile('./routes/credentials.json',async  (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
     const data = await authorize(JSON.parse(content),downloadTripDetails, req.body);
    
    
     setTimeout(function(){
      console.log('after calling authorize method')
      console.log(downloaded_trip)
      if(downloaded_trip===undefined)
      {
        res.send({root: []})
      }
      else{
        res.send(downloaded_trip)
      }
    }, 4000); 
    });
  }
  catch (error) {
    console.log(error);
  }
})




  

  

/* util functions */


 function getAuthDetails (req_body) {
  //console.log(req_body.credentials.access_token)
  //console.log("req_body.credentials.expires_at")
  //console.log(req_body.credentials.expires_at)
  const auth =
  {
    "_events": {},
    "_eventsCount": 0,
    "transporter": {},
    //"credentials":{"access_token":req.body.access_token,
    "credentials": {
    "access_token": req_body.credentials.access_token,
     "scope": "https://www.googleapis.com/auth/drive",
      "token_type": "Bearer",
      //"expiry_date": req.body.expires_at},
      "expiry_date": req_body.credentials.expires_at
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
 async function authorize (credentials, callback, req_body) {
  //assigning  the application related data
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
  const auth = getAuthDetails(req_body);
  //assigning user specific data
  var jsonData = '{"access_token":"' + auth.credentials.access_token + '","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":' + auth.credentials.expiry_date + '}'
  // parse json
  var jsonObj = JSON.parse(jsonData);
  // stringify JSON Object
  var jsonContent = JSON.stringify(jsonObj);
  oAuth2Client.setCredentials(JSON.parse(jsonContent));
  console.log('in authorize b4 callback')
  const data = await callback(oAuth2Client,req_body);
  console.log('after callback')
  console.log(data)
  return data;
}

//check if the file exists
 function CheckFileExists(auth,req_body) {
  console.log('inside CheckFileExists')
  const drive = google.drive({ version: 'v3', auth });
  console.log('inside checkif folder exists')
  drive.files.list({
     spaces: 'drive',
   q:"mimeType='application/vnd.google-apps.folder' and name='NZTripDetails' and trashed:false",
}, function (err, response) {
 if (err) {
   console.log('The API returned an error: ' + err);
   return;
 }
 var files = response.data.files;
 if (files.length == 0) {
   console.log('No folders found.');
 
 //create a new folder
 var fileMetadata = {
  'name': 'NZTripDetails',
  'mimeType': 'application/vnd.google-apps.folder'
};
drive.files.create({
  resource: fileMetadata,
  fields: 'id'
}, function (err, file) {
  if (err) {
  console.log('error in creating foler')
    console.error(err);
  } else {
    console.log('created  new Folder ');
    }
  
folderId =file.data;
console.log('Folder Id: ', folderId);
drive.files.list({
      trashed: false,
  q: `'${folderId}' in parents and trashed:false`,

}, function (err, response) {
  if (err) {
    console.log('INSIDE FILE NOT FOUND ' + err);
    //no files in drive, upload it
    fs.readFile('./routes/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), storeFiles, req_body);
    });
  }else{
    var files = response.data.files; 
    console.log('Files:');
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log('%s (%s)', file.name, file.id);
    }  
    console.log('INSIDE Folder exists, create files' + err);
    //no files in drive, upload it
    fs.readFile('./routes/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), storeFiles, req_body);
    });
  }

  

  });
});
  }
  else{
    var files = response.data.files; 
    console.log('Files:');
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log('%s (%s)', file.name, file.id);
    }  

     console.log('folder exists:'); 
     folderId =file.id;
 console.log('Folder Id: ', folderId);
 drive.files.list({
       trashed: false,
   q: `'${folderId}' in parents and trashed:false`,
 
 }, function (err, response) {
   if (err) {
     console.log('INSIDE FILE NOT FOUND ' + err);
     //no files in drive, upload it
     fs.readFile('./routes/credentials.json', (err, content) => {
       if (err) return console.log('Error loading client secret file:', err);
       authorize(JSON.parse(content), storeFiles, req_body);
     });
   }else{
     var files = response.data.files; 
     console.log('Files:');
     for (var i = 0; i < files.length; i++) {
       var file = files[i];
       console.log('%s (%s)', file.name, file.id);

     }  
     fs.readFile('./routes/credentials.json',async  (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
     const data = await authorize(JSON.parse(content),downloadTripDetails, req_body);
     setTimeout(function(){
      console.log('inside drive update method')
      console.log(downloaded_trip)
      const fileMetadata = {
        'name': 'NZTripPlanDetails.json',
        };
      var media = {
        mimeType: 'application/json',
        //Change to trip details that needs to be updated
        body: JSON.stringify({root: tripdetailseditor(downloaded_trip.root,req_body.trip)})
      }
      drive.files.update({
        fileId: file.id,
        resource: fileMetadata,
        media: media,
      }, (err, file) => {
        if (err) {
          // Handle error
          console.error(err);
          update_status = 'error'
        } else {
          console.log('updated File Id: ', file.id);
          update_status = 'success'
        }
      });
    }, 4000);   
    })
//update the contets of the file

   }
  }
  );
 }
});


}

//to upload the trip details , for now dummy data is being stored
 function storeFiles(auth, req_body) {
  console.log("inside store files");
  const drive = google.drive({ version: 'v3', auth });

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
    console.log('parent folder inside store files is ',parents)

  const fileMetadata = {
    'name': 'NZTripPlanDetails.json',
    parents: [parents]//folder name in the drive, will change
  };
  //save trip related details here
  var jsonData = {root: [req_body.trip]}
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
      update_status = 'error'
    } else {
      update_status = 'success'
      console.log('File Id: ', file.data.id);
    }
  });
}
);
}
  async function downloadTripDetails(auth) {
  const drive = google.drive({ version: 'v3', auth });
  console.log("inside download files");
  data = ( drive.files.list({
    spaces: 'drive',
  q:"mimeType='application/vnd.google-apps.folder' and name='NZTripDetails' and trashed:false",
}, function (err, response) {
if (err) {
  console.log('The API returned an error: ' + err);
  return 'sharath';
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

    }, async function (err, response) {
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
           
      const data = await drive.files.get(
        { 
        fileId: fileId,
         alt: 'media'}, {responseType: 'application/json'},
       async  function(err, res) {
    
          const data = await JSON.parse(res.data)
       downloaded_trip = data;
       console.log(downloaded_trip)
         // console.log(data.trip.placesOnMap);
              
    });
    return data
}
);


}
  ));
  console.log('at end') 
  console.log(data);
    }



function tripdetailseditor(gdrive_trips,new_trips)
{
  console.log(gdrive_trips)
  console.log(new_trips)
  let index = gdrive_trips.findIndex(trip => trip.id === new_trips.id);
  if (index === -1) {
    gdrive_trips.push(new_trips)
  }
 else{
   gdrive_trips[index] = new_trips;
 }
  return gdrive_trips;


}
