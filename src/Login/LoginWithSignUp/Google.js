import {GoogleLogin} from 'react-google-login';
import { useHistory } from "react-router-dom";

function Google () {

  let history = useHistory();

  return (
    <div className='login__google posRelative overflowHidden'>
       <GoogleLogin
          clientId="120219528416-sosfr3o924155s2girgnofqkrvfa4qsr.apps.googleusercontent.com"
          // render={renderProps => (
          //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
          // )}
          buttonText="Login"
         // onSuccess={history.push("/main")}
          // onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}  
      /> 
    </div>
  )
}

export default Google