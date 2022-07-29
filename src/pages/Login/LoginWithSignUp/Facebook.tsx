import FacebookLogin from "@greatsumini/react-facebook-login";
import React from "react";
import {FacebookLogic} from './FacebookLogic'

function Facebook() {
  
  let FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_ID

  const {facebookUser} = FacebookLogic()

  return (
    <div className='facebookBtn'>
      <FacebookLogin
        appId={`${FACEBOOK_ID}`}
        style={{
          backgroundColor: "#4267b2",
          color: "#fff",
          fontSize: "13px",
          padding: "12px 24px",
          border: "none",
          borderRadius: "4px",
          position: "relative",
          zIndex: "4",
          cursor: "pointer",
        }}
        onSuccess={(response) => {
          console.log('hello from on success', response);
        }}
        onFail={(error) => {
          console.log('Login Failed!', error);
        }}
        onProfileSuccess={(response) => {
          facebookUser(response);
          console.log('Get Profile Success!', response);
        //  history.push('/main')
        }}
      />
    </div>
  );
}

export default Facebook;
