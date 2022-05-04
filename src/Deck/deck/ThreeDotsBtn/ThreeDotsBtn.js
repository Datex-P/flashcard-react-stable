import React, { useState, useRef, useContext,useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import {Context} from '../../../Context';

import useOutsideAlerter from './useOutsideAlerter'
import trashimg from '../../../icons/trash.svg'
import pauseimg from '../../../icons/pause.svg'
import editimg from '../../../icons/edit.svg'
import resetimg from '../../../icons/reset.svg'
import saveimg from '../../../icons/save.svg'
import playimg from '../../../icons/play.svg'


function ThreeDotsBtn({    
                        icons,reset=false,
                        edit=false,
                        trash=false,
                        pause=false,
                        className, 
                        editBtnClicked, //is the editBtn in the main Question/Answer Overview
                        data,
                        index, input, threeDotsContainer,
                        text, 
                        showFromParent, 
                        style, 
                        nameOfTopDeck, 
                        editEvent = () => { }, 
                        trashEvent = () => { },
                        resetEvent = () => { },
                       // pauseEvent = () => {},
                        type
                      }) 

{
  const {dataBase, setDataBase,editButtonClicked} = useContext(Context);
  //let {edit=false,trash=false,pause=false} = icons;
  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false)
  const [pauseIsActive, setPauseIsActive] = useState(true)
  const [threeDotsOpen, setThreeDotsOpen] = useState(showFromParent);

  function trashHandler() {
    trashEvent()
    setThreeDotsOpen(false)
  }

  const handleClick = () => {
    if(editButtonClicked) {
      setThreeDotsOpen(!threeDotsOpen);
      // setShowFromParent(!show)
    }
  };

  const ref = useRef(null)

  useEffect(()=>{
    setThreeDotsOpen(showFromParent)
  },[showFromParent])


  function handleDeckname() {
    let newDataBase = {...dataBase}
    newDataBase.DeckNames[index].name = nameOfTopDeck
    //delete newDataBase.DeckNames[name]
    console.log(newDataBase)
    setDataBase(newDataBase)
  }


  useOutsideAlerter([ref,input], 
                    editButtonClicked, 
                    ()=>{
                      setThreeDotsOpen(false)
                    },
                    ()=>{
                    setBlinkingSaveIcon(true)
                    setTimeout(()=>{
                      setBlinkingSaveIcon(false)},
                      2000)
                    }                  
  )
    
    
  function handleEdit() {
    editEvent() 
    if(type==='card'){
      setThreeDotsOpen(!threeDotsOpen)
    }
    // !editName && setShow(false) 
    // other way of writing it
    if (!editButtonClicked) { //open input field when deckname is triggered
      // setThreeDotsOpen(false)
      handleDeckname()
    }
  }
  
  function handlePause () {
    //pauseEvent(index)
    let newDataBase = {...dataBase}
    let savePausedState = !pauseIsActive
    setPauseIsActive(savePausedState)

    dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused
    //let key = newDataBase.DeckNames.findIndex(deck=>deck.name === name)
   // newDataBase.DeckNames[key].paused = true //does not work for some reason
    setDataBase(newDataBase)
   // setEditButtonClicked(true)
    setThreeDotsOpen(false)
    //setNameOfTopDeck(name)  
  }

  return (
    <>
    {
      (!dataBase?.DeckNames?.[index]?.paused || !editBtnClicked) &&
    
      <div style={threeDotsContainer}>
        <div 
            className='deck__threeDotsCont posAbsolute deck__posQuestionAnswer' 
            onClick={handleClick}
        >
                  ... 
        </div>
        {
          threeDotsOpen && 
          
          <div 
            ref={ref}
            style={style}
            className={`ml-2 rounded mt-2 ${className}`}
          >
            {
              edit&& data?.length !==0 &&

              <button 
                  className='deck__threeDotsBtn__btn align-center  p-1 '
                  onClick={handleEdit} 
              >                     
                   <img 
                      alt='edit'              
                      className={`mr-3px ${blinkingSaveIcon ? 'blinkingIcon':''}`} 
                      src={editButtonClicked? editimg: saveimg } 
                  />  
                {text}
              </button>
            }
            {
              pause && data?.length !==0 &&

              <button 
                  className={`deck__threeDotsBtn_btn_pause deck__threeDotsBtn__btn align-center  p-1 ${dataBase.DeckNames[index]?.paused? 'deck__threeDotsBtn__conditional': ''} `}
                  onClick={handlePause(index)}
              >
                   <img 
                      alt='pause' 
                      className='mr-3px'
                      src={ !dataBase.DeckNames[index]?.paused? pauseimg: playimg }  
                  /> 
                  {text}
              </button>
            }
            {
              trash && 
              
              <button 
                className='deck__threeDotsBtn__btn align-center  p-1'
                onClick={trashHandler}
              >
                <img 
                  src={trashimg} 
                  alt='trash' 
                  className='mr-3px'
                /> 
                {text}
              </button>
            }
            {
              reset &&
              
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
            }
          </div>
        }
      </div>   
    }
    </>
  );
}

export default  withRouter(ThreeDotsBtn)