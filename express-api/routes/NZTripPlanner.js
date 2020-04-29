const  Places = require("google-places-web").default;
var express = require('express');
var router = express.Router();

Places.apiKey = "AIzaSyAvri8O_Xgk3dGV84-tyQ2KnSsCqhQmYJY";

router.get('/', function(req, res) {
    res.send({status: 'success', message: 'this works!'})
});

module.exports = router; 


router.get('/nearbyplaces', async function(req, res, ){

  
    try {
        const response = await Places.nearbysearch({
          location: "-37.814,144.96332", // LatLon delimited by ,
           radius: "500",  // Radius cannot be used if rankBy set to DISTANCE
          type: ["food"], // Undefined type will return all types
          //rankby: "distance" // See google docs for different possible values
        });
       
        const { status, results, next_page_token, html_attributions } = response;
        res.send({  results })
      } catch (error) {
        console.log(error);
      }


})