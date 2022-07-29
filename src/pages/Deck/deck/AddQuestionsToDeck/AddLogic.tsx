/* eslint-disable react-hooks/exhaustive-deps */
import {  useContext, useEffect } from "react";
import { Context } from '../../../../context/Context';
import '../../../../styles.scss';


export const AddLogic = (
  {card, setCard,
  index,
  show, setShow, 
   setBlinkingSaveIcon, 
   setAddToDeckButton,
   newCardAdded,setNewCardAdded,
   setError
  }) => {

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

  // useEffect(() => {
  //   //   if (show) {
  //   //    setShowProgressDiagram(false)
  //   //   } else {
  //   //     setShowProgressDiagram(true)
  //   //     if (dataBase?.DeckNames?.length === 1 || dataBase?.DeckNames?.length === 0) {
  //   //       setScrollbarVisible(false)
  //   //     } else {
  //   //       setScrollbarVisible(true)
  //   //     }
  //   //   }
  //   // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [show]);

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

  return {addToDeck, closeHandler, hideHandler, plusHandler}
}