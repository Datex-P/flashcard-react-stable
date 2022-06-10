import React from 'react'
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import Login from './Login/Login/Login'
import CheckEmail from './Login/CheckEmail'
import Register from './Login/Register/Register'
import NewPwd from './Login/NewPwd'
import Settings from './Deck/Settings/Settings'
import Stats from './Deck/Stats/Stats'
import ForgotPassword from './Login/ForgotPassword'
import Amplify from 'aws-amplify';
import config from './aws-exports.js'

export default function App() {

Amplify.configure({
  // OPTIONAL - if your API requires authentication 
  Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      identityPoolId: 'us-east-1:9339b991-ea66-4303-928b-e8d190a8073e',
      // REQUIRED - Amazon Cognito Region
      region: 'US_EAST_1', 
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'XX-XXXX-X_abcd1234', 
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
  },
  API: {
      endpoints: [
          {
              name: "Flashcard",
              endpoint: "https://1234567890-abcdefgh.amazonaws.com"
          },
          {
              name: "MyCustomCloudFrontApi",
              endpoint: "https://api.my-custom-cloudfront-domain.com",

          }
      ]
  }
});
 
  return (
   
    <div>
      <Router>
        <Switch>                      
          <Route path='/login'>
            <Login />  
          </Route>
          <Route path='/main'>
            <LandingPage />  
          </Route>
          <Route path='/stats'>
            <Stats />
          </Route>
           <Route path='/checkemail'>
            <CheckEmail />
          </Route> 
          <Route path='/settings'>
            <Settings/>
          </Route>
           <Route path ='/forgotpassword' >
            <ForgotPassword/>
           </Route>
           <Route path ='/register' >
            <Register />
          </Route> 
          {/*when user is not set, display login, otherwise hide it*/}
          <Route path='/' exact>
          <Redirect to='/login'/>
          </Route>
          <Route path='/logout'>
            <Login />  
          </Route>
          <Route path='/new_password/:token'>
            <NewPwd />  
          </Route>
        </Switch>
      </Router>
    </div>

  )
}

