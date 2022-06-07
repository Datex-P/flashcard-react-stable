import {GoogleLogin} from 'react-google-login';
import { useHistory } from "react-router-dom";


// https://developers.google.com/identity/sign-in/web
// documentation google for login

function Google () {

  // let history = useHistory();

  // function onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  return (
    <div className='login__google posRelative overflowHidden'>
    {/* <div className="g-signin2" style={{width:'200px', height:'100px', background: 'green'}} onClick={onSignIn}></div> */}
       {/* <GoogleLogin
          clientId=""
          // render={renderProps => (
          //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
          // )}
          buttonText="Login"
          onSuccess={(res)=>{console.log(res, 'res')}}
          // onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}  
      />  */}
    </div>
  )
}

export default Google