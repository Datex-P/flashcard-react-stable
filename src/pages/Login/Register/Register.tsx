import React, { useRef} from 'react';
import '../../../styles.scss';
import '../login.css';
//import ParticleBackground from '../Particles/ParticlesBackground';
import { useHistory } from "react-router-dom";
import Password from './Password';
import Email from './Email';
import UserName from './UserName';
import FlashcardLogo from '../FlashcardLogo';
import {RegisterLogic} from './RegisterLogic'

function Register() {
  
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  function signUpHandler() {
    // setRegister(false);
    // setUser(true);
  }

  const {registerUser} = RegisterLogic({userNameRef, passwordRef, history})

  return (
    // <ParticleBackground>
      <div className='login'>
        <div className='align-center flex-column login__container'>
          <FlashcardLogo register />
          <div className='flex-column align-center mb-25px'>
            <div className='login__register__text login__col-navajowhite'>
              Register
            </div>
            <div className='login__reset-col '>Create an Account</div>
          </div>
          <form onSubmit={registerUser}>
            <div className='align-center flex-column posRelative'>
              <UserName ref={userNameRef} />
              <Password ref={passwordRef} />
              <Email ref={emailRef} />
              <div className='login__button__container login__field-distance justify-between flex-column width75pc height75px mt-20px'>
                <button
                  className='login__button justify-center-align-center cursorPointer'
                  onClick={signUpHandler}
                >
                  Sign Up
                </button>
                <div
                  onClick={()=>{history.push('/login')}}
                  className='zIndex-5 justify-center login__link font-13px login__col-navajowhite cursorPointer'
                >
                  Back to Login
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    // </ParticleBackground>
  );
  }


export default Register;
