import React from "react";
import { connect } from "react-redux";
import "./NearbyPlaces.css";
import { Card, CardMedia, CardContent, CardActions, Button, Switch } from "@material-ui/core";
import { Add, Remove } from '@material-ui/icons';
import { addplacetomap, removeplacefrommap } from '../../Actions/actions';
import { store } from '../../index'


const mapStateToProps = (state) => ({
  attractions: state.places.nearby_tourist_attractions.attractions,
  placesOnMap: state.places.placesOnMap,
  lodgings: state.places.nearby_lodgings.lodgings
});

const mapDispatchToProps = { addplacetomap, removeplacefrommap };

function addPlace(place) {
  store.dispatch(addplacetomap(place));
}

function removePlace(place) {
  store.dispatch(removeplacefrommap(place));
}


const NearbyPlaces = (props) => {

  const [state, setState] = React.useState({
    showToggle: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const toMap = state.showToggle ? props.lodgings : props.attractions;
  return (
    <div className="NearbyPlaces">
      <div className="ToggleBox">
        <p style={state.showToggle ? {} : { borderBottom: 'black solid 1px' }}>Nearby Places</p>
        <Switch
          checked={state.showToggle}
          onChange={handleChange}
          name="showToggle"
          color="default"

        />
        <p style={state.showToggle ? { borderBottom: 'black solid 1px' } : {}}>Restaurants</p>
      </div>
      {
        toMap.map((attraction) => {
          return (
            <Card className="PlaceCard" key={attraction.id}>
              {attraction.img_url ?
                <CardMedia className="Media" image={attraction.img_url} /> :
                <div className="Media">
                  <p className="NoImageMessage">No image available</p>
                </div>
              }
              <div className="Content">
                <CardContent >
                  <h3>{attraction.name}</h3>
                  <p>Rating: {attraction.rating}/5 from {attraction.user_ratings_total} users.</p>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => addPlace(attraction)}>
                    <Add />
                  </Button>
                  <Button size="small" color="primary" onClick={() => removePlace(attraction)}>
                    <Remove />
                  </Button>
                </CardActions>
              </div>
            </Card>
          )
        })}
    </div>
  );
};

export default connect(mapStateToProps)(NearbyPlaces);
