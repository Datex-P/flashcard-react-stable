import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import Login from './Login/Login/Login'
import CheckEmail from './Login/CheckEmail'
import Register from './Login/Register/Register'
import Settings from './Deck/Settings/Settings'
import Stats from './Deck/Stats/Stats'
import ForgotPassword from './Login/ForgotPassword'


export default function App() {
  const [user, setUser] = useState(null)

  return (
   
    <div>
      <Router>

        {/* {user?<LandingPage /> : <Redirect to='./login'/>} */}
        {/* {registerUser?<LandingPage /> : <Redirect to='./register'/>} */}
        {/* <LandingPage/> */}
      {/* {registerUser?<Register path='register'/>: <Login path='login' />} */}
         
        <Switch>                      
          <Route path='/login'>
            <Login  setUser={setUser}/>  
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
          {/* {!user &&
          <Route path ='/login' >
            <Login setUser={setUser}/>
          </Route>
          } */}
           <Route path ='/forgotpassword' >
            <ForgotPassword/>
           </Route>
           <Route path ='/register' >
            <Register setUser={setUser}/>
          </Route> 
          {/*when user is not set, display login, otherwise hide it*/}
          <Route path='/' exact>
          <Redirect to='/login'/>
          </Route>
          <Route path='/logout'>
            <Login  setUser={setUser}/>  
          </Route>
        </Switch>

      </Router>
    </div>

  )
}

