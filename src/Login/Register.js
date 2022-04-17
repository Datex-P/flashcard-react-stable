import React, {useContext} from 'react';
import { Context } from "../Context";
import '../styles.css'
import flashcard from "../icons/flashcard.svg";
import usersSolid from "../icons/users.svg";
import keysSolid from "../icons/keys.svg";
import ParticleBackground from './Particles/ParticlesBackground';
import { useHistory } from 'react-router-dom';

function Register () {
  
  const {setRegister, setUser} = useContext(Context)
  const history = useHistory();
 
    return (
      // <div>hello</div>
      // <ParticleBackground>
        <div className='login'>
          <img src = {flashcard} alt = 'flashcard' className='login__flashcardBackground-top' /> 
           {/* <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-179px', top:'-46px'}}/>
           <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-177px',top: '-56px'}}/>
           <img src = {flash} alt = 'flashcard' className= 'login__flashcardBackground' style={{ left: '-179px', top:'-67px'}}/>     */}
           <div className='register__text justify-center'>Register</div>
            <div className='align-center flex-column'>
            <div>Choose a user name.</div>
            {/* <LoginInput src={usersSolid} signUp/> */}
            <div className='login__field-distance'>Choose a password.</div>
            {/* <LoginInput src={keysSolid} signUp/> */}
            <div className='login__button__container login__field-distance'>
            <button 
                className='login__button justify-center' 
                onClick={()=>{setRegister(false) 
                              setUser(true)
                }}
              >
                Sign Up
              </button>
              <button 
                className='login__button justify-center' 
                onClick={()=>{
             //     setRegister(false) 
               //            setUser(true)
           history.push('/login');
                }}
              >
                Back to Login
              </button>
            </div> 
          
          
           </div>    
        </div>
  // </ParticleBackground>
    )
  }
 
export default Register;