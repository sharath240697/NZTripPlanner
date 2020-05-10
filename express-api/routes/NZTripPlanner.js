const  Places = require("google-places-web").default;
var express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

Places.apiKey = "AIzaSyBjwnK_zvDGQokuzDJ0NVnR979L_KNEYuo";

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
        res.send(results)
      } catch (error) {
        console.log(error);
      }


})