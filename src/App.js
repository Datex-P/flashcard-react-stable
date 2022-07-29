import React from 'react'
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Login from './pages/Login/Login/Login'
import CheckEmail from './pages/Login/CheckEmail'
import Register from './pages/Login/Register/Register'
import NewPwd from './pages/Login/NewPwd'
import Settings from './pages/Deck/Settings/Settings'
import Stats from './pages/Deck/Stats/Stats'
import ForgotPassword from './pages/Login/ForgotPassword'


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
          <Route path='/' exact>
          <Redirect to='/login'/>
          </Route>
          <Route path='/logout'>
            <Login />  
          </Route>
          <Route path='/new_password'>
            <NewPwd />  
          </Route>
        </Switch>
      </Router>
    </div>

  )
}

