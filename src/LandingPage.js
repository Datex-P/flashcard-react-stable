import React, { useEffect, useContext, useState} from "react";
import { Context } from "../Context"; 
import { Container, Row, Spinner } from "react-bootstrap";
import './landingpage.css'

import Deck from "../Deck/deck/Index/index";
import CreateNewDeck from "./CreateNewDeck";
import MenuContainer from '../Deck/Menu/MenuContainer'

import ShowProgressD from "./ShowProgressDiagram";
import Scrollbar from './Scrollbar'
import StartFirstDeck from './StartFirstDeck'

export default function DeckContainer() {
  const [addNewDeckWindow, setAddNewDeckWindow] = useState(false);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState(true); //spinner that is shown when application loads
  const [scrollbarVisible, setScrollbarVisible] = useState(true)
  const [decksAreVisible, setDecksAreVisible] = useState(true); //decks are shown on the deck stack if this is set to true  
  const [showProgressDiagram, setShowProgressDiagram] = useState(true);
  const [arrowDown, setArrowDown] = useState(true);

  const {
    active, 
    colors, //colors array for the decks
    dataBase, 
    editButtonClicked
  } = useContext(Context);


  useEffect(() => {
    
    setTimeout(() => {
      setSpinnerIsVisible(false);
    }, 2000);
  }, []);

  function colorHandler () {
    colors.map((i, k, ar) => {
      if (active === k) {
        return ar[ar.length % (k || 1)];
      } else {
        return i;
      }})
    }

  function createDeckHandler () {
    if (editButtonClicked) {
      //editButtonClicked is set to true by default
      setAddNewDeckWindow(true); //open the pop up to add a new deck
      setDecksAreVisible(false); // all the decks in the back are not visible
      setShowProgressDiagram(false);
      setArrowDown(false); //create new deck and arrow down not visible
    }
  }

  function closeHandler () {
    setDecksAreVisible(true);
    setAddNewDeckWindow(false);
    setShowProgressDiagram(true);
  }

  return !spinnerIsVisible && dataBase ? (
    <>
      <Container
        className="align-items-center landingpage__cont "
        style={{
           //backgroundColor:  styles.backgroundColor[dataBase.userPreferences.backgroundColor]
        }}
      >
      <MenuContainer showProgressDiagram={showProgressDiagram}
        setShowProgressDiagram={setShowProgressDiagram}
      />
        <Row className="posRelative justify-between width100pc">
          {decksAreVisible ? (
            <div className='p-50px'>
              <div className='justify-center left-40px'>
                {Array.isArray(dataBase.DeckNames) && dataBase.DeckNames.reduce(
                  (accum, deck, index) => {
                    if (active === index) {
                      accum.arr.push(
                        <Deck
                          key={index}
                          showProgressDiagram={showProgressDiagram}
                          setShowProgressDiagram={setShowProgressDiagram}
                          index={index}
                          setDecksAreVisible={setDecksAreVisible}
                          deck={deck}
                          setArrowDown={setArrowDown}
                          transform={`rotate(0deg)`}
                          zIndex={2}
                          background={colors[active % colors.length]}
                        />
                      );
                    } else {
                      accum.index++;

                      accum.arr.push(
                        <Deck
                          key={index}
                          index={index}
                          setArrowDown={setArrowDown}
                          setDecksAreVisible={setDecksAreVisible}
                          showProgressDiagram={showProgressDiagram}
                          setShowProgressDiagram={setShowProgressDiagram}
                          deck={deck}
                          transform={`rotate(${-accum.index * 2}deg)`}
                          zIndex={0}
                          bg={colorHandler}
                          background={colorHandler}
                        />
                      );
                    }
                    return accum;
                  },
                  { index: 0, arr: [] }
                ).arr.reverse()}
              </div>
       
              {scrollbarVisible &&
                //scrollbar gets hidden when there is only one deck
                <Scrollbar    />              
            }
            </div>
          ) 
          : arrowDown && 
            <StartFirstDeck/>
         }     
        </Row>
        <Row className='justify-center mt-350px'>
          <CreateNewDeck
            addNewDeckWindow={addNewDeckWindow}
            className='justify-center zIndex-5'
            close={closeHandler}
            createDeckHandler={createDeckHandler}
            setArrowDown={setArrowDown}
            setScrollbarVisible={setScrollbarVisible}
            decksAreVisible={decksAreVisible}
          />    
          
         </Row> 
      </Container>
    </>
  ) : (
    // 'database empty'
    <div className="justify-center-align-center height50vh">
      <Spinner animation="grow" />
    </div>
  );
}
