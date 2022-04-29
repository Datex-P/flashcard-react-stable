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

 const LandingPage = () => {
  const [addNewDeckWindow, setAddNewDeckWindow] = useState<boolean>(false);
  const [spinnerIsVisible, setSpinnerIsVisible] = useState<boolean>(true); //spinner that is shown when application loads
  const [scrollbarVisible, setScrollbarVisible] = useState<boolean>(true)
  const [decksAreVisible, setDecksAreVisible] = useState<boolean>(true); //decks are shown on the deck stack if this is set to true  
  const [showProgressDiagram, setShowProgressDiagram] = useState<boolean>(true);
  const [arrowDown, setArrowDown] = useState<boolean>(true);

  const {
    active, 
    colors, //colors array for the decks
    dataBase, 
    editButtonClicked
  } = useContext(Context);


 

  // useEffect(() => {
    
  //   setTimeout(() => {
  //     setSpinnerIsVisible(false);
  //   }, 2000);
  // }, []);

  function colorHandler () {
    colors.map((i:string, k:number, ar:string[]) => {
      if (active === k) {
        return ar[ar.length % (k || 1)];
      } else {
        return i;
      }
    })
  }

  function createDeckHandler ():any {
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
  const deckProps = {
      showProgressDiagram: showProgressDiagram,
      setShowProgressDiagram:setShowProgressDiagram,
      setArrowDown: setArrowDown,
      setScrollbarVisible:setScrollbarVisible,
      setDecksAreVisible:setDecksAreVisible,
  }

  // !spinnerIsVisible && dataBase 
  return spinnerIsVisible  ? (
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
                {dataBase?.DeckNames && Array.isArray(dataBase.DeckNames) && dataBase.DeckNames.reduce(
                  (accum:any, deck:any, index:number) => {
                    if (active === index) {
                      accum.arr.push(
                        <Deck
                          key={index}
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
            createDeckHandler={createDeckHandler}
            close={closeHandler}
            decksAreVisible={decksAreVisible}
            editButtonClicked={editButtonClicked}
            // className='posAbsolute zIndex-5'
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
