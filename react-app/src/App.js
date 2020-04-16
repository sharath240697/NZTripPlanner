import React from 'react';
import logo from './logo.svg';
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar/NavigationBar';
import SearchPlace from './Components/SearchPlace/SearchPlace'
import Button from './Components/Button/Button'

class App extends React.Component {
  
  constructor(props)
  {
    super(props);
    
    this.handle_from_place_value = this.handle_from_place_value.bind(this);
    this.handle_to_place_value = this.handle_to_place_value.bind(this);
    this.navigate = this.navigate.bind(this);


  }

   handle_from_place_value(from)
  {
    console.log('in App.js handle from method');
    console.log(from);
  }

   handle_to_place_value(to)
  {
    console.log('in App.js handle to method');
    console.log(to);
  }

  navigate()
  {
    console.log("in navigate method")
  }

  render(){
    return (
      <div className="App" >
          <NavBar/>
          <br/>
          <br/>

          <div className="from_to">
                    <SearchPlace placeHolder='From' onSelect={this.handle_from_place_value}/> 
                    <SearchPlace placeHolder='To' onSelect={this.handle_to_place_value}/>
          </div>
          <br/><br/>

          <Button className='button' name='Navigate' onClick={this.navigate}></Button>
          <br/><br/>

      </div>
   );
    }
  
}
export default App;
