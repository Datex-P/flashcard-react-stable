import React, { useState, useRef, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Context } from "../../../Context";
import trashimg from "../../../icons/trash.svg";
import pauseimg from "../../../icons/pause.svg";
import editimg from "../../../icons/edit.svg";
import resetimg from "../../../icons/reset.svg";
import saveimg from "../../../icons/save.svg";
import playimg from "../../../icons/play.svg";

function ThreeDotsBtn({
  reset = false,
  edit = false,
  trash = false,
  pause = false,
  questionAnswerWindow=false,
  className,
  editBtnClicked, //is the editBtn in the main Question/Answer Overview
  setEditBtnClicked,
  data,
  index,
  input,
  threeDotsContainer,
  text,
  // showFromParent,
  classValue,
  style,
  editEvent = () => {},
  trashEvent = () => {},
  resetEvent = () => {},
  pauseEvent = () => {},
  type,
}) {

  const {
    apiURL,
    dataBase,setDataBase,
    editButtonClicked,setEditButtonClicked,
    email,
    nameOfTopDeck,
    showThreeDots,setShowThreeDots,
    stopRedCrossListener,
    threeDotsOpen,setThreeDotsOpen,
  } = useContext(Context);

  const threeDotsOpenRef = useRef(null);

  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false); //blinks when deck name in input mode and clicked outside
  const [pauseIsActive, setPauseIsActive] = useState(true);
  const [deckName, setDeckName] = useState('')

   function trashHandler() {
    setEditButtonClicked(true); //input field gets closed on landing page
    setThreeDotsOpen(false); //three dots menu gets closed
    trashEvent(); //just invoke once when in question answer
    //trashEvent()()
  }

  const handleClick = () => {
    setThreeDotsOpen(!threeDotsOpen);
    // if(true) {
    //   console.log('triggered in handle click')
    //   setThreeDotsOpen(!threeDotsOpen);
    // //  setShowFromParent(!show)
    // // debugger
    // }
    // debugger
  };

  useEffect(()=>{
    console.log(threeDotsOpen, 'trheed tos open hee')
  },[threeDotsOpen])

  useEffect(()=>{

    if (!editButtonClicked) {
      setDeckName(nameOfTopDeck)
    }
  },[editButtonClicked])

  const threeDotsRef = useRef(null);

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
          //  debugger
          setBlinkingSaveIcon(true);
        //  debugger
          setTimeout(() => {
            setBlinkingSaveIcon(false);
          //  debugger
          }, 2000);
        }
        }, 1000)
        }
      }
  }
  
  useEffect(() => {
    if(!stopRedCrossListener) {
    document.addEventListener("click", saveIconBlinks);
    }
    return () => {
      document.removeEventListener("click", saveIconBlinks);
      setBlinkingSaveIcon(false);
      console.log("got unmounted");
    };
  }, [threeDotsOpen, setThreeDotsOpen, editButtonClicked, setBlinkingSaveIcon]);

  function handleDeckname() {
    let newDataBase = { ...dataBase };
    newDataBase.DeckNames[index].name = nameOfTopDeck;
    //delete newDataBase.DeckNames[name]
    console.log(newDataBase);
    setDataBase(newDataBase);
  }

  async function handleEdit() {
    console.log("edit event fired");
    //  setEditBtnClicked(true)
    editEvent();
    if (text === "card") { //deleted type === 'card'
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


  // function threeDotsClose(event) {
  //   if (
  //   //  questionAnswerWindow &&
  //     threeDotsOpen &&
  //     threeDotsOpenRef.current &&
  //     !threeDotsOpenRef.current.contains(event.target)
  //   ) {
  //       setThreeDotsOpen(false)
  //     }
  // }
  // useEffect(()=>{

  //   //threeDots broken, unsure why exactly
  //     document.addEventListener('click', threeDotsClose);
  //     return () => {
  //       document.removeEventListener('click', threeDotsClose);
  //       console.log('three dots not listenening anymore')
  //     };
  // }, [threeDotsOpen, setThreeDotsOpen, questionAnswerWindow])

  async function handlePause() {
    let deckName = nameOfTopDeck
    pauseEvent(index);
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

  return (
    <>
      {/* !dataBase?.DeckNames?.[index]?.paused || !editBtnClicked) && */}
      {
        <div style={threeDotsContainer} ref={threeDotsRef}>
          {showThreeDots && (
            <div
              className='deck__threeDotsCont posAbsolute deck__threeDotsPositioning'
              onClick={handleClick}
            >
              ...
            </div>
          )}
          {threeDotsOpen && (
            <div 
              ref={threeDotsOpenRef} 
            //  className={`${classValue}`}
              style={style}
            >
              {edit && (
                <button
                  className='deck__threeDotsBtn__btn align-center  p-1 '
                  onClick={handleEdit}
                >
                  <img
                    alt='edit'
                    className={`mr-3px ${
                      blinkingSaveIcon ? 'deck__blinkingIcon' : ''
                    }`}
                    src={editButtonClicked ? editimg : saveimg}
                  />
                  {text}
                </button>
              )}
              {pause && (
                <button
                  className={`deck__threeDotsBtn_btn_pause deck__threeDotsBtn__btn align-center  p-1 ${
                    dataBase.DeckNames[index]?.paused
                      ? 'deck__threeDotsBtn__conditional'
                      : ''
                  } `}
                  onClick={handlePause}
                >
                  <img
                    alt='pause'
                    className='mr-3px'
                    src={
                      !dataBase.DeckNames[index]?.paused ? pauseimg : playimg
                    }
                  />
                  {text}
                </button>
              )}
              {trash && (
                <button
                  className='deck__threeDotsBtn__btn align-center  p-1'
                  onClick={trashHandler}
                >
                  <img src={trashimg} alt='trash' className='mr-3px' />
                  {text}
                </button>
              )}
              {reset && (
                <button
                  className='deck__threeDotsBtn__btn align-center outline-none p-1'
                  onClick={resetEvent}
                >
                  <img
                    src={resetimg}
                    alt='reset'
                    className='deck__threeDotsBtn__reset-img'
                  />
                  {text}
                </button>
              )}
            </div>
          )}
        </div>
      }
    </>
  );
}

export default withRouter(ThreeDotsBtn);
