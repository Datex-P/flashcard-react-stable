import React from "react";
import "../styles.scss";
import "./login.css";
import ParticleBackground from "./Particles/ParticlesBackground";
import Button from "./Button";
import FlashcardLogo from "./FlashcardLogo";
import { Context } from "../Context";
import { useContext } from "react";

function CheckEmail() {
  
  const { emailAdress} = useContext(Context);

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
              emailAdress={emailAdress}
              verify
              text='Verify your email address'
            />
            <a
              href='/login'
              className='mt-35px zIndex-5 justify-center login__link font-13px login__col-navajowhite cursorPointer'
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    // </ParticleBackground>
  );
}

export default CheckEmail;
