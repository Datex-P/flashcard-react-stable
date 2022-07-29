import React, { useRef, useState, useContext } from "react";
import '../../styles.scss';
import './login.css';
//import ParticleBackground from "./Particles/ParticlesBackground";
import FlashcardLogo from './FlashcardLogo';
import Password from './Register/Password';
import Alert from "react-bootstrap/Alert";
import { Context } from '../../context/Context';
import {NewPwdLogic} from './NewPwdLogic'

function NewPwd() {
  
  const {apiURL} = useContext(Context)
  
  const passwordRef1 = useRef<HTMLInputElement>(null);
  const passwordRef2 = useRef<HTMLInputElement>(null);
  const [pwdDifferent, setPwdDifferent] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState(false)
  const [tokenCorrupted, setTokenCorrupted] = useState(false)

  const {resetPwdHandler} = NewPwdLogic({
    apiURL,
    passwordRef1,
    passwordRef2,
    setPwdDifferent,
    setUpdatedPassword,
    setTokenCorrupted
  })

  return (
    // <ParticleBackground>
      <div className='login'>
        <div className='align-center flex-column login__container'>
          <FlashcardLogo register />
          <div className='flex-column align-center mb-25px'>
            <div className='login__register__text login__col-navajowhite'>
              New Password
            </div>
            <div className='login__reset-col'>Type your new password.</div>
          </div>
          <form onSubmit={resetPwdHandler}>
            <div className='align-center flex-column posRelative'>
              <Password ref={passwordRef1} />
              <Password ref={passwordRef2} />
              <div className='login__button__container login__field-distance justify-between flex-column width75pc height75px mt-20px'>
                <button className='login__button justify-center-align-center cursorPointer'>
                  Reset Password
                </button>
              </div>
            </div>
          </form>
          {
            (pwdDifferent || updatedPassword) && 
            <div className='bs-5'>
              <Alert 
                  variant={(pwdDifferent || tokenCorrupted)? 'danger': 'success'} 
                  className='height35px'
              >
                {pwdDifferent?
                'Passwords are different.':
                updatedPassword?
                'Password updated successfully.':
                'Server Error. Please resend email.'
                }
              </Alert>
            </div>         
          }
        </div>
      </div>
    // </ParticleBackground>
  );
}

export default NewPwd;
