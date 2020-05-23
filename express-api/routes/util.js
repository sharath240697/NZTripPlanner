const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');

module.exports = {
    getAuthDetails: function (req_body) {
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
  },
  
  //authorising the access of the user using the token
  authorize: function (credentials, callback, req_body) {
    //assigning  the application related data
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
    const auth = this.getAuthDetails(req_body);
    //assigning user specific data
    var jsonData = '{"access_token":"' + auth.credentials.access_token + '","scope":"https://www.googleapis.com/auth/drive","token_type":"Bearer","expiry_date":' + auth.credentials.expiry_date + '}'
    // parse json
    var jsonObj = JSON.parse(jsonData);
    // stringify JSON Object
    var jsonContent = JSON.stringify(jsonObj);
    oAuth2Client.setCredentials(JSON.parse(jsonContent));
    callback(oAuth2Client,req_body);
  },
  
  //check if the file exists
  CheckFileExists: function (auth,req_body) {
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
  //update the contets of the file
  const fileMetadata = {
    'name': 'NZTripPlanDetails.json',
    };
  var media = {
    mimeType: 'application/json',
    //Change to trip details that needs to be updated
    body: JSON.stringify({...req_body.trip})
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
    }
    );
   }
  });
  
  
  },
  
  //to upload the trip details , for now dummy data is being stored
  storeFiles: function (auth, req_body) {
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
    var jsonData = req_body.trip
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
  );
  },


  downloadTripDetails:  function (auth) {
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
      
            const data = JSON.parse(res.data)
            console.log('data.me')
            console.log(data.me)
            console.log('data.you')
            console.log(data.you)
                
      });
  });
  
  
  }
    );
      }

    }