import {GoogleLogin} from 'react-google-login';
import { useHistory } from "react-router-dom";


// https://developers.google.com/identity/sign-in/web
// documentation google for login

function Google () {

  // let history = useHistory();

 

  return (
    <div className='login__google posRelative overflowHidden'>
     <div className="g-signin2" style={{width:'200px', height:'100px', background: 'green'}} onClick={onSignIn} dataOnsuccess="onSignIn" ></div> 
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