import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import './OAuth.css';
import { store } from '../../index'
import { connect } from "react-redux";
import { saveOAuthData } from '../../Actions/actions';

const mapDispatchToProps = {
    saveOAuthData
}

const mapStateToProps = (state) => ({
    credentials: state.oauth.Credentials
});


export class OAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: undefined,
            loggedIn: false,
            accessToken: undefined,
            idToken: undefined,
            googleId: undefined
        };
    }
    responseGoogle = (response) => {
        // console.log(response);
        // console.log(response.profileObj);
        console.log("inside responseGoogle function ")
        if (response.profileObj === undefined) {
            this.setState({ name: undefined })
            this.setState({ accessToken: undefined })
            this.setState({ idToken: undefined })
            this.setState({ googleId: undefined })
            this.setState({ loggedIn: false })
        } else {
            this.setState({ name: response.profileObj.name })
            this.setState({ accessToken: response.tokenObj.access_token })
            this.setState({ googleId: response.profileObj.googleId })
            this.setState({ idToken: response.tokenObj.id_token })
            this.setState({ loggedIn: true })
        }
        console.log("accessToken: " + this.state.accessToken);
        console.log("logged in: " + this.state.loggedIn);
        console.log("name: " + this.state.name);
        console.log("idToken: " + this.state.idToken);
        console.log("googleId: " + this.state.googleId);
        store.dispatch(saveOAuthData(response));
    }
    render() {
        if (this.state.name === undefined) {
            return (
                <div>
                    <GoogleLogin
                        clientId="4273262105-e7eogru655unj4t3q20ii204dvk8u397.apps.googleusercontent.com"
                        buttonText="Save trip"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        scope="https://www.googleapis.com/auth/drive.file"
                        name={this.state.name}
                        loggedIn={this.state.loggedIn}
                        accessToken={this.state.accessToken}
                        idToken={this.state.idToken}
                        googleId={this.state.googleId}
                        onClick={this.LoginDetails}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <GoogleLogin
                        clientId="4273262105-e7eogru655unj4t3q20ii204dvk8u397.apps.googleusercontent.com"
                        buttonText={"Signed In As " + this.state.name}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        name={this.state.name}
                        loggedIn={this.state.loggedIn}
                        accessToken={this.state.accessToken}
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
//export default OAuth
export default connect(mapStateToProps, mapDispatchToProps)(OAuth);