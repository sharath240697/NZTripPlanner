import React, { Component } from "react";
import TripTable from "../TripTable/TripTable";
import "./SavedTrip.css";

class SavedTrip extends Component {
  // constructor(props){
  // super(props);
  // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <div className="SavedTrip">
        <h3>Previous Trips:</h3>
        <TripTable className="TripTable" />
      </div>
    );
  }
}

export default SavedTrip;
