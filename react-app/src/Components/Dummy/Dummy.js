import React  from 'react';
import { connect } from 'react-redux'
import './Dummy.css';
import {fetchtestobject} from '../../Actions/expressActions'



const mapStateToProps = state => ( 
          
  {description: state.places.from.description,
   placeholder: state.places.from.placeholder,
   test_status: state.places.testdata.status,
   test_message: state.places.testdata.message
 } ) 

 const mapDispatchToProps = {
   fetchtestobject
}

const Dummy = props => {
  console.log('in Dummy.js')
  console.log(props.fetchtestobject());
  return (<div>
    <h2>{props.test_message}</h2>
    <h2>hello</h2>
    <h1>{props.description}</h1>
  </div>)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dummy);
//export default connect(mapStateToProps)(Dummy);