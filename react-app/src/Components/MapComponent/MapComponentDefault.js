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
        }
      })
    )(props =>
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.browser.lat, lng: props.browser.lng }}>
        {!props.directions && <Marker position={{ lat: props.browser.lat, lng: props.browser.lng }} />}

      </GoogleMap>
    );
    return (
      <DirectionsComponent
      />
    )
  }
}


export default MapComponent;