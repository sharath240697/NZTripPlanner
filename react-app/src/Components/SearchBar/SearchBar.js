import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {  
    render() {
      return (
        <form >
          <label>
            Source:
            <input type="text" />
          </label>
          <label>
            Destination:
            <input type="text" />
          </label>
          <input type="Button" value="Search" />
        </form>
      );
    }
  }


export default SearchBar;