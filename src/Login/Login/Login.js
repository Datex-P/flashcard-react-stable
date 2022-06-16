import React, {useRef, useContext} from "react";
import flashcard from '../../icons/flashcard-design-new.png';
import '../../styles.scss';
import '../login.css';
import { Context } from '../../Context';
import ParticleBackground from '../Particles/ParticlesBackground';
import Button from '../Button';
import LoginWithSignUp from '../LoginWithSignUp/LoginWithSignUp'
import UserName from './UserName'
import Password from './Password'


function Login() {

  const {user, setUser} = useContext(Context)

  let facebook = document.querySelectorAll("input[type=button]") 
  console.log(facebook, 'facebook here')

  const callback = element => element.innerHTML === 'Login with Facebook'
  const elements = Array.from(document.getElementsByTagName('button'))
  console.log(elements, 'elements here')

const result = elements.filter(callback)
      result.innerHTML = 'Facebook'

      console.log(result, 'result here facebook')
  
  const userNameRef = useRef(null)
  const passwordRef = useRef(null)

  async function loginUser(e) {
    e.preventDefault()
    try{
    //e preventDefault is needed because forms 
    //have a standard behaviour of redirecting
     let name = userNameRef.current.value;
     let password = passwordRef.current.value;
    
     console.log(name, 'name')
     console.log(password, 'password')
   const response =  await fetch('https://flashcard-react-stable.vercel.app/api/login/', {
    mode: 'cors',
    method:'POST',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "X-Token, append,delete,entries,foreach,get,has,keys,set,values,Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Content-Type":"application/json",
      "Access-Control-Max-Age": "2592000"
    },
      body: JSON.stringify({
       name,
      password
      })
    });
    const data =  await response.json()
    console.log(data, 'data here')
    console.log(response, 'response here')
    if(data.user) {
      localStorage.setItem('token', data.user) //store token so it can be used
      window.location.href = '/main'
    } else {
      console.log(data.user)
      alert('Please check your username and password')
    }
   console.log(data)
  } catch (err){
    console.log(err, 'err here')
  }
  }
 
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
              <Button text='Login' />
            </div>
          </form>
          <LoginWithSignUp />      
        </div>
      </div>
    // </ParticleBackground>
  );
}

export default Login;
