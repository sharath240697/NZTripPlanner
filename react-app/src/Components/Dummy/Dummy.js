import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Dummy.css';



const mapStateToProps = state => ( 
          
  {description: state.places.from.description,
   placeholder: state.places.from.placeholder,
   
 } ) 

const Dummy = props => {
  console.log(props.description);
  return (<div>
    <h2>hello</h2>
    <h1>{props.description}</h1>
  </div>)
}

 export default connect(mapStateToProps)(Dummy);