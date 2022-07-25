import React, { useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Context } from '../../../Context';
import '../../../styles.scss';
import QuestionAnswerComp from './QuestionAnsw';
const closeWindow:string = require('../../../icons/closeWindow.svg');

export default function AddQuestionsToDeck({
  index,
  name,
  show,setShow,
  setScrollbarVisible
}) {
  
  const [card, setCard] = useState({ question: '', answer: ''});
  const [newCardAdded, setNewCardAdded] = useState(false);
  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false);
  const [error, setError] = useState(false)
  const [addToDeckButton, setAddToDeckButton] = useState(false) //when active message like input needed appears

  const {
    apiURL,
    dataBase,setDataBase,
    editButtonClicked,
    email,
    setHideCreateDeckBtn,
    nameOfTopDeck, //name of the deck that is currently open
    setShowProgressDiagram // diagram that is shown on main page (landing page)
  } = useContext(Context);

  async function addToDeck() {

    setAddToDeckButton(true)
    setTimeout(()=>{setAddToDeckButton(false)}, 2000)

    if (card.question.trim().length !== 0 &&  //don't trigger call when no value in question or answer field
        card.answer.trim().length !== 0) {
      try {
        let response = await fetch(`${apiURL}/add_to_deck`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            deckName: nameOfTopDeck,
            email: email,
            data: [{ question: card.question, answer: card.answer }],
          }),
        });
        await response

        if (response.status === 200) {
          let newDataBase = { ...dataBase }
          newDataBase.DeckNames[index].data.push(card)
          setDataBase(newDataBase)
          setNewCardAdded(true);
          setTimeout(() => {
            setCard({question: '', answer: ''});
            setNewCardAdded(false);
            setAddToDeckButton(false)
          }, 650);
        }
      } catch (error) {
        //not sure why error does not trigger
          console.log(error, 'error here')
          setError(true)
          setTimeout(()=>{setError(false)}, 3000)
      }
    }
  }

  function hideHandler() {
    setShow(false);
    setShowProgressDiagram(true);
    setHideCreateDeckBtn(false);
    setScrollbarVisible(true);
  }


  // plusHandler gets triggered when User clicks on plus Icon
  // is deactivated when the deck is paused, so User has to unpause
  //the deck to add cards to the deck

  function plusHandler() {
    if (editButtonClicked) { //see CardOrDeckName.js Input field not active
      if (!dataBase?.DeckNames[index]?.paused || editButtonClicked) {
        setHideCreateDeckBtn(true);
        setShow(true);
        setShowProgressDiagram(false);
        setScrollbarVisible(false);
      }
    }
  }

  useEffect(() => {
    //   if (show) {
    //    setShowProgressDiagram(false)
    //   } else {
    //     setShowProgressDiagram(true)
    //     if (dataBase?.DeckNames?.length === 1 || dataBase?.DeckNames?.length === 0) {
    //       setScrollbarVisible(false)
    //     } else {
    //       setScrollbarVisible(true)
    //     }
    //   }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    let i = setTimeout(() => {
      setNewCardAdded(false);
    }, 650);
    return () => {
      clearInterval(i);
    };
  }, [newCardAdded]);

  /*create Deck btn and menu icons are shwon again
  set show closes the add to deck window*/

  function closeHandler() {
    setShow(false);
    setHideCreateDeckBtn(false);
    setShowProgressDiagram(true);
    setScrollbarVisible(true);
  }

  useEffect(() => {
    let element = document.querySelector('.modAddToDeck');

    function saveIconBlinks(event) {
      if (element && !element.contains(event.target)) {
        console.log("clicked outside");
        setBlinkingSaveIcon(true);
        setTimeout(() => {
          setBlinkingSaveIcon(false);
        }, 2000);
      }
    }
    if (show) {
      console.log("save icon got triggered");
      setTimeout(() => {
        document.addEventListener("click", saveIconBlinks);
      }, 500);
    }
    return () => {
      document.removeEventListener("click", saveIconBlinks);
      setBlinkingSaveIcon(false);
      console.log("got unmounted");
    };
  }, [show]);

  return (
    <div>
      <button
        className='deck__addToDeck__btn_plus justify-center-align-center outline-none'
        style={{
          cursor:
            dataBase.DeckNames[index]?.paused || !editButtonClicked
              ? 'default' : 'pointer',
        }}
        onClick={plusHandler}
        title='Add questions to this deck'
      >
        +
      </button>
      <div className='marginAuto'>
        <Modal
          show={show}
          contentClassName={"modAddToDeck"}
          backdrop='static'
          onHide={hideHandler}
          dialogClassName='deck__addQuestion-modal posRelative justify-center'
        >
          <Modal.Header className='border-bottom-0'>
            <Modal.Title className='justify-between-align-center mod-title'>
              <span className='align-center'>Deck: {name}</span>
              <button
                className='redCross pointer deck__bg-orange'
                onClick={closeHandler}
              >
                <img
                  src={closeWindow}
                  alt='redCross'
                  className={`nonDraggableIcon width16px height16px 
                            ${blinkingSaveIcon ? 'deck__blinkingIcon' : ''}`
                  }
                />
              </button>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QuestionAnswerComp
              addToDeckButton={addToDeckButton}
              card={card}
              setCard={setCard}
              error={error}
              newCardAdded={newCardAdded}
            />
            <button
              onClick={addToDeck}
              className='deck__addToDeck mt-20px ml-21px cursorPointer'
            >
              Add to Deck
            </button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
