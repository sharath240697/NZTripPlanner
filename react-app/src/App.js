import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar/NavigationBar';
import PlanTrip from './Components/PlanTrip/PlanTrip'
import SavedTrip from './Components/SavedTrip/SavedTrip'
import Dummy from './Components/Dummy/Dummy';


const App = () =>
{
 
console.log('in App Component');

    
    return (  
      <div className="App" >
          <NavBar/>
          <br/>
          <br/>
          <Dummy></Dummy>
          <Switch>
            {console.log('in app inside Switch component')}
               <Route exact path="/" component={PlanTrip} />
               {console.log('in app inside Switch after 1st route component')}
               <Route  path="/plantrip" component={PlanTrip} />
                <Route path="/savedtrip" component={SavedTrip} />
          </Switch>
      </div>
   );
}



export default (App);



/*,
    {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }} */