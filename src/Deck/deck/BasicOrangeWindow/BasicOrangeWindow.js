import { Modal } from "react-bootstrap";
import closeWindow from "../../../icons/closeWindow.svg";
import React, { useContext, useEffect, useRef, useState } from "react";
import InputCheckbox from "./InputCheckbox";
import { Context } from "../../../Context";

export default function BasicOrangeWindow({
              children,
              index,
              generateRandom,
              setScrollbarVisible,
              show,setShow,
              mainBox,
              menu,
              stats=false,
              questionViewActive=false,
              setShowAnswerBtn = () => {},
              setEdit = () => {},
              setEditBtnClicked = () => {},
              title
}) {

  const {dataBase, setDataBase, 
   // setHideMenu,
    setHideCreateDeckBtn,
        setShowProgressDiagram} = useContext(Context);
  const basicOrangeRef = useRef(null)
  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false)

  let someCardsPaused = dataBase?.DeckNames[index]?.data.filter((x) => x.paused === true).length > 0
  
  function redCrossHandler () {
    setShow(false);
    setEdit(false);
  //  setHideMenu(false) //menu gets shown again
    setHideCreateDeckBtn(false) //createDeckBtn is shown again
    //setShowRepeatBtn(false);
    setShowAnswerBtn(true);
    setEditBtnClicked(false);
    setScrollbarVisible(true);
    setShowProgressDiagram(true)
    if (index) {
      let newDataBase = {...dataBase}
      newDataBase.DeckNames[index].pauseMode = false //needed to be set to false so that switch diagram closes in case its opened
      setDataBase(newDataBase)
    }
  }

  function mouseEnterHandler () {
    if (someCardsPaused && !dataBase.DeckNames[index].editModeActive) {
      document
      .querySelector(".deck__onOffSwitch-label")
      .classList.add("pointer");
    }
  }

  function mouseLeaveHandler () {
    if (someCardsPaused) {
      document.querySelector(".deck__onOffSwitch-label").classList.remove("pointer");
    }
  }

  useEffect(()=>{
    let element = document.querySelector('.mod')

    function saveIconBlinks(event) {
      if (element && !element.contains(event.target)
      ) {
        console.log('clicked outside')
        setBlinkingSaveIcon(true) 
       setTimeout(()=>{
         setBlinkingSaveIcon(false)
       }, 2000)  
     }
    }
    if(show){
      setTimeout(()=>{document.addEventListener('click', saveIconBlinks)},500)
      
    }
    //document.addEventListener('click', saveIconBlinks)
    return ()=>{document.removeEventListener('click', saveIconBlinks); setBlinkingSaveIcon(false);console.log('got unmounted')}
  },[show])

  useEffect(()=>{
    //let element = document.querySelector('mod')
    console.log( 'blinking icon triggered')
  },[blinkingSaveIcon])

  return (
    <Modal
      key={index}
      show={show}
      ref={basicOrangeRef}
      onHide={()=>setShow(false)}  
      contentClassName={'mod'}
      backdrop="static"
      style={{
        left: '-160px !important',
        right: '45px !important',
        backgroundColor: questionViewActive?'rgba(0, 0, 0, 0.6)':'',
        position: questionViewActive? 'relative':'',
        width:questionViewActive? '98%':'',
        height:questionViewActive? '651px':'',
        borderRadius:questionViewActive? '10px':''
      }}
    >
      <div className='posRelative deck__modal_cont top-20px'>
        <Modal.Header className="border-bottom-0">
          <Modal.Title
            style={{
              fontSize: "16px",
              marginLeft: "12px",
              height: "24px",
              width: "240px",
              marginTop: '0px'
            }}
          >
            {title}
          </Modal.Title>
          <div
            className="deck__onOffSwitch"
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            title={`${someCardsPaused? 'Click to show all paused cards':''}`}
          >
            {mainBox &&
              <InputCheckbox
                index={index}
                generateRandom={generateRandom}
                setShowAnswerBtn={setShowAnswerBtn}                
              />
            }
          </div>
          {menu}
          <div
            className='deck__basic_button_positioning redCross posAbsolute justify-center-align-center'
            onClick={redCrossHandler}
          >
            <img 
              className={`redCross nonDraggableIcon width16px height16px ${blinkingSaveIcon ? 'deck__blinkingIcon':''}`}
              src={closeWindow} 
              alt="redCross" 
            /> 
          </div>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
      </div>
    </Modal>
  );
}
