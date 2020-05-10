import React from "react";
import { connect } from "react-redux";
import "./NearbyPlaces.css";
import { Card, CardMedia, CardContent, CardActions, Button } from "@material-ui/core";
import { Add, Remove } from '@material-ui/icons';
const mapStateToProps = (state) => ({
  attractions: state.places.nearby_tourist_attractions.attractions,
});
const mapDispatchToProps = {};


const NearbyPlaces = (props) => {
  return (
    <div>
      {props.attractions.map((attraction) => (
        <Card className="PlaceCard">
          <CardMedia className="Media" image="https://via.placeholder.com/150" />
          <div className="Content">
            <CardContent >
              <h3>{attraction.name}</h3>

              <p>Rating: {attraction.rating}/5 from {attraction.user_ratings_total} users.</p>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                <Add />
              </Button>
              <Button size="small" color="primary">
                <Remove />
              </Button>
            </CardActions>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(NearbyPlaces);
