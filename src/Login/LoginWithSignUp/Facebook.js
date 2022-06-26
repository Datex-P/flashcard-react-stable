import FacebookLogin from "@greatsumini/react-facebook-login";
import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../../Context";

function Facebook() {
  let history = useHistory();
  const { setUser, apiURL } = useContext(Context);
  let FACEBOOK_ID = process.env.REACT_APP_FACEBOOK_ID

  async function facebookUser(value) {
    try {
      let { email, name } = value;
      let response = await fetch(`${apiURL}/facebook_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
       await response

      if (response.status === 200) {
        history.push('/main');
        setUser(email); //current logged in user is primary key in database
      }
    } catch (err) {
      console.log(err, 'err here');
    }
  }

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
          history.push('/main')
        }}
      />
    </div>
  );
}
//test test
export default Facebook;
