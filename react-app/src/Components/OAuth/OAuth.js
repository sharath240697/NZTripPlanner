import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import './OAuth.css';

export class OAuth extends Component {
    responseGoogle=(response)=>{
        console.log(response);
        console.log(response.profileObj);
    }
    render() {
        return (
            <div>
                <GoogleLogin
                clientId="4273262105-e7eogru655unj4t3q20ii204dvk8u397.apps.googleusercontent.com"
                buttonText="Sign In"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    }
}
export default OAuth