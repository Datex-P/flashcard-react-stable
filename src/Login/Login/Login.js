import React, {useRef, useContext, useEffect} from "react";
import flashcard from '../../icons/flashcard-design-new.png';
import '../../styles.scss';
import '../login.css';
import { Context } from '../../Context';
import ParticleBackground from '../Particles/ParticlesBackground';
import Button from '../Button';
import LoginWithSignUp from '../LoginWithSignUp/LoginWithSignUp'
import UserName from './UserName'
import Password from './Password'
import { useHistory } from 'react-router-dom'


function Login() {

  const {dataBase, setUser, user, setDataBase, apiURL} = useContext(Context)

  const history = useHistory()

  const userNameRef = useRef(null)
  const passwordRef = useRef(null)

 async function loginUser(e) {
    e.preventDefault()
    try {
    //e preventDefault is needed because forms 
    //have a standard behaviour of redirecting
     let name = userNameRef.current.value;
     let password = passwordRef.current.value;

   const response =  await fetch(`${apiURL}/login`, {
    method:"POST",
    headers: {
       "Access-Control-Allow-Origin": "*",     
      "Content-Type":"application/json",
    },
      body: JSON.stringify({
       name:name,
       password:password
      })
    });

  const data=  await response.json()
  //way to directly access user.email without saving it?
  //console.log(data, 'data here')
 // console.log(response.user.email, 'email data here')

  if(response.status === 200) {
    //     localStorage.setItem('token', data.user) //store token so it can be used
    history.push('/main')
    setUser(data.user.email)
  } else if (response.status === 405) {
    alert('Please check your username and password!')
  }  
  } catch(error) {
    console.log(error, 'error')
  }
}

useEffect(()=>{
  console.log(user, 'user here')
},[setUser, user])


  //   if(data.user) {
  //     localStorage.setItem('token', data.user) //store token so it can be used
  //   //  window.location.href = '/main';
  //     setUser(name)
  //     let newDataBase = { ...dataBase }
  //     newDataBase.userPreferences[e.target.name] = e.target.value
  //     setDataBase(newDataBase)
  //     //setTimeout(()=>setUser(name), 3000)
  //     //why is setUser overwritten?? questionVal
  //     console.log(name , 'user here')
  //  //   getColor()
  //  window.location.href = '/main'
  //   } else {
  //     console.log(data.user)
  //     alert('Please check your username and password')
  //   }
  //  console.log(data)
  // } catch (err){
  //   console.log(err, 'err here')
  // }
  
  // useEffect(()=>{
  //   console.log(user, 'user here')
  // },[user, setUser])

  // async function getColor() {
  //   try{
  //  const response =  await fetch(`http://localhost:4000/colors/kkkk`, {
  //   method:'POST',
  //   headers: {
  //     // "Access-Control-Allow-Origin": "*",
  //     // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  //     // "Access-Control-Allow-Headers": "X-Token, append,delete,entries,foreach,get,has,keys,set,values,Authorization",
  //     // "Access-Control-Allow-Credentials": "true",
  //     "Content-Type":"application/json",
  //     "Accept":"application/json"
  //    // "Access-Control-Max-Age": "2592000"
  //   },
  //     body: JSON.stringify({
  //      name,
  //     password
  //   })
      
  // //  const data =  await response.json()
  // //  console.log(data, 'data in colors')
  // //  window.location.href = '/main';
  //   } catch (error) {
  //     console.log(error, 'error here')
  //   }

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
