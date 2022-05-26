import React, { useEffect, useContext, useState} from "react";
import { Context } from "../Context"; 
import { Container, Row, Spinner } from "react-bootstrap";
import './landingpage.css'
import Deck from "../Deck/deck/Index/index";
import CreateNewDeck from "./CreateNewDeck";
import MenuContainer from '../Deck/Menu/MenuContainer'
import ProgressDiagram from "./ShowProgressDiagram";
import Scrollbar from './Scrollbar'
import StartFirstDeck from './StartFirstDeck'

import jwt_decode from "jwt-decode"
import {useHistory} from 'react-router-dom'

 const LandingPage = () => {
  const [addNewDeckWindow, setAddNewDeckWindow] = useState(false);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(true); //spinner that is shown when application loads
  const [scrollbarVisible, setScrollbarVisible] = useState(true)
  const [decksAreVisible, setDecksAreVisible] = useState(true); //decks are shown on the deck stack if this is set to true  
  const [showProgressDiagram, setShowProgressDiagram] = useState(true);
  const [arrowDown, setArrowDown] = useState(true);
  
  useEffect(()=>{
    console.log(arrowDown, 'arrow down here')
  },[arrowDown])

  const {
    active, 
    colors, //colors array for the decks
    dataBase, 
    styles,
    editButtonClicked,
    hideCreateDeckBtn, setHideCreateDeckBtn
  } = useContext(Context);

  const history = useHistory()


  async function dosome() {
    
    const req = await fetch('/http://localhost:4000/register', {
      headers:  {'x-access-token': localStorage.getItem('token')
    }
    })
    const data = req.json()
    console.log(data)
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt_decode(token)
    //  console.log(user)
      if (!user) {
          localStorage.removeItem('token')
          history.replace('/login')
      } else {
        dosome()
      }
    }
  },[])

  useEffect(()=>{
    console.log(dataBase, 'database here')
    if (dataBase?.DeckNames) {
    console.log(dataBase && dataBase?.DeckNames.length, 'decknames')
    }
    // console.log(dataBase?.DeckNames.length, 'length')
  },[dataBase])
 

  // useEffect(() => {
    
  //   setTimeout(() => {
  //     setSpinnerIsVisible(false);
  //   }, 2000);
  // }, []);

  function colorHandler () {
    colors.map((i, k, ar) => {
      if (active === k) {
        return ar[ar.length % (k || 1)];
      } else {
        return i;
      }
    })
  }

  function createDeckHandler () {
    if (!editButtonClicked) {
      //editButtonClicked is set to true by default
    } else {
   
      setAddNewDeckWindow(true); //open the pop up to add a new deck
      setDecksAreVisible(false); // all the decks in the back are not visible
      setShowProgressDiagram(false);
      setArrowDown(false); //create new deck and arrow down not visible
    }
    setArrowDown(false); //create new deck and arrow down not visible
    setHideCreateDeckBtn(true) //the button create Deck gets hidden
  }

  function closeHandler () {
    setDecksAreVisible(true);
    setAddNewDeckWindow(false);
    setShowProgressDiagram(true);
  }

                      //    background={colors[active % colors.length]}
  const deckProps = {
      showProgressDiagram: showProgressDiagram,
      setShowProgressDiagram:setShowProgressDiagram,
      setArrowDown: setArrowDown,
      setScrollbarVisible:setScrollbarVisible,
      setDecksAreVisible:setDecksAreVisible,
  }
console.log(dataBase?.userPreferences?.backgroundColor, 'color background')


useEffect(()=>{
console.log(hideCreateDeckBtn, 'hidecreatedeck')
},[hideCreateDeckBtn])
  // !spinnerIsVisible && dataBase 
  return spinnerIsVisible  ? (
    <>
      <ProgressDiagram/>
      <Container
        className="align-items-center landingpage__cont "
        style={{backgroundColor: styles.backgroundColor[dataBase?.userPreferences?.backgroundColor]}}
      >
      <MenuContainer 
        showProgressDiagram={showProgressDiagram}
        setShowProgressDiagram={setShowProgressDiagram}
        hideCreateDeckBtn={hideCreateDeckBtn}
      />
      
        <Row className="posRelative justify-between width100pc">
          {decksAreVisible && (
            <div className='p-50px'>
              <div className={`posAbsolute left-40px ${hideCreateDeckBtn? 'mt20px':''}`}>
                {dataBase?.DeckNames && Array.isArray(dataBase.DeckNames) && dataBase.DeckNames.reduce(
                  (accum, deck, index) => {
                    if (active === index) {
                      accum.arr.push(
                        <Deck
                          key={index}
                          setHideCreateDeckBtn={setHideCreateDeckBtn}
                          index={index}
                          deck={deck}
                          transform={`rotate(0deg)`}
                          zIndex={2}
                          bg={colorHandler}
                          background={colors[active % colors.length]}
                           {...deckProps}
                        />
                      );
                    } else {
                      accum.index++;

                      accum.arr.push(
                        <Deck
                          key={index}
                          index={index}
                          deck={deck}
                          transform={`rotate(${-accum.index * 2}deg)`}
                          zIndex={0}
                          setHideCreateDeckBtn={setHideCreateDeckBtn}
                          bg={colorHandler}
                          background={colorHandler}
                          {...deckProps}
                        />
                      );
                    }
                    return accum;
                  },
                  { index: 0, arr: [] }
                ).arr.reverse()}
              </div>       
    
                <Scrollbar 
                  scrollbarVisible={scrollbarVisible}
                />              
               
            </div>
          ) 
         
         } 
          {arrowDown  &&
         <StartFirstDeck/>
         } 
        </Row>  
          <CreateNewDeck
            hideCreateDeckBtn={hideCreateDeckBtn}
            setHideCreateDeckBtn={setHideCreateDeckBtn}
            addNewDeckWindow={addNewDeckWindow}
            createDeckHandler={createDeckHandler}
            closeHandler={closeHandler}
            decksAreVisible={decksAreVisible}
            editButtonClicked={editButtonClicked}
            setArrowDown={setArrowDown}
            setScrollbarVisible={setScrollbarVisible}
            setDecksAreVisible={setDecksAreVisible}
          />                   
      </Container>
    </>
  ) : (
    // 'database empty'
    <div className="justify-center-align-center height50vh">
      <Spinner animation="grow" />
    </div>
  );
}

export default LandingPage
