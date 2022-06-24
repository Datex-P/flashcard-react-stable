import React, { useState, useEffect } from 'react'


export const Context = React.createContext(null as any)

export default function ContextProvider({ children }:any) {

  const [changeDeckNameOpen, setChangeDeckNameOpen] = useState(false); //input field to change deckname is open
  const [editButtonClicked, setEditButtonClicked] = useState(true); //active when editButton next to DeckName is clicked
  const [active, setActive] = useState(0);
  const [dataBase, setDataBase] = useState<any>([]);
  const [showProgressDiagram, setShowProgressDiagram] = useState(false)
  const [hideCreateDeckBtn, setHideCreateDeckBtn] = useState(false)
  const [threeDotsOpen, setThreeDotsOpen] = useState(false);
  const [showThreeDots, setShowThreeDots] = useState(true) //three dots menu gets hidden in edit mode etc.
  const [emailAdress, setEmailAdress] = useState(null)
  const [user, setUser] = useState('pp')
  const [nameOfTopDeck, setNameOfTopDeck] = useState(null)
  const [apiURL, setAPIURL] = useState('')

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
  //let colors = ['green','blue','black','red', 'pink']

  useEffect(() => {
    let dB:any = {

      DeckNames: [],
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
        days: 0,
        backgroundColor: 'default',
        weeksInRow: 0,
        toReview: 0
      },

      hourlyBreakdown: '1 month',
      studyTime: 0,
      calendarReset: false,
      weeklyTarget: 1,
      daysOfStudy: {
        day: 4
      },
      studied: [new Date()],
    };

    for (let i = 100; i < 103; i++) {
      let arr:{}[] = [];

      for (let i = 1; i < 5; i++) {
        
        if(i===3 || i ===2) {
          arr.push({
            question: `question${i}`,
            answer: `answer${i}`,
            paused: false
          })
        } else {
          arr.push({
            question: `question${i}`,
            answer: `answer${i}`,
            paused: true
          })
        }
      };
      dB.DeckNames.push(
        {
          name:`Litera${i}`,
          backgroundColor: colors[-100+i],
          data: arr,
          thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
          color: colors[i%colors.length],
          toStudyValue:0,
          cardsToday: 0,
          paused:false,
          skipPausedCards: 0,
          pauseMode:false,   //when active the pause switch can be clicked in question answers when cards are paused
          editModeActive:false //when editModeActive is true, pause switch can t be clicked
        }
       );
      dB.active++
    }
    setDataBase(dB)
  }, []);

  useEffect(()=>{
    console.log(dataBase, 'database here')
  },[dataBase])

  useEffect(()=>{
    console.log(user, 'user here')
  },[user, setUser])
  
  return (

    <Context.Provider  
      value={{ 
        active, setActive,
        colors,
        changeDeckNameOpen, setChangeDeckNameOpen,
        dataBase, setDataBase, 
        editButtonClicked, setEditButtonClicked, 
        hideCreateDeckBtn, setHideCreateDeckBtn,
        showProgressDiagram, setShowProgressDiagram,
        styles, setStyles,
        apiURL, setAPIURL,
        showThreeDots, setShowThreeDots,
        threeDotsOpen, setThreeDotsOpen,
        user, setUser,
        emailAdress, setEmailAdress,
        nameOfTopDeck, setNameOfTopDeck
        }} 
     >
      {children}
    </Context.Provider>

  )

  
}

