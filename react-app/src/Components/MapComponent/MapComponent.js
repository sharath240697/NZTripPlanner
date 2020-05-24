/*global google*/
import React from 'react'
import './MapComponent.css';
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from 'react-google-maps'


class MapComponent extends React.Component {
  constructor(props) {
    console.log('in MapComponent Class')
    super(props)
  }
  render() {
    const DirectionsComponent = compose(
      withProps({
        origin: this.props.origin,
        destination: this.props.destination,
        waypoints: this.props.waypoints,
        browser: this.props.browser,
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBjwnK_zvDGQokuzDJ0NVnR979L_KNEYuo&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `50%` }} />,
        containerElement: <div className="MapComponent" style={{ height: `600px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          console.log('in did mount method')
          console.log(this.props.waypoints)
          console.log(this.props.origin)
          console.log(this.props.destination)
          console.log({
            origin: {placeId: this.props.origin},
            destination: {placeId: this.props.destination},
            //{placeId: "ChIJ--acWvtHDW0RF5miQ2HvAAU"} this.props.origin.lat, this.props.origin.lng
            waypoints:  this.props.waypoints.map(place_id => {
                return {stopover: true,
                  location: {'placeId': place_id}}
            }),
            travelMode: google.maps.TravelMode.DRIVING


          })
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route({
            origin: {placeId: this.props.origin},
            destination: {placeId: this.props.destination},
            //{placeId: "ChIJ--acWvtHDW0RF5miQ2HvAAU"} this.props.origin.lat, this.props.origin.lng
            waypoints:  this.props.waypoints.map(place_id => {
                return {stopover: true,
                  location: {'placeId': place_id}}
            }),
            travelMode: google.maps.TravelMode.DRIVING


          }, (result, status) => {
            console.log(result)
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({

                directions: { ...result },
                markers: true,

              })
            } else {
              console.error(`error fetching directions ${result}`);
              ////// should add handler when routes are not found
            }
          });
        }
      })
    )(props =>
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.browser.lat, lng: props.browser.lng }}>
        {!props.directions && <Marker position={{ lat: props.browser.lat, lng: props.browser.lng }} />}
        {

          props.directions && <DirectionsRenderer directions={props.directions} />}
      </GoogleMap>
    );
    return (
      <DirectionsComponent
      />
    )
  }
}


export default MapComponent;