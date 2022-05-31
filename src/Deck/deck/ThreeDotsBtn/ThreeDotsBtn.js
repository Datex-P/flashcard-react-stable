import React, {useState, useRef, useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {Context} from '../../../Context';
import trashimg from '../../../icons/trash.svg'
import pauseimg from '../../../icons/pause.svg'
import editimg from '../../../icons/edit.svg'
import resetimg from '../../../icons/reset.svg'
import saveimg from '../../../icons/save.svg'
import playimg from '../../../icons/play.svg'


function ThreeDotsBtn({                           
                        reset=false,
                        edit=false,
                        trash=false,
                        pause=false,
                        className, 
                        editBtnClicked, //is the editBtn in the main Question/Answer Overview
                        data,
                        index, input, threeDotsContainer,
                        text, 
                        // showFromParent, 
                        style, 
                        threeDotsOpen,
                        setThreeDotsOpen,
                        nameOfTopDeck, 
                        editEvent = () => { }, 
                        trashEvent = () => { },
                        resetEvent = () => { },
                       // pauseEvent = () => {},
                        type
                      }) {
   const {dataBase, setDataBase, editButtonClicked, setEditButtonClicked} = useContext(Context);
  //let {edit=false,trash=false,pause=false} = icons;
  const ref = useRef(null)
  console.log(input, 'input in three dots')


  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false)
  const [pauseIsActive, setPauseIsActive] = useState(true)
 
  function trashHandler() {
    setEditButtonClicked(true) //input field gets closed on landing page
    setThreeDotsOpen(false) //three dots menu gets closed
    trashEvent()()
  }

  const handleClick = () => {
    console.log('click on three dots button')
    setThreeDotsOpen(!threeDotsOpen)
    // if(true) {
    //   console.log('triggered in handle click')
    //   setThreeDotsOpen(!threeDotsOpen);
    // //  setShowFromParent(!show)
    // // debugger
    // }
    // debugger
  };

  const threeDotsRef = useRef(null)


  useEffect(()=>{
    console.log(threeDotsRef, 'three dots ref here')
    function saveIconBlinks(event) {
      if (threeDotsRef.current && !threeDotsRef.current.contains(event.target)
      ) {
        if (editButtonClicked) {
      //    setThreeDotsOpen(false) need to be imported
        } else {
        console.log('I fired')
       setBlinkingSaveIcon(true) 
       setTimeout(()=>{
         setBlinkingSaveIcon(false)
       }, 2000)    
      }
    }
    }
    document.addEventListener('click', saveIconBlinks)
    return ()=>{document.removeEventListener('click', saveIconBlinks); setBlinkingSaveIcon(false);console.log('got unmounted')}
  },[threeDotsOpen, setThreeDotsOpen, editButtonClicked, setBlinkingSaveIcon])
  // useEffect(()=>{
  //   setThreeDotsOpen(showFromParent)
  // },[showFromParent])


  function handleDeckname() {
    let newDataBase = {...dataBase}
    newDataBase.DeckNames[index].name = nameOfTopDeck
    //delete newDataBase.DeckNames[name]
    console.log(newDataBase)
    setDataBase(newDataBase)
  }
 
  function handleEdit() {
    editEvent() 
    if(type==='card'){
      setThreeDotsOpen(!threeDotsOpen)
    }
    // !editName && setShow(false) 
    // other way of writing it
    // if (!editButtonClicked) { //open input field when deckname is triggered
    //   // setThreeDotsOpen(false)
    //   handleDeckname()
    // }
  }
  
  // function handlePause () {
  //   //pauseEvent(index)
  //  // let newDataBase = {...dataBase}
  //   let savePausedState = !pauseIsActive
  //   setPauseIsActive(savePausedState)

  //  // dataBase.DeckNames[index].paused = !dataBase.DeckNames[index].paused
  //   //let key = newDataBase.DeckNames.findIndex(deck=>deck.name === name)
  //  // newDataBase.DeckNames[key].paused = true //does not work for some reason
  // //  setDataBase(newDataBase)
  //  // setEditButtonClicked(true)
  //   setThreeDotsOpen(false)
  //   //setNameOfTopDeck(name)  
  // }


  return (
    <>
        {/* !dataBase?.DeckNames?.[index]?.paused || !editBtnClicked) && */}
    {    
      <div style={threeDotsContainer}
           ref={threeDotsRef}
      >
        <div 
            className='deck__threeDotsCont posAbsolute deck__threeDotsPositioning' 
            onClick={handleClick}
        >
                  ... 
        </div>
        {
         // threeDotsOpen &&          
         true && 
          <div 
            ref={ref}
            style={style}
          >     
            {
              edit&& 
              <button 
                  className='deck__threeDotsBtn__btn align-center  p-1 '
                  onClick={handleEdit} 
              >                     
                   <img 
                      alt='edit'              
                      className={`mr-3px ${blinkingSaveIcon ? 'deck__blinkingIcon':''}`} 
                      src={editButtonClicked? editimg: saveimg } 
                  />  
                {text}
              </button>
            }
            {
              pause &&
              <button 
                  className={`deck__threeDotsBtn_btn_pause deck__threeDotsBtn__btn align-center  p-1 ${dataBase.DeckNames[index]?.paused? 'deck__threeDotsBtn__conditional': ''} `}
                //  onClick={handlePause(index)}
              >
                   <img 
                      alt='pause' 
                      className='mr-3px'
                      src={!dataBase.DeckNames[index]?.paused? pauseimg: playimg }  
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