import React, { useEffect, useContext, useState} from "react";
import { Context } from "../Context"; 
import { Container, Row, Spinner } from "react-bootstrap";
import './landingpage.css'

import Deck from "../Deck/deck/Index/index";
import CreateNewDeck from "./CreateNewDeck";
import MenuContainer from '../Deck/Menu/MenuContainer'
// import ShowProgressD from "./ShowProgressDiagram";
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
   // arrowDown, setArrowDown, //arrow that is visible when there are no decks created so far
    colors, //colors array for the decks
    dataBase, 
    editButtonClicked, 
   // setAddNewDeckWindow,
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
  }

  function closeHandler () {
    setDecksAreVisible(true);
    setAddNewDeckWindow(false);
    setShowProgressDiagram(true);
  }

                      //    background={colors[active % colors.length]}
  const specialObj = {
      showProgressDiagram: showProgressDiagram,
      setShowProgressDiagram:setShowProgressDiagram,
      setArrowDown: setArrowDown,
      setDecksAreVisible:setDecksAreVisible,
  }

  return !spinnerIsVisible && dataBase ? (
    <>
      <Container
        className="align-items-center landingpage__cont "
        style={{
           //backgroundColor:  styles.backgroundColor[dataBase.userPreferences.backgroundColor],
        //  backgroundColor:`url ${'/Users/fab/Downloads/cool-background.png'}` 
        }}
      >
      <MenuContainer showProgressDiagram={showProgressDiagram}
        setShowProgressDiagram={setShowProgressDiagram}
      />
        <Row className="posRelative justify-between width100pc">
          {decksAreVisible ? (
            <div className='p-50px'>
              <div className='posAbsolute left-40px'>
                {Array.isArray(dataBase.DeckNames) && dataBase.DeckNames.reduce(
                  (accum, deck, index) => {
                    if (active === index) {
                      accum.arr.push(
                        <Deck
                          key={index}
                          // showProgressDiagram={showProgressDiagram}
                          // setShowProgressDiagram={setShowProgressDiagram}
                          index={index}
                          //setDecksAreVisible={setDecksAreVisible}
                          deck={deck}
                          // setArrowDown={setArrowDown}
                          transform={`rotate(0deg)`}
                          zIndex={2}
                          background={colors[active % colors.length]}
                           {...specialObj}
                        />
                      );
                    } else {
                      accum.index++;

                      accum.arr.push(
                        <Deck
                          key={index}
                          index={index}
                          // setArrowDown={setArrowDown}
                          // setDecksAreVisible={setDecksAreVisible}
                          // showProgressDiagram={showProgressDiagram}
                          // setShowProgressDiagram={setShowProgressDiagram}
                          deck={deck}
                          transform={`rotate(${-accum.index * 2}deg)`}
                          zIndex={0}
                          bg={colorHandler}
                          background={colorHandler}
                          {...specialObj}
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
                <Scrollbar/>              
            }
            </div>
          ) 
          : arrowDown && 
            <StartFirstDeck/>
         }    
        </Row>  
          <CreateNewDeck
            addNewDeckWindow={addNewDeckWindow}
            editButtonClicked={editButtonClicked}
            createDeckHandler={createDeckHandler}
            className='posAbsolute zIndex-5'
            close={closeHandler}
            setArrowDown={setArrowDown}
            setScrollbarVisible={setScrollbarVisible}
            decksAreVisible={decksAreVisible}
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
