import React, {useState, useRef} from "react";
import flashcard from "../icons/flashcard-design-new.png";
import "../styles.scss";
import './login.css';
import ParticleBackground from "./Particles/ParticlesBackground";
import Button from "./Button";
import LoginWithSignUp from './LoginWithSignUp/LoginWithSignUp'
import eyesClosed from '../icons/eye-closed-pwd.png'
import eyesOpened from '../icons/eye-opened-pwd.svg'

function Login({ setUser}) {
  
  const [showPassword, setShowPassword] = useState(false)

  const loginRef = useRef(null)
  const passwordRef = useRef(null)

 
  async function loginUser(e) {

    e.preventDefault()
    //e preventDefault is needed because forms 
    //have a standard behaviour of redirecting
     let name = loginRef.current.value;
     let password = passwordRef.current.value;

   const response =  fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        password
      })
    })
    const data =  await response.json()

    if(data.user) {
      localStorage.setItem('token', data.user) //store token so it can be used
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
              className='width100px height100px'
            />
          </div>
          <div className='font-26px mb-20px login__col-navajowhite'>Login</div>
          <form 
            className='zIndex-5 width12rem' 
             onSubmit={loginUser}               
          >
            <div className= "login__LoginInput flex-column mb-20px">
              <div>
                <input
                  id='login'
                  placeholder='name'
                  ref={loginRef}
                  name='login'
                  className='login__input login__icon__user pl-25px'
                  required
                  pattern='[a-zA-Z0-9]'
                  title= 'Only a-z 0-9 allowed'
                />
              </div>
              <div>
              </div>
            </div>
            <div className= "login__LoginInput flex-column">
              <div>
                <input
                  id='password'
                  ref={passwordRef}
                  name='password'
                  placeholder='password'
                  type={showPassword? 'text':'password'}
                  required
                  pattern='[a-zA-Z0-9]'
                  title= 'Only a-z 0-9 allowed'
                  className='login__input login__icon__keys pl-30px login__eyeopen'
                />
                <img 
                  src={showPassword? eyesOpened : eyesClosed} 
                  alt='eyesClosed' 
                  className='width16px height16px' 
                  style={{transform:'translate(170px, -26px)'}} 
                  onClick={()=>setShowPassword(!showPassword)}
                />
              </div>
              <div>
              </div>
            </div>     
            <div className='login__button-container flex-column justify-between'>
              <Button text='Login' />
            </div>
          </form>
          <LoginWithSignUp setUser={setUser}/>      
        </div>
      </div>
    </ParticleBackground>

  );
}

export default Login;
