import React, { useState, useEffect } from 'react'


export const Context = React.createContext(null as any)

export default function ContextProvider({ children }:any) {

  const [active, setActive] = useState(0);
  const [arrowDown, setArrowDown] = useState(false); //visible when no decks in stack
  const [apiURL, setAPIURL] = useState('') //either localhost or netlify
  const [dataBase, setDataBase] = useState<any>([]);
 
  const [editButtonClicked, setEditButtonClicked] = useState(true); //active when editButton next to DeckName is clicked
  const [email, setEmail] = useState('pp')
  const [emailAddress, setEmailAddress] = useState(null)
  const [hideCreateDeckBtn, setHideCreateDeckBtn] = useState(false)
  
  const [showProgressDiagram, setShowProgressDiagram] = useState(false)
  const [showThreeDots, setShowThreeDots] = useState(true) //three dots menu gets hidden in edit mode etc.
  const [stopRedCrossListener, setStopRedCrossListener] = useState(false) 
  const [threeDotsOpen, setThreeDotsOpen] = useState(false);
  const [nameOfTopDeck, setNameOfTopDeck] = useState(null) //name of the deck that is on top of the deck stack
  const [nameTooLongOrShort, setNameTooLongOrShort] = useState(false) //if true deckname is too long or too short

  useEffect(()=>{
  process.env.NODE_ENV === 'production' ? 
  setAPIURL('https://cool-gnome-d84e5e.netlify.app/.netlify/functions') : 
  setAPIURL('http://localhost:8888/.netlify/functions')
  }, [])


  const [styles, setStyles] = useState({
    backgroundColor: {
      light: ' #86a873',
      dark: '#5aaaff',
      default: 'rgb(90, 170, 149)'
    }
  });

   let colors = ['#ffcdb2', '#ffb4a2', '#e5989b', '#b5838d', '#6d6875'];
 
  // useEffect(() => {
  //   let dB:any = {

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
  //   //   // dB.DeckNames.push(
  //   //   //   {
  //   //   //     name:`Litera${i}`,
  //   //   //     backgroundColor: colors[-100+i],
  //   //   //     data: arr,
  //   //   //     thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
  //   //   //     color: colors[i%colors.length],
  //   //   //     toStudyValue:0,
  //   //   //     cardsToday: 0,
  //   //   //     paused:false,
  //   //   //     skipPausedCards: 0,
  //   //   //     pauseMode:false,   //when active the pause switch can be clicked in question answers when cards are paused
  //   //   //     editModeActive:false //when editModeActive is true, pause switch can t be clicked
  //   //   //   }
  //   //   //  );
  //   //   //dB.active++
  //   // }
  //   setDataBase(dB)
  // }, [user]);

  useEffect(()=>{
    console.log(dataBase, 'database here')
   // debugger
  },[dataBase])

  useEffect(()=>{
    console.log(email, 'user here')
  },[email, setEmail])
  
  return (

    <Context.Provider  
      value={{ 
        active, setActive, 
        apiURL, setAPIURL,
        arrowDown, setArrowDown,
        colors,
        dataBase, setDataBase, 
        editButtonClicked, setEditButtonClicked,
        email, setEmail,
        emailAddress, setEmailAddress,
        hideCreateDeckBtn, setHideCreateDeckBtn,
        nameOfTopDeck, setNameOfTopDeck,
        nameTooLongOrShort, setNameTooLongOrShort,
        showProgressDiagram, setShowProgressDiagram,
        styles, setStyles,     
        showThreeDots, setShowThreeDots,
        stopRedCrossListener, setStopRedCrossListener,
        threeDotsOpen, setThreeDotsOpen,               
        }} 
     >
      {children}
    </Context.Provider>

  )

  
}

