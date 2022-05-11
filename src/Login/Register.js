import React, { useContext, useState } from "react";
import { Context } from "../Context";
import "../styles.scss";
import "./login.css";
import flashcard from "../icons/flashcard-design-new.png";
import usersSolid from "../icons/users.svg";
import keysSolid from "../icons/keys.svg";
import Email from "../icons/email.svg";
import ParticleBackground from "./Particles/ParticlesBackground";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import eyesClosed from '../icons/eye-closed-pwd.png'
import eyesOpened from '../icons/eye-opened-pwd.svg'


function Register() {
  const { setRegister } = useContext(Context);
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
    if(data) {
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
            <div className='login__register__text'>Register</div>
            <div>Create an Account</div>
          </div>
           <form onSubmit={registerUser}> 
          <div className='align-center flex-column posRelative'>
              <div className='width200px'>
                <label htmlFor='user-name' className='login__choose-name'>Choose a user name</label>
                <img
                  src={usersSolid}                 
                  alt='click to enter user name'
                  className='width16px height16px login__img-login-password'
                  style={{transform:'translate(-130px, 28px)'}}
                />
                <input
                  id='user-name'
                  type='text'
                  placeholder='Username'
                  className='login__input'
                  onChange={(e)=>setName(e.target.value)}
                  // {...register("password", {
                  //   required: "true",
                  //   pattern: /(?<=^| )\d+\.\d+(?=$| )/,
                  // })}
                />
              </div>
            <div className='width200px mt-15px'>
              <label htmlFor='register-password-inp' className='login__choose-name login__field-distance mt-10px'>
                Choose a password
              </label>
                <img
                  src={showPassword? eyesOpened : eyesClosed}
                  id='register-password'
                  alt='click to enter user name'
                  className='width16px height16px login__img-login-password'
                  style={{transform:'translate(-130px, 28px)'}}
                  onClick={()=>setShowPassword(!showPassword)}
                />
                <input
                  id='register-password-inp'
                  value={password}
                  placeholder='Password'
                  type={showPassword? 'text':'password'}
                  onChange={(e)=>setPassword(e.target.value)}
                  className='login__input login__icon__keys'
                  // {...register("password", {
                  //   required: "true",
                  //   pattern: /(?<=^| )\d+\.\d+(?=$| )/,
                  // })}
                />
            </div>
            <div className='width200px mt-15px'>
              <label htmlFor='emailinput' className='login__choose-name'>Your email</label>
                <img
                  src={Email}
                  alt='enter email address'
                  className='width16px height16px login__img-login-password login__email-transform'
                />
                <input
                  value={email}
                  placeholder='Email'
                  type='text'
                  id='emailinput'
                  onChange={(e)=>setEmail(e.target.value)}
                  className='login__input'
                  // {...register("password", {
                  //   required: "true",
                  //   pattern: /(?<=^| )\d+\.\d+(?=$| )/,
                  // })}
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
