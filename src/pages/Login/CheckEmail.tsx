import React, {useContext} from "react";
import '../../styles.scss';
import './login.css';
//import ParticleBackground from "./Particles/ParticlesBackground";
import Button from './Button';
import FlashcardLogo from './FlashcardLogo';
import { Context } from '../../context/Context';
import { useHistory } from "react-router-dom";

function CheckEmail() {
  
  const { emailAddress} = useContext(Context);
  const history = useHistory();

  return (
    // <ParticleBackground>
      <div className='login'>
        <div className='align-center flex-column login__container'>
          <FlashcardLogo register />
          <div className='flex-column align-center mb-25px'>
            <div className='login__register__text login__col-navajowhite'>
              Register
            </div>
            <div className='login__reset-col mb-25px'>
              You're one click away...
            </div>
            <Button
              emailAddress={emailAddress}
              verify
              text='Verify your email address'
            />
            <div
              onClick={() => {history.push('/login')}}
              className='mt-35px zIndex-5 justify-center login__link font-13px login__col-navajowhite cursorPointer'
            >
              Back to Login
            </div>
          </div>
        </div>
      </div>
    // </ParticleBackground>
  );
}

export default CheckEmail;
