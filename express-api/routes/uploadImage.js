const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
var express = require('express');
var router = express.Router();

//const SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
//'https://www.googleapis.com/auth/drive.metadata.readonly'];


const SCOPES = ['https://www.googleapis.com/auth/drive'];

const TOKEN_PATH = 'token.json';


fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  //authorize(JSON.parse(content),checkIfFilesExists);
 authorize(JSON.parse(content), storeFiles);
 authorize(JSON.parse(content),  downloadFile );
});



function authorize(credentials, callback) {
   
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) 
      {
        return getAccessToken(oAuth2Client, callback);
      
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  


  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
  
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
        });
        callback(oAuth2Client);
      });
    });
  }


  function storeFiles(auth) {
      console.log("auth", JSON.stringify(auth));
    const drive = google.drive({version: 'v3', auth});
    var fileMetadata = {
            'name': 'credentialstest.json'
    };
    var media = {
            mimeType: 'application/json',
            //PATH OF THE FILE FROM YOUR COMPUTER
            body: fs.createReadStream('D:/University/NOtes/SOFTENG_750/ImageUploadToDrive/credentials.json')
    };
    drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, function (err, file) {
    if (err) {
        // Handle error
        console.error(err);
    } else {
        console.log('File Id: ', file.data.id);
    }
 });
  }

 
  function downloadFile(auth)
   {
    console.log("auth", JSON.stringify(auth));
    const drive = google.drive({version: 'v3', auth});
 var fileId = '1S9T2Tqb9Es5eDgYEnfZhCFpisMqOGUgI'
 var dest = fs.createWriteStream('./DownLoaded.json');
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

   module.exports = router;