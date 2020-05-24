import React, { Component } from "react";
import TripTable from "../TripTable/TripTable";
import "./SavedTrip.css";
import { postloadtrips } from '../../Actions/expressActions'
import { connect } from "react-redux";

const mapDispatchToProps = {
  postloadtrips
}

const mapStateToProps = (state) => ({
  credentials: state.oauth.Credentials
});

class SavedTrip extends Component {
  // constructor(props){
  // super(props);
  // this.state = {};
  // }

  componentWillMount() {
    this.props.postloadtrips({ credentials: this.props.credentials.response.wc })
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedTrip);
