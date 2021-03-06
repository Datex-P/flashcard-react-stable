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

  const {apiURL, dataBase, setDataBase, setEmail} = useContext(Context)

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

  const {user, deck}= await response.json()

  if(response.status === 200) {
    console.log('response status 200 here')
    setDataBase({
     DeckNames: deck?.map((el)=> ({name:el.deckName,
        backgroundColor:el.backgroundColor,
        data:el.data})) || []
        ,
     active:2,
      queue: [],
      checkboxClicked: false,
      showDeleteFrame: true,
      openedToday: true,
      deckCompleted: user.deckCompleted, //decks where user reached study goal
      timeValues: {
        left: 2,
        middle: 5,
        right: 10
      },
      breakdownIntervals: [
        {month: 1},
        {month: 3},
        {month: 12}
      ],
      userTimePreferences: [
        {
          name: user?.userTimePreferences?.[0].name || 'again',
          amount: user?.userTimePreferences?.[0].amount || 2,
          unit: user?.userTimePreferences?.[0].unit || 'min'
        },
        {
          name: user?.userTimePreferences?.[1].name || 'good',
          amount: user?.userTimePreferences?.[1].amount || 5,
          unit: user?.userTimePreferences?.[1].unit || 'min'
        },
        {
          name: user?.userTimePreferences?.[2].name || 'easy',
          amount: user?.userTimePreferences?.[2].amount || 10,
          unit: user?.userTimePreferences?.[2].unit || 'min'
        }
      ],
      userPreferences: {
        days: user?.userPreferences?.days || 0, //days that user wants to study
        backgroundColor: user?.backgroundColor || 'default',
        weeksInRow: user?.userPreferences?.weeksInRow || 0, //weeks in a row where user reached study goal
        toReview: user?.userPreferences?.toReview || 0
      },
      hourlyBreakdown: user?.hourlyBreakdown || '1 month',
      studyTime: user?.studyTime || 0,
      calendarReset: false,
      weeklyTarget: user?.weeklyTarget || 1,
      daysOfStudyThisWeek: user?.daysOfStudyThisWeek || 0, //days the user actually studied this week, as soon as he interacts with deck it counts as studied
      studied: [new Date()]
    })
    //     localStorage.setItem('token', data.user) //store token so it can be used
    history.push('/main')
    setEmail(user.email)
  } else if (response.status === 405) {
    alert('Please check your username and password!')
  }  
  } catch(error) {
    console.log(error, 'error')
  }
}

useEffect(()=>{
  console.log(dataBase, 'data base hewre')
},[dataBase, setDataBase])


useEffect(()=>{
  console.log(dataBase, 'database here')
},[setDataBase, dataBase])


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
