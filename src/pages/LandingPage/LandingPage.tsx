/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { Context } from '../../context/Context';
import { Container, Row, Spinner } from "react-bootstrap";
import './landingpage.css'
import Deck from '../Deck/deck/Index/index';
import CreateNewDeck from './CreateNewDeck/CreateNewDeck';
import MenuContainer from '../Deck/Menu/MenuContainer'
import Scrollbar from './Scrollbar'
import StartFirstDeck from './StartFirstDeck'
//import { useHistory } from 'react-router-dom'
import {LandingLogic} from './LandingLogic'

const LandingPage = () => {
  const [addNewDeckWindow, setAddNewDeckWindow] = useState(false);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(true); //spinner that is shown when application loads
  const [scrollbarVisible, setScrollbarVisible] = useState(true)
  const [decksAreVisible, setDecksAreVisible] = useState(true); //decks are shown on the deck stack if this is set to true  
  const [inputField, setInputField] = useState('');

  useEffect(()=>{
    console.log(addNewDeckWindow, 'add new deck window here')
  },[addNewDeckWindow])
  
  const {
    active,
    arrowDown, setArrowDown, //'create first deck' arrow when no deck is present
    editButtonClicked,
    dataBase,
    hideCreateDeckBtn,
    styles,
  } = useContext(Context);


  //const history = useHistory()

  const {closeHandler, createDeckHandler, colorHandler} = LandingLogic({  setDecksAreVisible,
    setAddNewDeckWindow})


  // async function dosome() {

  //   const req = await fetch('/http://localhost:4000/register', {
  //     headers: {
  //       'x-access-token': localStorage.getItem('token')
  //     }
  //   })
  //   const data = req.json()
  //   console.log(data)
  // }

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     const user = jwt_decode(token)
  //     //  console.log(user)
  //     if (!user) {
  //       localStorage.removeItem('token')
  //       history.replace('/login')
  //     } else {
  //       dosome()
  //     }
  //   }
  // }, [])

  useEffect(() => {
    console.log(dataBase, 'database here')
    if (dataBase?.DeckNames?.length === 0) {     //create first deck arrow gets shown
      setArrowDown(true); //
      // setDecksAreVisible(false); 
  }
  }, [dataBase])


  // useEffect(() => {

  //   setTimeout(() => {
  //     setSpinnerIsVisible(false);
  //   }, 2000);
  // }, []);


  //    background={colors[active % colors.length]}
  const deckProps = {
    setArrowDown:setArrowDown,
    setScrollbarVisible:setScrollbarVisible,
    setDecksAreVisible:setDecksAreVisible,
  }
 

  useEffect(() => {
    console.log(hideCreateDeckBtn, 'hidecreatedeck')
  }, [hideCreateDeckBtn])

  // !spinnerIsVisible && dataBase 
  return spinnerIsVisible ? (
    <>
      <Container
        className='align-items-center landing__cont'
        style={{backgroundColor: 
        styles.backgroundColor[dataBase?.userPreferences?.backgroundColor]}}
      >
        <MenuContainer/>
        <Row className='posRelative justify-between width100pc'>
          {decksAreVisible && 
            <div className='p-50px'>
              <div className='posAbsolute left-40px'>
                {
                  dataBase?.DeckNames && Array.isArray(dataBase.DeckNames) && 
                  dataBase.DeckNames.reduce(
                  (accum, deck, index) => {
                    if (active === index) {
                      accum.arr.push(
                        <Deck
                          background={deck.backgroundColor}
                          bg={colorHandler}
                          deck={deck}
                          index={index}
                          key={index}
                          transform={`rotate(0deg)`}
                          zIndex={2}
                          {...deckProps}
                        />
                      );
                    } else {
                      accum.index++;
                      accum.arr.push(
                        <Deck
                          deck={deck}
                          index={index}
                          background={deck.backgroundColor}
                          bg={colorHandler}
                          key={index}
                          transform={`rotate(${-accum.index * 2}deg)`}
                          zIndex={0}
                          {...deckProps}
                        />
                      );
                    }
                    return accum;
                  },
                  { index: 0, arr: [] }
                ).arr.reverse()
                }
              </div>
              <Scrollbar scrollbarVisible={scrollbarVisible}/>
            </div>   
           }
          {arrowDown && 
          <StartFirstDeck />
          }
        </Row>
        <CreateNewDeck
          addNewDeckWindow={addNewDeckWindow}
          createDeckHandler={createDeckHandler}
          closeHandler={closeHandler}
          editButtonClicked={editButtonClicked}
          inputField={inputField}
          setInputField={setInputField}
          setScrollbarVisible={setScrollbarVisible}
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
