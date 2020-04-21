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

class SavedTrip extends Component {
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
    return (
      <div className="Table-Container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead className="Header">
              <TableRow>
                <TableCell>Trip Name</TableCell>
                <TableCell align="right">Source</TableCell>
                <TableCell align="right">Destination</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.to}</TableCell>
                  <TableCell align="right">{row.from}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default SavedTrip;
