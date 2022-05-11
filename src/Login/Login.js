import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import flashcard from "../icons/flashcard-design-new.png";
import "../styles.scss";
import './login.css';
import ParticleBackground from "./Particles/ParticlesBackground";
import Button from "./Button";
import LoginWithSignUp from './LoginWithSignUp/LoginWithSignUp'
import eyesClosed from '../icons/eye-closed-pwd.png'
import eyesOpened from '../icons/eye-opened-pwd.svg'

function Login({ setUser}) {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data) => console.log(data);


  //useEffect(()=>{
   // console.log(password, 'password here')
  //}, [password])


  async function loginUser(e) {
    console.log('got triggered')
    e.preventDefault()
    //e preventDefault is needed because forms 
    //have a standard behaviour of redirecting
   const response = await fetch('http://localhost:4000/login', {
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
          <form 
              className='zIndex-5 width12rem' 
              onSubmit={loginUser}
      //   onSubmit={()=>{handleSubmit(onSubmit)}}
          //  onSubmit={handleClick()}
              method='post'
              action='/'
          >
            <div className= "login__LoginInput flex-column mb-20px">
              <div>
                <input
                  // value='xyz'
                  // value={this.state.login}
                  // onChange={e=>this.setState({login:e.target.value})}
                  id='login'
                  name='login'
                  onChange={(e)=>setName(e.target.value)}
                  className='login__input login__icon__user pl-25px'
                  // {...register("login", {
                  //   required: "true", pattern: /[a-zA-Z0-9]/,
                  // })}
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
                  id='password'
                  name='password'
                  onChange={(e)=>setPassword(e.target.value)}
                  type={showPassword? 'text':'password'}
                  className='login__input login__icon__keys pl-30px login__eyeopen'
                  // {...register("password", {
                  //   required: "true", pattern: /(?<=^| )\d+\.\d+(?=$| )/,
                  // })}
                />
                <img 
                  src={showPassword? eyesOpened : eyesClosed} 
                  alt='eyesClosed' 
                  className='width16px height16px' 
                  style={{transform:'translate(155px, -26px)'}} 
                  onClick={()=>setShowPassword(!showPassword)}
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
