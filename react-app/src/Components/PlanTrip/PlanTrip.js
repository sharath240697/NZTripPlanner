import React, { Component } from 'react';
import './PlanTrip.css';
import SearchPlaceFrom from '../SearchPlaceFrom/SearchPlaceFrom';
import SearchPlaceTo from '../SearchPlaceTo/SearchPlaceTo';
import Button from '../Button/Button';

class PlanTrip extends Component {
   constructor(props){
    super(props);
    this.state = {};    
    this.navigate = this.navigate.bind(this);
   }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}


  navigate()
  {
    console.log("in navigate method")
  } 


  render() {
    return (
      <div>
      <div className="from_to">
                    <SearchPlaceFrom /> 
                    <SearchPlaceTo />
          </div>
           <br/><br/>

           <Button className='button' name='Navigate' onClick={this.navigate}></Button>
           <br/><br/>

           </div>
    );
  }
}

export default PlanTrip;