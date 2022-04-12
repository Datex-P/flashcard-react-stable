import React from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';
import flashcard from "../icons/flashcard.svg";
import flash from "../icons/flash.svg";
import usersSolid from "../icons/users.svg";
import keysSolid from "../icons/keys.svg";
import LoginInput from './LoginInput'
// import {GoogleLogin} from 'react-google-login';
import '../styles.css'
import ParticleBackground from './ParticlesBackground';
//import env from '../env.json'
import  { useContext } from "react";
import { Context } from "../Context";

//let facebookID = process.env.Facebook_ID;

 
function Login () {

  const {setUser} = useContext(Context)
 
    return (

      <ParticleBackground>
        <div className='login'>
           <img src = {flashcard} alt = 'flashcard' className='login__flashcardBackground-top' />
           <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-179px', top:'-46px'}}/>
           <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-177px',top: '-56px'}}/>
           <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-179px', top:'-67px'}}/>   
           <div className='login__login-password-container align-center flex-column'>
              <LoginInput src={usersSolid}/>
              <LoginInput src={keysSolid}/>
            <button className='login__button'>Register</button>
            <FacebookLogin
                // appId={`${facebookID}`}
                style={{
                  backgroundColor: '#4267b2',
                  color: '#fff',
                  fontSize: '16px',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '4px',
                  position: 'absolute',
                  top: '110px'
                }}
                onSuccess={(response) => {
                  // console.log('Login Success!', response);
                //  setUser(true)
                  // <LandingPage/>
                }}
                onFail={(error) => {
                  console.log('Login Failed!', error);
                }}
                onProfileSuccess={(response) => {
                  console.log('Get Profile Success!', response);
                  setUser(true)
                }}
            />
           </div>   
        </div>
  </ParticleBackground>
    )
  }
 
export default Login;