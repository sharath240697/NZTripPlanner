import React, { Component } from "react";
import {
  Table,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import "./TripTable.css";

class TripTable extends Component {
  createData(name, to, from, date) {
    return { name, to, from, date };
  }

  rows = [
    this.createData("Trip 1", "Auckland", "Wellington", ""),
    this.createData("Trip 2", "Auckland", "Christchurch", ""),
    this.createData("Trip 3", "Auckland", "Dunedin", ""),
    this.createData("Trip 4", "Auckland", "Wellington", ""),
  ];

  render() {
    console.log("here in table" + this.props.trips.root);
    return (
      <div className="Table-Container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="Header">
              <TableRow>
                <TableCell>Trip Name</TableCell>
                <TableCell align="right">Source</TableCell>
                <TableCell align="right">Destination</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.trips.root && this.props.trips.root.map((trip) => (
                <TableRow className={trip === this.props.selected ? "Selected" : "unselected"} onClick={() => this.props.setSelected(trip)} key={trip.trip.name}>
                  <TableCell component="th" scope="row">
                    {trip.trip.name}
                  </TableCell>
                  <TableCell align="right">{trip.trip.from.name}</TableCell>
                  <TableCell align="right">{trip.trip.to.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default TripTable;
