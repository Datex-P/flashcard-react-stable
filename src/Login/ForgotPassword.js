import React from "react";
import "../styles.scss";
import './login.css';
import ParticleBackground from "./Particles/ParticlesBackground";
import Button from "./Button";
import Email from './Register/Email'
import FlashcardLogo from './FlashcardLogo'


function ForgotPassword({ setUser}) {

  // async function loginUser(e) {
  //   console.log('got triggered')
  //   e.preventDefault()
  //   //e preventDefault is needed because forms 
  //   //have a standard behaviour of redirecting
  //  const response = await fetch('http://localhost:4000/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name,
  //       password
  //     })
  //   })
  //   const data = await response.json()

  //   if(data.user) {
  //     localStorage.setItem('token', data.user) //store token so it can be used
  //     window.location.href = '/main'
  //   } else {
  //     alert('Please check your username and password')
  //   }
  //  console.log(data)
  // }
 
  return (

    <ParticleBackground>
      <div className='login'>
        <div className='align-center flex-column login__container'>
          <FlashcardLogo/>
          <div className='login__register__text  login__col-navajowhite'>
            Reset your Password
          </div>
          <form 
              className='zIndex-5 width12rem' 
             // onSubmit={loginUser}
          >
            <div className='login__reset-col'>
              Lost your password? You will receive a link to create a new password.
            </div>
            <div className= "login__LoginInput flex-column mb-20px">
              <Email/>
              <div className='login__button__container login__field-distance justify-between-align-center flex-column width100pc height75px mt-20px'>       
                <Button text='Reset password'/>
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

export default ForgotPassword;
