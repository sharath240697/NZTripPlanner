import React from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar/NavigationBar';
import PlanTrip from './Components/PlanTrip/PlanTrip'
import SavedTrip from './Components/SavedTrip/SavedTrip'
import {store} from './index'
import Dummy from './Components/Dummy/Dummy';











class App extends React.Component {
  
  constructor(props)
  {
    super(props);   
  }
  render(){
    
    return (
      <div className="App" >
          <NavBar/>
          <br/>
          <br/>
          <Dummy></Dummy>
          <Switch>
               <Route exact path="/" component={PlanTrip} />
               <Route  path="/plantrip" component={PlanTrip} />
                <Route path="/savedtrip" component={SavedTrip} />
          </Switch>
          
        
         

      </div>
   );
    }
  
}



export default (App);
