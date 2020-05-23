const  Places = require("google-places-web").default;
//const  uploadToDrive =require('./uploadToDrive')
var express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
var router = express.Router();
const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const util = require('./util')

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
    //console.log(req.body)
    console.log('inside uploadToDrive.js saveoathdetails  API method')
    fs.readFile('./routes/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      util.authorize(JSON.parse(content), util.CheckFileExists, req.body);
    });
  }
  catch (error) { 
    console.log(error);
  }
})




/* end of save trip details */


router.post('/downloadTripDetails', async function (req, res, ) {
  try {
    console.log(req.body)
    console.log('inside uploadToDrive.js downloadTripDetails  API method')
    fs.readFile('./routes/credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      util.authorize(JSON.parse(content), util.downloadTripDetails, req.body);
    });
  }
  catch (error) {
    console.log(error);
  }
})




  

  