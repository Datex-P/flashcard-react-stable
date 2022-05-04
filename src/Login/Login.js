import React from "react";
import { useForm } from "react-hook-form";
import flashcard from "../icons/flashcard-design-new.png";
import "../styles.scss";
import './login.css';
import ParticleBackground from "./Particles/ParticlesBackground";
import Button from "./Button";
import LoginWithSignUp from './LoginWithSignUp/LoginWithSignUp'

function Login({ setUser}) {
  const {register,handleSubmit,formState: { errors }} = useForm();

  const onSubmit = (data) => console.log(data);

  return (
  <ParticleBackground>
    <div className='login'>
      <div className='align-center flex-column login__container'>
        <div className='justify-center width100pc mt-75px mb-15pc'>
          <img
            src={flashcard}
            alt='flashcard'
            className='width100px  height100px'
          />
        </div>
        <form className='zIndex-5 width12rem' onSubmit={handleSubmit(onSubmit)}>
          <div className= "login__LoginInput flex-column mb-20px">
            <div>
              <input
                // value='xyz'
                // value={this.state.login}
                // onChange={e=>this.setState({login:e.target.value})}
                id='login'
                className='login__input login__icon__user pl-25px'
                {...register("login", {
                  required: "true", pattern: /[a-zA-Z0-9]/,
                })}
              />
            </div>
            <div>
              {errors?.login?.type === "pattern" && (
                <div className='ml-30px'>Only alphanumeric characters allowed</div>
              )}
              {errors?.login?.type === "required" && (
                <div className='ml-30px'>This field is required</div>
              )}
            </div>
          </div>
          <div className= "login__LoginInput flex-column">
            <div>

              <input
                // value='xyz'
                // value={this.state.login}
                // onChange={e=>this.setState({login:e.target.value})}
                id='password'
                type='password'
                className='login__input login__icon__keys pl-30px'
                {...register("password", {
                  required: "true", pattern: /(?<=^| )\d+\.\d+(?=$| )/,
                })}
              />
            </div>
            <div>
              {errors?.password?.type === "pattern" && (
                <div className='ml-30px mt-5px'>Must be a number, written in dot notation like 10.0.</div>
              )}
              {errors?.password?.type === "required" && (
                <div className='ml-30px mt-5px'>This field is required</div>
              )}
            </div>
          </div>     
          <div className='login__button-container flex-column justify-between'>
            <Button />
          </div>
        </form>
        <LoginWithSignUp setUser={setUser}/>      
      </div>
    </div>
  </ParticleBackground>
  );
}

export default Login;
