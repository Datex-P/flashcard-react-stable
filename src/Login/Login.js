import React, { useContext } from "react";
import { Context } from "../Context";
import flashcard from "../icons/flashcard-design-new.png";
import usersSolid from "../icons/users.svg";
import keysSolid from "../icons/keys.svg";
import LoginInput from "./LoginInput";
import "../styles.css";
import ParticleBackground from "./ParticlesBackground";
import Button from './Button'
import Facebook from './Facebook'
import Google from './Google'



function Login() {
  const { setUser} = useContext(Context);

  return (
    <ParticleBackground>
      <div className='login'>
        <div className='align-center flex-column login__container'>
            <div className='d-flex width100pc marginTop75px marginBottom15pc'>
              <img
                src={flashcard}
                alt='flashcard'
                className='width100px height100px'
              />
            </div>
            <LoginInput src={usersSolid} />
            <LoginInput src={keysSolid} pwdContainer />
            <Button login/>
            <Button/>
          <div className='login__field-distance flex-column justify-between align-center'>
            <Facebook setUser={setUser}/>
            <Google/>
          </div>
        </div>
      </div>
    </ParticleBackground>
  );
}

export default Login;
