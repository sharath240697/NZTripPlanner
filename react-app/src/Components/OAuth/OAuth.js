import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import './OAuth.css';
import { store } from '../../index'
import { connect } from "react-redux";
import { saveOathDetails } from '../../Actions/actions';



const mapDispatchToProps = {
    saveOathDetails
}

const mapStateToProps = (state) => ({
    name: state.oauth.Credentials.name,
    accessToken: state.oauth.Credentials.accessToken,
    loggedIn: state.oauth.Credentials.loggedIn,
    LoginDetails: state.oauth.Credentials.LoginDetails,
    expiry: state.oauth.Credentials.expiry
});

export function OAuth (props) {

    const [name, setName] = useState(props.name);

    const responseGoogle = (response) => {
        console.log(response)
        console.log("inside responseGoogle function ")
        if (response.profileObj === undefined) {
            setName(undefined)
            store.dispatch(saveOathDetails({
                Credentials: {
                    name: undefined,
                    accessToken: undefined,
                    loggedIn: false,
                    LoginDetails: undefined,
                    expiry: undefined
                } 
            }))
        } else {
            setName(response.profileObj.name)
            store.dispatch(saveOathDetails({
                Credentials: {
                    name: response.profileObj.name,
                    accessToken: response.tokenObj.access_token,
                    loggedIn: true,
                    LoginDetails: undefined,
                    expiry: response.tokenObj.expires_at
                }
            }))
        }   
    }
        if (name === undefined) {
            return (
                <div>
                    <GoogleLogin
                        clientId="4273262105-e7eogru655unj4t3q20ii204dvk8u397.apps.googleusercontent.com"
                        buttonText="Sign In"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        scope="https://www.googleapis.com/auth/drive.file"
                        name={props.name}
                        loggedIn={props.loggedIn}
                        accessToken={props.accessToken}
                        onClick={props.LoginDetails}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <GoogleLogin
                        clientId="4273262105-e7eogru655unj4t3q20ii204dvk8u397.apps.googleusercontent.com"
                        buttonText={"Signed In As " + name}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        name={props.name}
                        loggedIn={props.loggedIn}
                        accessToken={props.accessToken}
                        scope="https://www.googleapis.com/auth/drive.file"
                        onClick={props.LoginDetails}
                    />
                </div>
            )
        }

    }
//export default OAuth
export default connect(mapStateToProps, mapDispatchToProps)(OAuth);
