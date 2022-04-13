import React, {useContext} from 'react';
import flashcard from "../icons/flashcard.svg";
import flash from "../icons/flash.svg";
import usersSolid from "../icons/users.svg";
import keysSolid from "../icons/keys.svg";
import LoginInput from './LoginInput'
import '../styles.css'
import ParticleBackground from './ParticlesBackground';
import { Context } from "../Context";

function Register () {

  const {setRegister, setUser} = useContext(Context)
 
    return (

      <ParticleBackground>
        <div className='login'>
          <img src = {flashcard} alt = 'flashcard' className='login__flashcardBackground-top' /> 
           {/* <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-179px', top:'-46px'}}/>
           <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-177px',top: '-56px'}}/>
           <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-179px', top:'-67px'}}/>     */}
           <div className='register__text justify-center'>Register</div>
           <div className='align-center flex-column'>
            <div>Choose a user name.</div>
            <LoginInput src={usersSolid} signUp/>
            <div className='login__field-distance'>Choose a password.</div>
            <LoginInput src={keysSolid} signUp/> 
            <div className='login__button__container login__field-distance'>
            <button 
                className='login__button justify-center' 
                // onClick={()=>{setRegister(false) 
                //               setUser(true)
                // }}
              >
                Sign Up
              </button>
              <button 
                className='login__button justify-center' 
                onClick={()=>{setRegister(false) 
                              setUser(true)
                }}
              >
                Back to Login
              </button>
            </div>
          
          
           </div>   
        </div>
  </ParticleBackground>
    )
  }
 
export default Register;