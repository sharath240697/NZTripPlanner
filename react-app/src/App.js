import React from 'react';
import logo from './logo.svg';
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar/NavigationBar';
import SearchBar from './Components/SearchBar/SearchBar';

function App() {
  return (
   <div>
    <NavBar/>
    <SearchBar/>
    </div>
  );
}
export default App;
