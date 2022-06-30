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

  const {user}= await response.json()

  //console.log(data, 'data here')
  //way to directly access user.email without saving it?
  //console.log(data, 'data here')
 // console.log(response.user.email, 'email data here')

  if(response.status === 200) {
    console.log('response status 200 here')
    setDataBase({
     // DeckNames: [data.decks.map(x=>x.deckName)]
     DeckNames:[{
      name:`Literajjj`,
      backgroundColor: 'blue',
      data: [1,2,3],
      thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
      color: 'blue',
      toStudyValue:0,
      cardsToday: 0,
      paused:false,
      skipPausedCards: 0,
      pauseMode:false,   //when active the pause switch can be clicked in question answers when cards are paused
      editModeActive:false //when editModeActive is true, pause switch can t be clicked
    }],
     active:2,
      queue: [],
      checkboxClicked: false,
      showDeleteFrame: true,
      openedToday: true,
      deckCompleted: 2,
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
          name: 'again',
          amount: 3,
          unit: 'm'
        },
        {
          name: 'good',
          amount: 5,
          unit: 'h'
        },
        {
          name: 'easy',
          amount: 10,
          unit: 'd'
        }
      ],
      userPreferences: {
        days: user.userPreferences.days,
        backgroundColor: user.userPreferences.backgroundColor,
        weeksInRow: user.userPreferences.weeksInRow,
        toReview: user.userPreferences.toReview
      },
      hourlyBreakdown: user.hourlyBreakdown,
      studyTime: user.studyTime,
      calendarReset: false,
      weeklyTarget: user.weeklyTarget,
      daysOfStudy: {
        day: 4
      },
      studied: [new Date()],
    
    })
    //     localStorage.setItem('token', data.user) //store token so it can be used
    history.push('/main')
    setUser(user.email)
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

// useEffect(() => {
//   let dB = {

//     DeckNames: [],
//     active:2,
//     queue: [],
//     checkboxClicked: false,
//     showDeleteFrame: true,
//     openedToday: true,
//     deckCompleted: 2,
//     timeValues: {
//       left: 2,
//       middle: 5,
//       right: 10
//     },
//     breakdownIntervals: [
//       {month: 1},
//       {month: 3},
//       {month: 12}
//     ],
//     userTimePreferences: [
//       {
//         name: 'again',
//         amount: 3,
//         unit: 'm'
//       },
//       {
//         name: 'good',
//         amount: 5,
//         unit: 'h'
//       },
//       {
//         name: 'easy',
//         amount: 10,
//         unit: 'd'
//       }
//     ],
//     userPreferences: {
//       days: 0,
//       backgroundColor: 'default',
//       weeksInRow: 0,
//       toReview: 0
//     },
//     hourlyBreakdown: '1 month',
//     studyTime: 0,
//     calendarReset: false,
//     weeklyTarget: 1,
//     daysOfStudy: {
//       day: 4
//     },
//     studied: [new Date()],
//   };

//   // for (let i = 100; i < 103; i++) {
//   //   let arr:{}[] = [];

//   //   for (let i = 1; i < 5; i++) {
      
//   //     if(i===3 || i ===2) {
//   //       arr.push({
//   //         question: `question${i}`,
//   //         answer: `answer${i}`,
//   //         paused: false
//   //       })
//   //     } else {
//   //       arr.push({
//   //         question: `question${i}`,
//   //         answer: `answer${i}`,
//   //         paused: true
//   //       })
//   //     }
//   //   };
//   //   dB.DeckNames.push(
//   //     {
//   //       name:`Litera${i}`,
//   //       backgroundColor: colors[-100+i],
//   //       data: arr,
//   //       thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
//   //       color: colors[i%colors.length],
//   //       toStudyValue:0,
//   //       cardsToday: 0,
//   //       paused:false,
//   //       skipPausedCards: 0,
//   //       pauseMode:false,   //when active the pause switch can be clicked in question answers when cards are paused
//   //       editModeActive:false //when editModeActive is true, pause switch can t be clicked
//   //     }
//   //    );
//   //   dB.active++
//   // }
//   setDataBase(dB)
// }, []);


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
