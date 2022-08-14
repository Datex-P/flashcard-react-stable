/* eslint-disable react-hooks/exhaustive-deps */

export const ThreeLogic = ({
   apiURL,
   deckName,
   editButtonClicked,
   editEvent,
   email,
   nameOfTopDeck,
   setBlinkingSaveIcon,
   setEditButtonClicked,
   setPauseIsActive,
   setShowThreeDots,
   setThreeDotsOpen,
   showThreeDots,
   stopRedCrossListener,
   threeDotsOpen, 
   threeDotsRef,
   trashEvent = () => {},
   pauseIsActive,
   pauseEvent = () => {},
   text
}) => {

  function saveIconBlinks(event) {
    if (
      threeDotsRef.current &&
      !threeDotsRef.current.contains(event.target)
    ) {
        if (editButtonClicked) {
          //    setThreeDotsOpen(false) need to be imported
        } else {
          setTimeout(()=>{
          if (!stopRedCrossListener) {
          setBlinkingSaveIcon(true);
          setTimeout(() => {
            setBlinkingSaveIcon(false);
          }, 2000);
        }
        }, 1000)
        }
      }
  }

  function trashHandler() {
    setEditButtonClicked(true); //input field gets closed on landing page
    setThreeDotsOpen(false); //three dots menu gets closed
    trashEvent(); //just invoke once when in question answer
    //trashEvent()()
  }

  async function handleEdit() {
    console.log("edit event fired");
    //  setEditBtnClicked(true)
    editEvent();
    if (text === 'card') { //deleted type === 'card'
      setThreeDotsOpen(!threeDotsOpen);
    }
    // !editName && setShow(false)
    // other way of writing it
    // if (!editButtonClicked) { //open input field when deckname is triggered
    //   // setThreeDotsOpen(false)
    //   handleDeckname()
    // }
    if(!editButtonClicked) {
      let newDeckName = nameOfTopDeck

      await fetch(`${apiURL}/edit_deckname`, {
        method:"POST",
        headers: {
          "Access-Control-Allow-Origin": "*",     
          "Content-Type":"application/json",
        },
          body: JSON.stringify({
          email:email,
          deckName:deckName, //always has current value of input from deckorcardname.js
          newDeckName:newDeckName
          })
        });
    }
  }

  async function handlePause() {
    let deckName = nameOfTopDeck
    pauseEvent(); //before pauseEvent(index) => typescript complained
    //  let newDataBase = {...dataBase}
    let savePausedState = !pauseIsActive;
    setPauseIsActive(savePausedState);
    setEditButtonClicked(true); //if input field in edit mode is active that it switches back
    //  dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused
    //  let key = newDataBase.DeckNames.findIndex(deck=>deck.name === name)
    // newDataBase.DeckNames[key].paused = true //does not work for some reason
    //  setDataBase(newDataBase)
    //  setEditButtonClicked(true)
    setThreeDotsOpen(false); //menu is closed
    setShowThreeDots(!showThreeDots); //three dots get hidden commented out for now
    //setNameOfTopDeck(name)
    if (text === 'deck') {
      console.log('fired inside threedots')
       await fetch(`${apiURL}/pause_deck`, {
        method:"POST",
        headers: {
          "Access-Control-Allow-Origin": "*",     
          "Content-Type":"application/json",
        },
          body: JSON.stringify({
          email:email,
          deckName:deckName
          })
        });
      }
    }

return {handlePause, handleEdit, saveIconBlinks, trashHandler}

}