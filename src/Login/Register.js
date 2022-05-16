import React, { useContext, useState, useRef } from "react";
import { Context } from "../Context";
import "../styles.scss";
import "./login.css";
import flashcard from "../icons/flashcard-design-new.png";
import usersSolid from "../icons/users.svg";
import Email from "../icons/email.svg";
import ParticleBackground from "./Particles/ParticlesBackground";
import { useHistory } from "react-router-dom";
import eyesClosed from '../icons/eye-closed-pwd.png'
import eyesOpened from '../icons/eye-opened-pwd.svg'

function Register() {
  const { setRegister } = useContext(Context);
  const [user, setUser] = useState('')
   const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const userNameRef = useRef(null)
  const passwordRef = useRef(null)


  const history = useHistory();

  function signUpHandler() {
    // setRegister(false);
   // setUser(true);
  }

  async function registerUser(e) {
    console.log('got triggered')
    e.preventDefault()
    //e preventDefault is needed because forms 
    //have a standard behaviour of redirecting
    let name = userNameRef.current.value;
    console.log(name, 'name in ref')
    let password = passwordRef.current.value;

   const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        password
      })
    })
    const data = await response.json()

    //data.status === 'ok'
    if(data.status === 'ok') {
      history.push('/login')
    }

    if(data.user) {
      alert('Login successful')
      window.location.href = '/main'
    } else {
      alert('Please check your username and password')
    }
    console.log(data)
  }

  return (
    <ParticleBackground>
      <div className='login'>
        <div className='align-center flex-column login__container'>
          <div className='justify-center width100pc mt-75px mb-15pc'>
            <img
              src={flashcard}
              alt='flashcard'
              className='login__flashcardBackground-top width100px height100px'
            />
          </div>
          <div className='flex-column align-center mb-25px'>
            <div className='login__register__text login__col-navajowhite'>Register</div>
            <div className='login__reset-col '>Create an Account</div>
          </div>
           <form onSubmit={registerUser}> 
          <div className='align-center flex-column posRelative'>
              <div className='width200px'>
                <img
                  src={usersSolid}                 
                  alt='click to enter user name'
                  className='width16px height16px login__img-login-password'
                  style={{transform:'translate(10px, 28px)'}}
                />
                <input
                  id='user-name'
                  type='text'
                  placeholder='Choose a user-name'
                  className='login__input'
                  ref={userNameRef}
                />
              </div>
            <div className='width200px mt-15px'>
                <img
                  src={showPassword? eyesOpened : eyesClosed}
                  id='register-password'
                  alt='click to enter user name'
                  className='width16px height16px login__img-login-password'
                  style={{transform:'translate(180px, 28px)'}}
                  onClick={()=>setShowPassword(!showPassword)}
                />
                <input
                  id='register-password-inp'
                  placeholder='Choose a password'
                  type={showPassword? 'text':'password'}
                  ref={passwordRef}
                  className='login__input login__icon__keys'
                  required
                  pattern='[a-zA-Z0-9]'
                  title= 'Only a-z 0-9 allowed'
                />
            </div>
            <div className='width200px mt-15px'>
                <img
                  src={Email}
                  alt='enter email address'
                  className='width16px height16px login__img-login-password login__email-transform'
                />
                <input
                  placeholder='Your email'
                  type='text'
                  id='emailinput'
                  className='login__input'
                  required
                  pattern='[a-zA-Z0-9]'
                  title= 'Only a-z 0-9 allowed'
                />
              </div>
            <div className='login__button__container login__field-distance justify-between flex-column width75pc height75px mt-20px'>
              <button
                className='login__button justify-center-align-center cursorPointer'
                onClick={signUpHandler}
              >
                Sign Up
              </button>
              <a
                href='/login'
                className='zIndex-5 justify-center login__link font-13px login__col-navajowhite cursorPointer'
              >
                Back to Login
              </a>
            </div>
          </div>
          </form> 
        </div>
      </div>
    </ParticleBackground>
  );
}

export default Register;
