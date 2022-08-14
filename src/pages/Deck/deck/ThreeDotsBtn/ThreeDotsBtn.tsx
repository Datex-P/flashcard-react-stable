/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useContext, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Context } from '../../../../context/Context';
import trashimg from '../../../../icons/trash.svg'
import pauseimg from '../../../../icons/pause.svg'
import editimg from '../../../../icons/edit.svg'
import resetimg from '../../../../icons/reset.svg'
import saveimg from '../../../../icons/save.svg'
import playimg from '../../../../icons/play.svg'
import {ThreeLogic} from './ThreeLogic'
// https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript
  // https://www.dev-eth0.de/2019/09/10/using-withrouter-in-a-typescript-react-component/
  /*link showed how to use typescript with reactrouter */

interface ThreeDotsProps extends RouteComponentProps {
  reset:boolean;
  data:any;
  edit: boolean;
  trash: boolean;
  pause: boolean;
  index:any;
  threeDotsContainer:any;
  text:any;
  style:any;
  editEvent:(prop?:boolean) => void;
  trashEvent:(prop?:boolean) => void;
  resetEvent:(prop?:boolean) => void;
  pauseEvent:(prop?:boolean) => void;
  editModeActive:(prop?:boolean) => void;

}

  function ThreeDotsBtn({
  reset = false,
  edit = false,
  data,
  trash = false,
  pause = false,
  index,
  threeDotsContainer,
  text,
  style,
  editEvent = () => {},
  trashEvent = () => {},
  resetEvent = () => {},
  pauseEvent = () => {},
  editModeActive = () => {},
}:ThreeDotsProps) {

  const {
    apiURL,
    dataBase,
    editButtonClicked,setEditButtonClicked,
    email,
    nameOfTopDeck,
    showThreeDots,setShowThreeDots,
    stopRedCrossListener,
    threeDotsOpen,setThreeDotsOpen,
  } = useContext(Context);
  
  const threeDotsRef = useRef<HTMLDivElement>(null);
  const threeDotsOpenRef = useRef(null);

  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false); //blinks when deck name in input mode and clicked outside
  const [pauseIsActive, setPauseIsActive] = useState(true);
  const [deckName, setDeckName] = useState('')

  const {handlePause, handleEdit, saveIconBlinks, trashHandler} = ThreeLogic({ 
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
    trashEvent,
    pauseIsActive,
    pauseEvent,
    text
  })

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

  // function handleDeckname() {
  //   let newDataBase = { ...dataBase };
  //   newDataBase.DeckNames[index].name = nameOfTopDeck;
  //   //delete newDataBase.DeckNames[name]
  //   console.log(newDataBase);
  //   setDataBase(newDataBase);
  // }

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
              {pause && 
               data? data?.length !==0: true && 
              (
                <button
                  className={`deck__threeDotsBtn_btn_pause deck__threeDotsBtn__btn align-center  p-1 ${
                    dataBase.DeckNames[index]?.paused ? 'deck__threeDotsBtn__conditional': ''
                  }`}
                  onClick={handlePause}
                >
                  <img
                    alt='pause'
                    className='mr-3px'
                    src={!dataBase.DeckNames[index]?.paused ? pauseimg : playimg}
                  />
                  {text}
                </button>
              )}
              {trash && (
                <button
                  className={`deck__threeDotsBtn__btn align-center  p-1 ${data?.length === 0? 'deck__empty-border-top':''}`}
                  onClick={trashHandler}
                >
                  <img src={trashimg} alt='trash' className='mr-3px' />
                  {text}
                </button>
              )}
              {reset && (
                <button
                  className='deck__threeDotsBtn__btn align-center outline-none p-1'
                  onClick={()=>resetEvent(true)}
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
