import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import './OAuth.css';
import { store } from '../../index'
import { connect } from "react-redux";
import { saveOathDetails } from '../../Actions/expressActions';

const mapDispatchToProps = {
    saveOathDetails
  }

   
  
export class OAuth extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            loggedIn: false,
            access_token: undefined,
               expiryDate: undefined
        };
    }
    responseGoogle=(response)=>{
         console.log(response);
         console.log(response.profileObj);
        console.log("inside responseGoogle function ")
        if(response.profileObj === undefined) {
            this.setState({name: undefined})
            this.setState({access_token: undefined})
            this.setState({expiryDate: undefined})
            this.setState({googleId: undefined})
            this.setState({idToken: undefined})
            this.setState({loggedIn: false})
        } else {
            this.setState({name: response.profileObj.name})
            this.setState({access_token: response.tokenObj.access_token})
             this.setState({expiryDate: response.tokenObj.expires_at})
             this.setState({googleId: response.profileObj.googleId})
             this.setState({idToken: response.tokenObj.id_token})
            this.setState({loggedIn: true})
           // saveOathDetails(this.state.accessToken,this.state.loggedIn,this.state.idToken);
        }
        console.log("access_token: " + this.state.access_token);
        console.log("logged in: " + this.state.loggedIn);
        console.log("name: " + this.state.name);
       console.log("expiryDate: " + this.state.expiryDate);
        console.log("googleId: " + this.state.googleId);
        console.log("idToken: " + this.state.idToken);
        if(this.state.loggedIn === true) {
            store.dispatch(saveOathDetails({        
                access_token:response.tokenObj.access_token,
                expires_at:response.tokenObj.expires_at  
            }));
        } else {
            store.dispatch(saveOathDetails({        
                access_token:undefined,
                expires_at:undefined 
            }));
        }     
    }
    render() {
        if (this.state.name === undefined) {
            return (
                <div>
                    <GoogleLogin
                    clientId="4273262105-e7eogru655unj4t3q20ii204dvk8u397.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    scope="https://www.googleapis.com/auth/drive.file"
                    name={this.state.name}
                    loggedIn={this.state.loggedIn}
                    access_token={this.state.access_token}
                     expiryDate={this.state.expiryDate}
                    onClick={this.LoginDetails}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <GoogleLogin
                    clientId="4273262105-e7eogru655unj4t3q20ii204dvk8u397.apps.googleusercontent.com"
                    buttonText={"Login " + this.state.name}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    name={this.state.name}
                    loggedIn={this.state.loggedIn}
                    access_token={this.state.access_token}
                    idToken={this.state.idToken}
                    googleId={this.state.googleId}
                    scope="https://www.googleapis.com/auth/drive.file"
                    onClick={this.LoginDetails}
                    />
                </div>
            )
        }
        
    }
}
export default OAuth
//export default connect(mapDispatchToProps)(OAuth);


//export default connect()(OAuth);