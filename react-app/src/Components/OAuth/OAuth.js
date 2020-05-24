import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import './OAuth.css';
import { store } from '../../index'
import { connect } from "react-redux";
import { saveOathDetails } from '../../Actions/actions';
import { postloadtrips } from '../../Actions/expressActions'




const mapDispatchToProps = {
    saveOathDetails,
    postloadtrips
}

const mapStateToProps = (state) => ({
    name: state.oauth.Credentials.name,
    accessToken: state.oauth.Credentials.accessToken,
    loggedIn: state.oauth.Credentials.loggedIn,
    LoginDetails: state.oauth.Credentials.LoginDetails,
    expiry: state.oauth.Credentials.expiry
});

export function OAuth(props) {

    const responseGoogle = (response) => {
        console.log(response)
        console.log("inside responseGoogle function ")
        if (response.profileObj === undefined) {
            store.dispatch(saveOathDetails({

                name: undefined,
                loggedIn: false,
                LoginDetails: undefined,
                expiry: undefined,
                response: response
            }))
        } else {

            store.dispatch(saveOathDetails({
                name: response.profileObj.name,
                loggedIn: true,
                LoginDetails: undefined,
                expiry: response.tokenObj.expires_at,
                response: response
            }))
            props.postloadtrips({ credentials: response.wc });

        }
    }
    if (props.name === undefined) {
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

                />
            </div>
        )
    } else {
        return (
            <div>
                <GoogleLogin
                    clientId="4273262105-e7eogru655unj4t3q20ii204dvk8u397.apps.googleusercontent.com"
                    buttonText={"Signed In As " + props.name}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    name={props.name}
                    loggedIn={props.loggedIn}
                    accessToken={props.accessToken}
                    scope="https://www.googleapis.com/auth/drive.file"

                />
            </div>
        )
    }

}
//export default OAuth
export default connect(mapStateToProps, mapDispatchToProps)(OAuth);
