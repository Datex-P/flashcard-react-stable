import React, { useRef, useState, useContext } from "react";
import "../styles.scss";
import "./login.css";
import ParticleBackground from "./Particles/ParticlesBackground";
import { useHistory } from "react-router-dom";
import FlashcardLogo from "./FlashcardLogo";
import Password from "./Register/Password";
import Alert from "react-bootstrap/Alert";
import { Context } from '../Context';

function NewPwd() {
  
  const {apiURL} = useContext(Context)
  
  const passwordRef1 = useRef(null);
  const passwordRef2 = useRef(null);
  const [pwdDifferent, setPwdDifferent] = useState(false);
  const [updatedPassword, setUpdatedPassword] = useState(false)
  const [tokenCorrupted, setTokenCorrupted] = useState(false)
  
  const history = useHistory();

  async function resetPwdHandler(e) {
    if (passwordRef1.current.value === passwordRef2.current.value) {
      try {
        e.preventDefault();
        //e preventDefault is needed because forms
        //have a standard behaviour of redirecting
        let new_password = passwordRef1.current.value;
        let url = window.location.href.indexOf("=");
        let token = window.location.href.slice(url + 1);
   
        const response = await fetch(`${apiURL}/confirm_new_pwd`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            new_password,
          }),
        });
        const data = await response

        if (data.status === 200) {
          setUpdatedPassword(true)
          setTimeout(()=>{
          history.push('/login');
          setUpdatedPassword(false)
          },6000)
        }
        if (data.status === 500) {
          setTokenCorrupted(true)
          setTimeout(()=>{
          history.push('/forgotpassword');
          setTokenCorrupted(false)
          },6000)
        }
      } catch (error) {
        console.log(error, "error here");
      }
    } else {
      setPwdDifferent(true);
      setTimeout(() => {
        setPwdDifferent(false);
      }, 4000);
    }
  }

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
