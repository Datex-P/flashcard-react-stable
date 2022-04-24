import React, { useContext } from "react";
import { Context } from "../Context";
import "../styles.css";
import "./login.css";
// import flashcard from "../icons/flashcard.svg"; old flashcard design
import flashcard from "../icons/flashcard-design-new.png";

import usersSolid from "../icons/users.svg";
import keysSolid from "../icons/keys.svg";
import ParticleBackground from "./Particles/ParticlesBackground";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register({ setUser }) {
  const { setRegister } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  function signUpHandler() {
    setRegister(false);
    setUser(true);
  }

  return (
    <ParticleBackground>
      <div className='login'>
        <div className='align-center flex-column login__container'>
          <div className='justify-center width100pc mt-75px marginBottom15pc'>
            <img
              src={flashcard}
              alt='flashcard'
              className='login__flashcardBackground-top width100px height100px'
            />
          </div>
          <div className='flex-column align-center mb-25px'>
            <div className='register__text'>Register</div>
            <div>Create an Account</div>
          </div>
          <div className='align-center flex-column'>
            <div>
              <div className='login__choose-name'>Choose a user name.</div>
              <div>
                <img
                  src={usersSolid}
                  alt='click to enter user name'
                  className='login__img-login-password'
                />
                <input
                  // value='xyz'
                  // value={this.state.login}
                  // onChange={e=>this.setState({login:e.target.value})}
                  id='password'
                  className='login__input'
                  {...register("password", {
                    required: "true",
                    pattern: /(?<=^| )\d+\.\d+(?=$| )/,
                  })}
                />
              </div>
            </div>
            <div>
              <div className='login__choose-name login__field-distance mt-10px'>
                Choose a password.
              </div>
              <div>
                <img
                  src={keysSolid}
                  alt='click to enter user name'
                  className='login__img-login-password'
                />
                <input
                  // value='xyz'
                  // value={this.state.login}
                  // onChange={e=>this.setState({login:e.target.value})}
                  id='password'
                  className='login__input'
                  {...register("password", {
                    required: "true",
                    pattern: /(?<=^| )\d+\.\d+(?=$| )/,
                  })}
                />
              </div>
            </div>
            <div className='login__button__container login__field-distance'>
              <a
                href='/login'
                style={{ textDecoration: "none", color: "black" }}
                className='login__button justify-center'
              >
                Back to Login
              </a>
              <button
                className='login__button justify-center-align-center'
                onClick={signUpHandler}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </ParticleBackground>
  );
}

export default Register;
