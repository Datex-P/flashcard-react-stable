/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "react-bootstrap";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from '../../../../context/Context';
import InputCheckbox from './InputCheckbox';
import {BasicLogic} from './BasicLogic'
import {BasicProps} from './BasicInterface'
import closeWindow from '../../../../icons/closeWindow.svg'
//https://stackoverflow.com/questions/44717164/unable-to-import-svg-files-in-typescript


export default function BasicOrangeWindow({
              children,
              index,
              deckFinished,
              generateRandom,
              setScrollbarVisible,
              show,setShow,
              questionAnswerWindow = false,
              menu,
              stats=false,
              settings=false,
              questionViewActive=false,
              setShowAnswerBtn = () => {},
              setEdit = () => {},
              setEditModeActive = () => {},
              title
}: BasicProps) {

  const {dataBase} = useContext(Context);
  const basicOrangeRef = useRef(null)
  const [blinkingSaveIcon, setBlinkingSaveIcon] = useState(false)
  
  let someCardsPaused = dataBase?.DeckNames[index]?.data.filter((x) => x.paused === true).length > 0

const {redCrossHandler,mouseLeaveHandler, mouseEnterHandler} = BasicLogic({
  stats,
  setBlinkingSaveIcon,
  setScrollbarVisible,
  setShow,
  setShowAnswerBtn,
  setEdit,
  setEditModeActive,
  title
})

  useEffect(()=>{
    // if (!stopRedCrossListener) {
    //   console.log('noitce from red cross here')
    //   if(show){
    //     setTimeout(()=>{document.addEventListener('click', saveIconBlinks)},500)
    //     setTimeout(()=>{document.addEventListener('scroll', saveIconBlinks)},500)
    //   }
    //   //best way to remove handler for settings?
    //   return ()=>{
    //     document.removeEventListener('click', saveIconBlinks);
    //     document.removeEventListener('scroll', saveIconBlinks);
    //     setBlinkingSaveIcon(false);console.log('got unmounted')}
    // }
  },[show])

  return (
    <Modal
      key={index}
      show={show}
      ref={basicOrangeRef}
      onHide={()=>setShow(false)}  
      contentClassName={`${settings? 'posRelative':''} mod`}
      backdrop="static"
      style={{
        left: '-160px !important',
        right: '45px !important',
        backgroundColor: questionViewActive?'rgba(0, 0, 0, 0.6)':'',
        position: questionViewActive? 'relative':'static',
        width:questionViewActive? '98%':'',
        height:questionViewActive? '651px':'',
        borderRadius:questionViewActive? '10px':''
      }}
    >
      <div className={`${settings? '': 'posRelative'} deck__modal_cont top-20px`}>
        <Modal.Header className='border-bottom-0'>
          <Modal.Title
            style={{
              fontSize: '16px',
              marginLeft: '20px',
              height: '24px',
              width: '90%',
              display: 'flex',
              marginTop: settings? '20px': '0px',
              justifyContent:'space-between',
              alignItems:'center'
            }}
          >
            {title}
            <div 
              className='redCross'
              onClick={redCrossHandler}
            >
            <img 
              className={`redCross nonDraggableIcon width16px height16px 
              ${blinkingSaveIcon ? 'deck__blinkingIcon':''}`}
              src={closeWindow} 
              alt='redCross'
            /> 
          </div>
          </Modal.Title>
          <div
            className="deck__onOffSwitch"
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            title={`${someCardsPaused? 'Click to show all paused cards':''}`}
          >
            {questionAnswerWindow &&
              <InputCheckbox
                index={index}
                generateRandom={generateRandom}
                setShowAnswerBtn={setShowAnswerBtn}                
              />
            }
          </div>
          {menu}
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
      </div>
    </Modal>
  );
}
