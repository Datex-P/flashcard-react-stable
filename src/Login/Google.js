import {GoogleLogin} from 'react-google-login';

function Google () {
  return (
    <GoogleLogin
              // clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              // render={renderProps => (
              //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
              // )}
              // buttonText="Login"
              // onSuccess={responseGoogle}
              // onFailure={responseGoogle}
              // cookiePolicy={'single_host_origin'}  
              />
  )
}

export default Google