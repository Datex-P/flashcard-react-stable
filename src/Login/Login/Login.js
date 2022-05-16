import React, {useRef} from "react";
import flashcard from "../../icons/flashcard-design-new.png";
import "../../styles.scss";
import '../login.css';
import ParticleBackground from "../Particles/ParticlesBackground";
import Button from "../Button";
import LoginWithSignUp from '../LoginWithSignUp/LoginWithSignUp'
import UserName from './UserName'
import Password from './Password'

function Login({ setUser}) {
  
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
            <UserName/>        
            <Password/>    
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
