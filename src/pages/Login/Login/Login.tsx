import React, {useRef, useContext, useEffect} from "react";
import '../../../styles.scss';
import '../login.css';
import { Context } from '../../../context/Context';
//import ParticleBackground from '../Particles/ParticlesBackground';
import Button from '../Button';
import LoginWithSignUp from '../LoginWithSignUp/LoginWithSignUp'
import UserName from './UserName'
import Password from './Password'
import flashcard from '../../../icons/flashcard-design-new.png';
import {LoginLogic} from './LoginLogic'

function Login() {

  const { dataBase, setDataBase, emailAddress} = useContext(Context)

  const userNameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

 // LegacyRef<HTMLInputElement> | undefined
  // https://stackoverflow.com/questions/55677600/typescript-how-to-pass-object-is-possibly-null-error
const {loginUser} = LoginLogic({userNameRef, passwordRef})

useEffect(()=>{
  console.log(dataBase, 'database here')
},[setDataBase, dataBase])


  return (

    // <ParticleBackground>
      <div className='login'>
        <div className='align-center flex-column login__container'>
          <div className='justify-center width100pc mt-75px mb-15pc'>
            <img
              src={flashcard}
              alt='flashcard'
              className='width100px height100px'
            />
          </div>
          <div className='font-26px mb-20px login__col-navajowhite'>
          Login
          </div>
          <form 
            className='zIndex-5 width12rem' 
            onSubmit={loginUser}
            method='post' action='/login'               
          >
            <UserName ref={userNameRef}/>        
            <Password ref={passwordRef}/>    
            <div className='mt-15px height75px flex-column justify-between'>
              <Button emailAddress={emailAddress} text='Login' />
            </div>
          </form>
          <LoginWithSignUp />      
        </div>
      </div>
    // </ParticleBackground>
  );
}

export default Login;
