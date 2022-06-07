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


export default function App() {
 
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

